
const utils = require('../utils')
const logger = require('../logger')
const { Cms } = require('./../models/cms')

/**
 * Return index data. Cms is set there
 * @param {import('./../controllers/clients').Clients} client
 * @returns {Promise<Cms>}
 */
async function getIndexConfig(client) {
    const fnName = 'getIndexConfig'
    logger.debug(fnName)
    const url = `/index/v2`
    const reqConfig = {
        method: 'get',
        headers: {'Authorization': await client.getToken()}
    }
    const data = await utils.makeRequest(fnName, url, reqConfig)
    const cms = new Cms()
    cms.fromJSON(data.cms)
    return cms
}

module.exports = {
    getIndexConfig,
}
