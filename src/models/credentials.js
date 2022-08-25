
class Credentials {
    
    constructor(param) {
        const data = param || {}
        /** @type {String} */
        this.username = data.username || null
        /** @type {String} */
        this.password = data.password || null
    }

    toJSON() {
        return {
            username: this.username,
            password: this.password,
        }
    }
    
    fromJSON(data) {
        this.username = data.username
        this.password = data.password
    }
    
}

module.exports = {
    Credentials,
}
