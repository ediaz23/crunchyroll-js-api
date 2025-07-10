
import utils from '../utils.js'
import logger from '../logger.js'

/**
 * Return Avatar list
 * @param {Object} obj
 * @param {String} obj.token
 * @param {String} obj.lang
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<{items: Array<import('../types.js').AssesItem>}>}
 */
async function getAvatar({ token, lang, fnConfig }) {
    const fnName = 'getAvatar'
    logger.debug(fnName)
    const url = `/assets/v2/${lang}/avatar`
    const reqConfig = {
        method: 'get',
        headers: { Authorization: token },
    }
    // @ts-expect-error
    return utils.makeRequest(fnName, url, reqConfig, fnConfig)
}

/**
 * Return wallpaper list
 * @param {Object} obj
 * @param {String} obj.token
 * @param {String} obj.lang
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<{items: Array<import('../types.js').AssesItem>}>}
 */
async function getWallpaper({ token, lang, fnConfig }) {
    const fnName = 'getWallpaper'
    logger.debug(fnName)
    const url = `/assets/v2/${lang}/wallpaper`
    const reqConfig = {
        method: 'get',
        headers: { Authorization: token },
    }
    // @ts-expect-error
    return utils.makeRequest(fnName, url, reqConfig, fnConfig)
}

export default {
    getAvatar,
    getWallpaper,
}
