
import utils from '../utils.js'
import logger from '../logger.js'
import CONST from '../const.js'
import CrunchyrollError from '../error.js'


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {Number} obj.quantity Number of records in a result
 * @param {Number} obj.start Offset to request
 * @param {Boolean} [obj.ratings]
 * @returns {Promise<Object>} 
 */
async function getWatchlist({ account, quantity, start, ratings }) {
    const fnName = 'getWatchlist'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    utils.addParam(queryData, 'n', quantity, val => val > 0)
    utils.addParam(queryData, 'start', start, val => val >= 0)
    utils.addParam(queryData, 'ratings', ratings)
    const query = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/discover/${account.accountId}/watchlist?${query}`
    const reqConfig = {
        method: 'get',
        headers: { Authorization: account.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}

/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {Number} [obj.quantity] Number of records in a result
 * @param {Number} [obj.start] Offset to request
 * @param {Array<String>} [obj.category] Category
 * @param {String} [obj.query] Search pattern
 * @param {String} [obj.seasonTag] season tag
 * @param {String} [obj.sort] sort results
 * @param {String} [obj.type] type for search, example episode
 * @param {Boolean} [obj.ratings]
 * @returns {Promise<{total: Number, data: Array<Object>, meta: Object}>}
 */
async function getBrowseAll({ account, quantity, start, category, query, seasonTag, sort, type, ratings }) {
    const fnName = 'getBrowseAll'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    utils.addParam(queryData, 'n', quantity, val => val > 0)
    utils.addParam(queryData, 'start', start, val => val >= 0)
    if (category && category.length) {
        utils.addParam(queryData, 'categories', category.join(','))
    }
    utils.addParam(queryData, 'q', query)
    utils.addParam(queryData, 'season_tag', seasonTag)
    if (sort && !CONST.sortByValues.includes(sort)) { throw new CrunchyrollError('Wrong sort value') }
    utils.addParam(queryData, 'sort_by', sort)
    utils.addParam(queryData, 'type', type)
    utils.addParam(queryData, 'ratings', ratings)
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/discover/browse?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: {
            Authorization: account.token,
            'add_watchlist_status': true,
        }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {Array<String>} [obj.category] Category
 * @param {String} [obj.sort] sort results
 * @param {Boolean} [obj.ratings]
 * @returns {Promise<{total: Number, data: Array<Object>, meta: Object}>}
 */
async function getBrowseIndex({ account, category, sort, ratings }) {
    const fnName = 'getBrowseIndex'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    if (category && category.length) {
        utils.addParam(queryData, 'categories', category.join(','))
    }
    if (sort && !CONST.sortByValues.includes(sort)) { throw new CrunchyrollError('Wrong sort value') }
    utils.addParam(queryData, 'sort_by', sort)
    utils.addParam(queryData, 'ratings', ratings)
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/discover/browse/index?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: {
            Authorization: account.token,
            'add_watchlist_status': true,
        }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}

/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.contentId
 * @returns {Promise<{total: Number, data: Array<Object>, meta: Object}>}
 */
async function getCategories({ account, contentId }) {
    const fnName = 'getCategories'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    utils.addParam(queryData, 'guid', contentId)
    const query = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/discover/categories?${query}`
    const reqConfig = {
        method: 'get',
        headers: {
            Authorization: account.token,
            'add_watchlist_status': true,
        }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}

/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {Number} obj.parentCategory Offset to request
 * @returns {Promise<{total: Number, data: Array<Object>, meta: Object}>}
 */
async function getSubcategories({ account, parentCategory }) {
    const fnName = 'getSubcategories'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    utils.addParam(queryData, 'parent_category', parentCategory)
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/discover/categories/${parentCategory}/sub_categories?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': account.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}

/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {Number} [obj.quantity] Number of records in a result
 * @param {Number} [obj.start] Offset to request
 * @returns {Promise<{items: Array<Object>}>}
 */
async function getHomeFeed({ account, quantity, start }) {
    const fnName = 'getHomeFeed'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    utils.addParam(queryData, 'n', quantity, val => val > 0)
    utils.addParam(queryData, 'start', start, val => val >= 0)
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
 * @param {Number} obj.quantity
 * @param {Boolean} obj.ratings
 * @returns {Promise<{total: Number, data: Array<Object>, meta: Object}>}
 */
async function getHistory({ account, quantity, ratings }) {
    const fnName = 'getHistory'
    logger.debug(fnName)
    const queryData = { locale: account.locale }
    utils.addParam(queryData, 'n', quantity, val => val > 0)
    utils.addParam(queryData, 'ratings', ratings)
    const query = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/discover/${account.accountId}/history?${query}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': account.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}

/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {Number} [obj.quantity] Number of records in a result
 * @param {Number} [obj.start] Offset to request
 * @param {Boolean} [obj.ratings]
 * @returns {Promise<{total: Number, data: Array<Object>, meta: Object}>}
 */
async function getRecommendations({ account, quantity, start, ratings }) {
    const fnName = 'getRecommendations'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    utils.addParam(queryData, 'n', quantity, val => val > 0)
    utils.addParam(queryData, 'start', start, val => val >= 0)
    utils.addParam(queryData, 'ratings', ratings)
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/discover/${account.accountId}/recommendations?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': account.token }
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
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
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
 * @param {Boolean} [obj.ratings]
 * @returns {Promise<{total: Number, data: Array<Object>, meta: Object}>}
 */
async function getSimilar({ account, contentId, quantity, start, ratings }) {
    const fnName = 'getSimilar'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    utils.addParam(queryData, 'n', quantity, val => val > 0)
    utils.addParam(queryData, 'start', start, val => val >= 0)
    utils.addParam(queryData, 'ratings', ratings)
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/discover/${account.accountId}/similar_to/${contentId}?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': account.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.contentId
 * @returns {Promise<{total: Number, data: Array<Object>, meta: Object}>} 
 */
async function getNext({ account, contentId }) {
    const fnName = 'getNext'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const query = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/discover/up_next/${contentId}?${query}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': account.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}

/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.contentId
 * @returns {Promise<{total: Number, data: Array<Object>, meta: Object}>} 
 */
async function getPrev({ account, contentId }) {
    const fnName = 'getPrev'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const query = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/discover/previous_episode/${contentId}?${query}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': account.token }
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
 * @returns {Promise<{total: Number, data: Array<Object>, meta: Object}>} 
 */
async function search({ account, queryStr, quantity, start, type }) {
    const fnName = 'search'
    logger.debug(fnName)
    const types = CONST.getContentTypes().concat(['top_results', 'music'])
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    utils.addParam(queryData, 'q', queryStr)
    utils.addParam(queryData, 'n', quantity, val => val > 0)
    utils.addParam(queryData, 'start', start, val => val >= 0)
    if (type && type.length) {
        for (const t of type) {
            if (!types.includes(t)) {
                throw new CrunchyrollError('Wrong type value.')
            }
        }
        utils.addParam(queryData, 'type', type.join(','))
    }
    const query = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/discover/search?${query}`
    const reqConfig = {
        method: 'get',
        headers: { Authorization: account.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}

export default {
    getWatchlist,
    getBrowseAll,
    getBrowseIndex,
    getCategories,
    getSubcategories,
    getHomeFeed,
    getHistory,
    getRecommendations,
    getSeasonList,
    getSimilar,
    getNext,
    getPrev,
    search,
}
