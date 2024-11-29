
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

    const tokenObj = await localStore.getToken()
    const profile = await api.account.getMultiProfile(tokenObj)
    const account = await localStore.getContentParam(profile)
    const data = await api.discover.search({
        account,
        query: 'un nuevo rugido',
        quantity: 1,
        type: ['episode']
    })
    console.log(JSON.stringify(data, null, '    '))

}

main().catch(e => {
    logger.error(e)
})
