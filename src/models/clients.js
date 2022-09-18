
const { Credentials } = require('./credentials')
const { Tokens } = require('./tokens')
const { Cms } = require('./cms')
const { Accounts } = require('./accounts')
const { Profiles } = require('./profiles')
const { BaseModel } = require('./baseModel')


class Clients extends BaseModel {
    
    constructor() {
        super()
        /** @type {Credentials} */
        this.credentials = new Credentials()
        /** @type {Tokens} */
        this.tokens = new Tokens()
        /** @type {Cms} */
        this.cms = new Cms()
        /** @type {Accounts} */
        this.account = new Accounts()
        /** @type {Profiles} */
        this.profile = new Profiles()
    }

    toJSON() {
        return {
            credentials: this.credentials ? this.credentials.toJSON() : null,
            tokens: this.tokens ? this.tokens.toJSON() : null,
            cms: this.cms ? this.cms.toJSON() : null,
            account: this.account ? this.account.toJSON() : null,
            profile: this.profile ? this.profile.toJSON() : null,
        }
    }
    
    fromJSON(data) {
        if (data.credentials) {
            this.credentials.fromJSON(data.credentials)
        }
        if (data.tokens) {
            this.tokens.fromJSON(data.tokens)
        }
        if (data.cms) {
            this.cms.fromJSON(data.cms)
        }
        if (data.account) {
            this.account.fromJSON(data.account)
        }
        if (data.profile) {
            this.profile.fromJSON(data.profile)
        }
    }

    _update(key, data) {
        if (data[key]) {
            if (data[key] instanceof BaseModel) {
                this[key] = data[key]
            } else {
                this[key].update(data[key])
            }
        }
    }

    update(data) {
        for(const key of Object.keys(data)) {
            this._update(key, data)
        }
    }
    
}

module.exports = {
    Clients,
}
