
import logger from './src/logger.js'
import localStore from './src/localStore.js'
import accountService from './src/services/account.js'
import fetch from 'node-fetch'
import content from './src/services/content.js'
import discover from './src/services/discover.js'
import cms from './src/services/cms.js'
import music from './src/services/music.js'

import fs from 'fs'


const $L = val => val
const __DEV__ = true
const LOAD_MOCK_DATA = true
let PROFILE

const getContentParam = async () => {
    const token = await localStore.getAuthToken()
    const accountId = (await localStore.getToken()).accountId
    return {
        token,
        accountId,
        locale: PROFILE.preferred_communication_language,
        audioLanguage: PROFILE.preferred_content_audio_language,
    }
}

const translateError = async error => { throw error }

const stringifySorted = (obj) => {
    const orderedObj = {}
    Object.keys(obj).sort().forEach(key => {
        orderedObj[key] = obj[key]
    })
    return JSON.stringify(orderedObj)
}

/**
 * Convert a object to string
 * @param {Object} obj
 * @returns {String}
 */
function objectToStringForFileName(obj) {
    for (const vals of Object.values(obj)) {
        if (Array.isArray(vals)) {
            vals.sort()
        }
    }
    return stringifySorted(obj)
        .replace(/[{}"[\]]/g, '')
        .replace(/:/g, '-')
        .replace(/,/g, '_');
}

/**
 * Returno filename to mockdata
 * @param {String} name
 * @param {Array<String>} [objectIds]
 * @returns {String}
 */
export function getMockFilename(name, objectIds) {
    let suff = ''
    if (objectIds) {
        if (objectIds instanceof String || typeof objectIds === 'string') {
            objectIds = objectIds.split('-')
        } else if (Array.isArray(objectIds)) {
            // nothing
        } else {
            objectIds = [objectToStringForFileName(objectIds)]
        }
        suff = '-' + [...objectIds].sort().join('-').substring(0, 200)
    }
    return `${name}${suff}.json`
}

async function getMockData(name, params) {
    const filename = `mock/${getMockFilename(name, params)}`
    if (fs.existsSync(filename)) {
        const data = fs.readFileSync(filename)
        return JSON.parse(data)
    } else {
        let res
        const account = await getContentParam()
        if (name === 'objects') {
            res = await cms.getObjects({ account, ...params })
        } else if (name === 'concerts') {
            res = await music.getConcerts({ account, concertIds: params })
        } else if (name === 'similar') {
            res = await discover.getSimilar({ account, ...params })
        } else if (name === 'artist') {
            res = await music.getArtist({ account, artistIds: params })
        } else if (name === 'browse') {
            res = await discover.getBrowseAll({ account, ...params })
        } else if (name === 'discoverWatchlist') {
            res = await discover.getWatchlist({ account, ...params })
        } else if (name === 'discoverHistory') {
            res = await discover.getHistory({ account, ...params })
        } else if (name === 'discoverRecomendantion') {
            res = await discover.getRecommendations({ account, ...params })
        } else if (name === 'categories') {
            res = await discover.getCategories({ account, ...params })
        } else {
            throw new Error('no existe ' + name)
        }
        fs.writeFileSync(filename, JSON.stringify(res, null, '    '))
        return res
    }
}


/**
 * Get object data
 * @param {import('crunchyroll-js-api/src/types').Profile} profile
 * @param {Object} params
 * @param {Array<String>} params.objectIds
 * @param {Boolean} [params.ratings]
 * @return {Promise}
 */
const getObjects = async (profile, params) => {
    let out = null
    try {
        if (__DEV__ && LOAD_MOCK_DATA) {
            out = await getMockData('objects', params)
        } else {
            const account = await getContentParam(profile)
            out = await content.getObjects({ account, ...params })
        }
    } catch (error) {
        await translateError(error)
    }
    return out
}

/**
 * Get object data
 * @param {import('crunchyroll-js-api/src/types').Profile} profile
 * @param {Array<String>} artistIds
 * @return {Promise}
 */
const getMusicArtists = async (profile, artistIds) => {
    let out = null
    try {
        if (__DEV__ && LOAD_MOCK_DATA) {
            out = await getMockData('artist', artistIds)
        } else {
            const account = await getContentParam(profile)
            out = await music.getArtist({ account, artistIds })
        }
    } catch (error) {
        await translateError(error)
    }
    return out
}

/**
 * Get object data
 * @param {import('crunchyroll-js-api/src/types').Profile} profile
 * @param {Array<String>} concertIds
 * @return {Promise}
 */
const getMusicConcerts = async (profile, concertIds) => {
    let out = null
    try {
        if (__DEV__ && LOAD_MOCK_DATA) {
            out = await getMockData('concerts', concertIds)
        } else {
            const account = await getContentParam(profile)
            out = await music.getConcerts({ account, concertIds })
        }
    } catch (error) {
        await translateError(error)
    }
    return out
}

/**
 * Get object data
 * @param {import('crunchyroll-js-api/src/types').Profile} profile
 * @param {Array<String>} musicIds
 * @return {Promise}
 */
const getMusicVideos = async (profile, musicIds) => {
    let out = null
    try {
        if (__DEV__ && LOAD_MOCK_DATA) {
            out = await getMockData('musicVideo', musicIds)
        } else {
            const account = await getContentParam(profile)
            out = await music.getVideo({ account, musicIds })
        }
    } catch (error) {
        await translateError(error)
    }
    return out
}

/**
 * Get object data
 * @param {import('crunchyroll-js-api/src/types').Profile} profile
 * @param {Object} params
 * @param {Number} [params.quantity]
 * @param {Boolean} [params.ratings]
 * @return {Promise}
 */
const getHistory = async (profile, params) => {
    let out = null
    try {
        if (__DEV__ && LOAD_MOCK_DATA) {
            out = await getMockData('discoverHistory', params)
        } else {
            const account = await getContentParam(profile)
            out = await discover.getHistory({ account, ...params })
        }
    } catch (error) {
        await translateError(error)
    }
    return out
}

/**
 * Get object data
 * @param {import('crunchyroll-js-api/src/types').Profile} profile
 * @param {Object} params
 * @param {Number} [params.quantity]
 * @param {Number} [params.start]
 * @return {Promise}
 */
const getWatchlist = async (profile, params) => {
    let out = null
    try {
        if (__DEV__ && LOAD_MOCK_DATA) {
            out = await getMockData('discoverWatchlist', params)
        } else {
            const account = await getContentParam(profile)
            out = await discover.getWatchlist({ account, ...params })
        }
    } catch (error) {
        await translateError(error)
    }
    return out
}

/**
 * Get object data
 * @param {import('crunchyroll-js-api/src/types').Profile} profile
 * @param {Object} params
 * @param {Number} [params.quantity]
 * @param {Number} [params.start]
 * @return {Promise}
 */
const getRecomendation = async (profile, params) => {
    let out = null
    try {
        if (__DEV__ && LOAD_MOCK_DATA) {
            out = await getMockData('discoverRecomendantion', params)
        } else {
            const account = await getContentParam(profile)
            out = await discover.getRecommendations({ account, ...params })
        }
    } catch (error) {
        await translateError(error)
    }
    return out
}

/**
 * Get object data
 * @param {import('crunchyroll-js-api/src/types').Profile} profile
 * @param {Object} params
 * @param {String} params.contentId
 * @param {Number} [params.quantity]
 * @param {Number} [params.start]
 * @return {Promise}
 */
const getSimilar = async (profile, params) => {
    let out = null
    try {
        if (__DEV__ && LOAD_MOCK_DATA) {
            out = await getMockData('similar', params)
        } else {
            const account = await getContentParam(profile)
            out = await discover.getSimilar({ account, ...params })
        }
    } catch (error) {
        await translateError(error)
    }
    return out
}

/**
 * Get object data
 * @param {import('crunchyroll-js-api/src/types').Profile} profile
 * @param {Object} params
 * @param {Number} [params.quantity] Number of records in a result
 * @param {Number} [params.start] Offset to request
 * @param {Array<String>} [params.category] Category
 * @param {String} [params.query] Search pattern
 * @param {String} [params.seasonTag] season tag
 * @param {String} [params.sort] sort results
 * @param {String} [params.type] type for search, example episode
 * @param {Boolean} [params.ratings]
 * @return {Promise}
 */
const getBrowseAll = async (profile, params) => {
    let out = null
    try {
        if (__DEV__ && LOAD_MOCK_DATA) {
            out = await getMockData('browse', params)
        } else {
            const account = await getContentParam(profile)
            out = await discover.getBrowseAll({ account, ...params })
        }
    } catch (error) {
        await translateError(error)
    }
    return out
}

/**
 * Expand a sort url
 * @param {String} url
 * @return {Promise<Response>}
 */
const expandURL = async (url) => {
    const token = await localStore.getAuthToken()
    return fetch(url, { headers: { 'Autorization': token } })
}


/**
 * Convert a link with short link into object with data
 * @param {{link: String}} item
 * @returns {Promise<Object>}
 */
const convertItem2Object = async (item) => {
    let out = null
    try {
        const res = await expandURL(item.link)
        let split = res.url.split('/')
        if (split.length > 1) {
            out = split[split.length - 2]
        }
    } catch (e) {
        logger.error(e)
    }
    return out
}

/**
 * Remove panel
 * @param {Object} panel
 * @returns {Object}
 */
const removePanelField = (panel) => {
    const newPanel = Object.assign({}, panel, panel.panel)
    delete newPanel.panel
    return newPanel
}

/**
 * Process Carousel item
 * @param {Object} carousel
 * @param {import('crunchyroll-js-api/src/types').Profile} profile
 * @returns {Promise<Object>}
 */
const processCarousel = async (carousel, profile) => {
    const out = {
        id: carousel.id,
        resource_type: carousel.resource_type,
        response_type: carousel.response_type,
        display_type: carousel.display_type,
        title: $L('Watch Now'),
        items: []
    }
    let objectIds
    if (__DEV__ && LOAD_MOCK_DATA) {
        objectIds = 'G50UZ1N4G-GEXH3W49E-GK9U3D2VV-GRDV0019R-GZ7UV13VE'.split('-')
    } else {
        const resObjectIds = await Promise.all(carousel.items.map(convertItem2Object))
        objectIds = Array.from(new Set(resObjectIds.filter(item => !!item)))
    }
    const { data } = await getObjects(profile, { objectIds, ratings: true })
    out.items = data
    return out
}

/**
 * Process Panels item
 * @param {Object} carousel
 * @return {Promise<Object>}
 */
const processPanels = async (carousel) => {
    const out = {
        id: 'panels',
        resource_type: carousel.panels[0].resource_type,
        response_type: carousel.panels[0].response_type,
        display_type: carousel.panels[0].display_type,
        title: $L('May Like'),
        items: carousel.panels.map(removePanelField)
    }

    return out
}

/**
 * Process InFeedPanels item
 * @param {Object} carousel
 * @param {import('crunchyroll-js-api/src/types').Profile} profile
 * @return {Promise<Object>}
 */
const processInFeedPanels = async (carousel, profile) => {
    const out = {
        id: 'in_feed_panels',
        resource_type: carousel.panels[0].resource_type,
        response_type: carousel.panels[0].response_type,
        display_type: carousel.panels[0].display_type,
        title: $L('Why Not?'),
        items: []
    }
    let objectIds
    if (__DEV__ && LOAD_MOCK_DATA) {
        objectIds = 'G4PH0WEKE-GNVHKNPQ7-GY8DWQN5Y'.split('-')
    } else {
        const resOjectIds = await Promise.all(carousel.panels.map(convertItem2Object))
        objectIds = Array.from(new Set(resOjectIds.filter(item => !!item)))
    }
    const { data } = await getObjects(profile, { objectIds, ratings: true })
    out.items = data
    return out
}

/**
 * Process InFeedPanels item
 * @param {Object} carousel
 * @param {import('crunchyroll-js-api/src/types').Profile} profile
 * @return {Promise<Object>}
 */
const processCuratedCollection = async (carousel, profile) => {
    let res = {}
    if ('artist' === carousel.response_type) {
        res = await getMusicArtists(profile, carousel.ids)
    } else if ('music_concert' === carousel.response_type) {
        res = await getMusicConcerts(profile, carousel.ids)
    } else if ('music_video' === carousel.response_type) {
        res = await getMusicVideos(profile, carousel.ids)
    } else {
        res = await getObjects(profile, { objectIds: carousel.ids, ratings: true })
    }
    return { ...carousel, items: res.data }
}

/**
 * Process InFeedPanels item
 * @param {Object} carousel
 * @param {import('crunchyroll-js-api/src/types').Profile} profile
 * @return {Promise<Object>}
 */
const processDynamicCollection = async (carousel, profile) => {
    let res = {}
    if ('history' === carousel.response_type) {
        res = await getHistory(profile, { quantity: 20, ratings: true })
        res = { data: res.data.map(removePanelField) }
    } else if ('watchlist' === carousel.response_type) {
        res = await getWatchlist(profile, { quantity: 20, ratings: true })
        res = { data: res.data.map(removePanelField) }
    } else if ('recommendations' === carousel.response_type) {
        res = await getRecomendation(profile, { quantity: 20, ratings: true })
    } else if ('because_you_watched' === carousel.response_type) {
        res = await getSimilar(profile, { contentId: carousel.source_media_id, quantity: 20, ratings: true })
    } else if ('recent_episodes' === carousel.response_type) {
        res = await getBrowseAll(profile, { type: 'episode', quantity: 20, sort: 'newly_added', ratings: true })
        const added = new Set()
        res = {
            data: res.data.filter(val => {
                let out = true
                if (val.type === 'episode') {
                    out = !added.has(val.episode_metadata.series_id)
                    added.add(val.episode_metadata.series_id)
                }
                return out
            })
        }
    } else if ('browse' === carousel.response_type) {
        const hash = { q: 'quantity', season_tag: 'seasonTag', sort_by: 'sort' }
        const params = {}
        if (carousel.query_params) {
            for (const key of Object.keys(carousel.query_params)) {
                const newKey = hash[key] || key
                params[newKey] = carousel.query_params[key]
            }
        }
        params.ratings = true
        res = await getBrowseAll(profile, params)
    } else {
        new Error(`Dynamic Collection not supported ${carousel.resource_type} - ${carousel.response_type}`)
    }

    return { ...carousel, items: res.data }
}

/**
 * Process a single item in feed
 * @param {Object} carousel
 * @param {import('crunchyroll-js-api/src/types').Profile} profile
 * @return {Promise<Object>}
 */
const processItemFeed = async (carousel, profile) => {
    let res = Promise.resolve(carousel)
    if (carousel.resource_type === 'hero_carousel') {
        res = processCarousel(carousel, profile)
    } else if (carousel.resource_type === 'panel') {
        res = processPanels(carousel)
    } else if (carousel.resource_type === 'in_feed_banner') {
        res = processInFeedPanels(carousel, profile)
    } else if (carousel.resource_type === 'curated_collection') {
        res = processCuratedCollection(carousel, profile)
    } else if (carousel.resource_type === 'dynamic_collection') {
        res = processDynamicCollection(carousel, profile)
    } else {
        new Error(`Feed not supported ${carousel.resource_type} - ${carousel.response_type}`)
    }
    return res.then(async (res2) => {
        if (res2.items) {
            await Promise.all(
                res2.items
                .map(val => val.id)
                .map(contentId => getMockData('categories', { contentId }))
            )
        }
    })
}

/**
 * Process the feed
 * @param {Array<{resource_type: String}>} feed
 * @param {import('crunchyroll-js-api/src/types').Profile} profile
 * @return {Promise<Array<Object>>}
 */
const postProcessHomefeed = async (feed) => {
    const mergedFeed = []
    const panelObject = { resource_type: 'panel', panels: [] }
    const bannerObject = { resource_type: 'in_feed_banner', panels: [] }
    for (const item of feed) {
        if (item.resource_type === 'panel') {
            if (panelObject.panels.length === 0) {
                mergedFeed.push(panelObject)
            }
            panelObject.panels.push(item)
        } else if (item.resource_type === 'in_feed_banner') {
            if (bannerObject.panels.length === 0) {
                mergedFeed.push(bannerObject)
            }
            bannerObject.panels.push(item)
        } else {
            mergedFeed.push(item)
        }
    }
    return mergedFeed
}


const homefeed = async (profile) => {
    const feedStr = fs.readFileSync('../crunchyroll-webos-stream/src/mock-data/data/homefeed.json').toString()
    const homefeed = JSON.parse(feedStr)
    for await (const feed of await postProcessHomefeed(homefeed.data)) {
        try {
            await processItemFeed(feed, profile)
        } catch (e) {
            console.log('error')
            console.log(feed)
            console.log(e)
        }
    }
}


async function main() {
    logger.setLevel('debug')
    await localStore.loadFromLocal()
    const token = await localStore.getAuthToken()
    const profile = await accountService.getProfile({ token })
    fs.mkdirSync('mock', { recursive: true })
    PROFILE = profile
    await homefeed(profile)
    //    await objectCategories(profile)
}

main().catch(e => {
    logger.error(e)
})
