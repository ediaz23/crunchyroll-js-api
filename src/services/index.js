
const fetch = require('node-fetch')
const config = require('../config/config.json')
const utils = require('../utils')
const { Cms } = require('./../models/cms')

/**
 * Return index data. Cms is set there
 * @param {import('./../controllers/clients').Clients} client
 * @returns {Promise<Cms>}
 */
async function getIndexConfig(client) {
    const fnName = 'getIndexConfig'
    console.log(fnName)
    const url = `${config.url}/index/v2`
    /** @type {import('node-fetch').Response} */
    const res = await fetch(url, {
        method: 'get',
        headers: {'Authorization': await client.getToken()}
    })
    await utils.logRes(fnName, res)
    const data = await res.json()
    const cms = new Cms()
    cms.fromJSON(data)
    return cms
}

module.exports = {
    getIndexConfig,
}
