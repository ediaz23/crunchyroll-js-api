
const { Clients } = require('../controllers/clients')
const fs = require('fs')
const auth = require('../services/auth')

/** @type {Clients} */
let client = null
beforeEach(() => {
    client = new Clients()
    return client.loadFromLocal()
})
/** @type {import('../models/tokens').Tokens} */
let token = null
/** @type {import('../models/credentials').Credentials} */
let credentials = null

describe('Auth', () => {
    test('empty', () => {})

    /*test('Load Credentials', () => {
        expect(fs.existsSync(client.authData)).toBe(true)
        expect(client.client).toBeDefined()
        expect(client.client).toHaveProperty('credentials')
        credentials = client.client.credentials
    })

    test('Credentials content', () => {
        expect(credentials).not.toBeNull()
        expect(credentials.username).toBeDefined()
        expect(credentials.username).not.toBe('')
        expect(credentials.username).not.toBeNull()
        expect(credentials.password).toBeDefined()
        expect(credentials.password).not.toBe('')
        expect(credentials.password).not.toBeNull()
    })

    test('Autenticate Wrong Email', async () => {
        await expect(async () => {
            const credentialsWrong = Object.assign({}, credentials)
            credentialsWrong.username += '1'
            await auth.getToken(credentialsWrong)
        }).rejects.toThrowError(new Error('invalid_grant'))
    }) 

    test('Autenticate Wrong Password', async () => {
        await expect(async () => {
            const credentialsWrong = Object.assign({}, credentials)
            credentialsWrong.password += '1'
            await auth.getToken(credentialsWrong)
        }).rejects.toThrowError(new Error('invalid_grant'))
    })

    test('Autenticate Okey', async () => {
        token = await auth.getToken(credentials)
        expect(token).toBeDefined()
        expect(token.accessToken).not.toBeNull()
        expect(token.accountId).not.toBeNull()
        expect(token.country).not.toBeNull()
        expect(token.createdDate).not.toBeNull()
        expect(token.expiresIn).not.toBe(0)
        expect(token.refreshToken).not.toBeNull()
        expect(token.scope).not.toBeNull()
        expect(token.tokenType).not.toBeNull()
    })
    
    test('Refresh Token Okey', async () => {
        token = await auth.getRefreshToken(token)
        expect(token).toBeDefined()
        expect(token.accessToken).not.toBeNull()
        expect(token.accountId).not.toBeNull()
        expect(token.country).not.toBeNull()
        expect(token.createdDate).not.toBeNull()
        expect(token.expiresIn).not.toBe(0)
        expect(token.refreshToken).not.toBeNull()
        expect(token.scope).not.toBeNull()
        expect(token.tokenType).not.toBeNull()
    })

    test('Revoke Refresh Token Okey', async () => {
        return auth.revokeRefreshToken(token).then(data => {
            expect(data).toEqual({status: "OK"})
        })
    })*/

})
