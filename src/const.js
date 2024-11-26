
import config from './config.js'


/**
 * Returning user-agent
 * @return {String}
 */
export function getUserAgent() {
    return `Crunchyroll/${config.version_name} Android/${config.os_release_version}`
}

/**
 * Return content types
 * @returns {Array<String>}
 */
export function getContentTypes() {
    return config.content_types
}


/**
 * Return possible values for series rating.
 * @returns {Array<String>}
 */
export function getRatingContentTypes() {
    return ['1s', '2s', '3s', '4s', '5s']
}


/**
 * Return possible values for episodes rating.
 * @returns {Array<String>}
 */
export function getRatingEpisodeTypes() {
    return ['up', 'down']
}


/**
 * @returns {String}
 */
export function getClientId() {
    return config.beta.client_id
}


/**
 * @returns {String}
 */
export function getClientSecret() {
    return config.beta.client_secret
}


/**
 * @return {String}
 */
export function getBaseUrl() {
    return config.beta.url
}


/**
 * @return {String}
 */
export function getDrmUrl() {
    return config.url_drm
}


/**
 * @return {String}
 */
export function getPlUrl() {
    return config.url_pl
}


/**
 * @return {String}
 */
export function getStaticUrl() {
    return config.url_static
}


/**
 * @return {String}
 */
export function getAccountingId() {
    return config.accounting_id
}


/**
 * @return {String}
 */
export function getLicenseUrl() {
    return config.url_license
}

export function getMainUrl() {
    return config.main.url
}

/**
 * @return {String}
 */
export function getSecurePlayWidevineLicenceUrl() {
    return `${getLicenseUrl()}/v1/license/widevine?specConform=true`
}

export default {
    getUserAgent,
    getContentTypes,
    getRatingContentTypes,
    getRatingEpisodeTypes,
    getClientId,
    getClientSecret,
    getBaseUrl,
    getDrmUrl,
    getPlUrl,
    getAccountingId,
    getStaticUrl,
    getLicenseUrl,
    getSecurePlayWidevineLicenceUrl,
    getMainUrl,
    sortByValues: ['popularity', 'newly_added', 'alphabetical']
}
