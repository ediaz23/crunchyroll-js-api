
const utils = require('../utils')
const logger = require('../logger')
const { URLSearchParams } = require('url')


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {Number} [quantity] Number of records in a result
 * @param {Number} [start] Offset to request
 * @param {String} [category] Category
 * @param {String} [query] Search pattern
 * @returns {Promise<{total: Number, items: Array<Object>}>}
 */
async function getBrowseAll(client, quantity, start, category, query) {
    const fnName = 'getBrowseAll'
    logger.debug(fnName)
    const queryData = {locale: await client.getLocale()}
    utils.addParam(queryData, 'n', quantity, val => val > 0)
    utils.addParam(queryData, 'start', start, val => val >= 0)
    utils.addParam(queryData, 'categoies', category)
    utils.addParam(queryData, 'q', query)
    const queryStr = new URLSearchParams(queryData)
    const url = `/content/v1/browse?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: {
            'Authorization': await client.getToken(),
            'add_watchlist_status': true,
        }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}

/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} [category] Category
 * @param {Number} [quantity] Number of records in a result
 * @returns {Promise<{total: Number, items: Array<Object>}>}
 */
async function getBrowseByCategories(client, category, quantity) {
    const fnName = 'getBrowseByCategories'
    logger.debug(fnName)
    return getBrowseAll(client, quantity, undefined, category)
}

/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} [category] Category
 * @returns {Promise<{total: Number, items: Array<Object>}>}
 */
async function getBrowseIndex(client, category) {
    const fnName = 'getBrowseIndex'
    logger.debug(fnName)
    const queryData = {locale: await client.getLocale()}
    utils.addParam(queryData, 'categoies', category)
    const queryStr = new URLSearchParams(queryData)
    const url = `/content/v1/browse/index?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: {
            'Authorization': await client.getToken(),
            'add_watchlist_status': true,
        }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}

/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {Boolean} [include_subcategories]
 * @returns {Promise<{total: Number, items: Array<Object>}>}
 */
async function getCategories(client, include_subcategories) {
    const fnName = 'getCategories'
    logger.debug(fnName)
    const queryData = {locale: await client.getLocale()}
    utils.addParam(queryData, 'z', include_subcategories)
    const query = new URLSearchParams(queryData)
    const url = `/content/v1/tenant_categories?${query}`
    const reqConfig = {
        method: 'get',
        headers: {
            'Authorization': await client.getToken(),
            'add_watchlist_status': true,
        }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}

//getCollection
//getContinueWatching
//getCuratedFeed

/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} listId
 * @param {String} [page]
 * @param {String} [pageSize]
 * @param {String} [sortBy] manual, date_added
 * @param {String} [order] asc, desc
 * @returns {Promise<Object>}
 */
async function getCustomListItems(client, listId, page, pageSize, sortBy, order) {
    const fnName = 'getCustomListItems'
    logger.debug(fnName)
    const queryData = {locale: await client.getLocale()}
    utils.addParam(queryData, 'page', page)
    utils.addParam(queryData, 'page_size', pageSize)
    utils.addParam(queryData, 'sort_by', sortBy, val => ['manual', 'date_added'].includes(val))
    utils.addParam(queryData, 'order', order, val => ['asc', 'desc'].includes(val))
    const query = new URLSearchParams(queryData)
    const account = await client.getAccount()
    const url = `/content/v1/custom-lists/${account.accountId}/${listId}?${query}`
    const reqConfig = {
        method: 'get',
        headers: {'Authorization': await client.getToken()}
    }
    return utils.makeRequest(fnName, url, reqConfig)
}

/**
 * @param {import('./../controllers/clients').Clients} client
 * @returns {Promise<Object>}
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
 * @param {Number} [quantity] Number of records in a result
 * @param {Number} [start] Offset to request
 * @returns {Promise<{items: Array<Object>}>}
 */
async function getHomeFeed(client, quantity, start) {
    const fnName = 'getHomeFeed'
    logger.debug(fnName)
    const queryData = {locale: await client.getLocale()}
    utils.addParam(queryData, 'n', quantity, val => val > 0)
    utils.addParam(queryData, 'start', start, val => val >= 0)
    const query = new URLSearchParams(queryData)
    const account = await client.getAccount()
    const url = `/content/v1/${account.accountId}/home_feed?${query}`
    const reqConfig = {
        method: 'get',
        headers: {'Authorization': await client.getToken()}
    }
    return utils.makeRequest(fnName, url, reqConfig)
}

/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} seriesId
 * @returns {Promise<{items: Array<{id: String, localization: Object}>}>} 
 */
async function getNextEpisodePanel(client, episodeId) {
    const fnName = 'getNextEpisodePanel'
    logger.debug(fnName)
    const queryData = {locale: await client.getLocale()}
    utils.addParam(queryData, 'episode_id', episodeId)
    const query = new URLSearchParams(queryData) 
    const url = `/content/v1/up_next_episode?${query}`
    const reqConfig = {
        method: 'get',
        headers: {
            'Authorization': await client.getToken(),
            'upload_offline_playheads': true,
        }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}
///content/v1/playheads/{account_uuid}/{content_ids}

/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} seriesId
 * @returns {Promise<Object>} 
 */
async function getUpNextEpisode(client, seriesId) {
    const fnName = 'getUpNextEpisode'
    logger.debug(fnName)
    const queryData = {locale: await client.getLocale()}
    utils.addParam(queryData, 'series_id', seriesId)
    const query = new URLSearchParams(queryData) 
    const url = `/content/v1/up_next_series?${query}`
    const reqConfig = {
        method: 'get',
        headers: {
            'Authorization': await client.getToken(),
            'upload_offline_playheads': true
        }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}

/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} movieListingId
 * @returns {Promise<Object>} 
 */
async function getUpNextMovie(client, movieListingId) {
    const fnName = 'getUpNextMovie'
    logger.debug(fnName)
    const queryData = {locale: await client.getLocale()}
    utils.addParam(queryData, 'movie_listing_id', movieListingId)
    const query = new URLSearchParams(queryData) 
    const url = `/content/v1/up_next_movie_listing?${query}`
    const reqConfig = {
        method: 'get',
        headers: {
            'Authorization': await client.getToken(),
            'upload_offline_playheads': true
        }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}

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
    utils.addParam(queryData, 'page', page, val => val > 0)
    utils.addParam(queryData, 'page_size', pageSize, val => val > 0)
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
    utils.addParam(queryData, 'n', quantity, val => val > 0)
    utils.addParam(queryData, 'start', start, val => val >= 0)
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
 * @param {String} [contentId]
 * @returns {Promise<Object>} 
 */
async function getWatchlistItems(client, contentId) {
    const fnName = 'getWatchlistItems'
    logger.debug(fnName)
    const queryData = {locale: await client.getLocale()}
    const query = new URLSearchParams(queryData)
    const account = await client.getAccount()
    let url = `/content/v1/watchlist/${account.accountId}`
    if (contentId) {
        url += `/${contentId}`
    }
    url += `?${query}`
    const reqConfig = {
        method: 'get',
        headers: {'Authorization': await client.getToken()}
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} queryStr search partner
 * @param {Number} [quantity] Number of records in a result
 * @param {Number} [start] Offset to request
 * @param {String} [type] Can be top_results, series, movie_listing, episode
 * @returns {Promise<Object>} 
 */
async function search(client, queryStr, quantity, start, type) {
    const fnName = 'search'
    logger.debug(fnName)
    const types = ['top_results', 'series', 'movie_listing', 'episode']
    const queryData = {locale: await client.getLocale()}
    utils.addParam(queryData, 'q', queryStr)
    utils.addParam(queryData, 'n', quantity, val => val > 0)
    utils.addParam(queryData, 'start', start, val => val >= 0)
    utils.addParam(queryData, 'type', type, val => types.includes(val))
    const query = new URLSearchParams(queryData)
    const url = `/content/v1/search?${query}`
    const reqConfig = {
        method: 'get',
        headers: {
            'Authorization': await client.getToken(),
            'upload_offline_playheads': true,
        }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}

module.exports = {
    getBrowseAll,
    getBrowseByCategories,
    getBrowseIndex,
    getCategories,
    getCustomListItems,
    getCustomLists,
    getHomeFeed,
    getNextEpisodePanel,
    getSeasonList,
    getUpNextEpisode,
    getUpNextMovie,
    getWatchHistory,
    getWatchlist,
    getWatchlistItems,
    search,
}
