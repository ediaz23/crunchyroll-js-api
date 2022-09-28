
const localStore = require('../src/localStore')
const assets = require('../src/services/assets')
const testUtils = require('./testUtils')


/** @type {String} */
let token = null

beforeEach(async () => {
    await localStore.loadFromLocal()
    token = await localStore.getAuthToken()
})

describe('Assets', () => {
    test('empty', () => {})

    test('Request Assets', async() => {
        return assets.getAvatar({ token }).then(res => {
            testUtils.itesmCheck(res)
        })
    })
})
