
const { BaseModel } = require('./baseModel')


class Cms extends BaseModel {
    
    constructor(param) {
        super(param)
        const data = param || {}
        /** @type {String} */
        this.bucket = data.bucket || null
        /** @type {String} */
        this.policy = data.policy || null
        /** @type {String} */
        this.signature = data.signature || null
        /** @type {String} */
        this.keyPairId = data.keyPairId || null
        /** @type {Date} */
        this.expires = data.expires || null
    }

    toJSON() {
        return {
            bucket: this.bucket,
            policy: this.policy,
            signature: this.signature,
            key_pair_id: this.keyPairId,
            expires: this.expires ? this.expires.toISOString() : null,
        }
    }
    
    fromJSON(data) {
        this.bucket = data.bucket
        this.policy = data.policy
        this.signature = data.signature
        this.keyPairId = data.key_pair_id
        this.expires = data.expires ? new Date(data.expires) : null
    }

}

module.exports = {
    Cms,
}
