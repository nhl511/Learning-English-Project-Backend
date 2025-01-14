const status= {
    OK: 'ok',
    ERROR: 'error'
}

const code = {
    SUCCESS: 200,
    CREATED: 201,
    UN_AUTHORIZED: 401,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    BANNED: 423,
    SERVER_ERROR: 500,
}

const modelTypes = {
    TOPIC: "topic",
    CURRICULUM: "curriculum",
    GRADE: "grade",
    UNIT: "unit",
    PARTS_OF_SPEECH: "partsOfSpeech",
    VOCABULARY: "vocabulary",
    USER: "user"
}

const request = {
    PARAMS: "params",
    BODY: "body",
    QUERY: "query",
}

const userRole = {
    ADMIN: "admin",
    USER: "user",
}


module.exports = {status, code, modelTypes, request, userRole}