
const util = require('../utils')


class BaseModel {
    
    constructor() {
    }
    
    update(data) {
        for(const key of Object.keys(data)) {
            this[util.toCamel(key)] = data[key]
        }
    }
    
}

module.exports = {
    BaseModel,
}
