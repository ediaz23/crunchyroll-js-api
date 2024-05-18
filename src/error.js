
/**
 * Class to handel custom errors
 */
class CrunchyrollError extends Error {

    constructor(message, code = null, context = null, status = null, statusText = null) {
        super(message)
        this.code = code
        this.context = context
        this.httpStatus = status
        this.httpStatusText = statusText
        Object.setPrototypeOf(this, CrunchyrollError.prototype)
    }

}

export default CrunchyrollError
