
import CrunchyrollError from './src/error.js'
import logger from './src/logger.js'
import localStore from './src/localStore.js'
import types from './src/types.js'
import production from './src/config/app-config-default-production.json'
import configJson from './src/config/app-config-json-schema.json'
import configApp from './src/config/config.json'
import i18n from './src/config/index.i18n.json'
import account from './src/services/account.js'
import assets from './src/services/assets.js'
import auth from './src/services/auth.js'
import cms from './src/services/cms.js'
import content from './src/services/content.js'
import index from './src/services/index.js'
import review from './src/services/review.js'
import subscription from './src/services/subscription.js'

export const api = {
    account,
    assets,
    auth,
    cms,
    content,
    index,
    review,
    subscription,
}
export const config = {
    production,
    json: configJson,
    configApp,
    i18n,
}
export { logger }
export { localStore }
export { CrunchyrollError }
export { types }

export default {
    logger,
    localStore,
    CrunchyrollError,
    types,
    config,
    api,
}
