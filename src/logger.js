
let LEVEL = 'info'

if (process && process.env && process.env.LOG_LEVEL) {
    LEVEL = process.env.LOG_LEVEL
}

/**
   @type {{
    info: Function,
    error: Function,
    debug: Function,
    setLevel: Function
}}
 */
const logger = {
    info: () => { },
    error: () => { },
    debug: () => { },
    setLevel: () => { },
}

if (!console.debug) { console.debug = console.log }
if (!console.info) { console.info = console.log }
if (!console.error) { console.error = console.log }

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
    }
    return extra
}

const colors = { debug: '\x1b[34m', info: '\x1b[32m', error: '\x1b[31m' }

const getMessage = (message, level) => {
    if (!(typeof (message) === 'string' || message instanceof String)) {
        message = formatObj(message)
    }
    return `${Date.now()} ${colors[level]}${level.toUpperCase()}\x1b[0m ${message}`
}

function configBrowserLogger(newLevel) {
    if (!newLevel) {
        newLevel = LEVEL
    }
    logger.debug = () => {}
    logger.info = () => {}
    logger.error = () => {}
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
