
const { Clients } = require('../controllers/clients')
const testUtils = require('./testUtils')
const subscription = require('../services/subscription')


/** @type {Clients} */
let client = null
beforeEach(() => {
    client = new Clients()
    return client.loadFromLocal()
})


describe('Sbuscription', () => {
    test('empty', () => {})

    /*test('Request Products', async() => {
        return subscription.getProducts(client).then(res => {
            testUtils.itesmCheck(res)
            testUtils.resultCheck(res)
            testUtils.totalCheck(res)
        })
    })
    
    test('Request User Benefist', async() => {
        return subscription.getUserBenefits(client).then(res => {
            testUtils.itesmCheck(res)
            testUtils.resultCheck(res)
            testUtils.totalCheck(res)
        })
    })
    
    test('Request User Subscription', async() => {
        return subscription.getUserSubscription(client).then(res => {
            testUtils.itesmCheck(res)
            testUtils.resultCheck(res)
            testUtils.totalCheck(res)
        })
    })*/
})
