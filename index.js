
process.env.LOG_LEVEL = 'debug'

const { Clients } = require('./src/controllers/clients')
const index = require('./src/services/index')
const content = require('./src/services/content')
const account = require('./src/services/account')
const assets = require('./src/services/assets')
const utils = require('./src/utils')
const logger = require('./src/logger')

 
async function main() {
    const client = new Clients()
    await client.loadFromLocal()
//    const data = await assets.getAvatar(client)
//    client.client.profile = null
//    await account.updateProfile(client, {avatar: '16-the-god-of-high-school-jin-mori.png'})
//    const data = await client.getProfile()
//    client.client.account = null
//    const data = await client.getAccount()
//    const data = await account.getUsernames(client)
//    const data = await index.getIndexConfig(client)
//    const data = await content.getHomeFeed(client)
//    const data = await content.getSeasonList(client)
//    const data = await content.getBrowseAll(client, undefined, undefined, undefined, 'supernatural')
//    const data = await content.getCustomLists(client)
//    const data = await content.getCustomListItems(client, '785768c1-6d43-48e7-a990-4b040defd699')
//    const data = await content.getWatchHistory(client, undefined, 1)
//    const data = await content.getWatchlist(client, 1, 0)
//    const season = 'summer-2022'
//    const data = await content.getWatchlistItems(client)
//    const data = await content.getWatchlistItems(client, 'G4PH0WXVJ')
//    const data = await content.search(client, 'tate', 1, 0, 'series')
//    const data = await content.search(client, 'tate', undefined, undefined, 'series')
//    const data = await content.getCategories(client, true)
//    const data = await content.getBrowseByCategories(client, 'supernatural')
//    const data = await content.getBrowseIndex(client, 'supernatural')
//    const data = await content.getUpNextEpisode(client, 'G6W4QKX0R')
//    const data = await content.getNextEpisodePanel(client, 'GD9UVPGKK')
//    const data = await content.search(client, 'mizu', undefined, undefined, 'movie_listing')
//    const data = await content.getUpNextMovie(client, 'G6MG10746')
//    const data = await content.addWatchlistItem(client, {contentId: 'G6MG10746'})
//    const data = await content.deleteWatchlistItem(client, {contentId: 'G6MG10746'})
//    const data = await content.getSimilar(client, 'G6MG10746', 1, 1)
//    const data = await content.getSubcategories(client, 'adventure')
//    const data = await content.getPlayheads(client, 'GEVUZ2M13')
//    const data = await content.getPlayheadsUnsynced(client, 'GEVUZ2M13')
//    const data = await content.savePlayhead(client, {contentId: 'GEVUZ2M13', playhead: 700})
//    const data = await content.savePlayheadBatch(client, {batch: {'GEVUZ2M13': {dateWatched: new Date(), playhead: 800}}})
//    const data = await content.updateWatchlistItemFavoriteStatus(client, 'GYXM79M56', {isFavorite: true})
    const listId = '4886ff07-e0dd-4b7a-a138-41925774bbf8'
//    const data = await content.createPrivateCustomList(client, {title: 'Prueba'})
//    const data = await content.deletePrivateCustomList(client, listId)
//    const data = await content.addItemToCustomList(client, listId, {contentId: 'GYXM79M56'})
//    const data = await content.changeCustomListItemPosition(client, listId, {contentId: 'G6NQ5DWZ6', location: 'before', refContentId: 'GYXM79M56'})
//    const data = await content.deleteCustomListItem(client, listId, {contentId: 'G6NQ5DWZ6'})
    const data = await content.updateCustomList(client, listId, {title: 'Actualizado'})
    logger.info(data)

}
/**
getWatchlistItems
    G4PH0WXVJ: {
      "id": "G4PH0WXVJ",
      "is_favorite": false,
      "date_added": "2022-04-29T13:41:29Z"
    }
*/

main()