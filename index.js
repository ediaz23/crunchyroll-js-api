
process.env.LOG_LEVEL = 'debug'

const { Clients } = require('./src/controllers/clients')
const logger = require('./src/logger')

 
async function main() {
    const client = new Clients()
    await client.loadFromLocal()

//    const data = await client.getCms()
//    logger.info(data)


}

main()
