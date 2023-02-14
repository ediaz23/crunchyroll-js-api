
import utils from '../utils.js'
import logger from '../logger.js'
import CONST from '../const.js'


/**
 * Return hardcode credentials to login
 * @returns {String}
 */
function getBasicToken() {
    const credenciales = `${CONST.getClientId()}:${CONST.getClientSecret()}`
    let buff = Buffer.from(credenciales)
    let base64data = buff.toString('base64')
    return base64data
}


/**
 * Make out system login
 * @param {Object} login
 * @param {String} login.username user's email
 * @param {String} login.password user's password
 * @param {String} [login.grantType] login type
 * @param {String} [login.scope]
 * @returns {Promise<import('../types').Token>}
 */
async function getToken({ username, password, grantType, scope }) {
    const fnName = 'getToken'
    logger.debug(fnName)
    const basicToken = getBasicToken()
    const body = {
        username: username,
        password: password,
        grant_type: grantType ? grantType : 'password',
        scope: scope ? scope : 'offline_access'
    }
    const url = `/auth/v1/token`
    const reqConfig = {
        method: 'post',
        body: await utils.toURLSearchParams(body),
        headers: {
            'Authorization': `Basic ${basicToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'ETP-Anonymous-ID': null,
        }
    }
    const token = await utils.makeRequest(fnName, url, reqConfig)
    if (token) {
        token.created_date = new Date().toISOString()
    }
    return token
}


/**
 * Refresh access token.
 * @param {{refreshToken: String}}
 * @returns {Promise<import('../types').Token>}
 */
async function getRefreshToken({ refreshToken }) {
    const fnName = 'getRefreshToken'
    logger.debug(fnName)
    const basicToken = getBasicToken()
    const body = {
        grant_type: 'refresh_token',
        refresh_token: refreshToken
    }
    const url = `/auth/v1/token`
    const reqConfig = {
        method: 'post',
        body: await utils.toURLSearchParams(body),
        headers: {
            'Authorization': `Basic ${basicToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'ETP-Anonymous-ID': null,
        }
    }
    const token = await utils.makeRequest(fnName, url, reqConfig)
    if (token) {
        token.created_date = new Date().toISOString()
    }
    return token
}


/**
 * revoke access token.
 * @param {{refreshToken: String}}
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
            'Authorization': `Basic ${basicToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'ETP-Anonymous-ID': null,
        }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


export default {
    getToken,
    getRefreshToken,
    revokeRefreshToken,
}
