
/**
 * Class to handel custom errors
 */
class CrunchyrollError extends Error {
    constructor(message, code = null) {
        super(message)
        this.code = code
        Object.setPrototypeOf(this, CrunchyrollError.prototype)
    }
}

export default CrunchyrollError
