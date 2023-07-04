
import utils from '../utils.js'
import logger from '../logger.js'


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {Number} [obj.quantity] Number of records in a result
 * @param {Number} [obj.start] Offset to request
 * @returns {Promise<{items: Array<Object>}>}
 */
async function getFeed({ account, quantity, start }) {
    const fnName = 'getFeed'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    utils.addParam(queryData, 'n', quantity, val => val > 0)
    utils.addParam(queryData, 'start', start, val => val >= 0)
    const query = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/music/landing_feed?${query}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': account.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {Array<String>} [obj.artistIds]
 * @returns {Promise<{items: Array<Object>}>}
 */
async function getArtist({ account, artistIds }) {
    const fnName = 'getArtist'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const query = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/music/artists/${artistIds.join(',')}?${query}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': account.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {Array<String>} [obj.artistIds]
 * @returns {Promise<{items: Array<Object>}>}
 */
async function getArtistConcerts({ account, artistId }) {
    const fnName = 'getArtistConcerts'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const query = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/music/artists/${artistId}/concerts?${query}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': account.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {String} obj.artistId
 * @returns {Promise<{items: Array<Object>}>}
 */
async function getArtistVideos({ account, artistId }) {
    const fnName = 'getArtistVideos'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const query = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/music/artists/${artistId}/music_videos?${query}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': account.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {Array<String>} [obj.concertIds]
 * @returns {Promise<{items: Array<Object>}>}
 */
async function getConcerts({ account, concertIds }) {
    const fnName = 'getConcerts'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const query = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/music/concerts/${concertIds.join(',')}?${query}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': account.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {Array<String>} [obj.musicIds]
 * @returns {Promise<{items: Array<Object>}>}
 */
async function getVideo({ account, musicIds }) {
    const fnName = 'getVideo'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const query = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/music/music_videos/${musicIds.join(',')}?${query}`
    const reqConfig = {
        method: 'get',
        headers: { 'Authorization': account.token }
    }
    return utils.makeRequest(fnName, url, reqConfig)
}

export default {
    getFeed,
    getArtist,
    getArtistConcerts,
    getArtistVideos,
    getConcerts,
    getVideo,
}
