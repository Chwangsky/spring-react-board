package com.board.demo.common;

public interface ResponseCode {

    // HTTP Status Code 200
    String SUCCESS = "SU";

    // HTTP Status Code 400
    String FORMAT_ERROR = "FE";
    String WRONG_PASSWORD = "WP";

    // HTTP Status Code 413
    String PAYLOAD_TOO_LARGE = "PTL";

    // HTTP Status Code 500
    String DATABASE_ERROR = "DBE";
}
