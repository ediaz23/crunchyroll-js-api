
import { expect } from '@jest/globals'

import testUtils from './testUtils.js'
import cms from '../src/services/cms.js'


/** @type {import('../src/types').AccountAuth} */
let account = null

beforeEach(async () => {
    await testUtils.init()
    account = await testUtils.getContentParam()
})

const contentList = ['GYXM79M56', 'G6NQ5DWZ6', 'GR751KNZY']
const contentId = contentList[0]
const serieId = 'GY190DKQR', movieListingId = 'GR3KV3PWR'
let seasonId = null, episodeId = null, streamId = null, streamUrl = null, movieId = null

describe('Cms', () => {

    test('getContent okey', async () => {
        return cms.getObjects({
            account,
            objectIds: [contentId]
        }).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getSeasons okey', async () => {
        expect(serieId).not.toBeNull()
        return cms.getSeasons({
            account,
            serieId
        }).then(res => {
            testUtils.resultCheck_v2(res)
            seasonId = res.data[0]['id']
        })
    })

    test('getSeason okey', async () => {
        expect(seasonId).not.toBeNull()
        return cms.getSeason({
            account,
            seasonId
        }).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getSeasonExtras okey', async () => {
        expect(seasonId).not.toBeNull()
        return cms.getSeasonExtras({
            account,
            seasonId
        }).then(res => {
            testUtils.itesmCheck_v2(res, 0)
        })
    })

    test('getSeries okey', async () => {
        expect(serieId).not.toBeNull()
        return cms.getSeries({
            account,
            serieId
        }).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getEpisodes okey', async () => {
        expect(seasonId).not.toBeNull()
        return cms.getEpisodes({
            account, seasonId
        }).then(res => {
            testUtils.resultCheck_v2(res)
            episodeId = res.data[0]['id']
            streamUrl = res.data[0]['streams_link']
            const split = streamUrl.split('/')
            streamId = split[split.length - 2]
        })
    })

    test('getEpisode okey', async () => {
        expect(episodeId).not.toBeNull()
        return cms.getEpisode({
            account,
            episodeId
        }).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getMovieListing okey', async () => {
        expect(movieListingId).not.toBeNull()
        return cms.getMovieListing({
            account,
            movieListingId
        }).then(testUtils.itesmCheck_v2)
    })

    test('getMovieListingExtras okey', async () => {
        expect(movieListingId).not.toBeNull()
        return cms.getMovieListingExtras({
            account,
            movieListingId
        }).then(res => {
            testUtils.itesmCheck_v2(res, 0)
        })
    })

    test('getMovies okey', async () => {
        expect(movieListingId).not.toBeNull()
        return cms.getMovies({
            account,
            movieListingId
        }).then(res => {
            testUtils.itesmCheck_v2(res)
            movieId = res.data[0]['id']
        })
    })

    test('getMovie okey', async () => {
        expect(movieId).not.toBeNull()
        return cms.getMovie({
            account,
            movieId
        }).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

})
