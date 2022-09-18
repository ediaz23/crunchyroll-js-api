
process.env.LOG_LEVEL = 'debug'

const { Clients } = require('./src/controllers/clients')
const index = require('./src/services/index')
const content = require('./src/services/content')
const account = require('./src/services/account')
const assets = require('./src/services/assets')
const review = require('./src/services/review')
const subscription = require('./src/services/subscription')
const configDelta = require('./src/services/configDelta')
const cms = require('./src/services/cms')
const auth = require('./src/services/auth')
const utils = require('./src/utils')
const logger = require('./src/logger')

 
async function main() {
    const client = new Clients()
    await client.loadFromLocal()


//    const data = await client.getCms()
//    logger.info(data)
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
//    const data = await content.getWatchHistory(client, 1, 1)
//    const data = await content.getWatchlist(client, 1, 0)
//    const season = 'summer-2022'
//    const data = await content.getWatchlistItems(client)
//    const data = await content.getWatchlistItems(client, 'G8WUNDPX5')
//    const data = await content.search(client, 'tate', 1, 0, 'series')
//    const data = await content.search(client, 'tate', undefined, undefined, 'series')
//    const data = await content.getCategories(client, true)
//    const data = await content.getBrowseByCategories(client, 'supernatural')
//    const data = await content.getBrowseIndex(client, 'supernatural')
//    const data = await content.getUpNextEpisode(client, 'G6W4QKX0R')
//    const data = await content.getNextEpisodePanel(client, 'GD9UVPGKK')
//    const data = await content.search(client, 'mizu', undefined, undefined, 'movie_listing')
//    const data = await content.getUpNextMovie(client, 'G6MG10746')
//    const data = await content.addWatchlistItem(client, 'GG5H5XMWV')
//    const data = await content.deleteWatchlistItem(client, 'GZ7UVPV9M')
//    const data = await content.getSimilar(client, 'G6MG10746', 1, 1)
//    const data = await content.getSubcategories(client, 'adventure')
//    const data = await content.getPlayheads(client, 'GEVUZ2M13')
//    const data = await content.getPlayheadsUnsynced(client, 'GEVUZ2M13')
//    const data = await content.savePlayhead(client, {contentId: 'GEVUZ2M13', playhead: 700})
//    const data = await content.savePlayheadBatch(client, {batch: {'GEVUZ2M13': {dateWatched: new Date(), playhead: 800}}})
//    const data = await content.updateWatchlistItemFavoriteStatus(client, 'GEVUZ2M13', false)
//    const listId = '4419ec95-e7c7-4baa-beec-e8bdf55f7c59'
//    const contentId = 'GEVUZ2M13'
//    const data = await content.createPrivateCustomList(client, {title: 'Prueba'})
//    const data = await content.getCustomListItems(client, listId)
//    const data = await content.deletePrivateCustomList(client, listId)
//    const data = await content.addItemToCustomList(client, listId, 'GYXM79M56')
//    const data = await content.addItemToCustomList(client, listId, 'G6NQ5DWZ6')
//    const data = await content.addItemToCustomList(client, listId, 'GR751KNZY')
//    const data = await content.changeCustomListItemPosition(client, listId, 'G6NQ5DWZ6', 'before', 'GYXM79M56')
//    const data = await content.deleteCustomListItem(client, listId, 'G6NQ5DWZ6')
//    const data = await content.updateCustomList(client, listId, {title: 'api futuro'})
//    const data = await review.getRatings(client, 'GR751KNZY', 'series')
//    const data = await subscription.getProducts(client)
//    const data = await subscription.getUserBenefits(client)
//    const data = await subscription.getUserSubscription(client)
//    const data = await configDelta.getConfigDelta(client, 'cr-android', '3.13.0')
//    const data = await cms.getSeries(client, 'GR751KNZY')
//    const data = await cms.getSeasons(client, 'GR751KNZY')
//    const data = await cms.getSeason(client, 'GR9PXM286')
//    const data = await cms.getSeasonExtras(client, 'GR9PXM286')
//    const data = await cms.getEpisodes(client, 'GR9PXM286')
//    const data = await cms.getEpisode(client, 'GYK5KX14R')
//    const data = await cms.getMovies(client, 'G6MG10746')
//    const data = await cms.getMovie(client, 'GNJFJJ4P1')
//    const data = await cms.getMovieListing(client, 'G6MG10746')
//    const data = await cms.getMovieListingExtras(client, 'G6MG10746')
//    const data = await cms.lookup(client, 'SRZ.273203')
//    const data = await cms.getStreams(client, "/cms/v2/CL/M3/crunchyroll/videos/G07FX7WZW/streams")
//    const data = await cms.getStreams(client, 'G07FX7WZW')
//    const data = await cms.getPanelImages(client, 'G69PZ5PDY')
//    const data = await cms.getPanels(client, 'G69PZ5PDY')
//    const data = await cms.getPanelIds(client, 'G69PZ5PDY')
//    const data = await review.getRatings(client, 'GR751KNZY', 'series')
//    const data = await review.removeRating(client, 'GR751KNZY', 'series')
//    const data = await review.addEpisodeRating(client, 'GWDU8KN73', 'down')
//    const data = await review.removeRating(client, 'GWDU8KN73', 'episode')
//    const data = await review.addRating(client, 'GR751KNZY', '5s', 'series')
//    const data = await review.getEpisodeRatings(client, 'GWDU8KN73')
//    logger.info(data)

}

/**
 * @param {Object} t
 * @param {String} t.a
 * @param {Date} t.b
 */
function test({a, b}) {
    b.getDate()
}

main()