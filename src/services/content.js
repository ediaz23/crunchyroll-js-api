
const fetch = require('node-fetch')
const config = require('../config/config.json')
const utils = require('../utils')
const { URLSearchParams } = require('url')

/**
 * Return account home feed
 * @param {import('./../controllers/clients').Clients} client
 * @returns {Promise<Object>}
 */
async function getHomeFeed(client) {
    const fnName = 'getHomeFeed'
    console.log(fnName)
    const query = locale ? new URLSearchParams({locale}) : '' 
    const url = `${config.url}/content/v1/${accountId}/home_feed?${query}`
    /** @type {import('node-fetch').Response} */
    const res = await fetch(url, {
        method: 'get',
        headers: {'Authorization': accessToken}
    })
    await utils.logRes(fnName, res)
    const data = await res.json()
    return data
}

/**
 * Returns season names.
 * @param {String} accessToken
 * @param {String} locale
 * @returns {Promise<Object>} 
 */
async function getSeasonList(accessToken, locale) {
    const fnName = 'getSeasonList'
    console.log(fnName)
    const query = locale ? new URLSearchParams({locale}) : '' 
    const url = `${config.url}/content/v1/season_list?${query}`
    /** @type {import('node-fetch').Response} */
    const res = await fetch(url, {
        method: 'get',
        headers: {'Authorization': accessToken}
    })
    await utils.logRes(fnName, res)
    const data = await res.json()
    return data
}



module.exports = {
    getHomeFeed,
    getSeasonList
}
