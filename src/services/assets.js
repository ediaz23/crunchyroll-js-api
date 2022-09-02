
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
    const url = `/assets/v1/avatar`
    const reqConfig = {
        method: 'get',
        headers: {'Authorization': await client.getToken()}
    }
    return utils.makeRequest(fnName, url, reqConfig)
}

module.exports = {
    getAvatar,
}

