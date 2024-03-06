
import utils from './utils.js'
import authService from './services/auth.js'
import indexService from './services/index.js'
import accountService from './services/account.js'


/**
 * @typedef {Object} Storage
 * @property {import('./types').Credential} credential
 * @property {import('./types').Device} device
 * @property {import('./types').TokenObj} token
 * @property {import('./types').CmsObj} cms
 * @property {import('./types').AccountObj} account
 */
/** @type {Storage} */
const storage = {}
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
 * @returns {Promise<String>}
 */
async function getAuthToken() {
    let token = null

    if (storage.token && storage.token.accessToken) {
        const now = new Date()
        const diff = (now - new Date(storage.token.createdDate)) / 1000
        if (diff < storage.token.expiresIn) {
            token = storage.token
        }
    }
    if (!token) {
        let data = null
        if (storage.token && storage.token.refreshToken) {
            data = await authService.getRefreshToken(storage.token)
        } else {
            data = await authService.getToken({ ...storage.credential, device: storage.device })
        }
        storage.token = fromJSON(data)  // eslint-disable-line require-atomic-updates
        await saveToLocal()
        token = storage.token
    }
    return `${token.tokenType} ${token.accessToken}`
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
        storage.cms = fromJSON(cms.cms)    // eslint-disable-line require-atomic-updates
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
        storage.account = fromJSON(account)    // eslint-disable-line require-atomic-updates
        await saveToLocal()
    }
    return storage.account
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
            data = fs.readFileSync(authData)
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
 * @param {Object}
 * @returns {Object}
 */
function fromJSON(jsonData) {
    return swapObjectJson(jsonData, utils.toCamel)
}


/**
 * @param {Object}
 * @returns {Object}
 */
function toJSON(jsonData) {
    return swapObjectJson(jsonData, utils.toSnake)
}


/**
 * @param {Object}
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
 * @param {{save: Function, load: Function}}
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
    loadFromLocal,
    saveToLocal,
    authDataFile,
    getAccount,
    setExternalStorage,
    setNewData,
    revokeToken,
}
