
import utils from '../utils.js'
import logger from '../logger.js'

/**
 * Return Avatar list
 * @param {{token: String}} obj
 * @returns {Promise<{items: Array<String>}>}
 */
async function getAvatar({ token }) {
    const fnName = 'getAvatar'
    logger.debug(fnName)
    const url = `/assets/v1/avatar`
    const reqConfig = {
        method: 'get',
        headers: { Authorization: token }
    }
    // @ts-expect-error
    return utils.makeRequest(fnName, url, reqConfig)
}

export default {
    getAvatar,
}
