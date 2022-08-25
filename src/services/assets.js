
const fetch = require('node-fetch')
const config = require('../config/config.json')
const utils = require('../utils')

/**
 * Return Avatar list
 * @param {import('./../controllers/clients').Clients} client
 * @returns {Promise<{items: Array<String>}>}
 */
async function getAvatar(client) {
    const fnName = 'getAvatar'
    console.log(fnName)
    const url = `${config.url}/assets/v1/avatar`
    /** @type {import('node-fetch').Response} */
    const res = await fetch(url, {
        method: 'get',
        headers: {'Authorization': await client.getToken()}
    })
    await utils.logRes(fnName, res)
    const data = await res.json()
    return data
}

module.exports = {
    getAvatar,
}

