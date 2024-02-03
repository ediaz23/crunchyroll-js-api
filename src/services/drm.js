
import utils from '../utils.js'
import logger from '../logger.js'
import { getDrmUrl, getPlUrl, getAccountingId } from '../const.js'

/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.episodeId
 * @param {String} [obj.type] only null or music
 * @returns {Promise<Object>}
 */
async function getStream({ account, episodeId, type }) {
    const fnName = 'getStream'
    logger.debug(fnName)
    type = type ? `/${type}` : ''
    const url = `${getDrmUrl()}/v1${type}/${episodeId}/web/chrome/play`
    const reqConfig = {
        method: 'get',
        headers: { Authorization: account.token },
        baseUrlIncluded: true,
    }
    return utils.makeRequest(fnName, url, reqConfig)
}

/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.episodeId
 * @param {String} obj.token
 * @param {Number} obj.playhead
 * @returns {Promise}
 */
async function keepAlive({ account, token, episodeId, playhead }) {
    const fnName = 'keepAlive'
    logger.debug(fnName)
    const queryData = { playhead }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `${getDrmUrl()}/v1/token/${episodeId}/${token}/keepAlive?${queryStr}`
    let body = null, FormDataFn = null
    try {
        FormDataFn = await import('form-data')
        FormDataFn = FormDataFn.default
    } catch (_e) {
        FormDataFn = window.FormData
    }
    body = new FormDataFn()
    body.append('position', playhead)
    const reqConfig = {
        method: 'PATCH',
        headers: { Authorization: account.token },
        baseUrlIncluded: true,
        body,
    }
    return utils.makeRequest(fnName, url, reqConfig)
}

/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.episodeId
 * @param {String} obj.token
 * @returns {Promise}
 */
async function revokeToken({ account, episodeId, token }) {
    const fnName = 'revokeToken'
    logger.debug(fnName)
    const url = `${getDrmUrl()}/v1/token/${episodeId}/${token}/delete`
    const reqConfig = {
        method: 'post',
        headers: { Authorization: account.token },
        baseUrlIncluded: true,
    }
    return utils.makeRequest(fnName, url, reqConfig)
}

/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.episodeId
 * @param {String} obj.token
 * @returns {Promise}
 */
async function deleteToken({ account, episodeId, token }) {
    const fnName = 'deleteToken'
    logger.debug(fnName)
    const url = `${getDrmUrl()}/v1/token/${episodeId}/${token}`
    const reqConfig = {
        method: 'delete',
        headers: { Authorization: account.token },
        baseUrlIncluded: true,
    }
    return utils.makeRequest(fnName, url, reqConfig)
}

/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.assetId
 * @param {String} obj.sessionId `${new Date().getTime()}-${account.accountId}`
 * @returns {Promise<{custom_data: String, token: String}>}
 */
async function getAuth({ account, assetId, sessionId }) {
    const fnName = 'getAuth'
    logger.debug(fnName)
    const url = `${getPlUrl()}/drm/v1/auth`
    const reqConfig = {
        method: 'post',
        headers: { Authorization: account.token },
        baseUrlIncluded: true,
        body: JSON.stringify({
            accounting_id: getAccountingId(),
            asset_id: assetId,
            session_id: sessionId,
            user_id: account.accountId,
        })
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


export default {
    getStream,
    getAuth,
    keepAlive,
    revokeToken,
    deleteToken,
}
