
const expect = require('expect')

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

module.exports = {
    itesmCheck,
    resultCheck,
    totalCheck,
    existValue,
}
