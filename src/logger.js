
let LEVEL = 'info', COLOR_ACTIVE = true

if (process && process.env && process.env.LOG_LEVEL) {
    LEVEL = process.env.LOG_LEVEL
}

/**
   @type {{
    info: Function,
    error: Function,
    debug: Function,
    setLevel: Function,
    activeColor: Function,
}}
 */
const logger = {
    info: () => { },
    error: () => { },
    debug: () => { },
    setLevel: () => { },
    /**
     * @param {Boolean} active
     */
    activeColor: active => { COLOR_ACTIVE = active },
}

if (!console.debug) { console.debug = console.log }
if (!console.info) { console.info = console.log }
if (!console.error) { console.error = console.log }

/**
 * @param {Object} obj
 */
const formatObj = obj => {
    let extra = ''
    const keys = Object.keys(obj)

    if (keys.length) {
        if (keys.length === 2 && keys.includes('message') && keys.includes('stack')) {
            /** @type {Error} */
            const err = obj
            extra = `\n  message:${err.name}\n  stack:${err.stack}`
        } else {
            extra = '\n' + JSON.stringify(obj, null, '  ')
        }
    } else if (obj instanceof Error) {
        extra = `\n  message:${obj.name}\n  stack:${obj.stack}`
    } else if (obj instanceof Set) {
        extra = '[' + Array.from(obj).toString() + ']'
    }
    return extra
}

const colors = { debug: '\x1b[33m', info: '\x1b[32m', error: '\x1b[31m', reset: '\x1b[0m' }

/**
 * @param {any} message
 * @param {String} level
 */
const getMessage = (message, level) => {
    if (!(typeof (message) === 'string' || message instanceof String)) {
        message = formatObj(message)
    }
    const error = new Error();
    /** @type {String} */
    const callerFile = error.stack.split('\n')[3]
    let color = colors[level], resetColor = colors['reset']
    if (!COLOR_ACTIVE) {
        color = resetColor = ''
    }
    const date = new Date().toISOString()
    return `${date} ${color}${level.toUpperCase()} ${message} ${(callerFile || '').trim()} ${resetColor}`
}

/**
 * @param {String} newLevel
 */
function configBrowserLogger(newLevel) {
    if (!newLevel) {
        newLevel = LEVEL
    }
    logger.debug = () => { }
    logger.info = () => { }
    logger.error = () => { }
    /*eslint-disable */
    switch (newLevel) {
        case 'silent': break;
        case 'debug': logger.debug = msg => { console.debug(getMessage(msg, 'debug')) };
        case 'info': logger.info = msg => { console.info(getMessage(msg, 'info')) };
        case 'error': logger.error = msg => { console.error(getMessage(msg, 'error')) };
            break;
    }
    return logger
}

logger.setLevel = configBrowserLogger
logger.setLevel()

export default logger
