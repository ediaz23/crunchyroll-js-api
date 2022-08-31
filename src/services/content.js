
const fetch = require('node-fetch')
const config = require('../config/config.json')
const utils = require('../utils')
const logger = require('../logger')
const { URLSearchParams } = require('url')

/**
 * Return browse query
 * @param {import('./../controllers/clients').Clients} client
 * @returns {Promise<{total: Number, items: Array<Object>}>}
 */
async function getBrowseAll(client, quantity, start) {
    const fnName = 'getBrowseAll'
    logger.debug(fnName)
    const queryData = {locale: await client.getLocale()}
    if (quantity != undefined) { queryData.n = quantity}
    if (start != undefined) { queryData.start = start}
    const query = new URLSearchParams(queryData)
    const url = `${config.url}/content/v1/browse?${query}`
    const reqConfig = {
        method: 'get',
        headers: {
            'Authorization': await client.getToken(),
            'add_watchlist_status': true,
        }
    }
    logger.debug(`${reqConfig.method} - ${url}`)
    /** @type {import('node-fetch').Response} */
    const res = await fetch(url, reqConfig)
    await utils.logRes(fnName, res)
    const data = await res.json()
    return data
}

/**
 * Return account home feed
 * @param {import('./../controllers/clients').Clients} client
 * @returns {Promise<{items: Array<Object>}>}
 */
async function getHomeFeed(client, quantity, start) {
    const fnName = 'getHomeFeed'
    logger.debug(fnName)
    const queryData = {locale: await client.getLocale()}
    if (quantity != undefined) { queryData.n = quantity}
    if (start != undefined) { queryData.start = start}
    const query = new URLSearchParams(queryData)
    const account = await client.getAccount()
    const url = `${config.url}/content/v1/${account.accountId}/home_feed?${query}`
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

/**
 * Returns season names.
 * @param {import('./../controllers/clients').Clients} client
 * @returns {Promise<{items: Array<{id: String, localization: Object}>}>} 
 */
async function getSeasonList(client) {
    const fnName = 'getSeasonList'
    logger.debug(fnName)
    const queryData = {locale: await client.getLocale()}
    const query = new URLSearchParams(queryData) 
    const url = `${config.url}/content/v1/season_list?${query}`
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
    getBrowseAll,
    getHomeFeed,
    getSeasonList
}
