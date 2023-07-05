
import utils from '../utils.js'
import logger from '../logger.js'


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.episodeId
 * @returns {Promise<Object>}
 */
async function getEpisode({ account, episodeId }) {
    const fnName = 'getEpisode'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/cms/episodes/${episodeId}?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': account.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.seasonId
 * @returns {Promise<Object>}
 */
async function getEpisodes({ account, seasonId }) {
    const fnName = 'getEpisodes'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/cms/seasons/${seasonId}/episodes?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': account.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').CmsAuth} obj.cmsAuth
 * @param {String} obj.movieId
 * @returns {Promise<Object>}
 */
async function getMovie({ account, movieId }) {
    const fnName = 'getMovie'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/cms/movies/${movieId}?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': account.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.movieListingId
 * @returns {Promise<Object>}
 */
async function getMovieListing({ account, movieListingId }) {
    const fnName = 'getMovieListing'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/cms/movie_listings/${movieListingId}?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': account.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}

/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.movieListingId
 * @returns {Promise<Object>}
 */
async function getMovieListingExtras({ account, movieListingId }) {
    const fnName = 'getMovieListingExtras'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/cms/movie_listings/${movieListingId}/extra_videos?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': account.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.movieListingId
 * @returns {Promise<Object>}
 */
async function getMovies({ account, movieListingId }) {
    const fnName = 'getMovies'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/cms/movie_listings/${movieListingId}/movies?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': account.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}

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
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
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
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.seasonId
 * @returns {Promise<Object>}
 */
async function getSeason({ account, seasonId }) {
    const fnName = 'getSeason'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/cms/seasons/${seasonId}?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': account.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}

/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.seasonId
 * @returns {Promise<Object>}
 */
async function getSeasonExtras({ account, seasonId }) {
    const fnName = 'getSeasonExtras'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/cms/seasons/${seasonId}/extra_videos?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': account.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}

/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.serieId
 * @returns {Promise<Object>}
 */
async function getSeasons({ account, serieId }) {
    const fnName = 'getSeasons'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/cms/series/${serieId}/seasons?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': account.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}

/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.serieId
 * @returns {Promise<Object>}
 */
async function getSeries({ account, serieId }) {
    const fnName = 'getSeries'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/cms/series/${serieId}?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': account.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}

/**
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.streamUrl
 * @returns {Promise<Object>}
 */
async function getStreamsWithURL({ account, streamUrl }) {
    const fnName = 'getStreamsWithURL'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `${streamUrl}?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': account.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}

/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.contentId
 * @returns {Promise<Object>}
 */
async function getStreams({ account, contentId }) {
    const fnName = 'getStreams'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/cms/videos/${contentId}/streams?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': account.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}

export default {
    getEpisode,
    getEpisodes,
    getMovie,
    getMovieListing,
    getMovieListingExtras,
    getMovies,
    getObjects,
    getSeason,
    getSeasonExtras,
    getSeasons,
    getSeries,
    getStreamsWithURL,
    getStreams,
}
