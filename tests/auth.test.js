
import { expect } from '@jest/globals'

import fs from 'fs'
import localStore from '../src/localStore.js'
import auth from '../src/services/auth.js'
import testUtils from './testUtils.js'


/** @type {import('../src/types').Token} */
let token = null

/** @type {import('../src/types').Credential} */
let credential = null

/** @type {import('../src/types').Device} */
let device = null

/** @type {String} */
let deviceCode = null

beforeEach(async () => {
    await testUtils.init()
    credential = localStore.storage.credential
    device = localStore.storage.device
})

/**
 * @param {import('../src/types').Token} token
 */
function validateToken(token) {
    expect(token).toBeDefined()
    expect(token.access_token).not.toBeNull()
    expect(token.account_id).not.toBeNull()
    expect(token.profile_id).not.toBeNull()
    expect(token.country).not.toBeNull()
    expect(token.created_date).not.toBeNull()
    expect(token.expires_in).not.toBe(0)
    expect(token.refresh_token).not.toBeNull()
    expect(token.scope).not.toBeNull()
    expect(token.token_type).not.toBeNull()
}

xdescribe('Auth', () => {

    test('Load Credentials', async () => {
        expect(fs.existsSync(await localStore.authDataFile())).toBe(true)
    })

    test('Credentials content', () => {
        expect(credential).not.toBeNull()
        testUtils.existValue(credential.username)
        testUtils.existValue(credential.password)
        testUtils.existValue(device)
        testUtils.existValue(device.id)
    })

    test('Autenticate Wrong Email', async () => {
        await expect(new Promise((res, rej) => {
            const credentialsWrong = { ...credential }
            credentialsWrong.username += '1'
            auth.getToken({ ...credentialsWrong, device }).then(res).catch(rej)
        })).rejects.toThrowError(new Error('invalid_grant'))
    })

    test('Autenticate Wrong Password', async () => {
        await expect(new Promise((res, rej) => {
            const credentialsWrong = { ...credential }
            credentialsWrong.password += '1'
            auth.getToken({ ...credentialsWrong, device }).then(res).catch(rej)
        })).rejects.toThrowError(new Error('invalid_grant'))
    })

    test('Autenticate Okey', async () => {
        token = await auth.getToken({ device, ...credential })
        validateToken(token)
    })

    test('SwitchProfile Okey', async () => {
        testUtils.existValue(token)
        testUtils.existValue(token.refresh_token)
        testUtils.existValue(token.profile_id)
        token = await auth.switchProfile({
            device,
            refreshToken: token.refresh_token,
            profileId: token.profile_id
        })
        validateToken(token)
    })

    test('Refresh Token Okey', async () => {
        testUtils.existValue(token)
        testUtils.existValue(token.refresh_token)
        token = await auth.getRefreshToken({
            device,
            refreshToken: token.refresh_token
        })
        validateToken(token)
    })

    test('Revoke Refresh Token Okey', async () => {
        testUtils.existValue(token)
        testUtils.existValue(token.refresh_token)
        return auth.revokeRefreshToken({
            refreshToken: token.refresh_token
        }).then(data => {
            expect(data).toEqual({ status: "OK" })
        })
    })

    test('DeviceCode', async () => {
        return auth.getDeviceCode().then(deviceObj => {
            testUtils.existValue(deviceObj)
            testUtils.existValue(deviceObj.user_code)
            testUtils.existValue(deviceObj.device_code)
            testUtils.existValue(deviceObj.interval)
            testUtils.existValue(deviceObj.expires_in)
            deviceCode = deviceObj.device_code
        })
    })

    test('DeviceAuthToken', async () => {
        testUtils.existValue(device)
        testUtils.existValue(deviceCode)
        return auth.getDeviceAuth({
            device,
            deviceCode
        }).then(out => {
            expect(out).toBeNull()
        })
    })

})
