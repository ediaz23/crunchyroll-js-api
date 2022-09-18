
const { Clients } = require('../controllers/clients')
const testUtils = require('./testUtils')
const review = require('../services/review')


/** @type {Clients} */
let client = null
beforeEach(() => {
    client = new Clients()
    return client.loadFromLocal()
})


describe('Account', () => {
    test('empty', () => {})
})