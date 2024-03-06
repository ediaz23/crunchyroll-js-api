
import CrunchyrollError from './src/error.js'
import logger from './src/logger.js'
import localStore from './src/localStore.js'
import types from './src/types.js'
import configApp from './src/config/config.json'
import account from './src/services/account.js'
import assets from './src/services/assets.js'
import auth from './src/services/auth.js'
import content from './src/services/content.js'
import discover from './src/services/discover.js'
import music from './src/services/music.js'
import cms from './src/services/cms.js'
import index from './src/services/index.js'
import review from './src/services/review.js'
import subscription from './src/services/subscription.js'
import drm from './src/services/drm.js'
import utils from './src/utils.js'

export const api = {
    account,
    assets,
    auth,
    cms,
    content,
    discover,
    drm,
    index,
    music,
    review,
    subscription,
}
export const config = {
    configApp,
}
export { logger }
export { localStore }
export { CrunchyrollError }
export { types }
export { utils }

export default {
    logger,
    localStore,
    CrunchyrollError,
    types,
    config,
    api,
    utils,
}
