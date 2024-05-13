
/**
 * Class to handel custom errors
 */
class CrunchyrollError extends Error {
    constructor(message, code = null, context = null) {
        super(message)
        this.code = code
        this.context = context
        Object.setPrototypeOf(this, CrunchyrollError.prototype)
    }
}

export default CrunchyrollError
