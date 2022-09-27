
process.env.LOG_LEVEL = 'debug'

const cms = require('./src/services/cms')
const logger = require('./src/logger')
const localStore = require('./src/localStore')

 
async function main() {
    const episodeId = 'GWDU8KN73'
    await localStore.loadFromLocal()
    const token = await localStore.getAuthToken()
    const locale = await localStore.getLocale()
    const cmsData = await localStore.getCms()
    const basicParam = { cmsAuth: { token, locale, ...cmsData } }
    const episode = await cms.getEpisode({...basicParam, episodeId})
    const data = await cms.getStreamsWithURL({...basicParam, streamUrl: episode.__links__.streams.href})
    logger.info(data)

}

main()
