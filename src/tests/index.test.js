
const { Clients } = require('../controllers/clients')
const index = require('../services/index')


/** @type {Clients} */
let client = null
beforeEach(() => {
    client = new Clients()
    return client.loadFromLocal()
})


describe('Index', () => {
    test('empty', () => {})

    /*test('Request Index', async() => {
        return index.getIndexConfig(client).then(res => {
            expect(res).not.toBeNull()
            expect(res).toHaveProperty('bucket')
            expect(res.bucket).not.toBeNull()
            expect(res.bucket).not.toBe('')
            expect(res).toHaveProperty('policy')
            expect(res.policy).not.toBeNull()
            expect(res.policy).not.toBe('')
            expect(res).toHaveProperty('signature')
            expect(res.signature).not.toBeNull()
            expect(res.signature).not.toBe('')
            expect(res).toHaveProperty('keyPairId')
            expect(res.keyPairId).not.toBeNull()
            expect(res.keyPairId).not.toBe('')
            expect(res).toHaveProperty('expires')
            expect(res.expires).not.toBeNull()
        })
    })*/
})
