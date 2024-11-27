
import { expect } from '@jest/globals'

import localStore from '../src/localStore.js'
import testUtils from './testUtils.js'
import account from '../src/services/account.js'


/** @type {String} */
let token = null

beforeEach(async () => {
    await testUtils.init()
    token = await localStore.getAuthToken()
})

let profileId = null

describe('Account', () => {

    test('Request Account', async () => {
        return account.getAccountId({ token }).then(account => {
            testUtils.existValue(account.account_id)
            testUtils.existValue(account.created)
            testUtils.existValue(account.external_id)
            testUtils.existValue(account.email_verified)
        })
    })

    test('Request Profile', async () => {
        return account.getProfile({ token }).then(profile => {
            testUtils.existValue(profile.avatar)
            testUtils.existValue(profile.cr_beta_opt_in)
            testUtils.existValue(profile.crleg_email_verified)
            testUtils.existValue(profile.email)
            testUtils.existValue(profile.extended_maturity_rating)
            testUtils.existValue(profile.maturity_rating)
            testUtils.existValue(profile.preferred_communication_language)
            testUtils.existValue(profile.preferred_content_audio_language)
            testUtils.existValue(profile.preferred_content_subtitle_language)
            testUtils.existValue(profile.qa_user)
            testUtils.existValue(profile.username)
        })
    })

    test('Request Usernames', async () => {
        return account.getUsernames({ token }).then(names => {
            expect(names).toBeDefined()
            expect(names).toHaveProperty('usernames')
            testUtils.existValue(names.usernames)
            expect(names.usernames.length).toBeGreaterThan(0)
        })
    })

    test('Request Update Profile', async () => {
        await account.updateProfile({ token, data: { avatar: '16-the-god-of-high-school-jin-mori.png' } })
    })

    xtest('Create Multi Profile', async () => {
        const data = {
            username: 'npc55555555',
            avatar: 'solo_sungjinwoo.png',
            wallpaper: 'crbrand_product_multipleprofilesbackgroundassets_4k-08.png',
            profile_name: 'test'
        }
        return account.createMultiProfile({ token, data })
    })

    test('Request Multi Profile', async () => {
        return account.getMultiProfiles({ token }).then(res => {
            expect(Array.isArray(res.profiles)).toBe(true)
            for (const profile of res.profiles) {
                testUtils.existValue(profile.profile_id)
                testUtils.existValue(profile.avatar)
                testUtils.existValue(profile.username)
                testUtils.existValue(profile.maturity_rating)
                testUtils.existValue(profile.preferred_communication_language)
            }
            profileId = res.profiles[res.profiles.length - 1].profile_id
        })
    })

    test('Update Multi Profile', async () => {
        testUtils.existValue(profileId)
        const data = { profile_name: 'Ma' }
        return account.updateMultiProfile({ token, data, profileId })
    })

    xtest('Delete Multi Profile', async () => {
        testUtils.existValue(profileId)
        return account.deleteMultiProfile({ token, profileId })
    })

})
