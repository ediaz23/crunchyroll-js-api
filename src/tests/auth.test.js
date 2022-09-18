
const { Clients } = require('../controllers/clients')
const fs = require('fs')
const auth = require('../services/auth')
const testUtils = require('./testUtils')


/** @type {import('../types').Token} */
let token = null

/** @type {import('../types').Credential} */
let credentials = null

/** @type {Clients} */
let client = null

beforeEach(async () => {
    client = new Clients()
    await client.loadFromLocal()
    credentials = client.client.credentials
})

/**
 * @param {import('../types').Token} token
 */
function validateToken(token) {
    expect(token).toBeDefined()
    expect(token.access_token).not.toBeNull()
    expect(token.account_id).not.toBeNull()
    expect(token.country).not.toBeNull()
    expect(token.created_date).not.toBeNull()
    expect(token.expires_in).not.toBe(0)
    expect(token.refresh_token).not.toBeNull()
    expect(token.scope).not.toBeNull()
    expect(token.token_type).not.toBeNull()
}


describe('Auth', () => {
    test('empty', () => {})

    /*test('Load Credentials', () => {
        expect(fs.existsSync(client.authData)).toBe(true)
        expect(client.client).toBeDefined()
        expect(client.client).toHaveProperty('credentials')
    })

    test('Credentials content', () => {
        expect(credentials).not.toBeNull()
        testUtils.existValue(credentials.username)
        testUtils.existValue(credentials.password)
    })

    test('Autenticate Wrong Email', async () => {
        await expect(async () => {
            const credentialsWrong = {...credentials}
            credentialsWrong.username += '1'
            await auth.getToken({...credentialsWrong})
        }).rejects.toThrowError(new Error('invalid_grant'))
    }) 

    test('Autenticate Wrong Password', async () => {
        await expect(async () => {
            const credentialsWrong = {...credentials}
            credentialsWrong.password += '1'
            await auth.getToken({...credentialsWrong})
        }).rejects.toThrowError(new Error('invalid_grant'))
    })

    test('Autenticate Okey', async () => {
        token = await auth.getToken({...credentials})
        validateToken(token)
    })
    
    test('Refresh Token Okey', async () => {
        token = await auth.getRefreshToken({refreshToken: token.refresh_token})
        validateToken(token)
    })

    test('Revoke Refresh Token Okey', async () => {
        return auth.revokeRefreshToken({refreshToken: token.refresh_token}).then(data => {
            expect(data).toEqual({status: "OK"})
        })
    })*/

})
