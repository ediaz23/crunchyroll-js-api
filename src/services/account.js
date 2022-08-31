
const fetch = require('node-fetch')
const config = require('../config/config.json')
const utils = require('../utils')
const logger = require('../logger')
const { Accounts } = require('../models/accounts')
const { Profiles } = require('../models/profiles')

/**
 * Return profile info
 * @param {import('./../controllers/clients').Clients} client
 * @returns {Promise<Profiles>}
 */
async function getProfile(client) {
    const fnName = 'getProfile'
    logger.debug(fnName)
    const url = `${config.url}/accounts/v1/me/profile`
    const reqConfig = {
        method: 'get',
        headers: {'Authorization': await client.getToken()}
    }
    logger.debug(`${reqConfig.method} - ${url}`)
    /** @type {import('node-fetch').Response} */
    const res = await fetch(url, reqConfig)
    await utils.logRes(fnName, res)
    const data = await res.json()
    const profile = new Profiles()
    profile.fromJSON(data)
    return profile
}

/**
 * Update profile
 * @param {import('./../controllers/clients').Clients} client
 * @param {Profiles} data
 * @returns {Promise}
 */
async function updateProfile(client, data) {
    const fnName = 'updateProfile'
    logger.debug(fnName)
    const url = `${config.url}/accounts/v1/me/profile`
    const reqConfig = {
        method: 'patch',
        headers: {
            'Authorization': await client.getToken(),
            'Content-Type': 'application/json',
        },
        body:  JSON.stringify(data instanceof Profiles ? data.toJSON() : data),
    }
    logger.debug(`${reqConfig.method} - ${url}`)
    /** @type {import('node-fetch').Response} */
    const res = await fetch(url, reqConfig)
    await utils.logRes(fnName, res)
}

/**
 * Return account info
 * @param {import('./../controllers/clients').Clients} client
 * @returns {Promise<Accounts>}
 */
async function getAccountId(client) {
    const fnName = 'getAccountId'
    logger.debug(fnName)
    const url = `${config.url}/accounts/v1/me`
    const reqConfig = {
        method: 'get',
        headers: {'Authorization': await client.getToken()}
    }
    logger.debug(`${reqConfig.method} - ${url}`)
    /** @type {import('node-fetch').Response} */
    const res = await fetch(url, reqConfig)
    await utils.logRes(fnName, res)
    const data = await res.json()
    const account = new Accounts()
    account.fromJSON(data)
    return account
}

/**
 * Return user names, idk what it is
 * @param {import('./../controllers/clients').Clients} client
 * @returns {Promise<{usernames: Array<String>}>}
 */
async function getUsernames(client) {
    const fnName = 'getAccountId'
    logger.debug(fnName)
    const url = `${config.url}/accounts/v1/usernames`
    const reqConfig = {
        method: 'get',
        headers: {'Authorization': await client.getToken()}
    }
    logger.debug(`${reqConfig.method} - ${url}`)
    /** @type {import('node-fetch').Response} */
    const res = await fetch(url, reqConfig)
    await utils.logRes(fnName, res)
    const data = await res.json()
    return data
}

module.exports = {
    getAccountId,
    getProfile,
    getUsernames,
    updateProfile
}
