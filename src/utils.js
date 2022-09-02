
const config = require('./config/config.json')
const fetch = require('node-fetch')
const logger = require('./logger')


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
 * Make http request
 * @param {String} fnName for loggin
 * @param {String} url
 * @param {import('node-fetch').Request} reqConfig
 */
async function makeRequest(fnName, url, reqConfig) {
    url = `${config.url}${url}`
    logger.debug(`${reqConfig.method} - ${url}`)
    /** @type {import('node-fetch').Response} */
    const res = await fetch(url, reqConfig)
    await logRes(fnName, res)
    let out
    try {
        out = await res.json()
    } catch(_e) {
        // nothing
    }
    return out
}

module.exports = {
    camelCase: str => str.replace(/_([a-z])/g, (_m,w) => w.toUpperCase()),
    logRes,
    makeRequest,
}