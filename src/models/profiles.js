
class Profiles {
    
    constructor(param) {
        const data = param || {}
        /** @type {String} */
        this.avatar = data.avatar || null
        /** @type {Boolean} */
        this.cr_beta_opt_in = data.cr_beta_opt_in || false
        /** @type {Boolean} */
        this.crleg_email_verified = data.crleg_email_verified || false
        /** @type {Boolean} */
        this.email = data.email || null
        /** @type {Boolean} */
        this.maturity_rating = data.maturity_rating || null
        /** @type {Boolean} */
        this.opt_out_android_in_app_marketing = data.opt_out_android_in_app_marketing || false
        /** @type {Boolean} */
        this.opt_out_free_trials = data.opt_out_free_trials || false
        /** @type {Boolean} */
        this.opt_out_new_media_queue_updates = data.opt_out_new_media_queue_updates || false
        /** @type {Boolean} */
        this.opt_out_newsletters = data.opt_out_newsletters || false
        /** @type {Boolean} */
        this.opt_out_pm_updates = data.opt_out_pm_updates || false
        /** @type {Boolean} */
        this.opt_out_promotional_updates = data.opt_out_promotional_updates || false
        /** @type {Boolean} */
        this.opt_out_queue_updates = data.opt_out_queue_updates || false
        /** @type {Boolean} */
        this.opt_out_store_deals = data.opt_out_store_deals || false
        /** @type {String} */
        this.preferred_communication_language = data.preferred_communication_language || null
        /** @type {String} */
        this.preferred_content_subtitle_language = data.preferred_content_subtitle_language || null
        /** @type {Boolean} */
        this.qa_user = data.qa_user || false
        /** @type {String} */
        this.username = data.username || false
    }

    toJSON() {
        return {
            avatar: this.avatar,
            cr_beta_opt_in: this.cr_beta_opt_in,
            crleg_email_verified: this.crleg_email_verified,
            email: this.email,
            maturity_rating: this.maturity_rating,
            opt_out_android_in_app_marketing: this.opt_out_android_in_app_marketing,
            opt_out_free_trials: this.opt_out_free_trials,
            opt_out_new_media_queue_updates: this.opt_out_new_media_queue_updates,
            opt_out_newsletters: this.opt_out_newsletters,
            opt_out_pm_updates: this.opt_out_pm_updates,
            opt_out_promotional_updates: this.opt_out_promotional_updates,
            opt_out_queue_updates: this.opt_out_queue_updates,
            opt_out_store_deals: this.opt_out_store_deals,
            preferred_communication_language: this.preferred_communication_language,
            preferred_content_subtitle_language: this.preferred_content_subtitle_language,
            qa_user: this.qa_user,
            username: this.username,
        }
    }
    
    fromJSON(data) {
        this.avatar = data.avatar
        this.cr_beta_opt_in = data.cr_beta_opt_in
        this.crleg_email_verified = data.crleg_email_verified
        this.email = data.email
        this.maturity_rating = data.maturity_rating
        this.opt_out_android_in_app_marketing = data.opt_out_android_in_app_marketing
        this.opt_out_free_trials = data.opt_out_free_trials
        this.opt_out_new_media_queue_updates = data.opt_out_new_media_queue_updates
        this.opt_out_newsletters = data.opt_out_newsletters
        this.opt_out_pm_updates = data.opt_out_pm_updates
        this.opt_out_promotional_updates = data.opt_out_promotional_updates
        this.opt_out_queue_updates = data.opt_out_queue_updates
        this.opt_out_store_deals = data.opt_out_store_deals
        this.preferred_communication_language = data.preferred_communication_language
        this.preferred_content_subtitle_language = data.preferred_content_subtitle_language
        this.qa_user = data.qa_user
        this.username = data.username
    }
    
}

module.exports = {
    Profiles,
}
