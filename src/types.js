
// JSON Types returned from requests
/**
 * @typedef Token
 * @type {Object}
 * @property {String} access_token
 * @property {String} refresh_token
 * @property {String} expires_in
 * @property {String} token_type
 * @property {String} scope
 * @property {String} country
 * @property {String} account_id
 * @property {String} created_date
 */
 
/**
 * @typedef Credential
 * @type {Object}
 * @property {String} username
 * @property {String} password
 */

/**
 * @typedef Account
 * @type {Object}
 * @property {String} account_id
 * @property {String} external_id
 * @property {Boolean} email_verified
 * @property {String} created
 */
 
/**
 * @typedef Profile
 * @type {Object}
 * @property {String} avatar
 * @property {Boolean} cr_beta_opt_in
 * @property {Boolean} crleg_email_verified
 * @property {String} email
 * @property {String} maturity_rating
 * @property {Boolean} opt_out_android_in_app_marketing
 * @property {Boolean} opt_out_free_trials
 * @property {Boolean} opt_out_new_media_queue_updates
 * @property {Boolean} opt_out_newsletters
 * @property {Boolean} opt_out_pm_updates
 * @property {Boolean} opt_out_promotional_updates
 * @property {Boolean} opt_out_queue_updates
 * @property {Boolean} opt_out_store_deals
 * @property {String} preferred_communication_language
 * @property {String} preferred_content_subtitle_language
 * @property {Boolean} qa_user
 * @property {String} username
 */
 
/**
 * @typedef Cms
 * @type {Object}
 * @property {String} bucket
 * @property {String} policy
 * @property {String} signature
 * @property {String} key_pair_id
 * @property {String} expires
 */
 
/**
 * @typedef CmsContainer
 * @type {Object}
 * @property {Cms} cms
 * @property {Cms} cms_beta
 * @property {Cms} cms_web
 * @property {Boolean} service_available
 * @property {Boolean} default_marketing_opt_in
 */

export {}  // eslint-disable-line no-undef
