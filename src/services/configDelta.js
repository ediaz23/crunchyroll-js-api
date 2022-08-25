
const { URLSearchParams } = require('url')
const fetch = require('node-fetch')
const config = require('./config/config.json')
const utils = require('../utils')

/**
how to call 
    const data = await getConfigDelta(accessToken, config.app_id, config.version_name)
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
async function getConfigDelta(accessToken, appId, appVersion) {
    const fnName = 'getConfigDelta'
    console.log(fnName)
    const params = {app_version: appVersion}
    const url = `${config.url}/config-delta/v2/apps/${appId}/config_delta?` + new URLSearchParams(params)
//    , anonymous_id: 123
    /** @type {import('node-fetch').Response} */
    const res = await fetch(url, {
        method: 'get',
        headers: {
            'Authorization': accessToken,
        }
    })
    await utils.logRes(fnName, res)
}

module.exports = {
    getConfigDelta
}
