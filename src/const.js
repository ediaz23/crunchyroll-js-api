
const config = require('./config/config.json')


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

module.exports = {
    getUserAgent,
    getContentTypes,
    getRatingContentTypes,
    getRatingEpisodeTypes,
}