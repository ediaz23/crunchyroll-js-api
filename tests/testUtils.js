
import path from 'path'
import * as fs from 'fs'
import { expect } from '@jest/globals'

/**
 * Check generic items result
 * @param {Object} res
 */
function itesmCheck(res) {
    expect(res).not.toBeNull()
    expect(res).toHaveProperty('items')
    expect(Array.isArray(res.items)).toBe(true)
    expect(res.items.length).toBeGreaterThan(0)
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
}

/**
 * Check generic result
 * @param {Object} res
 */
function resultCheck_v2(res) {
    itesmCheck_v2(res)
    expect(res).toHaveProperty('meta')
    expect(res.meta).toBeDefined()
}


/**
 * Items result
 * @param {Object} res
 */
function totalCheck(res) {
    expect(res).toHaveProperty('total')
    expect(res.items.length).toEqual(res.total)
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
 * Fake function to stora data
 * @returns {Promise}
 */
async function saveToLocal(data) {
    const authData = path.resolve('.') + '/authData.json'
    fs.writeFileSync(authData, data)
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

export default {
    itesmCheck,
    resultCheck,
    totalCheck,
    existValue,
    itesmCheck_v2,
    saveToLocal,
    resultCheck_v2,
    checkPlayhead_v2,
}
