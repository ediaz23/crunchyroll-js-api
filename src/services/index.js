
import utils from '../utils.js'
import logger from '../logger.js'


/**
 * Return index data. Cms is set there
 * @param {{token: String}} obj
 * @returns {Promise<import('../types').CmsContainer>}
 */
async function getIndexConfig({ token }) {
    const fnName = 'getIndexConfig'
    logger.debug(fnName)
    const url = `/index/v2`
    const reqConfig = {
        method: 'get',
        headers: { Authorization: token }
    }
    // @ts-expect-error
    return utils.makeRequest(fnName, url, reqConfig)
}

export default {
    getIndexConfig,
}
