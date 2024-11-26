
import CrunchyrollError from './error.js'
import logger from './logger.js'
import localStore from './localStore.js'
import configApp from './config.js'
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
export * as Types from './types.js'

const api = {
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

const config = {
    configApp,
}

const CrunchyrollAPI = {
    logger,
    localStore,
    CrunchyrollError,
    config,
    api,
    utils,
}

export {
    logger,
    localStore,
    CrunchyrollError,
    config,
    api,
    utils,
}

export default CrunchyrollAPI
