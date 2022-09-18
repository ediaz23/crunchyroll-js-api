
const utils = require('../utils')
const logger = require('../logger')
const { URLSearchParams } = require('url')
const CONST = require('../const')


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.contentId
 * @param {String} obj.rating
 * @param {String} [obj.contentType]
 * @returns {Promise<import('../types').RatingEpisode>}
 */
async function addEpisodeRating({ account, contentId, rating, contentType }) {
    const fnName = 'addEpisodeRating'
    logger.debug(fnName)
    const contentTypes = CONST.getContentTypes()
    const ratingTypes = CONST.getRatingEpisodeTypes()
    const queryData = { locale: account.locale }
    const queryStr = new URLSearchParams(queryData)
    contentType = contentType ? contentType : 'episode'
    if (!contentTypes.includes(contentType)) {
        throw new Error(`ContentType ${contentType} is not valid.`)
    }
    if (!ratingTypes.includes(rating)) {
        throw new Error(`Rating ${rating} is not valid.`)
    }
    const url = `/content-reviews/v2/user/${account.accountId}/rating/${contentType}/${contentId}?${queryStr}`
    const reqConfig = {
        method: 'put',
        headers: {
            'Authorization': account.token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating: rating})
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.contentId
 * @param {String} obj.rating
 * @param {String} obj.contentType
 * @returns {Promise<import('../types').RatingStars>}
 */
async function addRating({ account, contentId, rating, contentType }) {
    const fnName = 'addRating'
    logger.debug(fnName)
    const ratingTypes = CONST.getRatingContentTypes()
    const contentTypes = CONST.getContentTypes()
    const queryData = { locale: account.locale }
    const queryStr = new URLSearchParams(queryData)
    if (!contentTypes.includes(contentType)) {
        throw new Error(`ContentType ${contentType} is not valid.`)
    }
    if (!ratingTypes.includes(rating)) {
        throw new Error(`Rating ${rating} is not valid.`)
    }
    const url = `/content-reviews/v2/user/${account.accountId}/rating/${contentType}/${contentId}?${queryStr}`
    const reqConfig = {
        method: 'put',
        headers: {
            'Authorization': account.token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating: rating})
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.contentId
 * @param {String} obj.contentType
 * @returns {Promise<Object>}
 */
async function _getRatings({ account, contentId, contentType }) {
    const fnName = '_getRatings'
    logger.debug(fnName)
    const types = CONST.getContentTypes()
    const queryData = { locale: account.locale }
    const queryStr = new URLSearchParams(queryData)
    if (!types.includes(contentType)) {
        throw new Error(`ContentType ${contentType} is not valid.`)
    }
    const url = `/content-reviews/v2/user/${account.accountId}/rating/${contentType}/${contentId}?${queryStr}`
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
 * @returns {Promise<import('../types').RatingEpisode>}
 */
async function getEpisodeRatings({ account, contentId }) {
    return _getRatings({ account, contentId, contentType: 'episode' })
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.contentId
 * @param {String} obj.contentType
 * @returns {Promise<import('../types').RatingStars>}
 */
async function getRatings({ account, contentId, contentType }) {
    return _getRatings({ account, contentId, contentType })
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.contentId
 * @param {String} obj.contentType
 * @returns {Promise}
 */
async function removeRating({ account, contentId, contentType }) {
    const fnName = 'removeRating'
    logger.debug(fnName)
    const types = CONST.getContentTypes()
    const queryData = { locale: account.locale }
    const queryStr = new URLSearchParams(queryData)
    if (!types.includes(contentType)) {
        throw new Error(`ContentType ${contentType} is not valid.`)
    }
    const url = `/content-reviews/v2/user/${account.accountId}/rating/${contentType}/${contentId}?${queryStr}`
    const reqConfig = {
        method: 'delete',
        headers: { 'Authorization': account.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


module.exports = {
    addEpisodeRating,
    addRating,
    getEpisodeRatings,
    getRatings,
    removeRating,
}
