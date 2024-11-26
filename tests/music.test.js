
import localStore from '../src/localStore.js'
import testUtils from './testUtils.js'
import music from '../src/services/music.js'
import account from '../src/services/account.js'


/** @type {{account: import('../types').AccountAuth}} */
let basicParam = null

beforeEach(async () => {
    await testUtils.wait()
    await localStore.loadFromLocal()
    localStore.setExternalStorage({ save: testUtils.saveToLocal })
    const token = await localStore.getAuthToken()
    const profile = await account.getProfile({ token })
    const accountId = (await localStore.getToken()).accountId
    basicParam = {
        account: {
            token,
            accountId,
            locale: profile.preferred_communication_language,
            audioLanguage: profile.preferred_content_audio_language
        }
    }
})


const musicVideoId = 'MV67B29FAD'
const artistId = 'MA6480DAB5'
const concertId = 'MC547A7654'

xdescribe('Music', () => {

    test('getFeed okey', async () => {
        const param = { ...basicParam }
        return music.getFeed(param).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getArtist okey', async () => {
        const param = { ...basicParam, artistIds: [artistId] }
        return music.getArtist(param).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getArtistConcerts okey', async () => {
        const param = { ...basicParam, artistId }
        return music.getArtistConcerts(param).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getArtistVideos okey', async () => {
        const param = { ...basicParam, artistId }
        return music.getArtistVideos(param).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getConcerts okey', async () => {
        const param = { ...basicParam, concertIds: [concertId] }
        return music.getConcerts(param).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getVideo okey', async () => {
        const param = { ...basicParam, musicIds: [musicVideoId] }
        return music.getVideo(param).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getStreams okey', async () => {
        const param = { ...basicParam, contentId: concertId }
        return music.getStreams(param).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })
})
