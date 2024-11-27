
import assets from '../src/services/assets.js'
import testUtils from './testUtils.js'


/** @type {import('../src/types').AccountAuth} */
let account = null

beforeEach(async () => {
    await testUtils.init()
    account = await testUtils.getContentParam()
})

describe('Assets', () => {

    test('Request Assets', async () => {
        return assets.getAvatar({
            token: account.token,
            lang: account.locale
        }).then(testUtils.itesmCheck)
    })

    test('Request Wallpaper', async () => {
        return assets.getWallpaper({
            token: account.token,
            lang: account.locale
        }).then(testUtils.itesmCheck)
    })
})
