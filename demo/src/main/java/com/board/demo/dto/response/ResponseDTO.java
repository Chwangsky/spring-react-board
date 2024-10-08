package com.board.demo.dto.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.board.demo.common.ResponseCode;
import com.board.demo.common.ResponseMessage;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class ResponseDTO {

    private String code;
    private String message;

    public static ResponseEntity<ResponseDTO> databaseError() {
        ResponseDTO responseBody = ResponseDTO.builder()
                .code(ResponseCode.DATABASE_ERROR)
                .message(ResponseMessage.DATABASE_ERROR).build();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
    }

}