enum ResponseCode {

    // HTTP Status Code 200
    SUCCESS = "SU",

    // HTTP STATUS 400
    FORMAT_ERROR = "FE",
    WRONG_PASSWORD = "WP",

    // HTTP STATUS 413
    PAYLOAD_TOO_LARGE = "PTL",

    // HTTP STATUS 500
    DATABASE_ERROR = "DBE"
}

export default ResponseCode;