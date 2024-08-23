package com.board.demo.common;

public interface ResponseMessage {

    // HTTP Status Code 200
    String SUCCESS = "Success.";

    // HTTP Status Code 400
    String FORMAT_ERROR = "Format Error.";
    String WRONG_PASSWORD = "Wrong Password.";

    // HTTP Status Code 413
    String PAYLOAD_TOO_LARGE = "Payload Too Large.";

    // HTTP STATUS 500
    String DATABASE_ERROR = "Database error.";

}
