
const { Clients } = require('../controllers/clients')
const testUtils = require('./testUtils')
const account = require('../services/account')


/** @type {String} */
let token = null

beforeEach(async () => {
    const client = new Clients()
    await client.loadFromLocal()
    token = await client.getToken()
})

describe('Account', () => {
    test('empty', () => {})

    test('Request Account', async() => {
        return account.getAccountId({ token }).then(account => {
            testUtils.existValue(account.account_id)
            testUtils.existValue(account.created)
            testUtils.existValue(account.external_id)
            testUtils.existValue(account.email_verified)
        })
    })
    
    test('Request Profile', async() => {
        return account.getProfile({ token }).then(profile => {
            testUtils.existValue(profile.avatar)
            testUtils.existValue(profile.cr_beta_opt_in)
            testUtils.existValue(profile.crleg_email_verified)
            testUtils.existValue(profile.email)
            testUtils.existValue(profile.maturity_rating)
            testUtils.existValue(profile.opt_out_android_in_app_marketing)
            testUtils.existValue(profile.opt_out_free_trials)
            testUtils.existValue(profile.opt_out_new_media_queue_updates)
            testUtils.existValue(profile.opt_out_pm_updates)
            testUtils.existValue(profile.opt_out_promotional_updates)
            testUtils.existValue(profile.opt_out_queue_updates)
            testUtils.existValue(profile.opt_out_store_deals)
            testUtils.existValue(profile.preferred_communication_language)
            testUtils.existValue(profile.preferred_content_subtitle_language)
            testUtils.existValue(profile.qa_user)
            testUtils.existValue(profile.username)
        })
    })
    
    test('Request Usernames', async() => {
        return account.getUsernames({ token }).then(names => {
            expect(names).toBeDefined()
            expect(names).toHaveProperty('usernames')
            testUtils.existValue(names.usernames)
            expect(names.usernames.length).toBeGreaterThan(0)
        })
    })
    
    test('Request Update Profile', async() => {
        await account.updateProfile({ token, data: {avatar: '16-the-god-of-high-school-jin-mori.png'} })
    })
})
