
const pino = require('pino')

/**@type {pino.Logger} */
const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            levelFirst: true, 
            ignore: 'hostname', 
            translateTime: true,
        }
    }
})


process.on('uncaughtException', err => {
  logger.error('uncaughtException')
  logger.error(err)
  process.exit(1)
})

process.on('unhandledRejection', err => {
  logger.error('unhandledRejection')
  logger.error(err)
  process.exit(1)
})

module.exports = logger
