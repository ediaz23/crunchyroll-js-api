
const fs = require('fs')
const path = require('path')
const clientsModel = require('../models/clients')
const authService = require('../services/auth')
const indexService = require('../services/index')
const accountService = require('../services/account')

class Clients {

    constructor() {
        this.client = new clientsModel.Clients()
    }

    /**
     * @returns {Promise<String>}
     */
    async getToken() {
        let accessToken = null
        
        if (this.client.tokens && this.client.tokens.accessToken) {
            const now = new Date()
            const diff = (now - this.client.tokens.createdDate) / 1000
            if (diff < this.client.tokens.expiresIn) {
                accessToken = this.client.tokens.accessToken
            }
        }
        if (!accessToken) {
            let data = null
            if (this.client.tokens.refreshToken) {
                /** @todo it does not work */
                data = await authService.getRefreshToken(this.client.tokens)
            } else {
                data = await authService.getToken(this.client.credentials, 'password')
            }
            this.client.tokens = data
            await this.saveToLocal()
            accessToken = this.client.tokens.accessToken
        }
        return `${this.client.tokens.tokenType} ${accessToken}`
    }

    /**
     * @returns {Promise<import('../models/cms').Cms>}
     */
    async getCms() {
        let cms = null
        if (this.client.cms && this.client.cms.bucket) {
            const now = new Date()
            if (this.client.cms.expires < now) {
                cms = this.client.cms
            }
        }
        if (!cms) {
            cms = await indexService.getIndexConfig(this)
            this.client.cms = cms
            await this.saveToLocal()
        }
        
        return cms
    }

    /**
     * @todo remember refresh data
     */    
    async getProfile() {
        let profile = null
        if (this.client.profile && this.client.profile.username) {
            profile = this.client.profile
        } else {
            profile = await accountService.getProfile(this)
            this.client.profile = profile
            await this.saveToLocal()
        }
        return profile
    }

    /**
     * @todo remember refresh data
     */    
    async getAccount() {
        let account = null
        if (this.client.account && this.client.account.accountId) {
            account = this.client.account
        } else {
            account = await accountService.getAccountId(this)
            this.client.account = account
            await this.saveToLocal()
        }
        return account
    }

    /**
     * @todo maybe add a extra field to save locale, and return profile.preferredContentSubtitleLanguage too
     */
    async getLocale() {
//        preferredContentSubtitleLanguage: 'es-419',
        return 'es-419'
    }

    /**
     * @returns {Object}
     */
    toJSON() {
        return this.client.toJSON()
    }

    /**
     * Set values from JSON
     * @param {Object} data
     */
    fromJSON(data) {
        this.client.fromJSON(data)
    }

    /**
     * Load from persistence data
     * @returns {Promise}
     */    
    async loadFromLocal() {
        if (fs.existsSync(this.authData)) {
            const data = fs.readFileSync(this.authData)
            const jsonData = JSON.parse(data)
            this.fromJSON(jsonData)
        }
    }

    /**
     * Save to persistence data
     * @returns {Promise}
     */
    async saveToLocal() {
        fs.writeFileSync(this.authData, JSON.stringify(this.client.toJSON(), null, '\t'))
    }

    /**
     * Disk file with credential data
     * @returns {String} 
     */
    get authData () {
        return path.resolve('.') + '/authData.json'
    }
}

module.exports = {
    Clients,
}
