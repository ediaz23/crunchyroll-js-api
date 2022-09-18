
const { Clients } = require('../controllers/clients')
const testUtils = require('./testUtils')
const account = require('../services/account')


/** @type {Clients} */
let client = null
beforeEach(() => {
    client = new Clients()
    return client.loadFromLocal()
})


describe('Sbuscription', () => {
    test('empty', () => {})

    /*test('Request Account', async() => {
        return account.getAccountId(client).then(account => {
            testUtils.existValue(account.accountId)
            testUtils.existValue(account.created)
            testUtils.existValue(account.externalId)
            testUtils.existValue(account.emailVerified)
        })
    })
    
    test('Request Profile', async() => {
        return account.getProfile(client).then(profile => {
            testUtils.existValue(profile.avatar)
            testUtils.existValue(profile.crBetaOptIn)
            testUtils.existValue(profile.crlegEmailVerified)
            testUtils.existValue(profile.email)
            testUtils.existValue(profile.maturityRating)
            testUtils.existValue(profile.optOutAndroidInAppMarketing)
            testUtils.existValue(profile.optOutFreeTrials)
            testUtils.existValue(profile.optOutNewMediaQueueUpdates)
            testUtils.existValue(profile.optOutPmUpdates)
            testUtils.existValue(profile.optOutPromotionalUpdates)
            testUtils.existValue(profile.optOutQueueUpdates)
            testUtils.existValue(profile.optOutStoreDeals)
            testUtils.existValue(profile.preferredCommunicationLanguage)
            testUtils.existValue(profile.preferredContentSubtitleLanguage)
            testUtils.existValue(profile.qaUser)
            testUtils.existValue(profile.username)
        })
    })
    
    test('Request Usernames', async() => {
        return account.getUsernames(client).then(names => {
            expect(names).toBeDefined()
            expect(names).toHaveProperty('usernames')
            testUtils.existValue(names.usernames)
            expect(names.usernames.length).toBeGreaterThan(0)
        })
    })
    
    test('Request Update Profile', async() => {
        await account.updateProfile(client, {avatar: '16-the-god-of-high-school-jin-mori.png'})
    })*/
})
