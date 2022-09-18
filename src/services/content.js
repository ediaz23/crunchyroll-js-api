
const utils = require('../utils')
const logger = require('../logger')
const { URLSearchParams } = require('url')
const CONST = require('../const')


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} listId
 * @param {String} contentId 
 * @returns {Promise}
 */
async function addItemToCustomList(client, listId, contentId) {
    const fnName = 'addItemToCustomList'
    logger.debug(fnName)
    const queryData = {locale: await client.getLocale()}
    const queryStr = new URLSearchParams(queryData)
    const account = await client.getAccount()
    const url = `/content/v1/custom-lists/${account.accountId}/${listId}?${queryStr}`
    const reqConfig = {
        method: 'post',
        headers: {
            'Authorization': await client.getToken(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({content_id: contentId})
    }
    
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} contentId 
 * @returns {Promise}
 */
async function addWatchlistItem(client, contentId) {
    const fnName = 'addWatchlistItem'
    logger.debug(fnName)
    const queryData = {locale: await client.getLocale()}
    const queryStr = new URLSearchParams(queryData)
    const account = await client.getAccount()
    const url = `/content/v1/watchlist/${account.accountId}?${queryStr}`
    const reqConfig = {
        method: 'post',
        headers: {
            'Authorization': await client.getToken(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({content_id: contentId})
    }
    
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} listId
 * @param {String} contentId
 * @param {String} location
 * @param {String} refContentId
 * @returns {Promise}
 */
async function changeCustomListItemPosition(client, listId, contentId, location, refContentId) {
    const fnName = 'changeCustomListItemPosition'
    logger.debug(fnName)
    const queryData = {locale: await client.getLocale()}
    const queryStr = new URLSearchParams(queryData)
    const account = await client.getAccount()
    const url = `/content/v1/custom-lists/${account.accountId}/${listId}/${contentId}/position?${queryStr}`
    if (!['after', 'before'].includes(location)) {
        throw new Error(`Wrong location`)
    }
    const reqConfig = {
        method: 'put',
        headers: {
            'Authorization': await client.getToken(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            location: location,
            ref_content_id: refContentId
        })
    }
    
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {{title: String}} customList 
 * @returns {Promise<Object>}
 */
async function createPrivateCustomList(client, customList) {
    const fnName = 'createPrivateCustomList'
    logger.debug(fnName)
    const queryData = {locale: await client.getLocale()}
    const queryStr = new URLSearchParams(queryData)
    const account = await client.getAccount()
    const url = `/content/v1/custom-lists/${account.accountId}?${queryStr}`
    const reqConfig = {
        method: 'post',
        headers: {
            'Authorization': await client.getToken(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(customList)
    }
    
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} listId
 * @param {String} contentId 
 * @returns {Promise}
 */
async function deleteCustomListItem(client, listId, contentId) {
    const fnName = 'deleteCustomListItem'
    logger.debug(fnName)
    const queryData = {locale: await client.getLocale()}
    const queryStr = new URLSearchParams(queryData)
    const account = await client.getAccount()
    const url = `/content/v1/custom-lists/${account.accountId}/${listId}/${contentId}?${queryStr}`
    const reqConfig = {
        method: 'delete',
        headers: {
            'Authorization': await client.getToken(),
            'Content-Type': 'application/json',
        },
    }
    
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} listId 
 * @returns {Promise}
 */
async function deletePrivateCustomList(client, listId) {
    const fnName = 'deletePrivateCustomList'
    logger.debug(fnName)
    const queryData = {locale: await client.getLocale()}
    const queryStr = new URLSearchParams(queryData)
    const account = await client.getAccount()
    const url = `/content/v1/custom-lists/${account.accountId}/${listId}?${queryStr}`
    const reqConfig = {
        method: 'delete',
        headers: {
            'Authorization': await client.getToken(),
            'Content-Type': 'application/json',
        },
    }
    
    return utils.makeRequest(fnName, url, reqConfig)
}

/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} contentId 
 * @returns {Promise}
 */
async function deleteWatchlistItem(client, contentId) {
    const fnName = 'deleteWatchlistItem'
    logger.debug(fnName)
    const queryData = {locale: await client.getLocale()}
    const queryStr = new URLSearchParams(queryData)
    const account = await client.getAccount()
    const url = `/content/v1/watchlist/${account.accountId}/${contentId}?${queryStr}`
    const reqConfig = {
        method: 'delete',
        headers: {
            'Authorization': await client.getToken(),
            'Content-Type': 'application/json',
        },
    }
    
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {Number} [quantity] Number of records in a result
 * @param {Number} [start] Offset to request
 * @param {String} [category] Category
 * @param {String} [query] Search pattern
 * @returns {Promise<{total: Number, items: Array<Object>}>}
 */
async function _getBrowseAll(client, quantity, start, category, query) {
    const fnName = '_getBrowseAll'
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
 * @param {Number} [quantity] Number of records in a result
 * @param {Number} [start] Offset to request
 * @param {String} [category] Category
 * @param {String} [query] Search pattern
 * @returns {Promise<{total: Number, items: Array<Object>}>}
 */
async function getBrowseAll(client, quantity, start, category, query) {
    return _getBrowseAll(client, quantity, start, category, query)
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
 * @param {Boolean} [includeSubcategories]
 * @returns {Promise<{total: Number, items: Array<Object>}>}
 */
async function getCategories(client, includeSubcategories) {
    const fnName = 'getCategories'
    logger.debug(fnName)
    const queryData = {locale: await client.getLocale()}
    utils.addParam(queryData, 'z', includeSubcategories)
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

// getCollection
// getContinueWatching
// getCuratedFeed

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


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} contentId
 * @param {Boolean} uploadOfflinePlayheads 
 * @returns {Promise<Object>} 
 */
async function _getPlayheads(client, contentId, uploadOfflinePlayheads) {
    const fnName = '_getPlayheads'
    logger.debug(fnName)
    const queryData = {locale: await client.getLocale()}
    const query = new URLSearchParams(queryData)
    const account = await client.getAccount()
    const url = `/content/v1/playheads/${account.accountId}/${contentId}?${query}`
    const reqConfig = {
        method: 'get',
        headers: {
            'Authorization': await client.getToken(),
            'upload_offline_playheads': uploadOfflinePlayheads
        }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} contentId
 * @returns {Promise<Object>} 
 */
async function getPlayheads(client, contentId) {
    return _getPlayheads(client, contentId, true)
}


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} contentId
 * @returns {Promise<Object>} 
 */
async function getPlayheadsUnsynced(client, contentId) {
    return _getPlayheads(client, contentId, false)
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
 * @param {Number} guid Offset to request
 * @param {Number} [quantity] Number of records in a result
 * @param {Number} [start] Offset to request
 * @returns {Promise<{total: Number, items: Array<Object>}>}
 */
async function getSimilar(client, guid, quantity, start) {
    const fnName = 'getSimilar'
    logger.debug(fnName)
    const queryData = {locale: await client.getLocale()}
    utils.addParam(queryData, 'n', quantity, val => val > 0)
    utils.addParam(queryData, 'guid', guid, val => !!val)
    utils.addParam(queryData, 'start', start, val => val >= 0)
    const queryStr = new URLSearchParams(queryData)
    const account = await client.getAccount()
    const url = `/content/v1/${account.accountId}/similar_to?${queryStr}`
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
 * @param {Number} parentCategory Offset to request
 * @returns {Promise<{total: Number, items: Array<Object>}>}
 */
async function getSubcategories(client, parentCategory) {
    const fnName = 'getSubcategories'
    logger.debug(fnName)
    const queryData = {locale: await client.getLocale()}
    utils.addParam(queryData, 'parent_category', parentCategory, val => !!val)
    const queryStr = new URLSearchParams(queryData)
    const url = `/content/v1/sub_categories?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: {'Authorization': await client.getToken()}
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


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
 * @param {String} contentId
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
 * @param {String} contentId
 * @param {Number} playhead
 * @returns {Promise}
 */
async function savePlayhead(client, contentId, playhead) {
    const fnName = 'savePlayhead'
    logger.debug(fnName)
    const queryData = {locale: await client.getLocale()}
    const queryStr = new URLSearchParams(queryData)
    const account = await client.getAccount()
    const url = `/content/v1/playheads/${account.accountId}?${queryStr}`
    const reqConfig = {
        method: 'post',
        headers: {
            'Authorization': await client.getToken(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content_id: contentId,
            playhead: playhead
        })
    }
    
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {{batch: Object.<string, {dateWatched: Date, playhead: Number}>}} playheadBatch 
 * @returns {Promise}
 */
async function savePlayheadBatch(client, playheadBatch) {
    const fnName = 'savePlayheadBatch'
    logger.debug(fnName)
    const queryData = {locale: await client.getLocale()}
    const queryStr = new URLSearchParams(queryData)
    const account = await client.getAccount()
    const url = `/content/v1/playheads/${account.accountId}/batch?${queryStr}`
    const batch = {}
    for (const key of Object.keys(playheadBatch.batch)) {
        batch[key] = {
            date_watched: playheadBatch.batch[key].dateWatched.toISOString(),
            playhead: playheadBatch.batch[key].playhead,
        }
    }
    const reqConfig = {
        method: 'post',
        headers: {
            'Authorization': await client.getToken(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ batch: batch })
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
    const types = CONST.getContentTypes().concat(['top_results'])
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


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} listId
 * @param {{title: String}} updateList 
 * @returns {Promise}
 */
async function updateCustomList(client, listId, updateList) {
    const fnName = 'updateCustomList'
    logger.debug(fnName)
    const queryData = {locale: await client.getLocale()}
    const queryStr = new URLSearchParams(queryData)
    const account = await client.getAccount()
    const url = `/content/v1/custom-lists/${account.accountId}/${listId}?${queryStr}`
    const reqConfig = {
        method: 'patch',
        headers: {
            'Authorization': await client.getToken(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateList)
    }
    
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} contentId
 * @param {Boolean} isFavorite 
 * @returns {Promise}
 */
async function updateWatchlistItemFavoriteStatus(client, contentId, isFavorite) {
    const fnName = 'updateWatchlistItemFavoriteStatus'
    logger.debug(fnName)
    const queryData = {locale: await client.getLocale()}
    const queryStr = new URLSearchParams(queryData)
    const account = await client.getAccount()
    const url = `/content/v1/watchlist/${account.accountId}/${contentId}?${queryStr}`
    const reqConfig = {
        method: 'patch',
        headers: {
            'Authorization': await client.getToken(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_favorite: isFavorite })
    }
    
    return utils.makeRequest(fnName, url, reqConfig)
}

module.exports = {
    addItemToCustomList,
    addWatchlistItem,
    changeCustomListItemPosition,
    createPrivateCustomList,
    deleteCustomListItem,
    deletePrivateCustomList,
    deleteWatchlistItem,
    getBrowseAll,
    getBrowseByCategories,
    getBrowseIndex,
    getCategories,
    getCustomListItems,
    getCustomLists,
    getHomeFeed,
    getPlayheads,
    getPlayheadsUnsynced,
    getNextEpisodePanel,
    getSeasonList,
    getSimilar,
    getSubcategories,
    getUpNextEpisode,
    getUpNextMovie,
    getWatchHistory,
    getWatchlist,
    getWatchlistItems,
    savePlayhead,
    savePlayheadBatch,
    search,
    updateCustomList,
    updateWatchlistItemFavoriteStatus,
}
