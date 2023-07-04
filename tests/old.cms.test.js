
import { expect } from '@jest/globals'

import localStore from '../src/localStore.js'
import testUtils from './testUtils.js'
import cms from '../src/services/old.cms.js'


/** @type {{cmsAuth : import('../types').CmsAuth}} */
let basicParam = null

beforeEach(async () => {
    await localStore.loadFromLocal()
    localStore.setExternalStorage({ save: testUtils.saveToLocal })
    const token = await localStore.getAuthToken()
    const locale = await localStore.getLocale()
    const cmsData = await localStore.getCms()
    basicParam = { cmsAuth: { token, locale, ...cmsData } }
})

const serieId = 'GY190DKQR', movieListingId = 'GR3KV3PWR'
let seasonId = null, episodeId = null, streamId = null, streamUrl = null, movieId = null, externalId = null

xdescribe('Old Cms', () => {

    test('getSeasons okey', async () => {
        expect(serieId).not.toBeNull()
        return cms.getSeasons({ ...basicParam, serieId }).then(res => {
            testUtils.resultCheck(res)
            testUtils.itesmCheck(res)
            seasonId = res.items[0]['id']
        })
    })

    test('getSeason okey', async () => {
        expect(seasonId).not.toBeNull()
        return cms.getSeason({ ...basicParam, seasonId }).then(res => {
            testUtils.resultCheck(res)
        })
    })

    test('getSeasonExtras okey', async () => {
        expect(seasonId).not.toBeNull()
        return cms.getSeasonExtras({ ...basicParam, seasonId }).then(res => {
            testUtils.resultCheck(res)
        })
    })

    test('getSeries okey', async () => {
        expect(serieId).not.toBeNull()
        return cms.getSeries({ ...basicParam, serieId }).then(res => {
            testUtils.resultCheck(res)
        })
    })

    test('getEpisodes okey', async () => {
        expect(seasonId).not.toBeNull()
        return cms.getEpisodes({ ...basicParam, seasonId }).then(res => {
            testUtils.resultCheck(res)
            testUtils.itesmCheck(res)
            episodeId = res.items[0]['id']
            streamUrl = res.items[0]['__links__']['streams']['href']
            const split = streamUrl.split('/')
            streamId = split[split.length - 2]
        })
    })

    test('getEpisode okey', async () => {
        expect(episodeId).not.toBeNull()
        return cms.getEpisode({ ...basicParam, episodeId }).then(res => {
            testUtils.resultCheck(res)
        })
    })

    test('getStreams okey', async () => {
        expect(streamId).not.toBeNull()
        return cms.getStreams({ ...basicParam, contentId: streamId }).then(res => {
            testUtils.resultCheck(res)
        })
    })

    test('getStreamsWithURL okey', async () => {
        expect(streamUrl).not.toBeNull()
        return cms.getStreamsWithURL({ ...basicParam, streamUrl }).then(res => {
            testUtils.resultCheck(res)
        })
    })

    test('getMovieListing okey', async () => {
        expect(movieListingId).not.toBeNull()
        return cms.getMovieListing({ ...basicParam, movieListingId }).then(res => {
            testUtils.resultCheck(res)
        })
    })

    test('getMovieListingExtras okey', async () => {
        expect(movieListingId).not.toBeNull()
        return cms.getMovieListingExtras({ ...basicParam, movieListingId }).then(res => {
            testUtils.resultCheck(res)
        })
    })

    test('getMovies okey', async () => {
        expect(movieListingId).not.toBeNull()
        return cms.getMovies({ ...basicParam, movieListingId }).then(res => {
            testUtils.resultCheck(res)
            testUtils.itesmCheck(res)
            movieId = res.items[0]['id']
        })
    })

    test('getMovie okey', async () => {
        expect(movieId).not.toBeNull()
        return cms.getMovie({ ...basicParam, movieId }).then(res => {
            testUtils.resultCheck(res)
        })
    })

    test('getPanels okey', async () => {
        expect(serieId).not.toBeNull()
        return cms.getPanels({ ...basicParam, panelId: serieId }).then(res => {
            testUtils.resultCheck(res)
            testUtils.itesmCheck(res)
            externalId = res.items[0].external_id
        })
    })

    test('getPanelIds okey', async () => {
        expect(serieId).not.toBeNull()
        return cms.getPanelIds({ ...basicParam, panelId: serieId }).then(res => {
            testUtils.itesmCheck(res)
        })
    })

    test('getPanelImages okey', async () => {
        expect(serieId).not.toBeNull()
        return cms.getPanelImages({ ...basicParam, panelId: serieId }).then(res => {
            testUtils.itesmCheck(res)
        })
    })

    test('lookup okey', async () => {
        expect(externalId).not.toBeNull()
        return cms.lookup({ ...basicParam, externalId }).then(res => {
            testUtils.resultCheck(res)
        })
    })
})
