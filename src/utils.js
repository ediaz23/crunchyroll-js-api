
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

module.exports = {
    camelCase: str => str.replace(/_([a-z])/g, (_m,w) => w.toUpperCase()),
    logRes
}