
process.env.LOG_LEVEL = 'debug'

const cms = require('./src/services/cms')
const logger = require('./src/logger')
const localStore = require('./src/localStore')

 
async function main() {
    await localStore.loadFromLocal()
//    const cms = await localStore.getCms()
//    const client = new Clients()
//    await client.loadFromLocal()
//    const token = await client.getToken()
//    const locale = await client.getLocale()
//    const cmsData = (await client.getCms()).toObject()
//    const basicParam = { cmsAuth: { token, locale, ...cmsData } }
//    const episodeId = 'GWDU8KN73'
//    const episode = await cms.getEpisode({...basicParam, episodeId})
//    const panels = await cms.getPanelImages({...basicParam, panelId: episodeId})
//    const data = await cms.getStreamsWithURL({...basicParam, streamUrl: episode.__links__.streams.href})
//    logger.info(data)

}

main()
