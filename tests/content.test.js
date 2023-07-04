
import { expect } from '@jest/globals'

import localStore from '../src/localStore.js'
import testUtils from './testUtils.js'
import content from '../src/services/content.js'
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


const customListTitlle = 'PruebaV2'
const contentList = ['GYXM79M56', 'G6NQ5DWZ6', 'GR751KNZY']
const contentId = contentList[0]
const musicVideoId = 'MV67B29FAD'
const artistId = 'MA6480DAB5'
const concertId = 'MC547A7654'
let listId = null, category = null, episodeId = null, serieId = null, movieListingId = null

describe('Content', () => {

    test('createPrivateCustomList okey', async () => {
        const param = { ...basicParam, title: customListTitlle }
        return content.createPrivateCustomList(param).then(res => {
            testUtils.existValue(res)
            expect(res).toHaveProperty('data')
            testUtils.existValue(res.data)
            expect(Array.isArray(res.data)).toBe(true)
            expect(res.data.length).toBe(1)
            const data = res.data[0]
            testUtils.existValue(data)
            expect(data).toHaveProperty('list_id')
            expect(data).toHaveProperty('title')
            expect(data).toHaveProperty('modified_at')
            testUtils.existValue(data.list_id)
            testUtils.existValue(data.title)
            testUtils.existValue(data.modified_at)
            listId = data.list_id
        })
    })

    test('addItemToCustomList okey', async () => {
        const param = { ...basicParam, listId }
        for await (const item of contentList) {
            await content.addItemToCustomList({ ...param, contentId: item })
        }
    })

    test('changeCustomListItemPosition wrong position', async () => {
        const param = {
            ...basicParam, listId, contentId: contentList[2],
            location: 'malo', refContentId: contentList[1]
        }
        await expect(content.changeCustomListItemPosition(param)).rejects.toThrow()
    })

    test('changeCustomListItemPosition okey', async () => {
        const param = {
            ...basicParam, listId, contentId: contentList[2],
            location: 'before', refContentId: contentList[0]
        }
        await expect(content.changeCustomListItemPosition(param)).resolves.toBeNull()
    })

    test('getCustomListItems okey', async () => {
        const param = { ...basicParam, listId }
        return content.getCustomListItems(param).then(res => {
            testUtils.itesmCheck_v2(res)
        })
    })

    test('getCustomListItems size 1 okey', async () => {
        const param = { ...basicParam, listId, pageSize: 1 }
        return content.getCustomListItems(param).then(res => {
            testUtils.itesmCheck_v2(res)
        })
    })

    test('getCustomListItems order desc okey', async () => {
        const param = { ...basicParam, listId, order: 'desc' }
        return content.getCustomListItems(param).then(res => {
            testUtils.itesmCheck_v2(res)
        })
    })

    test('deleteCustomListItem okey', async () => {
        const param = { ...basicParam, listId, contentId }
        return content.deleteCustomListItem(param)
    })

    test('updateCustomList okey', async () => {
        const param = { ...basicParam, listId, title: 'EditadoV2' }
        return content.updateCustomList(param)
    })

    test('getCustomLists okey', async () => {
        return content.getCustomLists(basicParam).then(res => {
            testUtils.resultCheck_v2(res)
            const { meta } = res
            expect(meta).toHaveProperty('total_public')
            expect(meta).toHaveProperty('total_private')
            expect(meta).toHaveProperty('max_private')
        })
    })

    test('deletePrivateCustomList okey', async () => {
        const param = { ...basicParam, listId }
        return content.deletePrivateCustomList(param)
    })

    test('getHistory okey', async () => {
        return content.getHistory(basicParam).then(res => {
            testUtils.resultCheck_v2(res)
            testUtils.checkPlayhead_v2(res.data[0])
        })
    })

    test('addWatchlistItem okey', async () => {
        const param = { ...basicParam, contentId }
        return content.addWatchlistItem(param)
    })

    test('addWatchlistItem wrong', async () => {
        const param = { ...basicParam, contentId }
        await expect(content.addWatchlistItem(param)).rejects.toThrow()
    })

    test('getWatchlist okey', async () => {
        return content.getWatchlist(basicParam).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getWatchlistItems okey', async () => {
        return content.getWatchlistItems(basicParam).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('updateWatchlistItemFavoriteStatus true okey', async () => {
        const param = { ...basicParam, contentId, isFavorite: true }
        return content.updateWatchlistItemFavoriteStatus(param)
    })

    test('updateWatchlistItemFavoriteStatus false okey', async () => {
        const param = { ...basicParam, contentId, isFavorite: false }
        return content.updateWatchlistItemFavoriteStatus(param)
    })

    test('deleteWatchlistItem okey', async () => {
        const param = { ...basicParam, contentId }
        return content.deleteWatchlistItem(param)
    })

    test('getCategories okey', async () => {
        const param = { ...basicParam }
        return content.getCategories(param).then(res => {
            testUtils.resultCheck_v2(res)
            category = res.data[0].id
        })
    })

    test('getBrowseAll okey', async () => {
        const param = { ...basicParam, quantity: 1 }
        return content.getBrowseAll(param).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getBrowseAll category okey', async () => {
        const param = { ...basicParam, quantity: 1, category: [category] }
        return content.getBrowseAll(param).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getBrowseIndex okey', async () => {
        const param = { ...basicParam }
        return content.getBrowseIndex(param).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getBrowseIndex category okey', async () => {
        const param = { ...basicParam, category: [category] }
        return content.getBrowseIndex(param).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getSubcategories okey', async () => {
        const param = { ...basicParam, parentCategory: category }
        return content.getSubcategories(param).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getHomeFeed okey', async () => {
        const param = { ...basicParam }
        return content.getHomeFeed(param).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getMusicFeed okey', async () => {
        const param = { ...basicParam }
        return content.getMusicFeed(param).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getMusicArtist okey', async () => {
        const param = { ...basicParam, artistIds: [artistId] }
        return content.getMusicArtist(param).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getMusicArtistConcerts okey', async () => {
        const param = { ...basicParam, artistId }
        return content.getMusicArtistConcerts(param).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getMusicArtistVideos okey', async () => {
        const param = { ...basicParam, artistId }
        return content.getMusicArtistVideos(param).then(res => {
            testUtils.resultCheck_v2(res)

        })
    })

    test('getMusicConcerts okey', async () => {
        const param = { ...basicParam, concertIds: [concertId] }
        return content.getMusicConcerts(param).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getMusicVideo okey', async () => {
        const param = { ...basicParam, musicIds: [musicVideoId] }
        return content.getMusicVideo(param).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getContent okey', async () => {
        const param = { ...basicParam, objectIds: [contentId] }
        return content.getObjects(param).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getWatchHistory okey', async () => {
        const param = { ...basicParam }
        return content.getWatchHistory(param).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getSeasonList okey', async () => {
        const param = { ...basicParam }
        return content.getSeasonList(param).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('search okey', async () => {
        const param = { ...basicParam, queryStr: 'tate' }
        return content.search(param).then(res => {
            testUtils.resultCheck_v2(res)
            testUtils.itesmCheck(res.data[0])
        })
    })

    test('search episode okey', async () => {
        const param = { ...basicParam, queryStr: 'un nuevo rugido', quantity: 1, type: ['episode'] }
        return content.search(param).then(res => {
            testUtils.resultCheck_v2(res)
            testUtils.itesmCheck(res.data[0])
            episodeId = res.data[0].items[0].id
            serieId = res.data[0].items[0].episode_metadata.series_id
        })
    })

    test('search episode movie okey', async () => {
        const param = { ...basicParam, queryStr: 'fullmetal', quantity: 1, type: ['movie_listing'] }
        return content.search(param).then(res => {
            testUtils.resultCheck_v2(res)
            testUtils.itesmCheck(res.data[0])
            movieListingId = res.data[0].items[0].id
        })
    })

    test('getRecommendations okey', async () => {
        const param = { ...basicParam }
        return content.getRecommendations(param).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getSimilar okey', async () => {
        const param = { ...basicParam, contentId: serieId }
        return content.getSimilar(param).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getNextEpisode okey', async () => {
        const param = { ...basicParam, contentId: episodeId }
        return content.getUpNext(param).then(res => {
            testUtils.resultCheck_v2(res)
            testUtils.checkPlayhead_v2(res.data[0])
        })
    })

    test('getUpNextSerie okey', async () => {
        const param = { ...basicParam, contentId: serieId }
        return content.getUpNext(param).then(res => {
            testUtils.resultCheck_v2(res)
            testUtils.checkPlayhead_v2(res.data[0])
            expect(res.data[0]).toHaveProperty('never_watched')
            expect(res.data[0].never_watched).toBeDefined()
        })
    })

    test('getUpNextMovie okey', async () => {
        const param = { ...basicParam, contentId: movieListingId }
        return content.getUpNext(param).then(res => {
            testUtils.resultCheck_v2(res)
            testUtils.checkPlayhead_v2(res.data[0])
            expect(res.data[0]).toHaveProperty('never_watched')
            expect(res.data[0].never_watched).toBeDefined()
        })
    })

    test('getPlayheads okey', async () => {
        const param = { ...basicParam, contentIds: [episodeId] }
        return content.getPlayheads(param).then(res => {
            testUtils.resultCheck_v2(res)
            expect(res.data[0]).toHaveProperty('content_id')
            expect(res.data[0].content_id).toBeDefined()
            expect(res.data[0]).toHaveProperty('playhead')
            expect(res.data[0].playhead).toBeDefined()
            expect(res.data[0]).toHaveProperty('fully_watched')
            expect(res.data[0].fully_watched).toBeDefined()
            expect(res.data[0]).toHaveProperty('last_modified')
            expect(res.data[0].last_modified).toBeDefined()
        })
    })

    test('savePlayhead okey', async () => {
        const param = { ...basicParam, contentId: episodeId, playhead: 300 }
        return content.savePlayhead(param)
    })

})
