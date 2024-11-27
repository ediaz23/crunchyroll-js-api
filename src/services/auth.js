
import utils from '../utils.js'
import logger from '../logger.js'
import config from '../config.js'


/**
 * Return hardcode credentials to login
 * @returns {String}
 */
function getBasicToken() {
    const credenciales = `${config.client_id}:${config.client_secret}`
    let buff = Buffer.from(credenciales)
    let base64data = buff.toString('base64')
    return base64data
}


/**
 * Make out system login
 * @param {Object} login
 * @param {import('../types.js').Device} login.device Device
 * @param {String} [login.grantType] login type
 * @param {String} [login.scope]
 * @param {String} login.username user's email
 * @param {String} login.password user's password
 * @returns {Promise<import('../types').Token>}
 */
async function getToken({ device, grantType, scope, username, password }) {
    const fnName = 'getToken'
    logger.debug(fnName)
    const basicToken = getBasicToken()
    const body = {
        grant_type: grantType || 'password',
        scope: scope || 'offline_access',
        device_id: device.id,
        device_name: device.name,
        device_type: device.type,
        username,
        password,
    }
    const url = `/auth/v1/token`
    const reqConfig = {
        method: 'post',
        body: await utils.toURLSearchParams(body),
        headers: {
            Authorization: `Basic ${basicToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'ETP-Anonymous-ID': null,
        }
    }
    // @ts-expect-error
    const token = await utils.makeRequest(fnName, url, reqConfig)
    if (token) {
        token.created_date = new Date().toISOString()
    }
    return token
}


/**
 * Refresh access token.
 * @param {Object} login
 * @param {import('../types.js').Device} login.device Device
 * @param {String} [login.grantType] login type
 * @param {String} [login.scope]
 * @param {String} login.refreshToken refresh token from login
 * @returns {Promise<import('../types').Token>}
 */
async function getRefreshToken({ device, grantType, scope, refreshToken }) {
    const fnName = 'getRefreshToken'
    logger.debug(fnName)
    const basicToken = getBasicToken()
    const body = {
        grant_type: grantType || 'refresh_token',
        scope: scope || 'offline_access',
        device_id: device.id,
        device_name: device.name,
        device_type: device.type,
        refresh_token: refreshToken,
    }
    const url = `/auth/v1/token`
    const reqConfig = {
        method: 'post',
        body: await utils.toURLSearchParams(body),
        headers: {
            Authorization: `Basic ${basicToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'ETP-Anonymous-ID': null,
        }
    }
    // @ts-expect-error
    const token = await utils.makeRequest(fnName, url, reqConfig)
    if (token) {
        token.created_date = new Date().toISOString()
    }
    return token
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
    const body = {
        token: refreshToken
    }
    const url = `/auth/v1/revoke`
    const reqConfig = {
        method: 'post',
        body: await utils.toURLSearchParams(body),
        headers: {
            Authorization: `Basic ${basicToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'ETP-Anonymous-ID': null,
        }
    }
    // @ts-expect-error
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * Switch profile
 * @param {Object} login
 * @param {import('../types.js').Device} login.device Device
 * @param {String} [login.grantType] login type
 * @param {String} [login.scope]
 * @param {String} login.refreshToken refresh token from login
 * @param {String} login.profileId profile id for switch
 * @returns {Promise<import('../types').Token>}
 */
async function switchProfile({ device, grantType, scope, refreshToken, profileId, }) {
    const fnName = 'switchProfile'
    logger.debug(fnName)
    const basicToken = getBasicToken()
    const body = {
        grant_type: grantType || 'refresh_token_profile_id',
        scope: scope || 'offline_access',
        device_id: device.id,
        device_name: device.name,
        device_type: device.type,
        refresh_token: refreshToken,
        profile_id: profileId,
    }
    const url = `/auth/v1/token`
    const reqConfig = {
        method: 'post',
        body: await utils.toURLSearchParams(body),
        headers: {
            Authorization: `Basic ${basicToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'ETP-Anonymous-ID': null,
        }
    }
    // @ts-expect-error
    const token = await utils.makeRequest(fnName, url, reqConfig)
    if (token) {
        token.created_date = new Date().toISOString()
    }
    return token
}


export default {
    getToken,
    getRefreshToken,
    revokeRefreshToken,
    switchProfile,
}
