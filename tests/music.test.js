
import localStore from '../src/localStore.js'
import testUtils from './testUtils.js'
import music from '../src/services/music.js'


/** @type {import('../src/types').AccountAuth} */
let account = null

beforeEach(async () => {
    await testUtils.init()
    account = await localStore.getContentParam()
})


const musicVideoId = 'MV67B29FAD'
const artistId = 'MA6480DAB5'
const concertId = 'MC547A7654'

describe('Music', () => {

    test('getFeed okey', async () => {
        return music.getFeed({
            account
        }).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getArtist okey', async () => {
        return music.getArtist({
            account,
            artistIds: [artistId]
        }).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getArtistConcerts okey', async () => {
        return music.getArtistConcerts({
            account,
            artistId
        }).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getArtistVideos okey', async () => {
        return music.getArtistVideos({
            account,
            artistId
        }).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getConcerts okey', async () => {
        return music.getConcerts({
            account,
            concertIds: [concertId]
        }).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

    test('getVideo okey', async () => {
        return music.getVideo({
            account,
            musicIds: [musicVideoId]
        }).then(res => {
            testUtils.resultCheck_v2(res)
        })
    })

})
