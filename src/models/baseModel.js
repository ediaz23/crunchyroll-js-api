
const util = require('../utils')


class BaseModel {
    
    constructor() {
    }
    
    update(data) {
        for(const key of Object.keys(data)) {
            this[util.toCamel(key)] = data[key]
        }
    }
    
    toObject() {
        const out = {}
        for(const key of Object.keys(this)) {
            out[key] = this[key]
        }
        return out
    }
    
}

module.exports = {
    BaseModel,
}
