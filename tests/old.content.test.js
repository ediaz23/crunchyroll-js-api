
import { expect } from '@jest/globals'

import localStore from '../src/localStore.js'
import testUtils from './testUtils.js'
import content from '../src/services/old.content.js'


/** @type {{account: import('../types').AccountAuth}} */
let basicParam = null

beforeEach(async () => {
    await localStore.loadFromLocal()
    localStore.setExternalStorage({ save: testUtils.saveToLocal })
    const token = await localStore.getAuthToken()
    const locale = await localStore.getLocale()
    const accountId = (await localStore.getToken()).accountId
    basicParam = { account: { token, locale, accountId } }
})


const customListTitlle = 'Prueba'
const contentList = ['GYXM79M56', 'G6NQ5DWZ6', 'GR751KNZY']
const contentId = contentList[0]
let listId = null, category = null, episodeId = null, serieId = null, movieListingId = null

xdescribe('Old Content', () => {

    test('createPrivateCustomList okey', async () => {
        const param = { ...basicParam, title: customListTitlle }
        return content.createPrivateCustomList(param).then(res => {
            expect(res).not.toBeNull()
            expect(res).toHaveProperty('list_id')
            expect(res).toHaveProperty('total')
            expect(res).toHaveProperty('modified_at')
            testUtils.existValue(res.list_id)
            testUtils.existValue(res.total)
            testUtils.existValue(res.modified_at)
            listId = res.list_id
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
        await expect(content.changeCustomListItemPosition(param)).rejects.toThrow();
    })

    test('changeCustomListItemPosition okey', async () => {
        const param = {
            ...basicParam, listId, contentId: contentList[2],
            location: 'before', refContentId: contentList[0]
        }
        await content.changeCustomListItemPosition(param)
    })

    test('getCustomListItems okey', async () => {
        const param = { ...basicParam, listId }
        return content.getCustomListItems(param).then(res => {
            testUtils.itesmCheck(res)
        })
    })

    test('getCustomListItems size 1 okey', async () => {
        const param = { ...basicParam, listId, pageSize: 1 }
        return content.getCustomListItems(param).then(res => {
            testUtils.itesmCheck(res)
        })
    })

    test('getCustomListItems order desc okey', async () => {
        const param = { ...basicParam, listId, order: 'desc' }
        return content.getCustomListItems(param).then(res => {
            testUtils.itesmCheck(res)
        })
    })

    test('deleteCustomListItem okey', async () => {
        const param = { ...basicParam, listId, contentId }
        return content.deleteCustomListItem(param)
    })

    test('updateCustomList okey', async () => {
        const param = { ...basicParam, listId, title: 'Editado' }
        return content.updateCustomList(param)
    })

    test('getCustomLists okey', async () => {
        return content.getCustomLists(basicParam).then(res => {
            expect(res).not.toBeNull()
            testUtils.itesmCheck(res)
            expect(res).toHaveProperty('total_public')
            expect(res).toHaveProperty('total_private')
            expect(res).toHaveProperty('max_private')
        })
    })

    test('deletePrivateCustomList okey', async () => {
        const param = { ...basicParam, listId }
        return content.deletePrivateCustomList(param)
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
            testUtils.resultCheck(res)
            testUtils.itesmCheck(res)
            testUtils.totalCheck(res)
        })
    })

    test('getWatchlistItems okey', async () => {
        return content.getWatchlistItems(basicParam).then(res => {
            expect(res).not.toBeNull()
        })
    })

    test('getWatchlistItems content okey', async () => {
        const param = { ...basicParam, contentId }
        return content.getWatchlistItems(param).then(res => {
            expect(res).not.toBeNull()
            expect(res).toHaveProperty(contentId)
            expect(res[contentId]).toHaveProperty('id')
            expect(res[contentId]).toHaveProperty('is_favorite')
            expect(res[contentId]).toHaveProperty('date_added')
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
            testUtils.resultCheck(res)
            testUtils.itesmCheck(res)
            category = res.items[0].tenant_category
        })
    })

    test('getCategories okey', async () => {
        const param = { ...basicParam, includeSubcategories: true }
        return content.getCategories(param).then(res => {
            testUtils.resultCheck(res)
            testUtils.itesmCheck(res)
        })
    })

    test('getBrowseAll okey', async () => {
        const param = { ...basicParam, quantity: 1 }
        return content.getBrowseAll(param).then(res => {
            testUtils.resultCheck(res)
            testUtils.itesmCheck(res)
        })
    })

    test('getBrowseAll category okey', async () => {
        const param = { ...basicParam, quantity: 1, category }
        return content.getBrowseAll(param).then(res => {
            testUtils.resultCheck(res)
            testUtils.itesmCheck(res)
        })
    })

    test('getBrowseByCategories category okey', async () => {
        const param = { ...basicParam, quantity: 1, category }
        return content.getBrowseByCategories(param).then(res => {
            testUtils.resultCheck(res)
            testUtils.itesmCheck(res)
        })
    })

    test('getBrowseIndex okey', async () => {
        const param = { ...basicParam }
        return content.getBrowseIndex(param).then(res => {
            testUtils.resultCheck(res)
            testUtils.itesmCheck(res)
        })
    })

    test('getBrowseIndex category okey', async () => {
        const param = { ...basicParam, category }
        return content.getBrowseIndex(param).then(res => {
            testUtils.resultCheck(res)
            testUtils.itesmCheck(res)
        })
    })

    test('getSubcategories okey', async () => {
        const param = { ...basicParam, parentCategory: category }
        return content.getSubcategories(param).then(res => {
            testUtils.resultCheck(res)
            testUtils.itesmCheck(res)
        })
    })

    test('getHomeFeed okey', async () => {
        const param = { ...basicParam }
        return content.getHomeFeed(param).then(res => {
            testUtils.resultCheck(res)
            testUtils.itesmCheck(res)
        })
    })

    test('getWatchHistory okey', async () => {
        const param = { ...basicParam }
        return content.getWatchHistory(param).then(res => {
            testUtils.itesmCheck(res)
        })
    })

    test('getSeasonList okey', async () => {
        const param = { ...basicParam }
        return content.getSeasonList(param).then(res => {
            testUtils.resultCheck(res)
            testUtils.itesmCheck(res)
        })
    })

    test('search okey', async () => {
        const param = { ...basicParam, queryStr: 'tate' }
        return content.search(param).then(res => {
            testUtils.resultCheck(res)
            testUtils.itesmCheck(res)
        })
    })

    test('search episode okey', async () => {
        const param = { ...basicParam, queryStr: 'un nuevo rugido', quantity: 1, type: 'episode' }
        return content.search(param).then(res => {
            testUtils.resultCheck(res)
            testUtils.itesmCheck(res)
            episodeId = res.items[0].items[0].id
            serieId = res.items[0].items[0].episode_metadata.series_id
        })
    })

    test('search episode movie okey', async () => {
        const param = { ...basicParam, queryStr: 'fullmetal', quantity: 1, type: 'movie_listing' }
        return content.search(param).then(res => {
            testUtils.resultCheck(res)
            testUtils.itesmCheck(res)
            movieListingId = res.items[0].items[0].id
        })
    })

    test('getSimilar okey', async () => {
        const param = { ...basicParam, contentId: serieId }
        return content.getSimilar(param).then(res => {
            testUtils.resultCheck(res)
            testUtils.itesmCheck(res)
        })
    })

    test('getNextEpisodePanel okey', async () => {
        const param = { ...basicParam, episodeId }
        return content.getNextEpisodePanel(param).then(res => {
            expect(res).not.toBeNull()
        })
    })

    test('getUpNextEpisode okey', async () => {
        const param = { ...basicParam, serieId }
        return content.getUpNextEpisode(param).then(res => {
            expect(res).not.toBeNull()
            expect(res).toHaveProperty('playhead')
            expect(res).toHaveProperty('fully_watched')
            expect(res).toHaveProperty('never_watched')
            expect(res).toHaveProperty('panel')
            testUtils.resultCheck(res.panel)
        })
    })

    test('getUpNextMovie okey', async () => {
        const param = { ...basicParam, movieListingId }
        return content.getUpNextMovie(param).then(res => {
            expect(res).not.toBeNull()
            expect(res).toHaveProperty('playhead')
            expect(res).toHaveProperty('fully_watched')
            expect(res).toHaveProperty('never_watched')
            expect(res).toHaveProperty('panel')
            testUtils.resultCheck(res.panel)
        })
    })

    test('getPlayheads okey', async () => {
        const param = { ...basicParam, contentId: episodeId }
        return content.getPlayheads(param).then(res => {
            expect(res).not.toBeNull()
            expect(res).toHaveProperty(episodeId)
            testUtils.existValue(res[episodeId])
            expect(res[episodeId]).toHaveProperty('playhead')
            expect(res[episodeId]).toHaveProperty('fully_watched')
            expect(res[episodeId]).toHaveProperty('last_modified')
            expect(res[episodeId]).toHaveProperty('content_id')
        })
    })

    test('getPlayheadsUnsynced okey', async () => {
        const param = { ...basicParam, contentId: episodeId }
        return content.getPlayheadsUnsynced(param).then(res => {
            expect(res).not.toBeNull()
            expect(res).toHaveProperty(episodeId)
            testUtils.existValue(res[episodeId])
            expect(res[episodeId]).toHaveProperty('playhead')
            expect(res[episodeId]).toHaveProperty('fully_watched')
            expect(res[episodeId]).toHaveProperty('last_modified')
            expect(res[episodeId]).toHaveProperty('content_id')
        })
    })

    test('savePlayhead okey', async () => {
        const param = { ...basicParam, contentId: episodeId, playhead: 300 }
        return content.savePlayhead(param)
    })

    test('savePlayheadBatch okey', async () => {
        const item = { dateWatched: (new Date()).toISOString(), playhead: 350 }
        const playheadBatch = { batch: {} }
        playheadBatch.batch[episodeId] = item
        const param = { ...basicParam, playheadBatch }
        return content.savePlayheadBatch(param)
    })
})
