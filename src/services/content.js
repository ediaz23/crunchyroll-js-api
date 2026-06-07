
import utils from '../utils.js'
import logger from '../logger.js'
import CrunchyrollError from '../error.js'


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.listId
 * @param {String} obj.contentId
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<void>}
 */
async function addItemToCustomList({ account, listId, contentId, fnConfig }) {
    const fnName = 'addItemToCustomList'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/${account.accountId}/custom-lists/${listId}?${queryStr}`
    /** @type {RequestInit} */
    const reqConfig = {
        method: 'post',
        headers: {
            Authorization: account.token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content_id: contentId })
    }
    return utils.makeRequest(fnName, url, reqConfig, fnConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.listId
 * @param {String} obj.contentId
 * @param {String} obj.location
 * @param {String} obj.refContentId
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<void>}
 */
async function changeCustomListItemPosition({ account, listId, contentId, location, refContentId, fnConfig }) {
    const fnName = 'changeCustomListItemPosition'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/${account.accountId}/custom-lists/${listId}/${contentId}/position?${queryStr}`
    if (!['after', 'before'].includes(location)) { throw new CrunchyrollError(`Wrong location`) }
    /** @type {RequestInit} */
    const reqConfig = {
        method: 'put',
        headers: {
            Authorization: account.token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            location: location,
            ref_content_id: refContentId
        })
    }
    return utils.makeRequest(fnName, url, reqConfig, fnConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.listId
 * @param {String} [obj.page]
 * @param {String} [obj.pageSize]
 * @param {String} [obj.sort] manual, date_added
 * @param {String} [obj.order] asc, desc
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<Object>}
 */
async function getCustomListItems({ account, listId, page, pageSize, sort, order, fnConfig }) {
    const fnName = 'getCustomListItems'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    utils.addParam(queryData, 'page', page)
    utils.addParam(queryData, 'page_size', pageSize)
    if (sort && !['manual', 'date_added'].includes(sort)) { throw new CrunchyrollError('Wrong sort value') }
    utils.addParam(queryData, 'sort_by', sort)
    if (order && !['asc', 'desc'].includes(order)) { throw new CrunchyrollError('Wrong order value') }
    utils.addParam(queryData, 'order', order)
    const query = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/${account.accountId}/custom-lists/${listId}?${query}`
    /** @type {RequestInit} */
    const reqConfig = {
        method: 'get',
        headers: { Authorization: account.token }
    }
    return utils.makeRequest(fnName, url, reqConfig, fnConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.listId
 * @param {String} obj.contentId 
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<void>}
 */
async function deleteCustomListItem({ account, listId, contentId, fnConfig }) {
    const fnName = 'deleteCustomListItem'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/${account.accountId}/custom-lists/${listId}/${contentId}?${queryStr}`
    /** @type {RequestInit} */
    const reqConfig = {
        method: 'delete',
        headers: {
            Authorization: account.token,
            'Content-Type': 'application/json',
        },
    }
    return utils.makeRequest(fnName, url, reqConfig, fnConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.title
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<{data: Array<import('../types').CustomListResponse>}>}
 */
async function createPrivateCustomList({ account, title, fnConfig }) {
    const fnName = 'createPrivateCustomList'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/${account.accountId}/custom-lists?${queryStr}`
    /** @type {RequestInit} */
    const reqConfig = {
        method: 'post',
        headers: {
            Authorization: account.token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title })
    }
    return utils.makeRequest(fnName, url, reqConfig, fnConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<{total: Number, data: Object, meta: Object}>}
 */
async function getCustomLists({ account, fnConfig }) {
    const fnName = 'getCustomLists'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const query = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/${account.accountId}/custom-lists?${query}`
    /** @type {RequestInit} */
    const reqConfig = {
        method: 'get',
        headers: { Authorization: account.token }
    }
    return utils.makeRequest(fnName, url, reqConfig, fnConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.listId
 * @param {String} obj.title
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<void>}
 */
async function updateCustomList({ account, listId, title, fnConfig }) {
    const fnName = 'updateCustomList'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/${account.accountId}/custom-lists/${listId}?${queryStr}`
    /** @type {RequestInit} */
    const reqConfig = {
        method: 'patch',
        headers: {
            Authorization: account.token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title })
    }
    return utils.makeRequest(fnName, url, reqConfig, fnConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.listId
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<void>}
 */
async function deletePrivateCustomList({ account, listId, fnConfig }) {
    const fnName = 'deletePrivateCustomList'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/${account.accountId}/custom-lists/${listId}?${queryStr}`
    /** @type {RequestInit} */
    const reqConfig = {
        method: 'delete',
        headers: {
            Authorization: account.token,
            'Content-Type': 'application/json',
        },
    }
    return utils.makeRequest(fnName, url, reqConfig, fnConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.contentId
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<void>}
 */
async function addWatchlistItem({ account, contentId, fnConfig }) {
    const fnName = 'addWatchlistItem'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/${account.accountId}/watchlist?${queryStr}`
    /** @type {RequestInit} */
    const reqConfig = {
        method: 'post',
        headers: {
            Authorization: account.token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content_id: contentId })
    }
    return utils.makeRequest(fnName, url, reqConfig, fnConfig)
}

/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {Array<String>} [obj.contentIds]
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<Object>} 
 */
async function getWatchlistItems({ account, contentIds, fnConfig }) {
    const fnName = 'getWatchlistItems'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    if (contentIds && contentIds.length) {
        utils.addParam(queryData, 'content_ids', contentIds.join(','))
    }
    const query = await utils.toURLSearchParams(queryData)
    let url = `/content/v2/${account.accountId}/watchlist?${query}`
    /** @type {RequestInit} */
    const reqConfig = {
        method: 'get',
        headers: { Authorization: account.token }
    }
    return utils.makeRequest(fnName, url, reqConfig, fnConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.contentId
 * @param {Boolean} obj.isFavorite
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<void>}
 */
async function updateWatchlistItemFavoriteStatus({ account, contentId, isFavorite, fnConfig }) {
    const fnName = 'updateWatchlistItemFavoriteStatus'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/${account.accountId}/watchlist/${contentId}?${queryStr}`
    /** @type {RequestInit} */
    const reqConfig = {
        method: 'patch',
        headers: {
            Authorization: account.token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_favorite: isFavorite })
    }
    return utils.makeRequest(fnName, url, reqConfig, fnConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.contentId
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<void>}
 */
async function deleteWatchlistItem({ account, contentId, fnConfig }) {
    const fnName = 'deleteWatchlistItem'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/${account.accountId}/watchlist/${contentId}?${queryStr}`
    /** @type {RequestInit} */
    const reqConfig = {
        method: 'delete',
        headers: {
            Authorization: account.token,
            'Content-Type': 'application/json',
        },
    }
    return utils.makeRequest(fnName, url, reqConfig, fnConfig)
}

/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {Number} obj.page it has to be > 1
 * @param {Number} obj.pageSize
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<Object>} 
 */
async function getWatchHistory({ account, page, pageSize, fnConfig }) {
    const fnName = 'getWatchHistory'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    utils.addParam(queryData, 'page', page, val => val > 0)
    utils.addParam(queryData, 'page_size', pageSize, val => val > 0)
    const query = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/${account.accountId}/watch-history?${query}`
    /** @type {RequestInit} */
    const reqConfig = {
        method: 'get',
        headers: {
            Authorization: account.token,
            // @ts-expect-error
            upload_offline_playheads: true,
        }
    }
    return utils.makeRequest(fnName, url, reqConfig, fnConfig)
}

/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {Array<String>} obj.contentIds
 * @param {Boolean} obj.uploadOfflinePlayheads 
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<Object>} 
 */
async function _getPlayheads({ account, contentIds, uploadOfflinePlayheads, fnConfig }) {
    const fnName = '_getPlayheads'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    utils.addParam(queryData, 'content_ids', contentIds.join(','))
    const query = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/${account.accountId}/playheads?${query}`
    /** @type {RequestInit} */
    const reqConfig = {
        method: 'get',
        headers: {
            Authorization: account.token,
            // @ts-expect-error
            upload_offline_playheads: uploadOfflinePlayheads
        }
    }
    return utils.makeRequest(fnName, url, reqConfig, fnConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {Array<String>} obj.contentIds
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<Object>} 
 */
async function getPlayheads({ account, contentIds, fnConfig }) {
    return _getPlayheads({ account, contentIds, uploadOfflinePlayheads: true, fnConfig })
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.contentId
 * @param {Number} obj.playhead
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<void>}
 */
async function savePlayhead({ account, contentId, playhead, fnConfig }) {
    const fnName = 'savePlayhead'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/${account.accountId}/playheads?${queryStr}`
    /** @type {RequestInit} */
    const reqConfig = {
        method: 'post',
        headers: {
            Authorization: account.token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content_id: contentId,
            playhead: playhead
        })
    }
    return utils.makeRequest(fnName, url, reqConfig, fnConfig)
}

/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.method http method
 * @param {Boolean} [obj.baseUrlIncluded]
 * @param {String} obj.url if url incluse a domain pass baseUrlIncluded=true
 * @param {Object} [obj.body]
 * @param {Object} [obj.headers]
 * @param {Object} [obj.queryParams]
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<Object>}
 */
async function getData({
    account,
    method = 'get',
    baseUrlIncluded = false,
    url,
    body = null,
    headers = {},
    queryParams = {},
    fnConfig,
}) {
    const fnName = 'getData'
    logger.debug(fnName)
    const queryData = {
        locale: account.locale,
        preferred_audio_language: account.audioLanguage,
        ...queryParams,
    }
    const queryStr = await utils.toURLSearchParams(queryData)
    const urlStr = `${url}?${queryStr}`
    /** @type {RequestInit} */
    const reqConfig = {
        method,
        headers: {
            Authorization: account.token,
            'Content-Type': 'application/json',
            ...headers,
        },
        // @ts-expect-error
        baseUrlIncluded,
        body: body && JSON.stringify(body),
    }
    return utils.makeRequest(fnName, urlStr, reqConfig, fnConfig)
}

/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {Array<String>} [obj.contentIds]
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<Object>} 
 */
async function getLabels({ account, contentIds, fnConfig }) {
    const fnName = 'getLabels'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const query = await utils.toURLSearchParams(queryData)
    let url = `/content/v2/labels/${contentIds.join(',')}?${query}`
    /** @type {RequestInit} */
    const reqConfig = {
        method: 'get',
        headers: { Authorization: account.token }
    }
    return utils.makeRequest(fnName, url, reqConfig, fnConfig)
}

export default {
    addItemToCustomList,
    addWatchlistItem,
    changeCustomListItemPosition,
    createPrivateCustomList,
    deleteCustomListItem,
    deletePrivateCustomList,
    deleteWatchlistItem,
    getCustomListItems,
    getCustomLists,
    getData,
    getPlayheads,
    getWatchHistory,
    getWatchlistItems,
    getLabels,
    savePlayhead,
    updateCustomList,
    updateWatchlistItemFavoriteStatus,
}
