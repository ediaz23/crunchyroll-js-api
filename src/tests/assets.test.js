
const { Clients } = require('../controllers/clients')
const assets = require('../services/assets')
const testUtils = require('./testUtils')


/** @type {Clients} */
let client = null
beforeEach(() => {
    client = new Clients()
    return client.loadFromLocal()
})


describe('Assets', () => {
    test('empty', () => {})

    /*test('Request Assets', async() => {
        return assets.getAvatar(client).then(res => {
            testUtils.itesmCheck(res)
        })
    })*/
})
