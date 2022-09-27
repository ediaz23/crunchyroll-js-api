
const winston = require('winston');

const config = winston.config;

/** @type {winston.LoggerInstance} */
const logger = new (winston.Logger)({
    level: process.env.LOG_LEVEL || 'info',
    transports: [
        new (winston.transports.Console)({
            timestamp: () => Date.now(),
            formatter: (options) => {
                return options.timestamp() + ' ' +
                      config.colorize(options.level, options.level.toUpperCase()) + ' ' +
                      (options.message ? options.message : '') +
                      (options.meta && Object.keys(options.meta).length ? '\n'+ JSON.stringify(options.meta, null, '  ') : '' );
            }
        })
    ]
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
