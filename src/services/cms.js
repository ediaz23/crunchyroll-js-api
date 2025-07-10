
import utils from '../utils.js'
import logger from '../logger.js'
import config from '../config.js'


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.episodeId
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<Object>}
 */
async function getEpisode({ account, episodeId, fnConfig }) {
    const fnName = 'getEpisode'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/cms/episodes/${episodeId}?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { Authorization: account.token }
    }
    // @ts-expect-error
    return utils.makeRequest(fnName, url, reqConfig, fnConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.seasonId
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<Object>}
 */
async function getEpisodes({ account, seasonId, fnConfig }) {
    const fnName = 'getEpisodes'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/cms/seasons/${seasonId}/episodes?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { Authorization: account.token }
    }
    // @ts-expect-error
    return utils.makeRequest(fnName, url, reqConfig, fnConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.movieId
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<Object>}
 */
async function getMovie({ account, movieId, fnConfig }) {
    const fnName = 'getMovie'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/cms/movies/${movieId}?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { Authorization: account.token }
    }
    // @ts-expect-error
    return utils.makeRequest(fnName, url, reqConfig, fnConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.movieListingId
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<Object>}
 */
async function getMovieListing({ account, movieListingId, fnConfig }) {
    const fnName = 'getMovieListing'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/cms/movie_listings/${movieListingId}?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { Authorization: account.token }
    }
    // @ts-expect-error
    return utils.makeRequest(fnName, url, reqConfig, fnConfig)
}

/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.movieListingId
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<Object>}
 */
async function getMovieListingExtras({ account, movieListingId, fnConfig }) {
    const fnName = 'getMovieListingExtras'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/cms/movie_listings/${movieListingId}/extra_videos?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { Authorization: account.token }
    }
    // @ts-expect-error
    return utils.makeRequest(fnName, url, reqConfig, fnConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.movieListingId
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<Object>}
 */
async function getMovies({ account, movieListingId, fnConfig }) {
    const fnName = 'getMovies'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/cms/movie_listings/${movieListingId}/movies?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { Authorization: account.token }
    }
    // @ts-expect-error
    return utils.makeRequest(fnName, url, reqConfig, fnConfig)
}

/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {Array<String>} obj.objectIds
 * @param {Boolean} obj.ratings
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<{total: Number, data: Array<Object>, meta: Object}>}
 */
async function getObjects({ account, objectIds, ratings, fnConfig }) {
    const fnName = 'getObjects'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    utils.addParam(queryData, 'ratings', ratings)
    const query = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/cms/objects/${objectIds.join(',')}?${query}`
    const reqConfig = {
        method: 'get',
        headers: { Authorization: account.token }
    }
    // @ts-expect-error
    return utils.makeRequest(fnName, url, reqConfig, fnConfig)
}

/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.seasonId
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<Object>}
 */
async function getSeason({ account, seasonId, fnConfig }) {
    const fnName = 'getSeason'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/cms/seasons/${seasonId}?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { Authorization: account.token }
    }
    // @ts-expect-error
    return utils.makeRequest(fnName, url, reqConfig, fnConfig)
}

/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.seasonId
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<Object>}
 */
async function getSeasonExtras({ account, seasonId, fnConfig }) {
    const fnName = 'getSeasonExtras'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/cms/seasons/${seasonId}/extra_videos?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { Authorization: account.token }
    }
    // @ts-expect-error
    return utils.makeRequest(fnName, url, reqConfig, fnConfig)
}

/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.serieId
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<Object>}
 */
async function getSeasons({ account, serieId, fnConfig }) {
    const fnName = 'getSeasons'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/cms/series/${serieId}/seasons?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { Authorization: account.token }
    }
    // @ts-expect-error
    return utils.makeRequest(fnName, url, reqConfig, fnConfig)
}

/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.serieId
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<Object>}
 */
async function getSeries({ account, serieId, fnConfig }) {
    const fnName = 'getSeries'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/cms/series/${serieId}?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { Authorization: account.token }
    }
    // @ts-expect-error
    return utils.makeRequest(fnName, url, reqConfig, fnConfig)
}

/**
 * @deprecated
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.streamUrl
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<Object>}
 */
async function getStreamsWithURL({ account, streamUrl, fnConfig }) {
    const fnName = 'getStreamsWithURL'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `${streamUrl}?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { Authorization: account.token }
    }
    // @ts-expect-error
    return utils.makeRequest(fnName, url, reqConfig, fnConfig)
}

/**
 * @deprecated
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.contentId
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<Object>}
 */
async function getStreams({ account, contentId, fnConfig }) {
    const fnName = 'getStreams'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/cms/videos/${contentId}/streams?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { Authorization: account.token }
    }
    // @ts-expect-error
    return utils.makeRequest(fnName, url, reqConfig, fnConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.contentId
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<Object>}
 */
async function getSkiptEvents({ account, contentId, fnConfig }) {
    const fnName = 'getSkiptEvents'
    logger.debug(fnName)
    const url = `${config.urlStatic}/skip-events/production/${contentId}.json`
    const reqConfig = {
        method: 'get',
        headers: { Authorization: account.token },
        baseUrlIncluded: true,
    }
    let out = null
    try {
        // @ts-expect-error
        out = await utils.makeRequest(fnName, url, reqConfig, fnConfig)
    } catch (_e) {
        // ignore any error
    }
    return out
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
    getSkiptEvents,
}
