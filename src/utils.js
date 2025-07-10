
import logger from './logger.js'
import config from './config.js'
import CrunchyrollError from './error.js'


/**
 * In browsers cors make imposible make some request because of that
 * provide a custom function to make request
 * @type {Function}
 */
let fetchFunction = null

/**
 * Returning user-agent
 * @return {String}
 */
function getUserAgent() {
    return `Crunchyroll/${config.versionName} Android/${config.osReleaseVersion}`
}

/**
 * log api response
 * @param {String} fnName
 * @param {import('node-fetch').Response} res
 * @returns {Promise}
 */
async function logRes(fnName, res) {
    if (!(200 <= res.status && res.status < 300)) {
        logger.error(`Status Code: ${res.status} - ${fnName}`)
        /** @type {Object} */
        let result = null
        try {
            result = await res.json()
            logger.error(result)
        } catch (_e) {
            // ignore
        }
        if (result) {
            throw new CrunchyrollError(result.error, result.code,
                result.context, res.status, res.statusText)
        } else {
            logger.error(res.statusText)
            throw new Error(res.statusText)
        }
    } else {
        logger.debug(`Status Code: ${res.status} - ${fnName}`)
    }
}

/**
 * Make http request and return raw response
 * @param {String} url
 * @param {import('node-fetch').Request} reqConfig
 * @param {import('./types').FetchConfig} [fnConfig]
 * @returns {Promise<import('node-fetch').Response>}
 */
async function makeRawRequest(url, reqConfig, fnConfig) {
    let fetchFn = null
    // @ts-expect-error
    if (reqConfig.baseUrlIncluded) {
        url = decodeURIComponent(`${url}`)
        // @ts-expect-error
        delete reqConfig.baseUrlIncluded
    } else {
        url = decodeURIComponent(`${config.urlBeta}${url}`)
    }
    logger.debug(`${reqConfig.method} - ${url}`)
    if (!reqConfig.headers) {
        // @ts-expect-error
        reqConfig.headers = {}
    }
    reqConfig.headers['User-Agent'] = getUserAgent()

    if (fetchFunction) {
        fetchFn = fetchFunction
    } else {
        try {
            fetchFn = window.fetch
        } catch (_e) {
            // #if process.env.NODE_COMPILING !== 'true'
            fetchFn = await import('node-fetch')
            fetchFn = fetchFn.default
            // #endif
        }
    }
    return fetchFn(url, reqConfig, fnConfig || {})
}


/**
 * Make http request
 * @param {String} fnName for loggin
 * @param {String} url
 * @param {import('node-fetch').Request} reqConfig
 * @param {import('./types').FetchConfig} [fnConfig]
 * @returns {Promise<Object>}
 */
async function makeRequest(fnName, url, reqConfig, fnConfig) {
    const res = await makeRawRequest(url, reqConfig, fnConfig)
    await logRes(fnName, res)
    let out = null
    try {
        out = await res.json()
    } catch (_e) {
        // nothing
    }
    return out
}


/**
 * Add key to object if not undefined
 * @param {Object} data
 * @param {String} key
 * @param {Object} value
 * @param {Function} [validator]
 */
function addParam(data, key, value, validator) {
    if (value !== undefined) {
        if (validator && !(validator(value))) {
            throw new Error(`Value ${value} for key ${key} is not valid.`)
        }
        data[key] = encodeURIComponent(value)
    }
}


/**
 * Convert snake case to camel case
 * @param {String} str
 * @returns {String}
 */
function toCamel(str) {
    return str.replace(/([-_][a-z])/ig, $1 => $1.toUpperCase().replace('_', ''))
}


/**
 * Convert camel case to snake case
 * @param {String} str
 * @returns {String}
 */
function toSnake(str) {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
}

/**
 * Return a toURLSearchParams object
 * @param {Object} data
 * @returns {Promise<import('url').URLSearchParams>}
 */
async function toURLSearchParams(data) {
    let URLSearchParamsClass = null

    try {
        URLSearchParamsClass = window.URLSearchParams
    } catch (_e) {
        // #if process.env.NODE_COMPILING !== 'true'
        const url = await import('url')
        if (url.URLSearchParams) {
            URLSearchParamsClass = url.URLSearchParams
        } else {
            throw new Error()
        }
        // #endif
    }
    return new URLSearchParamsClass(data)
}

/**
 * Set custom function to make request
 * @param {Function} fetchFn
 */
function setFetchFunction(fetchFn) {
    fetchFunction = fetchFn
}

/**
 * @param {String} str
 */
function camelCase(str) {
    return str.replace(/_([a-z])/g, (_m, w) => w.toUpperCase())
}

export default {
    camelCase,
    logRes,
    makeRawRequest,
    makeRequest,
    addParam,
    toCamel,
    toSnake,
    toURLSearchParams,
    setFetchFunction,
    getUserAgent,
}
