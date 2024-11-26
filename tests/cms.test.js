
import { expect } from '@jest/globals'

import localStore from '../src/localStore.js'
import testUtils from './testUtils.js'
import cms from '../src/services/cms.js'
import account from '../src/services/account.js'


/** @type {{cmsAuth : import('../types').CmsAuth}} */
let basicParam = null

beforeEach(async () => {
    await testUtils.wait()
    await localStore.loadFromLocal()
    localStore.setExternalStorage({ save: testUtils.saveToLocal })
    const token = await localStore.getAuthToken()
    const profile = await account.getProfile({ token })
    const accountId = (await localStore.getToken()).accountId
    basicParam = {
        account: {
            token,
            accountId,
            locale: profile.preferred_communication_language,
            audioLanguage: profile.preferred_content_audio_language
        }
    }
})

const contentList = ['GYXM79M56', 'G6NQ5DWZ6', 'GR751KNZY']
const contentId = contentList[0]
const serieId = 'GY190DKQR', movieListingId = 'GR3KV3PWR'
let seasonId = null, episodeId = null, streamId = null, streamUrl = null, movieId = null

xdescribe('Cms', () => {

    test('getContent okey', async () => {
        const param = { ...basicParam, objectIds: [contentId] }
        return cms.getObjects(param).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getSeasons okey', async () => {
        expect(serieId).not.toBeNull()
        return cms.getSeasons({ ...basicParam, serieId }).then(res => {
            testUtils.itesmCheck_v2(res)
            seasonId = res.data[0]['id']
        })
    })

    test('getSeason okey', async () => {
        expect(seasonId).not.toBeNull()
        return cms.getSeason({ ...basicParam, seasonId }).then(res => {
            testUtils.itesmCheck_v2(res)
        })
    })

    test('getSeasonExtras okey', async () => {
        expect(seasonId).not.toBeNull()
        return cms.getSeasonExtras({ ...basicParam, seasonId }).then(res => {
            testUtils.itesmCheck_v2(res, 0)
        })
    })

    test('getSeries okey', async () => {
        expect(serieId).not.toBeNull()
        return cms.getSeries({ ...basicParam, serieId }).then(res => {
            testUtils.itesmCheck_v2(res)
        })
    })

    test('getEpisodes okey', async () => {
        expect(seasonId).not.toBeNull()
        return cms.getEpisodes({ ...basicParam, seasonId }).then(res => {
            testUtils.itesmCheck_v2(res)
            episodeId = res.data[0]['id']
            streamUrl = res.data[0]['streams_link']
            const split = streamUrl.split('/')
            streamId = split[split.length - 2]
        })
    })

    test('getEpisode okey', async () => {
        expect(episodeId).not.toBeNull()
        return cms.getEpisode({ ...basicParam, episodeId }).then(res => {
            testUtils.itesmCheck_v2(res)
        })
    })

    test('getStreams okey', async () => {
        expect(streamId).not.toBeNull()
        return cms.getStreams({ ...basicParam, contentId: streamId }).then(res => {
            testUtils.itesmCheck_v2(res)
        })
    })

    test('getStreamsWithURL okey', async () => {
        expect(streamUrl).not.toBeNull()
        return cms.getStreamsWithURL({ ...basicParam, streamUrl }).then(res => {
            testUtils.itesmCheck_v2(res)
        })
    })

    test('getMovieListing okey', async () => {
        expect(movieListingId).not.toBeNull()
        return cms.getMovieListing({ ...basicParam, movieListingId }).then(res => {
            testUtils.itesmCheck_v2(res)
        })
    })

    test('getMovieListingExtras okey', async () => {
        expect(movieListingId).not.toBeNull()
        return cms.getMovieListingExtras({ ...basicParam, movieListingId }).then(res => {
            testUtils.itesmCheck_v2(res, 0)
        })
    })

    test('getMovies okey', async () => {
        expect(movieListingId).not.toBeNull()
        return cms.getMovies({ ...basicParam, movieListingId }).then(res => {
            testUtils.itesmCheck_v2(res)
            movieId = res.data[0]['id']
        })
    })

    test('getMovie okey', async () => {
        expect(movieId).not.toBeNull()
        return cms.getMovie({ ...basicParam, movieId }).then(res => {
            testUtils.itesmCheck_v2(res)
        })
    })

})
