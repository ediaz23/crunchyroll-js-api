
import utils from '../utils.js'
import logger from '../logger.js'


/**
 * @param {Object} obj
 * @param {import('../types').AccountAuth} obj.account
 * @param {Number} [obj.quantity] Number of records in a result
 * @param {Number} [obj.start] Offset to request
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<{items: Array<Object>}>}
 */
async function getFeed({ account, quantity, start, fnConfig }) {
    const fnName = 'getFeed'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    utils.addParam(queryData, 'n', quantity, val => val > 0)
    utils.addParam(queryData, 'start', start, val => val >= 0)
    const query = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/music/${account.accountId}/landing_feed?${query}`
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
 * @param {Array<String>} [obj.artistIds]
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<{items: Array<Object>}>}
 */
async function getArtist({ account, artistIds, fnConfig }) {
    const fnName = 'getArtist'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const query = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/music/artists/${artistIds.join(',')}?${query}`
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
 * @param {Array<String>} [obj.artistId]
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<{items: Array<Object>}>}
 */
async function getArtistConcerts({ account, artistId, fnConfig }) {
    const fnName = 'getArtistConcerts'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const query = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/music/artists/${artistId}/concerts?${query}`
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
 * @param {String} obj.artistId
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<{items: Array<Object>}>}
 */
async function getArtistVideos({ account, artistId, fnConfig }) {
    const fnName = 'getArtistVideos'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const query = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/music/artists/${artistId}/music_videos?${query}`
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
 * @param {Array<String>} [obj.concertIds]
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<{items: Array<Object>}>}
 */
async function getConcerts({ account, concertIds, fnConfig }) {
    const fnName = 'getConcerts'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const query = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/music/concerts/${concertIds.join(',')}?${query}`
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
 * @param {Array<String>} [obj.musicIds]
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<{items: Array<Object>}>}
 */
async function getVideo({ account, musicIds, fnConfig }) {
    const fnName = 'getVideo'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const query = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/music/music_videos/${musicIds.join(',')}?${query}`
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
    const url = `/content/v2/music/${contentId}/streams?${queryStr}`
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
 * @param {Number} obj.contentId Number of records in a result
 * @param {import('../types').FetchConfig} [obj.fnConfig]  util config param
 * @returns {Promise<{items: Array<Object>}>}
 */
async function getFeatured({ account, contentId, fnConfig }) {
    const fnName = 'getFeatured'
    logger.debug(fnName)
    const queryData = { locale: account.locale, preferred_audio_language: account.audioLanguage }
    const queryStr = await utils.toURLSearchParams(queryData)
    const url = `/content/v2/music/featured/${contentId}?${queryStr}`
    const reqConfig = {
        method: 'get',
        headers: { Authorization: account.token }
    }
    // @ts-expect-error
    return utils.makeRequest(fnName, url, reqConfig, fnConfig)
}

export default {
    getArtist,
    getArtistConcerts,
    getArtistVideos,
    getConcerts,
    getFeed,
    getStreams,
    getStreamsWithURL,
    getVideo,
    getFeatured,
}
