
import utils from '../utils.js'
import logger from '../logger.js'


/**
 * Return account info
 * @param {{token: String}} obj
 * @returns {Promise<import('../types').Account>}
 */
async function getAccountId({ token }) {
    const fnName = 'getAccountId'
    logger.debug(fnName)
    const url = `/accounts/v1/me`
    const reqConfig = {
        method: 'get',
        headers: { Authorization: token }
    }
    // @ts-expect-error
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * Return profile info
 * @param {{token: String}} obj
 * @returns {Promise<import('../types').Profile>}
 */
async function getProfile({ token }) {
    const fnName = 'getProfile'
    logger.debug(fnName)
    const url = `/accounts/v1/me/profile`
    const reqConfig = {
        method: 'get',
        headers: { Authorization: token }
    }
    // @ts-expect-error
    return utils.makeRequest(fnName, url, reqConfig)
}

/**
 * Return user names, idk what it is
 * @param {{token: String}} obj
 * @returns {Promise<{usernames: Array<String>}>}
 */
async function getUsernames({ token }) {
    const fnName = 'getAccountId'
    logger.debug(fnName)
    const url = `/accounts/v1/usernames`
    const reqConfig = {
        method: 'get',
        headers: { Authorization: token }
    }
    // @ts-expect-error
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * Update profile
 * @param {{
    token: String,
    data: import('../types').Profile,
 }} obj
 * @returns {Promise}
 */
async function updateProfile({ token, data }) {
    const fnName = 'updateProfile'
    logger.debug(fnName)
    const url = `/accounts/v1/me/profile`
    const reqConfig = {
        method: 'patch',
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }
    // @ts-expect-error
    await utils.makeRequest(fnName, url, reqConfig)
}

/**
 * Update profile
 * @param {{
    token: String,
    data: import('../types').ProfileCreate,
 }} obj
 * @returns {Promise}
 */
async function createMultiProfile({ token, data }) {
    const fnName = 'createMultiProfile'
    logger.debug(fnName)
    const url = `/accounts/v1/me/multiprofile`
    const reqConfig = {
        method: 'post',
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }
    // @ts-expect-error
    await utils.makeRequest(fnName, url, reqConfig)
}

/**
 * Update profile
 * @param {{
    token: String,
    profileId: String,
 }} obj
 * @returns {Promise}
 */
async function deleteMultiProfile({ token, profileId }) {
    const fnName = 'deleteMultiProfile'
    logger.debug(fnName)
    const url = `/accounts/v1/me/multiprofile/${profileId}`
    const reqConfig = {
        method: 'delete',
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
        },
    }
    // @ts-expect-error
    await utils.makeRequest(fnName, url, reqConfig)
}


/**
 * Return profile info
 * @param {{token: String}} obj
 * @returns {Promise<import('../types').ProfileResponse>}
 */
async function getMultiProfiles({ token }) {
    const fnName = 'getMultiProfiles'
    logger.debug(fnName)
    const url = `/accounts/v1/me/multiprofile`
    const reqConfig = {
        method: 'get',
        headers: { Authorization: token }
    }
    // @ts-expect-error
    return utils.makeRequest(fnName, url, reqConfig)
}

/**
 * Update profile
 * @param {{
    token: String,
    data: import('../types').Profile,
    profileId: String,
 }} obj
 * @returns {Promise}
 */
async function updateMultiProfile({ token, data, profileId }) {
    const fnName = 'updateMultiProfile'
    logger.debug(fnName)
    const url = `/accounts/v1/me/multiprofile/${profileId}`
    const reqConfig = {
        method: 'patch',
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }
    // @ts-expect-error
    await utils.makeRequest(fnName, url, reqConfig)
}


export default {
    createMultiProfile,
    deleteMultiProfile,
    getAccountId,
    getProfile,
    getMultiProfiles,
    getUsernames,
    updateProfile,
    updateMultiProfile
}
