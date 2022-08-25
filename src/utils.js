
/**
 * log api response
 * @param {String} fnName
 * @param {import('node-fetch').Response} res
 * @returns {Promise}
 */
async function logRes(fnName, res) {
    console.log(`Status Code: ${res.status} - ${fnName}`)
    if (![200, 204].includes(res.status)) {
        try {
            const r = await res.json()
            console.log(r)
        } catch( _e) {
            console.log(res.statusText)
        }
    }
}

module.exports = {
    camelCase: str => str.replace(/_([a-z])/g, (_m,w) => w.toUpperCase()),
    logRes
}