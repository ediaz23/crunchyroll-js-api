
const config = require('./config/config.json')
const fetch = require('node-fetch')
const logger = require('./logger')
const CONST = require('./const')


/**
 * log api response
 * @param {String} fnName
 * @param {import('node-fetch').Response} res
 * @returns {Promise}
 */
async function logRes(fnName, res) {
    if (![200, 202, 204].includes(res.status)) {
        logger.error(`Status Code: ${res.status} - ${fnName}`)
        try {
            const r = await res.json()
            logger.error(r)
        } catch( _e) {
            logger.error(res.statusText)
        }
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
    url = decodeURIComponent(`${config.url}${url}`)
    logger.debug(`${reqConfig.method} - ${url}`)
    if (!reqConfig.headers) {
        reqConfig.headers = {}
    }
    if (reqConfig.headers instanceof fetch.Headers) {
        reqConfig.headers.append('User-Agent', CONST.getUserAgent())
    } else {
        reqConfig.headers['User-Agent'] = CONST.getUserAgent()
    }
    return fetch(url, reqConfig)
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
    let out
    try {
        out = await res.json()
    } catch(_e) {
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


module.exports = {
    camelCase: str => str.replace(/_([a-z])/g, (_m,w) => w.toUpperCase()),
    logRes,
    makeRawRequest,
    makeRequest,
    addParam,
}
