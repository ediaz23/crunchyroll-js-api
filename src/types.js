
// JSON Types returned from requests
/**
 * @typedef Token
 * @type {Object}
 * @property {String} access_token
 * @property {String} refresh_token
 * @property {Number} expires_in
 * @property {String} token_type
 * @property {String} scope
 * @property {String} country
 * @property {String} account_id
 * @property {String} profile_id
 * @property {String} created_date
 */

/**
 * @typedef TokenObj
 * @type {Object}
 * @property {String} accessToken
 * @property {String} refreshToken
 * @property {Number} expiresIn
 * @property {String} tokenType
 * @property {String} scope
 * @property {String} country
 * @property {String} accountId
 * @property {String} profileId
 * @property {String} createdDate
 */

/**
 * @typedef Device
 * @type {Object}
 * @property {String} id
 * @property {String} name
 * @property {String} type
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
 * @property {String} profile_id
 * @property {String} avatar
 * @property {String} profile_name
 * @property {String} [wallpaper]
 * @property {Boolean} cr_beta_opt_in
 * @property {Boolean} crleg_email_verified
 * @property {String} email
 * @property {String} maturity_rating
 * @property {{BR: String, UN: String}} extended_maturity_rating
 * @property {String} preferred_communication_language
 * @property {String} preferred_content_subtitle_language
 * @property {String} preferred_content_audio_language
 * @property {Boolean} qa_user
 * @property {String} username
 * @property {Boolean} [can_switch]
 * @property {Boolean} [is_primary]
 * @property {Boolean} [is_selected]
 * @property {Boolean} [do_not_sell]
 * @property {Boolean} [age_consent]
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
 * @typedef Storage
 * @type {Object}
 * @property {Credential} credential
 * @property {Device} device
 * @property {TokenObj} token
 * @property {CmsObj} cms
 * @property {AccountObj} account
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
 * @ts-ignore
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
 * @property {String} audioLanguage
 * @typedef {AuthBase & AccountParamSub} AccountAuth
 */

/**
 * @typedef CustomListResponse
 * @type {Object}
 * @property {String} list_id
 * @property {Number} total
 * @property {String} modified_at
 */

/**
 * @typedef CrunchyRequestTmp
 * @type {Object}
 * @property {Boolean} [baseUrlIncluded]
 * 
 * @typedef {CrunchyRequestTmp & import('node-fetch').Request} CrunchyRequest
 */

/**
 * @typedef ProfileCreate
 * @type {Object}
 * @property {String} username
 * @property {String} avatar
 * @property {String} avatar
 * @property {String} wallpaper
 * @property {String} profile_name
 */

/**
 * @typedef AssesItem
 * @type {Object}
 * @property {String} title
 * @property {Array<{id: String, title: String}>} assets
 */

/**
 * @typedef ProfileResponse
 * @type {Object}
 * @property {Array<Profile>} profiles
 * @property {Number} tier_max_profiles
 * @property {Number} max_profiles
 */

/**
 * @typedef HomeProps
 * @type {Object}
 * @property {String} [description]
 * @property {String} [title]
 * @property {String} [analyticsId]
 * @property {String} [contentId]
 * @property {String} [tallImage]
 * @property {String} [wideImage]
 * @property {String} [logoImage]
 * @property {String} [link]
 * @property {String} [musicVideoId]
 */

/**
 * @typedef HomeItem
 * @type {Object}
 * @property {String} type
 * @property {String} id
 * @property {String} parentId
 * @property {HomeProps} props
 * @property {Array<HomeItem>} children
 */

export default {}  // eslint-disable-line no-undef
