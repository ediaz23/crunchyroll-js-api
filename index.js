
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
//    const data = await content.getHomeFeed(client, 5, 1)
//    const data = await content.getSeasonList(client)
//    const data = await content.getBrowseAll(client, undefined, undefined, undefined, 'supernatural')
//    const data = await content.getCustomLists(client)
//    const data = await content.getCustomListItems(client, '785768c1-6d43-48e7-a990-4b040defd699')
//    const data = await content.getWatchHistory(client, 0, 1)
//    const data = await content.getWatchlist(client, 1, 0)
//    const season = 'summer-2022'
//    const data = await content.getWatchlistItems(client)
//    const data = await content.getWatchlistItems(client, 'G4PH0WXVJ')
//    const data = await content.search(client, 'tate', 1, 0, 'series')
//    const data = await content.search(client, 'tate', undefined, undefined, 'series')
//    const data = await content.getCategories(client)
//    const data = await content.getBrowseByCategories(client, 'supernatural')
//    const data = await content.getBrowseIndex(client, 'supernatural')
//    const data = await content.getUpNextEpisode(client, 'G6W4QKX0R')
//    const data = await content.getNextEpisodePanel(client, 'GD9UVPGKK')
//    const data = await content.search(client, 'mizu', undefined, undefined, 'movie_listing')
    const data = await content.getUpNextMovie(client, 'G6MG10746')
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