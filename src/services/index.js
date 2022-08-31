
const fetch = require('node-fetch')
const config = require('../config/config.json')
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
    const url = `${config.url}/index/v2`
    const reqConfig =  {
        method: 'get',
        headers: {'Authorization': await client.getToken()}
    }
    logger.debug(`${reqConfig.method} - ${url}`)
    /** @type {import('node-fetch').Response} */
    const res = await fetch(url, reqConfig)
    await utils.logRes(fnName, res)
    const data = await res.json()
    const cms = new Cms()
    cms.fromJSON(data.cms_beta)
    return cms
}

module.exports = {
    getIndexConfig,
}
