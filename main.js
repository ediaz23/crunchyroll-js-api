
import cms from './src/services/cms.js'
import logger from './src/logger.js'
import localStore from './src/localStore.js'
import account from './src/services/account.js'


async function main() {
    const episodeId = 'GWDU8KN73'
    await localStore.loadFromLocal()
    const token = await localStore.getAuthToken()
    const locale = await localStore.getLocale()
    const cmsData = await localStore.getCms()
    await localStore.getAccount()
    account.updateProfile({ token, data: { preferred_communication_language: 'en-US' } })
    const basicParam = { cmsAuth: { token, locale, ...cmsData } }
    const episode = await cms.getEpisode({ ...basicParam, episodeId })
    const data = await cms.getStreamsWithURL({ ...basicParam, streamUrl: episode.__links__.streams.href })
    logger.info(data)
}

main().catch(e => {
    logger.error(e)
})
