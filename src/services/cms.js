
const utils = require('../utils')
const logger = require('../logger')
const { URLSearchParams } = require('url')


/**
 * @param {import('./../controllers/clients').Clients} client
 * @returns {Promise<Object>}
 */
async function getBaseParams(client) {
    const cms = await client.getCms()
    const queryData = {locale: await client.getLocale()}
    utils.addParam(queryData, 'Policy', cms.policy)
    utils.addParam(queryData, 'Signature', cms.signature)
    utils.addParam(queryData, 'Key-Pair-Id', cms.keyPairId)
    return queryData
}


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} episodeId
 * @returns {Promise<Object>}
 */
async function getEpisode(client, episodeId) {
    const fnName = 'getEpisode'
    logger.debug(fnName)
    const queryData = await getBaseParams(client)
    const queryStr = new URLSearchParams(queryData)
    const cms = await client.getCms()
    const url = `/cms/v2${cms.bucket}/episodes/${episodeId}?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': await client.getToken() }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} episodeId
 * @returns {Promise<Object>}
 */
async function getEpisodes(client, seasonId) {
    const fnName = 'getEpisodes'
    logger.debug(fnName)
    const queryData = await getBaseParams(client)
    utils.addParam(queryData, 'season_id', seasonId, val => val)
    const queryStr = new URLSearchParams(queryData)
    const cms = await client.getCms()
    const url = `/cms/v2${cms.bucket}/episodes?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': await client.getToken() }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} movieId
 * @returns {Promise<Object>}
 */
async function getMovie(client, movieId) {
    const fnName = 'getMovie'
    logger.debug(fnName)
    const queryData = await getBaseParams(client)
    const queryStr = new URLSearchParams(queryData)
    const cms = await client.getCms()
    const url = `/cms/v2${cms.bucket}/movies/${movieId}?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': await client.getToken() }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} movieListingId
 * @returns {Promise<Object>}
 */
async function getMovieListing(client, movieListingId) {
    const fnName = 'getMovieListing'
    logger.debug(fnName)
    const queryData = await getBaseParams(client)
    const queryStr = new URLSearchParams(queryData)
    const cms = await client.getCms()
    const url = `/cms/v2${cms.bucket}/movie_listings/${movieListingId}?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': await client.getToken() }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} movieListingId
 * @returns {Promise<Object>}
 */
async function getMovieListingExtras(client, movieListingId) {
    const fnName = 'getMovieListingExtras'
    logger.debug(fnName)
    const queryData = await getBaseParams(client)
    const queryStr = new URLSearchParams(queryData)
    const cms = await client.getCms()
    const url = `/cms/v2${cms.bucket}/movie_listings/${movieListingId}/extra_videos?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': await client.getToken() }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} movieListingId
 * @returns {Promise<Object>}
 */
async function getMovies(client, movieListingId) {
    const fnName = 'getMovies'
    logger.debug(fnName)
    const queryData = await getBaseParams(client)
    utils.addParam(queryData, 'movie_listing_id', movieListingId, val => val)
    const queryStr = new URLSearchParams(queryData)
    const cms = await client.getCms()
    const url = `/cms/v2${cms.bucket}/movies?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': await client.getToken() }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} panelId
 * @returns {Promise<Object>}
 */
async function getPanelIds(client, panelId) {
    return getPanels(client, panelId, 'items(id)')
}


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} panelId
 * @returns {Promise<Object>}
 */
async function getPanelImages(client, panelId) {
    return getPanels(client, panelId, 'items(id, images)')
}


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} panelId
 * @param {String} fields
 * @returns {Promise<Object>}
 */
async function getPanels(client, panelId, fields) {
    const fnName = '_getPanelIds'
    logger.debug(fnName)
    const queryData = await getBaseParams(client)
    utils.addParam(queryData, 'fields', fields, val => val && val.startsWith('items('))
    const queryStr = new URLSearchParams(queryData)
    const cms = await client.getCms()
    const url = `/cms/v2${cms.bucket}/objects/${panelId}?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: {
            'Authorization': await client.getToken(),
            'add_watchlist_status': true,
        }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} seasonId
 * @returns {Promise<Object>}
 */
async function getSeason(client, seasonId) {
    const fnName = 'getSeason'
    logger.debug(fnName)
    const queryData = await getBaseParams(client)
    const queryStr = new URLSearchParams(queryData)
    const cms = await client.getCms()
    const url = `/cms/v2${cms.bucket}/seasons/${seasonId}?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': await client.getToken() }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} seasonId
 * @returns {Promise<Object>}
 */
async function getSeasonExtras(client, seasonId) {
    const fnName = 'getSeasonExtras'
    logger.debug(fnName)
    const queryData = await getBaseParams(client)
    const queryStr = new URLSearchParams(queryData)
    const cms = await client.getCms()
    const url = `/cms/v2${cms.bucket}/seasons/${seasonId}/extra_videos?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': await client.getToken() }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} serieId
 * @returns {Promise<Object>}
 */
async function getSeasons(client, serieId) {
    const fnName = 'getSeasons'
    logger.debug(fnName)
    const queryData = await getBaseParams(client)
    utils.addParam(queryData, 'series_id', serieId, val => val)
    const queryStr = new URLSearchParams(queryData)
    const cms = await client.getCms()
    const url = `/cms/v2${cms.bucket}/seasons?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': await client.getToken() }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} serieId
 * @returns {Promise<Object>}
 */
async function getSeries(client, serieId) {
    const fnName = 'getSeries'
    logger.debug(fnName)
    const queryData = await getBaseParams(client)
    const queryStr = new URLSearchParams(queryData)
    const cms = await client.getCms()
    const url = `/cms/v2${cms.bucket}/series/${serieId}?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': await client.getToken() }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} streamURl
 * @returns {Promise<Object>}
 */
async function getStreamsWithURL(client, streamURl) {
    const fnName = 'getStreamsWithURL'
    logger.debug(fnName)
    const queryData = await getBaseParams(client)
    const queryStr = new URLSearchParams(queryData)
    const url = `${streamURl}?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': await client.getToken() }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} contentId
 * @returns {Promise<Object>}
 */
async function getStreams(client, contentId) {
    const fnName = 'getStreams'
    logger.debug(fnName)
    const queryData = await getBaseParams(client)
    const queryStr = new URLSearchParams(queryData)
    const cms = await client.getCms()
    const url = `/cms/v2${cms.bucket}/videos/${contentId}/streams?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': await client.getToken() }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {import('./../controllers/clients').Clients} client
 * @param {String} externalId external_id from panels
 * @param {String} [channelId]
 * @returns {Promise<Object>}
 */
async function lookup(client, externalId, channelId) {
    const fnName = 'lookup'
    logger.debug(fnName)
    const queryData = await getBaseParams(client)
    utils.addParam(queryData, 'external_id', externalId, val => val)
    utils.addParam(queryData, 'channel_id', channelId ? channelId : 'crunchyroll', val => val)
    const queryStr = new URLSearchParams(queryData)
    const cms = await client.getCms()
    const url = `/cms/v2${cms.bucket}/lookup?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': await client.getToken() }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}

module.exports = {
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
