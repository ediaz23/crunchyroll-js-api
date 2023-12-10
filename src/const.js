
import config from './config/config.json'


/**
 * Returning user-agent
 * @return {String}
 */
function getUserAgent() {
    return `Crunchyroll/${config.version_name} Android/${config.os_release_version}`
}

/**
 * Return content types
 * @returns {Array<String>}
 */
function getContentTypes() {
    return config.content_types
}


/**
 * Return possible values for series rating.
 * @returns {Array<String>}
 */
function getRatingContentTypes() {
    return ['1s', '2s', '3s', '4s', '5s']
}


/**
 * Return possible values for episodes rating.
 * @returns {Array<String>}
 */
function getRatingEpisodeTypes() {
    return ['up', 'down']
}


/**
 * @returns {String}
 */
function getClientId() {
    return config.beta.client_id
}


/**
 * @returns {String}
 */
function getClientSecret() {
    return config.beta.client_secret
}

/**
 * @return {String}
 */
function getBaseUrl() {
    return config.beta.url
}

export default {
    getUserAgent,
    getContentTypes,
    getRatingContentTypes,
    getRatingEpisodeTypes,
    getClientId,
    getClientSecret,
    getBaseUrl,
    sortByValues: ['popularity', 'newly_added', 'alphabetical']
}
