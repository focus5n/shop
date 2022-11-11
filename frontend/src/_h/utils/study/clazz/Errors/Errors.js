class ValidationError extends Error {
    constructor(message) {
        super(message)
        this.name = "ValidationError"
    }
}

class ReadError extends Error {
    constructor(message, cause) {
        super(message)
        this.cause = cause
        this.name = 'ReadError'
    }
}

function readUser(json) {
    let user
    try {
        user = JSON.parse(json);
    } catch (err) {
        if (err instanceof SyntaxError) {
            throw new ReadError("Syntax Error", err);
        } else {
            throw err;
        }
    }

}

try {
    readUser('{잘못된 형식의 json}');
} catch (err) {
    if (err instanceof ValidationError) {
    console.log(err.cause)
    } else {
        throw err
    }
}