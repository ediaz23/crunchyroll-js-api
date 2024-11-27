
import { expect } from '@jest/globals'

import localStore from '../src/localStore.js'
import testUtils from './testUtils.js'
import discover from '../src/services/discover.js'


/** @type {import('../src/types').AccountAuth} */
let account = null

beforeEach(async () => {
    await testUtils.init()
    account = await localStore.getContentParam()
})


let category = null, episodeId = null, serieId = null, movieListingId = null

describe('Discover', () => {

    test('search okey', async () => {
        return discover.search({
            account,
            query: 'tate'
        }).then(res => {
            testUtils.resultCheck_v2(res)
            testUtils.itesmCheck(res.data[0])
        })
    })

    test('search episode okey', async () => {
        return discover.search({
            account,
            query: 'un nuevo rugido',
            quantity: 1,
            type: ['episode']
        }).then(res => {
            testUtils.resultCheck_v2(res)
            testUtils.itesmCheck(res.data[0])
            episodeId = res.data[0].items[0].id
            serieId = res.data[0].items[0].episode_metadata.series_id
        })
    })

    test('search episode movie okey', async () => {
        return discover.search({
            account,
            query: 'fullmetal',
            quantity: 1,
            type: ['movie_listing']
        }).then(res => {
            testUtils.resultCheck_v2(res)
            testUtils.itesmCheck(res.data[0])
            movieListingId = res.data[0].items[0].id
        })
    })

    test('getWatchlist okey', async () => {
        return discover.getWatchlist({
            account
        }).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getCategories okey', async () => {
        return discover.getCategories({
            account
        }).then(res => {
            testUtils.resultCheck_v2(res)
            category = res.data[0].id
        })
    })

    test('getBrowseAll okey', async () => {
        return discover.getBrowseAll({
            account,
            quantity: 1
        }).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getBrowseAll category okey', async () => {
        return discover.getBrowseAll({
            account,
            quantity: 1,
            category: [category]
        }).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getBrowseIndex okey', async () => {
        return discover.getBrowseIndex({
            account
        }).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getBrowseIndex category okey', async () => {
        return discover.getBrowseIndex({
            account,
            category: [category]
        }).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getHistory okey', async () => {
        return discover.getHistory({
            account
        }).then(res => {
            testUtils.resultCheck_v2(res)
            testUtils.checkPlayhead_v2(res.data[0])
        })
    })

    test('getRecommendations okey', async () => {
        return discover.getRecommendations({
            account
        }).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getSimilar okey', async () => {
        return discover.getSimilar({
            account,
            contentId: serieId
        }).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getNextEpisode okey', async () => {
        return discover.getNext({
            account,
            contentId: episodeId
        }).then(res => {
            testUtils.resultCheck_v2(res)
            testUtils.checkPlayhead_v2(res.data[0])
        })
    })

    test('getUpNextSerie okey', async () => {
        return discover.getNext({
            account,
            contentId: serieId
        }).then(res => {
            testUtils.resultCheck_v2(res)
            testUtils.checkPlayhead_v2(res.data[0])
            expect(res.data[0]).toHaveProperty('never_watched')
            expect(res.data[0].never_watched).toBeDefined()
        })
    })

    test('getUpNextMovie okey', async () => {
        return discover.getNext({
            account,
            contentId: movieListingId
        }).then(res => {
            testUtils.resultCheck_v2(res)
            testUtils.checkPlayhead_v2(res.data[0])
            expect(res.data[0]).toHaveProperty('never_watched')
            expect(res.data[0].never_watched).toBeDefined()
        })
    })

    test('getPrevEpisode okey', async () => {
        testUtils.existValue(episodeId)
        return discover.getPrev({
            account,
            contentId: episodeId
        }).then(res => {
            testUtils.resultCheck_v2(res)
            testUtils.checkPlayhead_v2(res.data[0])
        })
    })

    test('getPrevEpisode okey', async () => {
        testUtils.existValue(episodeId)
        return discover.markAsWatched({
            account,
            contentId: episodeId
        })
    })

    test('getSubcategories okey', async () => {
        return discover.getSubcategories({
            account,
            parentCategory: category
        }).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getHomeFeed okey', async () => {
        return discover.getHomeFeed({
            account
        }).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getHome okey', async () => {
        return discover.getHome({
            account
        }).then(res => {
            testUtils.existValue(res)
        })
    })

    test('getSeasonList okey', async () => {
        return discover.getSeasonList({
            account
        }).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })
})
