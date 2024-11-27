
import localStore from '../src/localStore.js'
import testUtils from './testUtils.js'
import subscription from '../src/services/subscription.js'


/** @type {import('../src/types').AccountAuth} */
let auth = null

/** @type {String} */
let externalId = null

beforeEach(async () => {
    await testUtils.init()
    auth = await testUtils.getContentParam()
    externalId = (await localStore.getAccount()).externalId
})


describe('Subscription', () => {

    test('Request Products', async () => {
        return subscription.getProducts({ auth }).then(res => {
            testUtils.itesmCheck(res)
            testUtils.resultCheck(res)
            testUtils.totalCheck(res)
        })
    })

    test('Request User Benefist', async () => {
        return subscription.getUserBenefits({ auth, externalId }).then(res => {
            testUtils.itesmCheck(res)
            testUtils.resultCheck(res)
            testUtils.totalCheck(res)
        })
    })

    test('Request User Subscription', async () => {
        return subscription.getUserSubscription({ auth, externalId }).then(res => {
            testUtils.itesmCheck(res)
            testUtils.resultCheck(res)
            testUtils.totalCheck(res)
        })
    })
})
