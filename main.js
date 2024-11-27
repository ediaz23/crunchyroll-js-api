
import { logger, localStore, api } from './src/index.js'
import fs from 'fs'


const createObjects = async (profile, objectIds) => {
    const account = await localStore.getContentParam(profile)
    const data = await api.content.getObjects({ account, objectIds })
    fs.writeFileSync(`objects-${objectIds.sort().join('-').substring(0, 200)}.json`, JSON.stringify(data, null, '    '))
}

const createArtist = async (profile, artistIds) => {
    const account = await localStore.getContentParam(profile)
    const data = await api.content.getMusicArtist({ account, artistIds })
    fs.writeFileSync(`artist-${artistIds.sort().join('-').substring(0, 200)}.json`, JSON.stringify(data, null, '    '))
}

const createMusic = async (profile, concertIds) => {
    const account = await localStore.getContentParam(profile)
    const data = await api.content.getMusicConcerts({ account, concertIds })
    fs.writeFileSync(`concerts-${concertIds.sort().join('-').substring(0, 200)}.json`, JSON.stringify(data, null, '    '))
}

const sessionId = '1705092875476-d1650989-cd33-50a3-a195-126b550c4e68'

async function main() {

    logger.setLevel('debug')
    const episodeId = 'GWDU8KN73'
    await localStore.loadFromLocal()
    await localStore.getAuthToken()
    const account = await localStore.getContentParam()
//    await api.discover.markAsWatched({ account, contentId: episodeId })
        const data = await api.music.getFeed({ account })
    //    console.log(accountCred)
    //    const stream = await drm.getStream({ account: accountCred, episodeId })
    //    const sessionId = `${new Date().getTime()}-${accountCred.accountId}`
    //    const out = await drm.getAuth({ account: accountCred, assetId: stream.assetId, sessionId })
    //    const out = await drm.getWidevineLicense({ account: accountCred, assetId: stream.assetId, sessionId })
    console.log(JSON.stringify(data, null, '    '))

}

main().catch(e => {
    logger.error(e)
})
