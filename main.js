
import logger from './src/logger.js'
import localStore from './src/localStore.js'
import account from './src/services/account.js'
import content from './src/services/content.js'
import fs from 'fs'

const getContentParam = async (profile) => {
    const token = await localStore.getAuthToken()
    const accountId = (await localStore.getToken()).accountId
    return {
        token,
        accountId,
        locale: profile.preferred_communication_language,
        audioLanguage: profile.preferred_content_audio_language,
    }
}

const createObjects = async (profile, objectIds) => {
    const account = await getContentParam(profile)
    const data = await content.getObjects({ account, objectIds })
    fs.writeFileSync(`objects-${objectIds.sort().join('-').substring(0, 200)}.json`, JSON.stringify(data, null, '    '))
}

const createArtist = async (profile, artistIds) => {
    const account = await getContentParam(profile)
    const data = await content.getMusicArtist({ account, artistIds })
    fs.writeFileSync(`artist-${artistIds.sort().join('-').substring(0, 200)}.json`, JSON.stringify(data, null, '    '))
}

const createMusic = async (profile, concertIds) => {
    const account = await getContentParam(profile)
    const data = await content.getMusicConcerts({ account, concertIds })
    fs.writeFileSync(`concerts-${concertIds.sort().join('-').substring(0, 200)}.json`, JSON.stringify(data, null, '    '))
}


async function main() {
    logger.setLevel('debug')
//    const episodeId = 'GWDU8KN73'
    await localStore.loadFromLocal()
    const token = await localStore.getAuthToken()
    const profile = await account.getProfile({ token })
    const feedStr = fs.readFileSync('../crunchyroll-webos-stream/src/mock-data/homefeed.json').toString()
    const homefeed = JSON.parse(feedStr)
    const curated = homefeed.data.filter(feed => feed.resource_type === 'curated_collection')
    for await (const fee of curated) {
        try {
            if (['series', 'movies', 'episodes'].includes(fee.response_type)) {
                await createObjects(profile, fee.ids)
            } else if ('artist' === fee.response_type) {
                await createArtist(profile, fee.ids)
            } else if ('music_concert' == fee.response_type) {
                await createMusic(profile, fee.ids)
            }
        } catch (e) {
            console.log('error')
            console.log(fee)
            console.log(e)
        }
    }
}

main().catch(e => {
    logger.error(e)
})
