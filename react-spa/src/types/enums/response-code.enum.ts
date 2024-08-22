enum ResponseCode {

    // HTTP Status Code 200
    SUCCESS = "SU",

    // HTTP STATUS 400
    VALIDATION_FAILED = "VF",
    WRONG_PASSWORD = "WP",

    // HTTP STATUS 500
    DATABASE_ERROR = "DBE"
}

export default ResponseCode;