
const localStore = require('../../localStore')


async function setupApp () {
    await localStore.loadFromLocal()
    localStore.storage.token = null
    await localStore.getToken()
}

module.exports = setupApp