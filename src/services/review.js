
import utils from '../utils.js'
import logger from '../logger.js'
import config from '../config.js'


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
    const queryData = { locale: account.locale }
    const queryStr = await utils.toURLSearchParams(queryData)
    contentType = contentType ? contentType : 'episode'
    if (!config.contentTypes.includes(contentType)) {
        throw new Error(`ContentType ${contentType} is not valid.`)
    }
    if (!config.ratingEpisodeTypes.includes(rating)) {
        throw new Error(`Rating ${rating} is not valid.`)
    }
    const url = `/content-reviews/v2/user/${account.accountId}/rating/${contentType}/${contentId}?${queryStr}`
    const reqConfig = {
        method: 'put',
        headers: {
            Authorization: account.token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating: rating})
    }
    // @ts-expect-error
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
    const queryData = { locale: account.locale }
    const queryStr = await utils.toURLSearchParams(queryData)
    if (!config.contentTypes.includes(contentType)) {
        throw new Error(`ContentType ${contentType} is not valid.`)
    }
    if (!config.ratingContentTypes.includes(rating)) {
        throw new Error(`Rating ${rating} is not valid.`)
    }
    const url = `/content-reviews/v2/user/${account.accountId}/rating/${contentType}/${contentId}?${queryStr}`
    const reqConfig = {
        method: 'put',
        headers: {
            Authorization: account.token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating: rating})
    }
    // @ts-expect-error
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
    const queryData = { locale: account.locale }
    const queryStr = await utils.toURLSearchParams(queryData)
    if (!config.contentTypes.includes(contentType)) {
        throw new Error(`ContentType ${contentType} is not valid.`)
    }
    const url = `/content-reviews/v2/user/${account.accountId}/rating/${contentType}/${contentId}?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { Authorization: account.token }
    }
    // @ts-expect-error
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
    const queryData = { locale: account.locale }
    const queryStr = await utils.toURLSearchParams(queryData)
    if (!config.contentTypes.includes(contentType)) {
        throw new Error(`ContentType ${contentType} is not valid.`)
    }
    const url = `/content-reviews/v2/user/${account.accountId}/rating/${contentType}/${contentId}?${queryStr}`
    const reqConfig = {
        method: 'delete',
        headers: { Authorization: account.token }
    }
    // @ts-expect-error
    return utils.makeRequest(fnName, url, reqConfig)
}


export default {
    addEpisodeRating,
    addRating,
    getEpisodeRatings,
    getRatings,
    removeRating,
}
