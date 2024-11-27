
import path from 'path'
import fs from 'fs'
import { expect } from '@jest/globals'

import localStore from '../src/localStore.js'
import { api } from '../src/index.js'


/**
 * Check generic items result
 * @param {Object} res
 */
function itesmCheck(res) {
    expect(res).not.toBeNull()
    expect(res).toHaveProperty('items')
    expect(Array.isArray(res.items)).toBe(true)
    expect(res.items.length).toBeGreaterThan(0)
    return res
}


/**
 * Check generic items result
 * @param {Object} res
 */
function itesmCheck_v2(res, length) {
    existValue(res)
    expect(res).toHaveProperty('total')
    expect(res).toHaveProperty('data')
    expect(Array.isArray(res.data)).toBe(true)
    if (length !== undefined) {
        expect(res.total).toBe(length)
        expect(res.data.length).toBe(length)
    } else {
        expect(res.total).toBeGreaterThan(0)
        expect(res.data.length).toBeGreaterThan(0)
    }
    return res
}


/**
 * Check generic result
 * @param {Object} res
 */
function resultCheck(res) {
    expect(res).not.toBeNull()
    expect(res).toHaveProperty('__class__')
    expect(res.__class__).not.toBeNull()
    expect(res).toHaveProperty('__href__')
    expect(res.__href__).not.toBeNull()
    expect(res).toHaveProperty('__links__')
    expect(res).toHaveProperty('__actions__')
    return res
}

/**
 * Check generic result
 * @param {Object} res
 */
function resultCheck_v2(res) {
    itesmCheck_v2(res)
    expect(res).toHaveProperty('meta')
    expect(res.meta).toBeDefined()
    return res
}


/**
 * Items result
 * @param {Object} res
 */
function totalCheck(res) {
    expect(res).toHaveProperty('total')
    expect(res.items.length).toEqual(res.total)
    return res
}


/**
 * Exists value
 * @param {Object} value
 */
function existValue(value) {
    expect(value).toBeDefined()
    expect(value).not.toBe('')
    expect(value).not.toBeNull()
}


/**
 * Check playhead result
 * @param {Object} data
 */
function checkPlayhead_v2(data) {
    expect(data).toHaveProperty('playhead')
    expect(data.playhead).toBeDefined()
    expect(data).toHaveProperty('fully_watched')
    expect(data.fully_watched).toBeDefined()
    expect(data).toHaveProperty('panel')
    expect(data.panel).toBeDefined()
}

async function init() {
    if (!localStore.storage.token) {
        const authPathFile = path.resolve('.') + '/authData.json'
        localStore.setExternalStorage({
            load: () => fs.readFileSync(authPathFile, 'utf-8'),
            save: data => fs.writeFileSync(authPathFile, data)
        })
        await localStore.loadFromLocal()
    } else {
        await new Promise(res => setTimeout(res, 1000))
    }
}

let profile = null
/**
 * @returns {Promise<import('../src/types').AccountAuth>}
 */
async function getContentParam() {
    if (!profile) {
        const tokenObj = await localStore.getToken()
        profile = await api.account.getMultiProfile(tokenObj)
    }
    return await localStore.getContentParam(profile)
}

export default {
    itesmCheck,
    resultCheck,
    totalCheck,
    existValue,
    itesmCheck_v2,
    resultCheck_v2,
    checkPlayhead_v2,
    init,
    getContentParam,
}
