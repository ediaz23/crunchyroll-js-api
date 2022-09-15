
const utils = require('../utils')
const logger = require('../logger')
const { URLSearchParams } = require('url')


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} [source]
 * @returns {Promise<Object>}
 * @see error it's returning Forbidden
 */
async function getProducts(client, source) {
    const fnName = 'getProducts'
    logger.debug(fnName)
    const queryData = {}
    utils.addParam(queryData, 'source', source ? source : 'google-play')
    const queryStr = new URLSearchParams(queryData)
    const url = `/subs/v2/products?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': await client.getToken() }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {import('./../controllers/clients').Clients} client
 * @returns {Promise<Object>}
 */
async function getUserBenefits(client) {
    const fnName = 'getUserBenefits'
    logger.debug(fnName)
    const queryData = {locale: await client.getLocale()}
    const queryStr = new URLSearchParams(queryData)
    const account = await client.getAccount()

    const url = `/subs/v1/subscriptions/${account.externalId}/benefits?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': await client.getToken() }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {import('./../controllers/clients').Clients} client
 * @returns {Promise<Object>}
 */
async function getUserSubscription(client) {
    const fnName = 'getUserSubscription'
    logger.debug(fnName)
    const queryData = {locale: await client.getLocale()}
    const queryStr = new URLSearchParams(queryData)
    const account = await client.getAccount()

    const url = `/subs/v1/subscriptions/${account.externalId}/products?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': await client.getToken() }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


module.exports = {
    getProducts,
    getUserBenefits,
    getUserSubscription
}
