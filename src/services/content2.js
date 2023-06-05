
import utils from '../utils.js'
import logger from '../logger.js'
import CONST from '../const.js'


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.listId
 * @param {String} obj.contentId
 * @returns {Promise}
 */
async function addItemToCustomList({ account, listId, contentId }) {
    const fnName = 'addItemToCustomList'
    logger.debug(fnName)
    const queryData = { locale: account.locale }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/${account.accountId}/custom-lists/${listId}?${queryStr}`
    const reqConfig = {
        method: 'post',
        headers: {
            'Authorization': account.token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content_id: contentId })
    }

    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.listId
 * @param {String} obj.contentId
 * @param {String} obj.location
 * @param {String} obj.refContentId
 * @returns {Promise}
 */
async function changeCustomListItemPosition({ account, listId, contentId, location, refContentId }) {
    const fnName = 'changeCustomListItemPosition'
    logger.debug(fnName)
    const queryData = { locale: account.locale }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/${account.accountId}/custom-lists/${listId}/${contentId}/position?${queryStr}`
    if (!['after', 'before'].includes(location)) {
        throw new Error(`Wrong location`)
    }
    const reqConfig = {
        method: 'put',
        headers: {
            'Authorization': account.token,
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
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.listId
 * @param {String} [obj.page]
 * @param {String} [obj.pageSize]
 * @param {String} [obj.sortBy] manual, date_added
 * @param {String} [obj.order] asc, desc
 * @returns {Promise<Object>}
 */
async function getCustomListItems({ account, listId, page, pageSize, sortBy, order }) {
    const fnName = 'getCustomListItems'
    logger.debug(fnName)
    const queryData = { locale: account.locale }
    utils.addParam(queryData, 'page', page)
    utils.addParam(queryData, 'page_size', pageSize)
    utils.addParam(queryData, 'sort_by', sortBy, val => ['manual', 'date_added'].includes(val))
    utils.addParam(queryData, 'order', order, val => ['asc', 'desc'].includes(val))
    const query = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/${account.accountId}/custom-lists/${listId}?${query}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': account.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.listId
 * @param {String} obj.contentId 
 * @returns {Promise}
 */
async function deleteCustomListItem({ account, listId, contentId }) {
    const fnName = 'deleteCustomListItem'
    logger.debug(fnName)
    const queryData = { locale: account.locale }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/${account.accountId}/custom-lists/${listId}/${contentId}?${queryStr}`
    const reqConfig = {
        method: 'delete',
        headers: {
            'Authorization': account.token,
            'Content-Type': 'application/json',
        },
    }

    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.title
 * @returns {Promise<import('../types').CustomListResponse>}
 */
async function createPrivateCustomList({ account, title }) {
    const fnName = 'createPrivateCustomList'
    logger.debug(fnName)
    const queryData = { locale: account.locale }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/${account.accountId}/custom-lists?${queryStr}`
    const reqConfig = {
        method: 'post',
        headers: {
            'Authorization': account.token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title })
    }

    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @returns {Promise<Object>}
 */
async function getCustomLists({ account }) {
    const fnName = 'getCustomLists'
    logger.debug(fnName)
    const queryData = { locale: account.locale }
    const query = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/${account.accountId}/custom-lists?${query}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': account.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.listId
 * @param {String} obj.title
 * @returns {Promise}
 */
async function updateCustomList({ account, listId, title }) {
    const fnName = 'updateCustomList'
    logger.debug(fnName)
    const queryData = { locale: account.locale }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/${account.accountId}/custom-lists/${listId}?${queryStr}`
    const reqConfig = {
        method: 'patch',
        headers: {
            'Authorization': account.token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title })
    }

    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.listId
 * @returns {Promise}
 */
async function deletePrivateCustomList({ account, listId }) {
    const fnName = 'deletePrivateCustomList'
    logger.debug(fnName)
    const queryData = { locale: account.locale }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/${account.accountId}/custom-lists/${listId}?${queryStr}`
    const reqConfig = {
        method: 'delete',
        headers: {
            'Authorization': account.token,
            'Content-Type': 'application/json',
        },
    }

    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.contentId
 * @returns {Promise}
 */
async function addWatchlistItem({ account, contentId }) {
    const fnName = 'addWatchlistItem'
    logger.debug(fnName)
    const queryData = { locale: account.locale }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/${account.accountId}/watchlist?${queryStr}`
    const reqConfig = {
        method: 'post',
        headers: {
            'Authorization': account.token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content_id: contentId })
    }

    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {Number} obj.quantity Number of records in a result
 * @param {Number} obj.start Offset to request
 * @returns {Promise<Object>} 
 */
async function getWatchlist({ account, quantity, start }) {
    const fnName = 'getWatchlist'
    logger.debug(fnName)
    const queryData = { locale: account.locale }
    utils.addParam(queryData, 'n', quantity, val => val > 0)
    utils.addParam(queryData, 'start', start, val => val >= 0)
    const query = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/discover/${account.accountId}/watchlist?${query}`
    const reqConfig = {
        method: 'get',
        headers: {
            'Authorization': account.token,
            'upload_offline_playheads': true,
        }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {Array<String>} [obj.contentIds]
 * @returns {Promise<Object>} 
 */
async function getWatchlistItems({ account, contentIds }) {
    const fnName = 'getWatchlistItems'
    logger.debug(fnName)
    const queryData = { locale: account.locale }
    if (contentIds && contentIds.length) {
        utils.addParam(queryData, 'content_ids', contentIds.join(','))
    }
    const query = await utils.toURLSearchParams(queryData)
    let url = `/content/v2/${account.accountId}/watchlist?${query}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': account.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {Number} obj.contentId
 * @param {Boolean} obj.isFavorite 
 * @returns {Promise}
 */
async function updateWatchlistItemFavoriteStatus({ account, contentId, isFavorite }) {
    const fnName = 'updateWatchlistItemFavoriteStatus'
    logger.debug(fnName)
    const queryData = { locale: account.locale }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/${account.accountId}/watchlist/${contentId}?${queryStr}`
    const reqConfig = {
        method: 'patch',
        headers: {
            'Authorization': account.token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_favorite: isFavorite })
    }

    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {Number} obj.contentId
 * @returns {Promise}
 */
async function deleteWatchlistItem({ account, contentId }) {
    const fnName = 'deleteWatchlistItem'
    logger.debug(fnName)
    const queryData = { locale: account.locale }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/${account.accountId}/watchlist/${contentId}?${queryStr}`
    const reqConfig = {
        method: 'delete',
        headers: {
            'Authorization': account.token,
            'Content-Type': 'application/json',
        },
    }

    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {Number} [obj.quantity] Number of records in a result
 * @param {Number} [obj.start] Offset to request
 * @param {String} [obj.category] Category
 * @param {String} [obj.query] Search pattern
 * @param {String} [obj.seasonTag] season tag
 * @returns {Promise<{total: Number, items: Array<Object>}>}
 */
async function _getBrowseAll({ account, quantity, start, category, query, seasonTag }) {
    const fnName = '_getBrowseAll'
    logger.debug(fnName)
    const queryData = { locale: account.locale }
    utils.addParam(queryData, 'n', quantity, val => val > 0)
    utils.addParam(queryData, 'start', start, val => val >= 0)
    utils.addParam(queryData, 'categories', category)
    utils.addParam(queryData, 'q', query)
    utils.addParam(queryData, 'season_tag', seasonTag)
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/discover/browse?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: {
            'Authorization': account.token,
            'add_watchlist_status': true,
        }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {Number} [obj.quantity] Number of records in a result
 * @param {Number} [obj.start] Offset to request
 * @param {String} [obj.category] Category
 * @param {String} [obj.query] Search pattern
 * @param {String} [obj.seasonTag]
 * @returns {Promise<{total: Number, items: Array<Object>}>}
 */
async function getBrowseAll({ account, quantity, start, category, query, seasonTag }) {
    return _getBrowseAll({ account, quantity, start, category, query, seasonTag })
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.category Category
 * @param {Number} [obj.quantity] Number of records in a result
 * @param {Number} [obj.start] Offset to request
 * @param {String} [obj.query] Search pattern
 * @param {String} [obj.seasonTag]
 * @returns {Promise<{total: Number, items: Array<Object>}>}
 */
async function getBrowseByCategories({ account, quantity, start, category, query, seasonTag }) {
    return getBrowseAll({ account, quantity, start, category, query, seasonTag })
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} [obj.category] Category
 * @returns {Promise<{total: Number, items: Array<Object>}>}
 */
async function getBrowseIndex({ account, category }) {
    const fnName = 'getBrowseIndex'
    logger.debug(fnName)
    const queryData = { locale: account.locale }
    utils.addParam(queryData, 'categories', category)
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/discover/browse/index?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: {
            'Authorization': account.token,
            'add_watchlist_status': true,
        }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {Boolean} [obj.includeSubcategories]
 * @returns {Promise<{total: Number, items: Array<Object>}>}
 */
async function getCategories({ account, includeSubcategories }) {
    const fnName = 'getCategories'
    logger.debug(fnName)
    const queryData = { locale: account.locale }
    utils.addParam(queryData, 'include_subcategories', includeSubcategories)
    const query = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/discover/categories?${query}`
    const reqConfig = {
        method: 'get',
        headers: {
            'Authorization': account.token,
            'add_watchlist_status': true,
        }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {Number} obj.parentCategory Offset to request
 * @returns {Promise<{total: Number, items: Array<Object>}>}
 */
async function getSubcategories({ account, parentCategory }) {
    const fnName = 'getSubcategories'
    logger.debug(fnName)
    const queryData = { locale: account.locale }
    utils.addParam(queryData, 'parent_category', parentCategory, val => !!val)
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/discover/categories/${parentCategory}/sub_categories?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': account.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}

// getCollection
// getContinueWatching
// getCuratedFeed


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {Number} [obj.quantity] Number of records in a result
 * @param {Number} [obj.start] Offset to request
 * @param {String} [obj.audio] Audio language
 * @returns {Promise<{items: Array<Object>}>}
 */
async function getHomeFeed({ account, quantity, start, audio }) {
    const fnName = 'getHomeFeed'
    logger.debug(fnName)
    const queryData = { locale: account.locale }
    utils.addParam(queryData, 'n', quantity, val => val > 0)
    utils.addParam(queryData, 'start', start, val => val >= 0)
    utils.addParam(queryData, 'preferred_audio_language', audio)
    const query = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/discover/${account.accountId}/home_feed?${query}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': account.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {Number} obj.page it has to be > 1
 * @param {Number} obj.pageSize
 * @returns {Promise<Object>} 
 */
async function getWatchHistory({ account, page, pageSize }) {
    const fnName = 'getWatchHistory'
    logger.debug(fnName)
    const queryData = { locale: account.locale }
    utils.addParam(queryData, 'page', page, val => val > 0)
    utils.addParam(queryData, 'page_size', pageSize, val => val > 0)
    const query = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/${account.accountId}/watch-history?${query}`
    const reqConfig = {
        method: 'get',
        headers: {
            'Authorization': account.token,
            'upload_offline_playheads': true,
        }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @returns {Promise<{items: Array<{id: String, localization: Object}>}>} 
 */
async function getSeasonList({ account }) {
    const fnName = 'getSeasonList'
    logger.debug(fnName)
    const queryData = { locale: account.locale }
    const query = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/discover/seasonal_tags?${query}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': account.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {Number} obj.contentId Offset to request
 * @param {Number} [obj.quantity] Number of records in a result
 * @param {Number} [obj.start] Offset to request
 * @returns {Promise<{total: Number, items: Array<Object>}>}
 */
async function getSimilar({ account, contentId, quantity, start }) {
    const fnName = 'getSimilar'
    logger.debug(fnName)
    const queryData = { locale: account.locale }
    utils.addParam(queryData, 'n', quantity, val => val > 0)
    utils.addParam(queryData, 'start', start, val => val >= 0)
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/discover/${account.accountId}/similar_to/${contentId}?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: {
            'Authorization': account.token,
            'add_watchlist_status': true,
        }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.contentId
 * @returns {Promise<Object>} 
 */
async function getUpNext({ account, contentId }) {
    const fnName = 'getUpNext'
    logger.debug(fnName)
    const queryData = { locale: account.locale }
    const query = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/discover/up_next/${contentId}?${query}`
    const reqConfig = {
        method: 'get',
        headers: {
            'Authorization': account.token,
            'upload_offline_playheads': true
        }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {Array<String>} obj.contentIds
 * @param {Boolean} obj.uploadOfflinePlayheads 
 * @returns {Promise<Object>} 
 */
async function _getPlayheads({ account, contentIds, uploadOfflinePlayheads }) {
    const fnName = '_getPlayheads'
    logger.debug(fnName)
    const queryData = { locale: account.locale }
    utils.addParam(queryData, 'content_ids', contentIds.join(','))
    const query = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/${account.accountId}/playheads?${query}`
    const reqConfig = {
        method: 'get',
        headers: {
            'Authorization': account.token,
            'upload_offline_playheads': uploadOfflinePlayheads
        }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {Array<String>} obj.contentIds
 * @returns {Promise<Object>} 
 */
async function getPlayheads({ account, contentIds }) {
    return _getPlayheads({ account, contentIds, uploadOfflinePlayheads: true })
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {Array<String>} obj.contentIds
 * @returns {Promise<Object>} 
 */
async function getPlayheadsUnsynced({ account, contentIds }) {
    return _getPlayheads({ account, contentIds, uploadOfflinePlayheads: false })
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.contentId
 * @param {Number} obj.playhead
 * @returns {Promise}
 */
async function savePlayhead({ account, contentId, playhead }) {
    const fnName = 'savePlayhead'
    logger.debug(fnName)
    const queryData = { locale: account.locale }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/${account.accountId}/playheads?${queryStr}`
    const reqConfig = {
        method: 'post',
        headers: {
            'Authorization': account.token,
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
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.queryStr search partner
 * @param {Number} [obj.quantity] Number of records in a result
 * @param {Number} [obj.start] Offset to request
 * @param {Array<String>} [obj.type] Can be top_results, series, movie_listing, episode
 * @returns {Promise<Object>} 
 */
async function search({ account, queryStr, quantity, start, type }) {
    const fnName = 'search'
    logger.debug(fnName)
    const types = CONST.getContentTypes().concat(['top_results', 'music'])
    const queryData = { locale: account.locale }
    utils.addParam(queryData, 'q', queryStr)
    utils.addParam(queryData, 'n', quantity, val => val > 0)
    utils.addParam(queryData, 'start', start, val => val >= 0)
    if (type && type.length) {
        utils.addParam(queryData, 'type', type.filter(val => types.includes(val)).join(','))
    }
    const query = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/discover/search?${query}`
    const reqConfig = {
        method: 'get',
        headers: {
            'Authorization': account.token,
            'upload_offline_playheads': true,
        }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


export default {
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
    getSeasonList,
    getSimilar,
    getSubcategories,
    getUpNext,
    getWatchHistory,
    getWatchlist,
    getWatchlistItems,
    savePlayhead,
    search,
    updateCustomList,
    updateWatchlistItemFavoriteStatus,
}
