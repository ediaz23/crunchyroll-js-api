
const utils = require('../utils')
const logger = require('../logger')
const { URLSearchParams } = require('url')



/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {Number} quantity Number of records in a result
 * @param {Number} start Offset to request
 * @returns {Promise<{total: Number, items: Array<Object>}>}
 */
async function getBrowseAll(client, quantity, start) {
    const fnName = 'getBrowseAll'
    logger.debug(fnName)
    const queryData = {locale: await client.getLocale()}
    if (quantity != undefined) { queryData.n = quantity}
    if (start != undefined) { queryData.start = start}
    const query = new URLSearchParams(queryData)
    const url = `/content/v1/browse?${query}`
    const reqConfig = {
        method: 'get',
        headers: {
            'Authorization': await client.getToken(),
            'add_watchlist_status': true,
        }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}
///content/v1/browse/index
///content/v1/tenant_categories
//getCollection
//getContinueWatching
//getCuratedFeed
///content/v1/custom-lists/{account_uuid}/{list_id}

/**
 * @param {import('./../controllers/clients').Clients} client
 * @returns {Promise<Object>}
 * @todo review, result was empty
 */
async function getCustomLists(client) {
    const fnName = 'getCustomLists'
    logger.debug(fnName)
    const queryData = {locale: await client.getLocale()}
    const query = new URLSearchParams(queryData)
    const account = await client.getAccount()
    const url = `/content/v1/custom-lists/${account.accountId}?${query}`
    const reqConfig = {
        method: 'get',
        headers: {'Authorization': await client.getToken()}
    }
    return utils.makeRequest(fnName, url, reqConfig)
}

/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {Number} quantity Number of records in a result
 * @param {Number} start Offset to request
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
    const url = `/content/v1/${account.accountId}/home_feed?${query}`
    const reqConfig = {
        method: 'get',
        headers: {'Authorization': await client.getToken()}
    }
    return utils.makeRequest(fnName, url, reqConfig)
}

///content/v1/up_next_episode
///content/v1/playheads/{account_uuid}/{content_ids}

/**
 * @param {import('./../controllers/clients').Clients} client
 * @returns {Promise<{items: Array<{id: String, localization: Object}>}>} 
 */
async function getSeasonList(client) {
    const fnName = 'getSeasonList'
    logger.debug(fnName)
    const queryData = {locale: await client.getLocale()}
    const query = new URLSearchParams(queryData) 
    const url = `/content/v1/season_list?${query}`
    const reqConfig = {
        method: 'get',
        headers: {'Authorization': await client.getToken()}
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {Number} page it has to be > 1
 * @param {Number} pageSize
 * @returns {Promise<Object>} 
 */
async function getWatchHistory(client, page, pageSize) {
    const fnName = 'getWatchHistory'
    logger.debug(fnName)
    const queryData = {locale: await client.getLocale()}
    queryData.page = page || 1
    if (pageSize != undefined) { queryData.page_size = pageSize}
    const query = new URLSearchParams(queryData)
    const account = await client.getAccount()
    const url = `/content/v1/watch-history/${account.accountId}?${query}`
    const reqConfig = {
        method: 'get',
        headers: {
            'Authorization': await client.getToken(),
            'upload_offline_playheads': true,
        }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {Number} quantity Number of records in a result
 * @param {Number} start Offset to request
 * @returns {Promise<Object>} 
 */
async function getWatchlist(client, quantity, start) {
    const fnName = 'getWatchlist'
    logger.debug(fnName)
    const queryData = {locale: await client.getLocale()}
    if (quantity != undefined) { queryData.n = quantity}
    if (start != undefined) { queryData.start = start}
    const query = new URLSearchParams(queryData)
    const account = await client.getAccount()
    const url = `/content/v1/${account.accountId}/watchlist?${query}`
    const reqConfig = {
        method: 'get',
        headers: {
            'Authorization': await client.getToken(),
            'upload_offline_playheads': true,
        }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {import('./../controllers/clients').Clients} client
 * @returns {Promise<Object>} 
 */
async function getWatchlistItems(client, contentId) {
    const fnName = 'getWatchlistItems'
    logger.debug(fnName)
    const queryData = {locale: await client.getLocale()}
    const query = new URLSearchParams(queryData)
    const account = await client.getAccount()
    const url = `/content/v1/watchlist/${account.accountId}/${contentId}?${query}`
    const reqConfig = {
        method: 'get',
        headers: {'Authorization': await client.getToken()}
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


module.exports = {
    getBrowseAll,
    getCustomLists,
    getHomeFeed,
    getSeasonList,
    getWatchHistory,
    getWatchlist,
    getWatchlistItems,
}
