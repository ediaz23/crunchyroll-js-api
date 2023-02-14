
process.env.LOG_LEVEL = 'silent'

import localStore from '../../src/localStore.js'


async function setupApp() {
    await localStore.loadFromLocal()
    localStore.storage.token = null
    await localStore.getToken()
}

export default setupApp
