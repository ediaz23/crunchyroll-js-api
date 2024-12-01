
import utils from '../utils.js'
import logger from '../logger.js'
import config from '../config.js'


/**
 * Return hardcode credentials to login
 * @returns {String}
 */
function getBasicToken() {
    const credenciales = `${config.clientId}:${config.clientSecret}`
    let buff = Buffer.from(credenciales)
    let base64data = buff.toString('base64')
    return base64data
}

/**
 * Get device code for easy login
 * @returns {Promise<import('../types').DeviceCode>}
 */
async function getDeviceCode() {
    const fnName = 'getDeviceCode'
    logger.debug(fnName)
    const basicToken = getBasicToken()
    const body = { grant_type: 'client_id' }
    const url = `/auth/v1/device/code`
    const reqConfig = {
        method: 'post',
        body: await utils.toURLSearchParams(body),
        headers: {
            Authorization: `Basic ${basicToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'etp-anonymous-id': null,
        },
    }
    // @ts-expect-error
    const token = await utils.makeRequest(fnName, url, reqConfig)
    if (token) {
        token.created_date = new Date().toISOString()
    }
    return token
}

/**
 * Get access token from device code
 * @param {Object} obj
 * @param {import('../types.js').Device} obj.device Device
 * @param {String} obj.deviceCode login type
 * @returns {Promise<import('../types').Token>}
 */
async function getDeviceAuth({ device, deviceCode }) {
    const fnName = 'getDeviceAuth'
    logger.debug(fnName)
    const basicToken = getBasicToken()
    const body = {
        device_id: device.id,
        device_name: device.name,
        device_type: device.type,
        device_code: deviceCode,
    }
    const url = `/auth/v1/device/token`
    const reqConfig = {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
            Authorization: `Basic ${basicToken}`,
            'Content-Type': 'application/json',
        },
    }
    // @ts-expect-error
    return utils.makeRequest(fnName, url, reqConfig)
}

/**
 * Make out system login
 * @param {Object} obj
 * @param {import('../types.js').Device} obj.device Device
 * @param {Object} obj.credentials login type
 * @param {String} obj.grantType login type
 * @param {String} [obj.scope]
 * @returns {Promise<import('../types').Token>}
 */
async function _makeLogin({ device, credentials, grantType, scope }) {
    const fnName = '_makeLogin'
    logger.debug(fnName)
    const basicToken = getBasicToken()
    const body = {
        grant_type: grantType,
        scope: scope || 'offline_access',
        device_id: device.id,
        device_name: device.name,
        device_type: device.type,
        ...credentials,
    }
    const url = `/auth/v1/token`
    const reqConfig = {
        method: 'post',
        body: await utils.toURLSearchParams(body),
        headers: {
            Authorization: `Basic ${basicToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'ETP-Anonymous-ID': null,
        },
    }
    // @ts-expect-error
    const token = await utils.makeRequest(fnName, url, reqConfig)
    if (token) {
        token.created_date = new Date().toISOString()
    }
    return token
}


/**
 * Make out system login
 * @param {Object} obj
 * @param {import('../types.js').Device} obj.device Device
 * @param {String} [obj.scope]
 * @param {String} obj.username user's email
 * @param {String} obj.password user's password
 * @returns {Promise<import('../types').Token>}
 */
async function getToken({ device, scope, username, password }) {
    const fnName = 'getToken'
    logger.debug(fnName)
    return _makeLogin({
        device,
        scope,
        grantType: 'password',
        credentials: { username, password },
    })
}


/**
 * Make out system login
 * @param {Object} obj
 * @param {import('../types.js').Device} obj.device Device
 * @param {String} [obj.scope]
 * @param {String} obj.phone user's phone
 * @param {String} obj.verification_code
 * @returns {Promise<import('../types').Token>}
 */
async function getTokenWithPhone({ device, scope, phone, verification_code }) {
    const fnName = 'getTokenWithPhone'
    logger.debug(fnName)
    return _makeLogin({
        device,
        scope,
        grantType: 'phone',
        credentials: { phone_number: phone, verification_code },
    })
}

/**
 * Make out system login
 * @param {Object} obj
 * @param {import('../types.js').Device} obj.device Device
 * @param {String} [obj.scope]
 * @param {String} obj.code
 * @param {String} obj.code_verifier
 * @returns {Promise<import('../types').Token>}
 */
async function getTokenWithCode({ device, scope, code, code_verifier }) {
    const fnName = 'getTokenWithCode'
    logger.debug(fnName)
    return _makeLogin({
        device,
        scope,
        grantType: 'authorization_code',
        credentials: { code, code_verifier: code_verifier },
    })
}


/**
 * Refresh access token.
 * @param {Object} obj
 * @param {import('../types.js').Device} obj.device Device
 * @param {String} [obj.scope]
 * @param {String} obj.refreshToken refresh token from login
 * @returns {Promise<import('../types').Token>}
 */
async function getRefreshToken({ device, scope, refreshToken }) {
    const fnName = 'getRefreshToken'
    logger.debug(fnName)
    return _makeLogin({
        device,
        scope,
        grantType: 'refresh_token',
        credentials: { refresh_token: refreshToken },
    })
}


/**
 * Switch profile
 * @param {Object} obj
 * @param {import('../types.js').Device} obj.device Device
 * @param {String} [obj.scope]
 * @param {String} obj.refreshToken refresh token from login
 * @param {String} obj.profileId profile id for switch
 * @returns {Promise<import('../types').Token>}
 */
async function switchProfile({ device, scope, refreshToken, profileId }) {
    const fnName = 'switchProfile'
    logger.debug(fnName)
    return _makeLogin({
        device,
        scope,
        grantType: 'refresh_token_profile_id',
        credentials: { refresh_token: refreshToken, profile_id: profileId },
    })
}

/**
 * revoke access token.
 * @param {{refreshToken: String}} obj
 * @returns {Promise<{status: String}>}
 */
async function revokeRefreshToken({ refreshToken }) {
    const fnName = 'revokeRefreshToken'
    logger.debug(fnName)
    const basicToken = getBasicToken()
    const body = { token: refreshToken }
    const url = `/auth/v1/revoke`
    const reqConfig = {
        method: 'post',
        body: await utils.toURLSearchParams(body),
        headers: {
            Authorization: `Basic ${basicToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'ETP-Anonymous-ID': null,
        },
    }
    // @ts-expect-error
    return utils.makeRequest(fnName, url, reqConfig)
}


export default {
    getDeviceCode,
    getDeviceAuth,
    getToken,
    getTokenWithPhone,
    getTokenWithCode,
    getRefreshToken,
    revokeRefreshToken,
    switchProfile,
}
