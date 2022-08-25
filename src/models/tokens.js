
class Tokens {
    
    constructor(param) {
        const data = param || {}
        /** @type {String} */
        this.accessToken = data.accessToken || null
        /** @type {String} */
        this.refreshToken = data.refreshToken || null
        this.expiresIn = data.expiresIn || 0
        /** @type {String} */
        this.tokenType = data.tokenType || null
        /** @type {String} */
        this.scope = data.scope || null
        /** @type {String} */
        this.country = data.country || null
        /** @type {String} */
        this.accountId = data.accountId || null
        /** @type {Date} */
        this.createdDate = data.createdDate || new Date()
    }

    toJSON() {
        return {
            access_token: this.accessToken,
            refresh_token: this.refreshToken,
            expires_in: this.expiresIn,
            token_type: this.tokenType,
            scope: this.scope,
            created_date: this.createdDate.toISOString(),
        }
    }
    
    fromJSON(data) {
        this.accessToken = data.access_token
        this.refreshToken = data.refresh_token
        this.expiresIn = data.expires_in
        this.tokenType = data.token_type
        this.scope = data.scope
        this.createdDate = data.created_date ? new Date(data.created_date) : null
    }
    
}

module.exports = {
    Tokens,
}
