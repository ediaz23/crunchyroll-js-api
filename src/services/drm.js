
import utils from '../utils.js'
import logger from '../logger.js'
import config from '../config.js'


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.episodeId
 * @param {String} [obj.type] only null or music
 * @param {String} [obj.browser] browser name
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<Object>}
 */
async function getStream({ account, episodeId, type, browser, fnConfig }) {
    const fnName = 'getStream'
    logger.debug(fnName)
    type = type ? `/${type}` : ''
    browser = browser || 'chrome'
    if (!['chrome', 'firefox', 'safari', 'explorer'].includes(browser)) {
        throw new Error('Wrong browser, ' + browser)
    }
    const url = `${config.urlDrm}/v1${type}/${episodeId}/web/${browser}/play`
    const reqConfig = {
        method: 'get',
        headers: { Authorization: account.token },
        baseUrlIncluded: true,
    }
    // @ts-expect-error
    return utils.makeRequest(fnName, url, reqConfig, fnConfig)
}

/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.episodeId
 * @param {String} obj.token
 * @param {Number} obj.playhead
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise}
 */
async function keepAlive({ account, token, episodeId, playhead, fnConfig }) {
    const fnName = 'keepAlive'
    logger.debug(fnName)
    const queryData = { playhead }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `${config.urlDrm}/v1/token/${episodeId}/${token}/keepAlive?${queryStr}`
    let body = null, FormDataFn = null

    try {
        FormDataFn = window.FormData
    } catch (_e) {
        // #if process.env.NODE_COMPILING !== 'true'
        FormDataFn = await import('form-data')
        FormDataFn = FormDataFn.default
        // #endif
    }
    body = new FormDataFn()
    body.append('position', playhead.toString())
    const reqConfig = {
        method: 'PATCH',
        headers: { Authorization: account.token },
        baseUrlIncluded: true,
        body,
    }
    // @ts-expect-error
    return utils.makeRequest(fnName, url, reqConfig, fnConfig)
}

/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.episodeId
 * @param {String} obj.token
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise}
 */
async function revokeToken({ account, episodeId, token, fnConfig }) {
    const fnName = 'revokeToken'
    logger.debug(fnName)
    const url = `${config.urlDrm}/v1/token/${episodeId}/${token}/delete`
    const reqConfig = {
        method: 'post',
        headers: { Authorization: account.token },
        baseUrlIncluded: true,
    }
    // @ts-expect-error
    return utils.makeRequest(fnName, url, reqConfig, fnConfig)
}

/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.episodeId
 * @param {String} obj.token
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise}
 */
async function deleteToken({ account, episodeId, token, fnConfig }) {
    const fnName = 'deleteToken'
    logger.debug(fnName)
    const url = `${config.urlDrm}/v1/token/${episodeId}/${token}`
    const reqConfig = {
        method: 'delete',
        headers: { Authorization: account.token },
        baseUrlIncluded: true,
    }
    // @ts-expect-error
    return utils.makeRequest(fnName, url, reqConfig, fnConfig)
}

/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.assetId
 * @param {String} obj.sessionId `${new Date().getTime()}-${account.accountId}`
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<{custom_data: String, token: String}>}
 */
async function getAuth({ account, assetId, sessionId, fnConfig }) {
    const fnName = 'getAuth'
    logger.debug(fnName)
    const url = `${config.urlPl}/drm/v1/auth`
    const reqConfig = {
        method: 'post',
        headers: { Authorization: account.token },
        baseUrlIncluded: true,
        body: JSON.stringify({
            accounting_id: config.accountingId,
            asset_id: assetId,
            session_id: sessionId,
            user_id: account.accountId,
        })
    }
    // @ts-expect-error
    return utils.makeRequest(fnName, url, reqConfig, fnConfig)
}


export default {
    getStream,
    getAuth,
    keepAlive,
    revokeToken,
    deleteToken,
}
