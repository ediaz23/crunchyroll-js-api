
const { Clients } = require('../controllers/clients')
const testUtils = require('./testUtils')
const subscription = require('../services/subscription')


/** @type {String} */
let token = null

/** @type {String} */
let locale = null

/** @type {String} */
let externalId = null

/** @type {Clients} */
let client = null

beforeEach(async () => {
    client = new Clients()
    await client.loadFromLocal()
    token = await client.getToken()
    locale = await client.getLocale()
    const account = await client.getAccount()
    externalId = account.externalId
})


describe('Sbuscription', () => {
    test('empty', () => {})

    /*test('Request Products', async() => {
        return subscription.getProducts({token, locale}).then(res => {
            testUtils.itesmCheck(res)
            testUtils.resultCheck(res)
            testUtils.totalCheck(res)
        })
    })
    
    test('Request User Benefist', async() => {
        return subscription.getUserBenefits({token, locale, externalId}).then(res => {
            testUtils.itesmCheck(res)
            testUtils.resultCheck(res)
            testUtils.totalCheck(res)
        })
    })
    
    test('Request User Subscription', async() => {
        return subscription.getUserSubscription({token, locale, externalId}).then(res => {
            testUtils.itesmCheck(res)
            testUtils.resultCheck(res)
            testUtils.totalCheck(res)
        })
    })*/
})
