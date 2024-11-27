
import { expect } from '@jest/globals'

import localStore from '../src/localStore.js'
import testUtils from './testUtils.js'
import content from '../src/services/content.js'


/** @type {import('../src/types').AccountAuth} */
let account = null

beforeEach(async () => {
    await testUtils.init()
    account = await localStore.getContentParam()
})


const customListTitlle = 'PruebaV2'
const contentList = ['GYXM79M56', 'G6NQ5DWZ6', 'GR751KNZY']
const contentId = contentList[0]
let listId = null, episodeId = 'GMKUX832J'

describe('Content', () => {

    test('createPrivateCustomList okey', async () => {
        return content.createPrivateCustomList({
            account,
            title: customListTitlle
        }).then(res => {
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
        for await (const item of contentList) {
            await content.addItemToCustomList({ account, listId, contentId: item })
        }
    })

    test('changeCustomListItemPosition wrong position', async () => {
        await expect(content.changeCustomListItemPosition({
            account,
            listId,
            contentId: contentList[2],
            location: 'malo',
            refContentId: contentList[1]
        })).rejects.toThrow()
    })

    test('changeCustomListItemPosition okey', async () => {
        await expect(content.changeCustomListItemPosition({
            account,
            listId,
            contentId: contentList[2],
            location: 'before',
            refContentId: contentList[0]
        })).resolves.toBeNull()
    })

    test('getCustomListItems okey', async () => {
        return content.getCustomListItems({
            account,
            listId
        }).then(res => {
            testUtils.itesmCheck_v2(res)
        })
    })

    test('getCustomListItems size 1 okey', async () => {
        return content.getCustomListItems({
            account,
            listId,
            pageSize: 1
        }).then(res => {
            testUtils.itesmCheck_v2(res)
        })
    })

    test('getCustomListItems order desc okey', async () => {
        return content.getCustomListItems({
            account,
            listId,
            order: 'desc'
        }).then(res => {
            testUtils.itesmCheck_v2(res)
        })
    })

    test('deleteCustomListItem okey', async () => {
        return content.deleteCustomListItem({
            account,
            listId,
            contentId
        })
    })

    test('updateCustomList okey', async () => {
        return content.updateCustomList({
            account,
            listId,
            title: 'EditadoV2'
        })
    })

    test('getCustomLists okey', async () => {
        return content.getCustomLists({
            account
        }).then(res => {
            testUtils.resultCheck_v2(res)
            const { meta } = res
            expect(meta).toHaveProperty('total_public')
            expect(meta).toHaveProperty('total_private')
            expect(meta).toHaveProperty('max_private')
        })
    })

    test('deletePrivateCustomList okey', async () => {
        return content.deletePrivateCustomList({
            account,
            listId
        })
    })

    test('addWatchlistItem okey', async () => {
        return content.addWatchlistItem({
            account,
            contentId
        })
    })

    test('addWatchlistItem wrong', async () => {
        await expect(content.addWatchlistItem({
            account,
            contentId
        })).rejects.toThrow()
    })

    test('getWatchlistItems okey', async () => {
        return content.getWatchlistItems({
            account
        }).then(res => {
            testUtils.itesmCheck_v2(res)
        })
    })

    test('updateWatchlistItemFavoriteStatus true okey', async () => {
        return content.updateWatchlistItemFavoriteStatus({
            account,
            contentId,
            isFavorite: true
        })
    })

    test('updateWatchlistItemFavoriteStatus false okey', async () => {
        return content.updateWatchlistItemFavoriteStatus({
            account,
            contentId,
            isFavorite: false
        })
    })

    test('deleteWatchlistItem okey', async () => {
        return content.deleteWatchlistItem({
            account,
            contentId
        })
    })

    test('getWatchHistory okey', async () => {
        return content.getWatchHistory({
            account
        }).then(res => {
            testUtils.itesmCheck_v2(res)
        })
    })

    test('getPlayheads okey', async () => {
        return content.getPlayheads({
            account,
            contentIds: [episodeId]
        }).then(res => {
            testUtils.itesmCheck_v2(res)
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
        return content.savePlayhead({
            account,
            contentId: episodeId,
            playhead: 300
        })
    })

})
