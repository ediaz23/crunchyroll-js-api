
const { Clients } = require('./src/controllers/clients')
const content = require('./src/services/content')
const account = require('./src/services/account')
const assets = require('./src/services/assets')


async function main() {
    const client = new Clients()
    await client.loadFromLocal()
//    const data = await client.getAccount()
//    const data = await content.getHomeFeed(token, accountId, locale)
//    const data = await content.getSeasonList(token, locale)
//    const season = 'summer-2022'
    console.log(data)
}

main()