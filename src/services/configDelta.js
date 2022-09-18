
const utils = require('../utils')
const logger = require('../logger')
const { URLSearchParams } = require('url')

/**
how to call 
    const data = await getConfigDelta(client, config.app_id, config.version_name)
    configDelta.getConfigDelta(client, 'cr-android', '3.13.0')
It is something about segments and Analytics:
    com/segment/analytics/Analytics.java:197:
returning error
{
  code: 'config-delta.get_config_delta_v2.data_validation_error',
  context: [
    {
      code: 'config-delta.get_config_delta_v2.invalid_value',
      field: 'anonymous_id'
    }
  ]
}
 */


/**
 * @param {Object} obj
 * @param {import('../types').AuthBase} obj.auth
 * @param {String} obj.appId
 * @param {String} .objappVersion
 * @returns {Promise<Object>} 
 */
async function getConfigDelta({ auth, appId, appVersion }) {
    const fnName = 'getConfigDelta'
    logger.debug(fnName)
    const queryData = { locale: auth.locale }
    utils.addParam(queryData, 'app_version', appVersion, val => val)
    const query = new URLSearchParams(queryData)
    let url = `/config-delta/v2/apps/${appId}/config_delta?${query}`
    const reqConfig = {
        method: 'get',
        headers: {'Authorization': auth.token}
    }
    return utils.makeRequest(fnName, url, reqConfig)
}

module.exports = {
    getConfigDelta
}
