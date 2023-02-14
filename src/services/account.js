
import utils from '../utils.js'
import logger from '../logger.js'


/**
 * Return account info
 * @param {{token: String}}
 * @returns {Promise<import('../types').Account>}
 */
async function getAccountId({ token }) {
    const fnName = 'getAccountId'
    logger.debug(fnName)
    const url = `/accounts/v1/me`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * Return profile info
 * @param {{token: String}}
 * @returns {Promise<import('../types').Profile>}
 */
async function getProfile({ token }) {
    const fnName = 'getProfile'
    logger.debug(fnName)
    const url = `/accounts/v1/me/profile`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * Return user names, idk what it is
 * @param {{token: String}}
 * @returns {Promise<{usernames: Array<String>}>}
 */
async function getUsernames({ token }) {
    const fnName = 'getAccountId'
    logger.debug(fnName)
    const url = `/accounts/v1/usernames`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * Update profile
 * @param {{
    token: String,
    data: import('../types').Profile,
 }}
 * @returns {Promise}
 */
async function updateProfile({ token, data }) {
    const fnName = 'updateProfile'
    logger.debug(fnName)
    const url = `/accounts/v1/me/profile`
    const reqConfig = {
        method: 'patch',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }
    await utils.makeRequest(fnName, url, reqConfig)
}

export default {
    getAccountId,
    getProfile,
    getUsernames,
    updateProfile
}
