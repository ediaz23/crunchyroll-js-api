
const utils = require('../utils')
const logger = require('../logger')
const { URLSearchParams } = require('url')
const CONST = require('../const')


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} contentId
 * @param {String} rating
 * @param {String} [contentType]
 * @returns {Promise<Object>}
 */
async function addEpisodeRating(client, contentId, rating, contentType) {
    const fnName = 'addEpisodeRating'
    logger.debug(fnName)
    const contentTypes = CONST.getContentTypes()
    const ratingTypes = CONST.getRatingEpisodeTypes()
    const queryData = {locale: await client.getLocale()}
    const queryStr = new URLSearchParams(queryData)
    const account = await client.getAccount()
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
            'Authorization': await client.getToken(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating: rating})
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} contentId
 * @param {String} rating
 * @param {String} contentType
 * @returns {Promise<Object>}
 */
async function addRating(client, contentId, rating, contentType) {
    const fnName = 'addRating'
    logger.debug(fnName)
    const ratingTypes = CONST.getRatingContentTypes()
    const contentTypes = CONST.getContentTypes()
    const queryData = {locale: await client.getLocale()}
    const queryStr = new URLSearchParams(queryData)
    const account = await client.getAccount()
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
            'Authorization': await client.getToken(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating: rating})
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} contentId
 * @param {String} contentType
 * @returns {Promise<Object>}
 */
async function _getRatings(client, contentId, contentType) {
    const fnName = '_getRatings'
    logger.debug(fnName)
    const types = CONST.getContentTypes()
    const queryData = {locale: await client.getLocale()}
    const queryStr = new URLSearchParams(queryData)
    const account = await client.getAccount()
    if (!types.includes(contentType)) {
        throw new Error(`ContentType ${contentType} is not valid.`)
    }
    const url = `/content-reviews/v2/user/${account.accountId}/rating/${contentType}/${contentId}?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': await client.getToken() }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} contentId
 * @returns {Promise<Object>}
 */
async function getEpisodeRatings(client, contentId) {
    return _getRatings(client, contentId, 'episode')
}


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} contentId
 * @param {String} contentType
 * @returns {Promise<Object>}
 */
async function getRatings(client, contentId, contentType) {
    return _getRatings(client, contentId, contentType)
}


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} contentId
 * @param {String} contentType
 * @returns {Promise<Object>}
 */
async function removeRating(client, contentId, contentType) {
    const fnName = 'removeRating'
    logger.debug(fnName)
    const types = CONST.getContentTypes()
    const queryData = {locale: await client.getLocale()}
    const queryStr = new URLSearchParams(queryData)
    const account = await client.getAccount()
    if (!types.includes(contentType)) {
        throw new Error(`ContentType ${contentType} is not valid.`)
    }
    const url = `/content-reviews/v2/user/${account.accountId}/rating/${contentType}/${contentId}?${queryStr}`
    const reqConfig = {
        method: 'delete',
        headers: { 'Authorization': await client.getToken() }
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
