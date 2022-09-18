
const utils = require('../utils')
const logger = require('../logger')
const { Accounts } = require('../models/accounts')
const { Profiles } = require('../models/profiles')


/**
 * Return account info
 * @param {import('./../controllers/clients').Clients} client
 * @returns {Promise<Accounts>}
 */
async function getAccountId(client) {
    const fnName = 'getAccountId'
    logger.debug(fnName)
    const url = `/accounts/v1/me`
    const reqConfig = {
        method: 'get',
        headers: {'Authorization': await client.getToken()}
    }
    const data = await utils.makeRequest(fnName, url, reqConfig)
    const account = new Accounts()
    account.fromJSON(data)
    return account
}


/**
 * Return profile info
 * @param {import('./../controllers/clients').Clients} client
 * @returns {Promise<Profiles>}
 */
async function getProfile(client) {
    const fnName = 'getProfile'
    logger.debug(fnName)
    const url = `/accounts/v1/me/profile`
    const reqConfig = {
        method: 'get',
        headers: {'Authorization': await client.getToken()}
    }
    const data = await utils.makeRequest(fnName, url, reqConfig)
    const profile = new Profiles()
    profile.fromJSON(data)
    return profile
}


/**
 * Return user names, idk what it is
 * @param {import('./../controllers/clients').Clients} client
 * @returns {Promise<{usernames: Array<String>}>}
 */
async function getUsernames(client) {
    const fnName = 'getAccountId'
    logger.debug(fnName)
    const url = `/accounts/v1/usernames`
    const reqConfig = {
        method: 'get',
        headers: {'Authorization': await client.getToken()}
    }
    return utils.makeRequest(fnName, url, reqConfig)
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
    const url = `/accounts/v1/me/profile`
    const reqConfig = {
        method: 'patch',
        headers: {
            'Authorization': await client.getToken(),
            'Content-Type': 'application/json',
        },
        body:  JSON.stringify(data instanceof Profiles ? data.toJSON() : data),
    }
    await utils.makeRequest(fnName, url, reqConfig)
}

module.exports = {
    getAccountId,
    getProfile,
    getUsernames,
    updateProfile
}
