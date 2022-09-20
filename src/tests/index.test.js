
const localStore = require('../localStore')
const testUtils = require('./testUtils')
const index = require('../services/index')


/** @type {String} */
let token = null

beforeEach(async () => {
    await localStore.loadFromLocal()
    token = await localStore.getAuthToken()
})

describe('Index', () => {
    test('empty', () => {})

    test('Request Index', async() => {
        return index.getIndexConfig({ token }).then(res => {
            const validateCms = cms => { 
                expect(cms).not.toBeNull()
                testUtils.existValue(cms.bucket)
                testUtils.existValue(cms.policy)
                testUtils.existValue(cms.signature)
                testUtils.existValue(cms.key_pair_id)
                testUtils.existValue(cms.expires)
            }
            expect(res).not.toBeNull()
            expect(res).toHaveProperty('cms')
            expect(res).toHaveProperty('cms_beta')
            expect(res).toHaveProperty('cms_web')
            expect(res).toHaveProperty('service_available')
            expect(res.service_available).not.toBeNull()
            expect(res).toHaveProperty('default_marketing_opt_in')
            expect(res.default_marketing_opt_in).not.toBeNull()
            validateCms(res.cms)
            validateCms(res.cms_beta)
            validateCms(res.cms_web)
        })
    })
})
