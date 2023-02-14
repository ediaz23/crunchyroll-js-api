
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
 * @typedef TokenObj
 * @type {Object}
 * @property {String} accessToken
 * @property {String} refreshToken
 * @property {String} expiresIn
 * @property {String} tokenType
 * @property {String} scope
 * @property {String} country
 * @property {String} accountId
 * @property {String} createdDate
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
* @typedef AccountObj
* @type {Object}
* @property {String} accountId
* @property {String} externalId
* @property {Boolean} emailVerified
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
* @typedef CmsObj
* @type {Object}
* @property {String} bucket
* @property {String} policy
* @property {String} signature
* @property {String} keyPairId
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

/**
 * @typedef RatingEpisode
 * @type {Object}
 * @property {Object} up
 * @property {String} up.displayed
 * @property {String} up.unit
 * @property {Object} down
 * @property {String} down.displayed
 * @property {String} down.unit
 * @property {Number} total
 * @property {String} rating
 */

/**
 * @typedef RatingBasic
 * @type {Object}
 * @property {String} displayed
 * @property {String} unit
 * @property {Number} percentage
 */

/**
 * @typedef RatingStars
 * @type {Object}
 * @property {RatingBasic} [1s]
 * @property {RatingBasic} [2s]
 * @property {RatingBasic} [3s]
 * @property {RatingBasic} [4s]
 * @property {RatingBasic} [5s] 
 * @property {String} average
 * @property {Number} total
 * @property {String} rating
 */

/**
 * @typedef AuthBase
 * @type {Object}
 * @property {String} token
 * @property {String} locale
 */

/**
 * @typedef {AuthBase & CmsObj} CmsAuth
 */

/**
 * @typedef AccountParamSub
 * @type {Object}
 * @property {String} accountId
 * @typedef {AuthBase & AccountParamSub} AccountAuth
 */

/**
 * @typedef CustomListResponse
 * @type {Object}
 * @property {String} list_id
 * @property {Number} total
 * @property {String} modified_at
 */

export default {}  // eslint-disable-line no-undef
