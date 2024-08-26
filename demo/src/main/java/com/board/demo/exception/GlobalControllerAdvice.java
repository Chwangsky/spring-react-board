package com.board.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import com.board.demo.common.ResponseCode;
import com.board.demo.common.ResponseMessage;
import com.board.demo.dto.response.ResponseDTO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ControllerAdvice
public class GlobalControllerAdvice {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ResponseDTO> handleConstraintViolationException(
            MethodArgumentNotValidException ex) {

        log.warn("validation 조건을 위반하였습니다.");

        ResponseDTO body = ResponseDTO.builder()
                .code(ResponseCode.FORMAT_ERROR)
                .message(ResponseMessage.FORMAT_ERROR)
                .build();

        return ResponseEntity.badRequest().body(body);
    }

    @ExceptionHandler(PasswordNotMatchException.class)
    public ResponseEntity<Object> handlePasswordNotMatchException(
            PasswordNotMatchException ex) {

        log.warn("게시글의 비밀번호가 일치하지 않습니다.");
        ResponseDTO body = ResponseDTO.builder()
                .code(ResponseCode.WRONG_PASSWORD)
                .message(ResponseMessage.WRONG_PASSWORD)
                .build();

        return ResponseEntity.badRequest().body(body);
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ResponseDTO> handleMaxSizeException(MaxUploadSizeExceededException ex) {

        ResponseDTO body = ResponseDTO.builder()
                .code(ResponseCode.PAYLOAD_TOO_LARGE)
                .message(ResponseMessage.PAYLOAD_TOO_LARGE)
                .build();

        log.warn("파일 업로드 용량을 초과하였습니다.");

        return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE).body(body);
    }
}