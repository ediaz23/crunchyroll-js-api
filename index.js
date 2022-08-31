
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
//    const data = await content.getBrowseAll(client, 2, 1)
//    const season = 'summer-2022'
    logger.info(data)

}

main()