
import utils from '../utils.js'
import logger from '../logger.js'


/**
 * Return index data. Cms is set there
 * @param {{token: String}}
 * @returns {Promise<import('../types').CmsContainer>}
 */
async function getIndexConfig({ token }) {
    const fnName = 'getIndexConfig'
    logger.debug(fnName)
    const url = `/index/v2`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}

export default {
    getIndexConfig,
}
