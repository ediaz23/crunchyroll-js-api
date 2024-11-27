
import utils from './utils.js'
import authService from './services/auth.js'
import indexService from './services/index.js'
import accountService from './services/account.js'


/** @type {import('./types.js').Storage} */
const storage = {
    credential: null,
    device: null,
    token: null,
    cms: null,
    account: null
}

/**
 * @type {Function}
 * @param {Object} data
 */
let externalSaveData = null

/**
 * @type {Function}
 * @returns {Object}
 */
let externalLoadData = null


/**
 * @param {Object} jsonData
 * @returns {Object}
 */
function fromJSON(jsonData) {
    return swapObjectJson(jsonData, utils.toCamel)
}


/**
 * @param {Object} jsonData
 * @returns {Object}
 */
function toJSON(jsonData) {
    return swapObjectJson(jsonData, utils.toSnake)
}


/**
 * @returns {Promise<String>}
 */
async function getAuthToken() {
    let token = null

    if (storage.token && storage.token.accessToken) {
        const now = new Date()
        const diff = (now.getTime() - (new Date(storage.token.createdDate)).getTime()) / 1000
        if (diff < (storage.token.expiresIn - 5)) {
            token = storage.token
        }
    }
    if (!token) {
        let data = null
        if (storage.token && storage.token.refreshToken) {
            data = await authService.getRefreshToken({ ...storage.token, device: storage.device })
        } else {
            data = await authService.getToken({ ...storage.credential, device: storage.device })
        }
        storage.token = fromJSON(data)
        await saveToLocal()
        token = storage.token
    }
    return `${token.tokenType} ${token.accessToken}`
}


/**
 * @param {String} profileId
 * @returns {Promise<import('./types').TokenObj>}
 */
async function switchProfile(profileId) {
    const data = await authService.switchProfile({ ...storage.token, device: storage.device, profileId })
    storage.token = fromJSON(data)
    await saveToLocal()
    return storage.token
}


/**
 * @returns {Promise<import('./types').TokenObj>}
 */
async function getToken() {
    await getAuthToken()
    return storage.token
}

/**
 * @returns {Promise}
 */
async function revokeToken() {
    if (storage.token) {
        await authService.revokeRefreshToken(storage.token)
    }
    storage.token = null
    await saveToLocal()
}

/**
 * @returns {Promise<import('./types').CmsObj>}
 */
async function getCms() {
    let cms = null
    if (storage.cms && storage.cms.bucket) {
        const now = new Date()
        if (new Date(storage.cms.expires) > now) {
            cms = storage.cms
        }
    }
    if (!cms) {
        cms = await indexService.getIndexConfig({ token: await getAuthToken() })
        storage.cms = fromJSON(cms.cms)
        cms = storage.cms
        await saveToLocal()
    }

    return cms
}

/**
 * @returns {Promise<import('./types').AccountObj>}
 */
async function getAccount() {
    if (!storage.account || !storage.account.accountId) {
        const account = await accountService.getAccountId({ token: await getAuthToken() })
        storage.account = fromJSON(account)
        await saveToLocal()
    }
    return storage.account
}


/**
 * Return basic params to query api
 * @returns {Promise<import('./types').AccountAuth>}
 */
async function getContentParam() {
    const tokenObj = await getToken()
    const token = `${tokenObj.tokenType} ${tokenObj.accessToken}`
    const profile = await accountService.getProfile({ token })
    return {
        token,
        accountId: tokenObj.accountId,
        locale: profile.preferred_communication_language,
        audioLanguage: profile.preferred_content_audio_language,
    }
}


/**
 * @todo maybe add a extra field to save locale, and return profile.preferredContentSubtitleLanguage too
 */
async function getLocale() {
    return 'es-419'
}


/**
 * Load from persistence data
 * @returns {Promise}
 */
async function loadFromLocal() {
    let data = null
    const authData = await authDataFile()
    try {
        if (externalLoadData) {
            data = await externalLoadData()
        } else {
            const data64 = window.localStorage.getItem(authData)
            if (data64) {
                data = atob(data64)
            }
        }
    } catch (_e) {
        // #if process.env.NODE_COMPILING !== 'true'
        const fs = (await import('fs')).default
        if (fs.existsSync(authData)) {
            data = fs.readFileSync(authData, 'utf-8')
        }
        // #endif
    }
    if (data) {
        const jsonData = JSON.parse(data)
        Object.assign(storage, fromJSON(jsonData))
    }
}


/**
 * Save to persistence data
 * @returns {Promise}
 */
async function saveToLocal() {
    const authData = await authDataFile()
    const data = JSON.stringify(toJSON(storage), null, '\t')
    try {
        if (externalSaveData) {
            await externalSaveData(data)
        } else {
            window.localStorage.setItem(authData, btoa(data))
        }
    } catch (_e) {
        // #if process.env.NODE_COMPILING !== 'true'
        const fs = (await import('fs')).default
        fs.writeFileSync(authData, data)
        // #endif
    }
}


/**
 * @param {Object} jsonData
 * @param {Function} func
 * @returns {Object}
 */
function swapObjectJson(jsonData, func) {
    let out
    if (jsonData) {
        if (Array.isArray(jsonData)) {
            out = []
            for (const item of jsonData) {
                out.push(swapObjectJson(item, func))
            }
        } else if (typeof jsonData === 'object' || Object.prototype.isPrototypeOf.call(jsonData, Object)) {
            out = {}
            for (const key of Object.keys(jsonData)) {
                out[func(key)] = swapObjectJson(jsonData[key], func)
            }
        } else {
            out = jsonData
        }
    } else {
        out = jsonData
    }
    return out
}


/**
 * Disk file with credential data
 * @returns {Promise<String>}
 */
async function authDataFile() {
    let out = 'crunchyData'

    // #if process.env.NODE_COMPILING !== 'true'
    const path = (await import('path')).default
    out = path.resolve('.') + '/authData.json'
    // #endif
    return out
}


/**
 * Set function to save and load data from external storage
 * @param {{save: Function, load: Function}} obj
 */
function setExternalStorage({ save, load }) {
    if (load !== undefined) {
        externalLoadData = load
    }
    if (save !== undefined) {
        externalSaveData = save
    }
}

/**
 * Set credentials of an account
 * @param {Storage} newData
 * @returns {Promise}
 */
async function setNewData(newData) {
    Object.assign(storage, newData)
    await saveToLocal()
}


export default {
    storage,
    getAuthToken,
    getToken,
    getLocale,
    getCms,
    getContentParam,
    loadFromLocal,
    saveToLocal,
    authDataFile,
    getAccount,
    setExternalStorage,
    setNewData,
    switchProfile,
    revokeToken,
}
