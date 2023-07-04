
import utils from '../utils.js'
import logger from '../logger.js'


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {Array<String>} obj.objectIds
 * @param {Boolean} obj.ratings
 * @returns {Promise<{total: Number, data: Array<Object>, meta: Object}>}
 */
async function getObjects({ account, objectIds, ratings }) {
    const fnName = 'getObjects'
    logger.debug(fnName)
    const queryData = { locale: account.locale }
    utils.addParam(queryData, 'ratings', ratings)
    const query = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/cms/objects/${objectIds.join(',')}?${query}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': account.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {import('../types').CmsAuth} cms
 * @returns {Promise<Object>}
 */
async function getBaseParams(cms) {
    const queryData = { locale: cms.locale }
    utils.addParam(queryData, 'Policy', cms.policy)
    utils.addParam(queryData, 'Signature', cms.signature)
    utils.addParam(queryData, 'Key-Pair-Id', cms.keyPairId)
    return queryData
}


/**
 * @param {Object} obj
 * @param {import('../types').CmsAuth} obj.cmsAuth
 * @param {String} obj.episodeId
 * @returns {Promise<Object>}
 */
async function getEpisode({ cmsAuth, episodeId }) {
    const fnName = 'getEpisode'
    logger.debug(fnName)
    const queryData = await getBaseParams(cmsAuth)
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/cms/v2${cmsAuth.bucket}/episodes/${episodeId}?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': cmsAuth.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').CmsAuth} obj.cmsAuth
 * @param {String} obj.seasonId
 * @returns {Promise<Object>}
 */
async function getEpisodes({ cmsAuth, seasonId }) {
    const fnName = 'getEpisodes'
    logger.debug(fnName)
    const queryData = await getBaseParams(cmsAuth)
    utils.addParam(queryData, 'season_id', seasonId, val => val)
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/cms/v2${cmsAuth.bucket}/episodes?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': cmsAuth.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').CmsAuth} obj.cmsAuth
 * @param {String} obj.movieId
 * @returns {Promise<Object>}
 */
async function getMovie({ cmsAuth, movieId }) {
    const fnName = 'getMovie'
    logger.debug(fnName)
    const queryData = await getBaseParams(cmsAuth)
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/cms/v2${cmsAuth.bucket}/movies/${movieId}?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': movieId.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').CmsAuth} obj.cmsAuth
 * @param {String} obj.movieListingId
 * @returns {Promise<Object>}
 */
async function getMovieListing({ cmsAuth, movieListingId }) {
    const fnName = 'getMovieListing'
    logger.debug(fnName)
    const queryData = await getBaseParams(cmsAuth)
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/cms/v2${cmsAuth.bucket}/movie_listings/${movieListingId}?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': cmsAuth.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').CmsAuth} obj.cmsAuth
 * @param {String} obj.movieListingId
 * @returns {Promise<Object>}
 */
async function getMovieListingExtras({ cmsAuth, movieListingId }) {
    const fnName = 'getMovieListingExtras'
    logger.debug(fnName)
    const queryData = await getBaseParams(cmsAuth)
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/cms/v2${cmsAuth.bucket}/movie_listings/${movieListingId}/extra_videos?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': cmsAuth.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').CmsAuth} obj.cmsAuth
 * @param {String} obj.movieListingId
 * @returns {Promise<Object>}
 */
async function getMovies({ cmsAuth, movieListingId }) {
    const fnName = 'getMovies'
    logger.debug(fnName)
    const queryData = await getBaseParams(cmsAuth)
    utils.addParam(queryData, 'movie_listing_id', movieListingId, val => val)
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/cms/v2${cmsAuth.bucket}/movies?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': cmsAuth.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').CmsAuth} obj.cmsAuth
 * @param {String} obj.panelId
 * @returns {Promise<Object>}
 */
async function getPanelIds({ cmsAuth, panelId }) {
    return _getPanels({ cmsAuth, panelId, fields: 'items(id)' })
}


/**
 * @param {Object} obj
 * @param {import('../types').CmsAuth} obj.cmsAuth
 * @param {String} obj.panelId
 * @returns {Promise<Object>}
 */
async function getPanelImages({ cmsAuth, panelId }) {
    return _getPanels({ cmsAuth, panelId, fields: 'items(id, images)' })
}


/**
 * @param {Object} obj
 * @param {import('../types').CmsAuth} obj.cmsAuth
 * @param {String} obj.panelId
 * @param {String} obj.fields
 * @returns {Promise<Object>}
 */
async function getPanels({ cmsAuth, panelId, fields }) {
    return _getPanels({ cmsAuth, panelId, fields })
}


/**
 * @param {Object} obj
 * @param {import('../types').CmsAuth} obj.cmsAuth
  * @param {String} obj.panelId
 * @param {String} obj.fields
 * @returns {Promise<Object>}
 */
async function _getPanels({ cmsAuth, panelId, fields }) {
    const fnName = '_getPanelIds'
    logger.debug(fnName)
    const queryData = await getBaseParams(cmsAuth)
    utils.addParam(queryData, 'fields', fields, val => val && val.startsWith('items('))
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/cms/v2${cmsAuth.bucket}/objects/${panelId}?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: {
            'Authorization': cmsAuth.token,
            'add_watchlist_status': true,
        }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').CmsAuth} obj.cmsAuth
 * @param {String} obj.seasonId
 * @returns {Promise<Object>}
 */
async function getSeason({ cmsAuth, seasonId }) {
    const fnName = 'getSeason'
    logger.debug(fnName)
    const queryData = await getBaseParams(cmsAuth)
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/cms/v2${cmsAuth.bucket}/seasons/${seasonId}?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': cmsAuth.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').CmsAuth} obj.cmsAuth
 * @param {String} obj.seasonId
 * @returns {Promise<Object>}
 */
async function getSeasonExtras({ cmsAuth, seasonId }) {
    const fnName = 'getSeasonExtras'
    logger.debug(fnName)
    const queryData = await getBaseParams(cmsAuth)
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/cms/v2${cmsAuth.bucket}/seasons/${seasonId}/extra_videos?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': cmsAuth.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').CmsAuth} obj.cmsAuth
 * @param {String} obj.seasonId
 * @returns {Promise<Object>}
 */
async function getSeasons({ cmsAuth, serieId }) {
    const fnName = 'getSeasons'
    logger.debug(fnName)
    const queryData = await getBaseParams(cmsAuth)
    utils.addParam(queryData, 'series_id', serieId, val => val)
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/cms/v2${cmsAuth.bucket}/seasons?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': cmsAuth.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').CmsAuth} obj.cmsAuth
 * @param {String} obj.serieId
 * @returns {Promise<Object>}
 */
async function getSeries({ cmsAuth, serieId }) {
    const fnName = 'getSeries'
    logger.debug(fnName)
    const queryData = await getBaseParams(cmsAuth)
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/cms/v2${cmsAuth.bucket}/series/${serieId}?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': cmsAuth.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').CmsAuth} obj.cmsAuth
 * @param {String} obj.streamUrl
 * @returns {Promise<Object>}
 */
async function getStreamsWithURL({ cmsAuth, streamUrl }) {
    const fnName = 'getStreamsWithURL'
    logger.debug(fnName)
    const queryData = await getBaseParams(cmsAuth)
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `${streamUrl}?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': cmsAuth.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').CmsAuth} obj.cmsAuth
 * @param {String} obj.contentId
 * @returns {Promise<Object>}
 */
async function getStreams({ cmsAuth, contentId }) {
    const fnName = 'getStreams'
    logger.debug(fnName)
    const queryData = await getBaseParams(cmsAuth)
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/cms/v2${cmsAuth.bucket}/videos/${contentId}/streams?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': cmsAuth.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').CmsAuth} obj.cmsAuth
 * @param {String} obj.contentId
 * @returns {Promise<Object>}
 */
async function lookup({ cmsAuth, externalId, channelId }) {
    const fnName = 'lookup'
    logger.debug(fnName)
    const queryData = await getBaseParams(cmsAuth)
    utils.addParam(queryData, 'external_id', externalId, val => val)
    utils.addParam(queryData, 'channel_id', channelId ? channelId : 'crunchyroll', val => val)
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/cms/v2${cmsAuth.bucket}/lookup?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': cmsAuth.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}

export default {
    
    getObjects,
    
    getEpisode,
    getEpisodes,
    getMovie,
    getMovieListing,
    getMovieListingExtras,
    getMovies,
    getPanelIds,
    getPanelImages,
    getPanels,
    getSeason,
    getSeasonExtras,
    getSeasons,
    getSeries,
    getStreamsWithURL,
    getStreams,
    lookup,
}
