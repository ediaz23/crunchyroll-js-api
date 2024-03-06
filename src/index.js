
import CrunchyrollError from './error.js'
import logger from './logger.js'
import localStore from './localStore.js'
import types from './types.js'
import configApp from './config/config.json'
import account from './services/account.js'
import assets from './services/assets.js'
import auth from './services/auth.js'
import content from './services/content.js'
import discover from './services/discover.js'
import music from './services/music.js'
import cms from './services/cms.js'
import index from './services/index.js'
import review from './services/review.js'
import subscription from './services/subscription.js'
import drm from './services/drm.js'
import utils from './utils.js'

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
