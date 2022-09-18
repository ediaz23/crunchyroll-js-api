
const { Clients } = require('../../controllers/clients')

async function setupApp () {
    const client = new Clients()
    await client.loadFromLocal()
    client.client.tokens = null
    await client.getToken()
}

module.exports = setupApp