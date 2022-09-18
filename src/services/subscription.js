
const utils = require('../utils')
const logger = require('../logger')
const { URLSearchParams } = require('url')


/**
 * @param {Object} obj
 * @param {String} obj.token
 * @param {String} obj.locale
 * @param {String} [obj.source]
 * @returns {Promise<Object>}
 */
async function getProducts({ token, locale, source }) {
    const fnName = 'getProducts'
    logger.debug(fnName)
    const queryData = { locale }
    utils.addParam(queryData, 'source', source ? source : 'google-play')
    const queryStr = new URLSearchParams(queryData)
    const url = `/subs/v2/products?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {String} obj.token
 * @param {String} obj.locale
 * @param {String} obj.externalId
 * @returns {Promise<Object>}
 */
async function getUserBenefits({ token, locale, externalId }) {
    const fnName = 'getUserBenefits'
    logger.debug(fnName)
    const queryData = { locale }
    const queryStr = new URLSearchParams(queryData)

    const url = `/subs/v1/subscriptions/${externalId}/benefits?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {String} obj.token
 * @param {String} obj.locale
 * @param {String} obj.externalId
 * @returns {Promise<Object>}
 */
async function getUserSubscription({ token, locale, externalId }) {
    const fnName = 'getUserSubscription'
    logger.debug(fnName)
    const queryData = { locale }
    const queryStr = new URLSearchParams(queryData)

    const url = `/subs/v1/subscriptions/${externalId}/products?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


module.exports = {
    getProducts,
    getUserBenefits,
    getUserSubscription
}
