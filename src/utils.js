
import config from './config/config.json'
import logger from './logger.js'
import CONST from './const.js'


/**
 * log api response
 * @param {String} fnName
 * @param {import('node-fetch').Response} res
 * @returns {Promise}
 */
async function logRes(fnName, res) {
    if (![200, 202, 204].includes(res.status)) {
        logger.error(`Status Code: ${res.status} - ${fnName}`)
        let msg = null
        try {
            const r = await res.json()
            if (r && r.error) {
                msg = r.error
            }
            logger.error(r)
        } catch (_e) {
            // ignore
        }
        if (!msg) {
            msg = res.statusText ? res.statusText : 'Unexpected error.'
        }
        logger.error(msg)
        throw new Error(msg)
    } else {
        logger.debug(`Status Code: ${res.status} - ${fnName}`)
    }
}


/**
 * Make http request and return raw response
 * @param {String} url
 * @param {import('node-fetch').Request} reqConfig
 * @returns {Promise<import('node-fetch').Response>}
 */
async function makeRawRequest(url, reqConfig) {
    let fetchFn = null
    let Headers = {}
    url = decodeURIComponent(`${config.url}${url}`)
    logger.debug(`${reqConfig.method} - ${url}`)
    if (!reqConfig.headers) {
        reqConfig.headers = {}
    }
    try {
        fetchFn = await import('node-fetch')
        Headers = fetchFn.Headers
        fetchFn = fetchFn.default
    } catch (_e) {
        fetchFn = fetch
    }
    if (reqConfig.headers instanceof Headers) {
        reqConfig.headers.append('User-Agent', CONST.getUserAgent())
    } else {
        reqConfig.headers['User-Agent'] = CONST.getUserAgent()
    }
    return fetchFn(url, reqConfig)
}


/**
 * Make http request
 * @param {String} fnName for loggin
 * @param {String} url
 * @param {import('node-fetch').Request} reqConfig
 * @returns {Promise<Object>}
 */
async function makeRequest(fnName, url, reqConfig) {
    const res = await makeRawRequest(url, reqConfig)
    await logRes(fnName, res)
    let out = null
    try {
        out = await res.json()
    } catch (_e) {
        // nothing
    }
    return out
}


/**
 * Add key to object if not undefined
 * @param {Object} data
 * @param {String} key
 * @param {Object} value
 * @param {Function} validator
 */
function addParam(data, key, value, validator) {
    if (value !== undefined) {
        if (validator && !(validator(value))) {
            throw new Error(`Value ${value} for key ${key} is not valid.`)
        }
        data[key] = encodeURIComponent(value)
    }
}


/**
 * Convert snake case to camel case
 * @param {String}
 * @returns {String}
 */
function toCamel(str) {
    return str.replace(/([-_][a-z])/ig, $1 => $1.toUpperCase().replace('_', ''))
}


/**
 * Convert camel case to snake case
 * @param {String}
 * @returns {String}
 */
function toSnake(str) {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
}

/**
 * Return a toURLSearchParams object
 * @param {Object} data
 * @returns {Promise<import('url').URLSearchParams>}
 */
async function toURLSearchParams(data) {
    let URLSearchParamsClass = null
    try {
        const url = await import('url')
        URLSearchParamsClass = url.URLSearchParams
    } catch (_e) {
        URLSearchParamsClass = URLSearchParams
    }
    
    return new URLSearchParamsClass(data)
}

export default {
    camelCase: str => str.replace(/_([a-z])/g, (_m, w) => w.toUpperCase()),
    logRes,
    makeRawRequest,
    makeRequest,
    addParam,
    toCamel,
    toSnake,
    toURLSearchParams,
}
