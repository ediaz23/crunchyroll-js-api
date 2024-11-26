
import localStore from '../src/localStore.js'
import assets from '../src/services/assets.js'
import testUtils from './testUtils.js'


/** @type {String} */
let token = null

beforeEach(async () => {
    await testUtils.wait()
    await localStore.loadFromLocal()
    localStore.setExternalStorage({ save: testUtils.saveToLocal })
    token = await localStore.getAuthToken()
})

xdescribe('Assets', () => {

    test('Request Assets', async () => {
        return assets.getAvatar({ token, lang: await localStore.getLocale() }).then(res => {
            testUtils.itesmCheck(res)
        })
    })

    test('Request Wallpaper', async () => {
        return assets.getWallpaper({ token, lang: await localStore.getLocale() }).then(res => {
            testUtils.itesmCheck(res)
        })
    })
})
