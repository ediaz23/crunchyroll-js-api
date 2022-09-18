
const { Clients } = require('../controllers/clients')
const testUtils = require('./testUtils')
const subscription = require('../services/subscription')


/** @type {import('../types').AuthBase} */
let auth = null

/** @type {String} */
let externalId = null

beforeEach(async () => {
    const client = new Clients()
    await client.loadFromLocal()
    const token = await client.getToken()
    const locale = await client.getLocale()
    auth = { token, locale}
    const account = await client.getAccount()
    externalId = account.externalId
})


describe('Sbuscription', () => {
    test('empty', () => {})

    test('Request Products', async() => {
        return subscription.getProducts({ auth }).then(res => {
            testUtils.itesmCheck(res)
            testUtils.resultCheck(res)
            testUtils.totalCheck(res)
        })
    })
    
    test('Request User Benefist', async() => {
        return subscription.getUserBenefits({ auth, externalId }).then(res => {
            testUtils.itesmCheck(res)
            testUtils.resultCheck(res)
            testUtils.totalCheck(res)
        })
    })
    
    test('Request User Subscription', async() => {
        return subscription.getUserSubscription({ auth, externalId }).then(res => {
            testUtils.itesmCheck(res)
            testUtils.resultCheck(res)
            testUtils.totalCheck(res)
        })
    })
})
