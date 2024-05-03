
import utils from '../utils.js'
import logger from '../logger.js'

/**
 * Return Avatar list
 * @param {{token: String, lang: String}} obj
 * @returns {Promise<{items: Array<import('../types.js').AssesItem>}>}
 */
async function getAvatar({ token, lang }) {
    const fnName = 'getAvatar'
    logger.debug(fnName)
    const url = `/assets/v2/${lang}/avatar`
    const reqConfig = {
        method: 'get',
        headers: { Authorization: token },
    }
    // @ts-expect-error
    return utils.makeRequest(fnName, url, reqConfig)
}

/**
 * Return Aallpaper list
 * @param {{token: String, lang: String}} obj
 * @returns {Promise<{items: Array<import('../types.js').AssesItem>}>}
 */
async function getWallpaper({ token, lang }) {
    const fnName = 'getWallpaper'
    logger.debug(fnName)
    const url = `/assets/v2/${lang}/wallpaper`
    const reqConfig = {
        method: 'get',
        headers: { Authorization: token },
    }
    // @ts-expect-error
    return utils.makeRequest(fnName, url, reqConfig)
}

export default {
    getAvatar,
    getWallpaper,
}
