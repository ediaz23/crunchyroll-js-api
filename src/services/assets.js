
const fetch = require('node-fetch')
const config = require('../config/config.json')
const utils = require('../utils')
const logger = require('../logger')

/**
 * Return Avatar list
 * @param {import('./../controllers/clients').Clients} client
 * @returns {Promise<{items: Array<String>}>}
 */
async function getAvatar(client) {
    const fnName = 'getAvatar'
    logger.debug(fnName)
    const url = `${config.url}/assets/v1/avatar`
    const reqConfig = {
        method: 'get',
        headers: {'Authorization': await client.getToken()}
    }
    logger.debug(`${reqConfig.method} - ${url}`)
    /** @type {import('node-fetch').Response} */
    const res = await fetch(url, reqConfig)
    await utils.logRes(fnName, res)
    const data = await res.json()
    return data
}

module.exports = {
    getAvatar,
}

