
import { expect } from '@jest/globals'

import localStore from '../src/localStore.js'
import testUtils from './testUtils.js'
import discover from '../src/services/discover.js'
import account from '../src/services/account.js'


/** @type {{account: import('../types').AccountAuth}} */
let basicParam = null

beforeEach(async () => {
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


let category = null, episodeId = null, serieId = null, movieListingId = null

xdescribe('Discover', () => {

    test('search okey', async () => {
        const param = { ...basicParam, query: 'tate' }
        return discover.search(param).then(res => {
            testUtils.resultCheck_v2(res)
            testUtils.itesmCheck(res.data[0])
        })
    })

    test('search episode okey', async () => {
        const param = { ...basicParam, query: 'un nuevo rugido', quantity: 1, type: ['episode'] }
        return discover.search(param).then(res => {
            testUtils.resultCheck_v2(res)
            testUtils.itesmCheck(res.data[0])
            episodeId = res.data[0].items[0].id
            serieId = res.data[0].items[0].episode_metadata.series_id
        })
    })

    test('search episode movie okey', async () => {
        const param = { ...basicParam, query: 'fullmetal', quantity: 1, type: ['movie_listing'] }
        return discover.search(param).then(res => {
            testUtils.resultCheck_v2(res)
            testUtils.itesmCheck(res.data[0])
            movieListingId = res.data[0].items[0].id
        })
    })

    test('getWatchlist okey', async () => {
        return discover.getWatchlist(basicParam).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getCategories okey', async () => {
        const param = { ...basicParam }
        return discover.getCategories(param).then(res => {
            testUtils.resultCheck_v2(res)
            category = res.data[0].id
        })
    })

    test('getBrowseAll okey', async () => {
        const param = { ...basicParam, quantity: 1 }
        return discover.getBrowseAll(param).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getBrowseAll category okey', async () => {
        const param = { ...basicParam, quantity: 1, category: [category] }
        return discover.getBrowseAll(param).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getBrowseIndex okey', async () => {
        const param = { ...basicParam }
        return discover.getBrowseIndex(param).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getBrowseIndex category okey', async () => {
        const param = { ...basicParam, category: [category] }
        return discover.getBrowseIndex(param).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getHistory okey', async () => {
        return discover.getHistory(basicParam).then(res => {
            testUtils.resultCheck_v2(res)
            testUtils.checkPlayhead_v2(res.data[0])
        })
    })

    test('getRecommendations okey', async () => {
        const param = { ...basicParam }
        return discover.getRecommendations(param).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getSimilar okey', async () => {
        const param = { ...basicParam, contentId: serieId }
        return discover.getSimilar(param).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getNextEpisode okey', async () => {
        const param = { ...basicParam, contentId: episodeId }
        return discover.getNext(param).then(res => {
            testUtils.resultCheck_v2(res)
            testUtils.checkPlayhead_v2(res.data[0])
        })
    })

    test('getUpNextSerie okey', async () => {
        const param = { ...basicParam, contentId: serieId }
        return discover.getNext(param).then(res => {
            testUtils.resultCheck_v2(res)
            testUtils.checkPlayhead_v2(res.data[0])
            expect(res.data[0]).toHaveProperty('never_watched')
            expect(res.data[0].never_watched).toBeDefined()
        })
    })

    test('getUpNextMovie okey', async () => {
        const param = { ...basicParam, contentId: movieListingId }
        return discover.getNext(param).then(res => {
            testUtils.resultCheck_v2(res)
            testUtils.checkPlayhead_v2(res.data[0])
            expect(res.data[0]).toHaveProperty('never_watched')
            expect(res.data[0].never_watched).toBeDefined()
        })
    })

    test('getPrevEpisode okey', async () => {
        const param = { ...basicParam, contentId: episodeId }
        return discover.getPrev(param).then(res => {
            testUtils.resultCheck_v2(res)
            testUtils.checkPlayhead_v2(res.data[0])
        })
    })

    test('getUpPrevSerie okey', async () => {
        const param = { ...basicParam, contentId: serieId }
        return discover.getPrev(param).then(res => {
            testUtils.resultCheck_v2(res)
            testUtils.checkPlayhead_v2(res.data[0])
            expect(res.data[0]).toHaveProperty('never_watched')
            expect(res.data[0].never_watched).toBeDefined()
        })
    })

    test('getUpPrevMovie okey', async () => {
        const param = { ...basicParam, contentId: movieListingId }
        return discover.getPrev(param).then(res => {
            testUtils.resultCheck_v2(res)
            testUtils.checkPlayhead_v2(res.data[0])
            expect(res.data[0]).toHaveProperty('never_watched')
            expect(res.data[0].never_watched).toBeDefined()
        })
    })

    test('getSubcategories okey', async () => {
        const param = { ...basicParam, parentCategory: category }
        return discover.getSubcategories(param).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getHomeFeed okey', async () => {
        const param = { ...basicParam }
        return discover.getHomeFeed(param).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getSeasonList okey', async () => {
        const param = { ...basicParam }
        return discover.getSeasonList(param).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })
})
