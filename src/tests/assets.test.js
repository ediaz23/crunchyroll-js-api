
const { Clients } = require('../controllers/clients')
const assets = require('../services/assets')
const testUtils = require('./testUtils')


/** @type {String} */
let token = null

/** @type {Clients} */
let client = null

beforeEach(async () => {
    client = new Clients()
    await client.loadFromLocal()
    token = await client.getToken()
})


describe('Assets', () => {
    test('empty', () => {})

    /*test('Request Assets', async() => {
        return assets.getAvatar({ token }).then(res => {
            testUtils.itesmCheck(res)
        })
    })*/
})
