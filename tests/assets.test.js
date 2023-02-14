
import localStore from '../src/localStore.js'
import assets from '../src/services/assets.js'
import testUtils from './testUtils.js'


/** @type {String} */
let token = null

beforeEach(async () => {
    await localStore.loadFromLocal()
    token = await localStore.getAuthToken()
})

describe('Assets', () => {

    test('Request Assets', async () => {
        return assets.getAvatar({ token }).then(res => {
            testUtils.itesmCheck(res)
        })
    })
})
