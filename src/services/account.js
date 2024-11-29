
import utils from '../utils.js'
import logger from '../logger.js'

/**
 * Return account info
 * @param {Object} obj
 * @param {String} obj.token
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
 * @deprecated
 * @param {Object} obj
 * @param {String} obj.token
 * @returns {Promise<import('../types').Profile>}
 */
async function getProfile({ token }) {
    const fnName = 'getProfile'
    logger.debug(fnName)
    const url = `/accounts/v1/me/profile`
    const reqConfig = {
        method: 'get',
        headers: { Authorization: token },
    }
    // @ts-expect-error
    return utils.makeRequest(fnName, url, reqConfig)
}

/**
 * Return user names, idk what it is
 * @param {Object} obj
 * @param {String} obj.token
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
 * @param {Object} obj
 * @param {String} obj.token
 * @param {import('../types').Profile} obj.data
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
 * @param {Object} obj
 * @param {String} obj.token
 * @param {import('../types').ProfileCreate} obj.data
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
 * Delete profile
 * @param {Object} obj
 * @param {String} obj.token
 * @param {String} obj.profileId
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
 * @param {Object} obj
 * @param {String} obj.token
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
 * @param {Object} obj
 * @param {String} obj.token
 * @param {import('../types').Profile} obj.data
 * @param {String} obj.profileId
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

/**
 * Return profile info
 * @param {Object} obj
 * @param {String} obj.token
 * @param {String} obj.profileId
 * @returns {Promise<import('../types').Profile>}
 */
async function getMultiProfile({ token, profileId }) {
    const fnName = 'getMultiProfiles'
    logger.debug(fnName)
    const url = `/accounts/v1/me/multiprofile/${profileId}`
    const reqConfig = {
        method: 'get',
        headers: { Authorization: token },
    }
    // @ts-expect-error
    return utils.makeRequest(fnName, url, reqConfig)
}


export default {
    createMultiProfile,
    deleteMultiProfile,
    getAccountId,
    getProfile,
    getMultiProfile,
    getMultiProfiles,
    getUsernames,
    updateProfile,
    updateMultiProfile
}
