
const fs = require('fs')
const path = require('path')
const utils = require('./utils')
const authService = require('./services/auth')
const indexService = require('./services/index')
const accountService = require('./services/account')


/**
 * @typedef {Object} Storage
 * @property {import('./types').Credential} credential
 * @property {import('./types').TokenObj} token
 * @property {import('./types').CmsObj} cms
 * @property {import('./types').AccountObj} account
 */
/** @type {Storage} */
const storage = {}


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
            data = await authService.getToken(storage.credential)
        }
        storage.token = fromJSON(data)
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
        cms = await indexService.getIndexConfig({ token: await getAuthToken()})
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
    const authData = authDataFile()
    if (fs.existsSync(authData)) {
        const data = fs.readFileSync(authData)
        const jsonData = JSON.parse(data)
        Object.assign(storage, fromJSON(jsonData))
    }
}


/**
 * Save to persistence data
 * @returns {Promise}
 */
async function saveToLocal() {
    fs.writeFileSync(authDataFile(), JSON.stringify(toJSON(storage), null, '\t'))
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
 * @returns {String} 
 */
function authDataFile() {
    return path.resolve('.') + '/authData.json'
}


module.exports = {
    storage,
    getAuthToken,
    getToken,
    getLocale,
    getCms,
    loadFromLocal,
    saveToLocal,
    authDataFile,
    getAccount,
}

