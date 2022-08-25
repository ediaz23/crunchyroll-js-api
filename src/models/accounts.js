
class Accounts {
    
    constructor(param) {
        const data = param || {}
        /** @type {String} */
        this.accountId = data.accountId || null
        /** @type {String} */
        this.externalId = data.externalId || null
        /** @type {Boolean} */
        this.emailVerified = data.emailVerified || false
        /** @type {Date} */
        this.created = data.created || false
    }

    toJSON() {
        return {
            account_id: this.accountId,
            external_id: this.externalId,
            email_verified: this.emailVerified,
            created: this.created ? this.created.toISOString() : null,
        }
    }
    
    fromJSON(data) {
        this.accountId = data.account_id
        this.externalId = data.external_id
        this.emailVerified = data.email_verified
        this.created = data.created ? new Date(data.created) : null 
    }
}

module.exports = {
    Accounts,
}
