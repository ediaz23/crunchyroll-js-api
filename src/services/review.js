
const utils = require('../utils')
const logger = require('../logger')
const { URLSearchParams } = require('url')


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} contentId
 * @param {String} contentType
 * @returns {Promise<Object>}
 */
async function getRatings(client, contentId, contentType) {
    const fnName = 'getRatings'
    logger.debug(fnName)
    const types = ['series', 'movie_listing', 'episode']
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

module.exports = {
    getRatings,
}
