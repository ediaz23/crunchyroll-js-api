
const winston = require('winston');

/** @type {winston.Logger} */
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.splat(),
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
            if (message && !(typeof message === 'string' || message instanceof String)) {
                message = JSON.stringify(message, null, '  ')
            }
            return `${timestamp} [${level}]: ${message} `
        })
    ),
    transports: [new winston.transports.Console()],
})


process.on('uncaughtException', err => {
    logger.error('uncaughtException')
    logger.error(err)
    if (err.stack) {
        logger.error(err.stack)
    }
    process.exit(1)
})

process.on('unhandledRejection', err => {
    logger.error('unhandledRejection')
    logger.error(err)
    if (err.stack) {
        logger.error(err.stack)
    }
    process.exit(1)
})

module.exports = logger
