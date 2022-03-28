class ResponseStatus {
    success(message, data = {}){
        const response = {
            success: true,
            message: message,
            result: ""
        }

        response.result = Array.isArray(data) || typeof data === "object"
            ? data : {status: Number.isInteger(data)? true : data}

        return response;
    }
    failure (message, errors = {}) {
        return {
            success: false,
            message: message,
            errors: errors
        }
    }
}

module.exports = new ResponseStatus()
