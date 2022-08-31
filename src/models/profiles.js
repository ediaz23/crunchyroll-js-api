
class Profiles {
    
    constructor(param) {
        const data = param || {}
        /** @type {String} */
        this.avatar = data.avatar || null
        /** @type {Boolean} */
        this.crBetaOptIn = data.crBetaOptIn || false
        /** @type {Boolean} */
        this.crlegEmailVerified = data.crlegEmailVerified || false
        /** @type {String} */
        this.email = data.email || null
        /** @type {String} */
        this.maturityRating = data.maturityRating || null
        /** @type {Boolean} */
        this.optOutAndroidInAppMarketing = data.optOutAndroidInAppMarketing || false
        /** @type {Boolean} */
        this.optOutFreeTrials = data.optOutFreeTrials || false
        /** @type {Boolean} */
        this.optOutNewMediaQueueUpdates = data.optOutNewMediaQueueUpdates || false
        /** @type {Boolean} */
        this.optOutNewsletters = data.optOutNewsletters || false
        /** @type {Boolean} */
        this.optOutPmUpdates = data.optOutPmUpdates || false
        /** @type {Boolean} */
        this.optOutPromotionalUpdates = data.optOutPromotionalUpdates || false
        /** @type {Boolean} */
        this.optOutQueueUpdates = data.optOutQueueUpdates || false
        /** @type {Boolean} */
        this.optOutStoreDeals = data.optOutStoreDeals || false
        /** @type {String} */
        this.preferredCommunicationLanguage = data.preferredCommunicationLanguage || null
        /** @type {String} */
        this.preferredContentSubtitleLanguage = data.preferredContentSubtitleLanguage || null
        /** @type {Boolean} */
        this.qaUser = data.qaUser || false
        /** @type {String} */
        this.username = data.username || null
    }

    toJSON() {
        return {
            avatar: this.avatar,
            cr_beta_opt_in: this.crBetaOptIn,
            crleg_email_verified: this.crlegEmailVerified,
            email: this.email,
            maturity_rating: this.maturityRating,
            opt_out_android_in_app_marketing: this.optOutAndroidInAppMarketing,
            opt_out_free_trials: this.optOutFreeTrials,
            opt_out_new_media_queue_updates: this.optOutNewMediaQueueUpdates,
            opt_out_newsletters: this.optOutNewsletters,
            opt_out_pm_updates: this.optOutPmUpdates,
            opt_out_promotional_updates: this.optOutPromotionalUpdates,
            opt_out_queue_updates: this.optOutQueueUpdates,
            opt_out_store_deals: this.optOutStoreDeals,
            preferred_communication_language: this.preferredCommunicationLanguage,
            preferred_content_subtitle_language: this.preferredContentSubtitleLanguage,
            qa_user: this.qaUser,
            username: this.username
        }
    }
    
    fromJSON(data) {
        this.avatar = data.avatar
        this.crBetaOptIn = data.cr_beta_opt_in
        this.crlegEmailVerified = data.crleg_email_verified
        this.email = data.email
        this.maturityRating = data.maturity_rating
        this.optOutAndroidInAppMarketing = data.opt_out_android_in_app_marketing
        this.optOutFreeTrials = data.opt_out_free_trials
        this.optOutNewMediaQueueUpdates = data.opt_out_new_media_queue_updates
        this.optOutNewsletters = data.opt_out_newsletters
        this.optOutPmUpdates = data.opt_out_pm_updates
        this.optOutPromotionalUpdates = data.opt_out_promotional_updates
        this.optOutQueueUpdates = data.opt_out_queue_updates
        this.optOutStoreDeals = data.opt_out_store_deals
        this.preferredCommunicationLanguage = data.preferred_communication_language
        this.preferredContentSubtitleLanguage = data.preferred_content_subtitle_language
        this.qaUser = data.qa_user
        this.username = data.username
    }
    
}

module.exports = {
    Profiles,
}
