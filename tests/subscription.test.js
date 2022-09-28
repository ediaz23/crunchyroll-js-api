
const localStore = require('../src/localStore')
const testUtils = require('./testUtils')
const subscription = require('../src/services/subscription')


/** @type {import('../types').AuthBase} */
let auth = null

/** @type {String} */
let externalId = null

beforeEach(async () => {
    await localStore.loadFromLocal()
    const token = await localStore.getAuthToken()
    const locale = await localStore.getLocale()
    auth = { token, locale}
    externalId = (await localStore.getAccount()).externalId
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
