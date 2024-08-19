package com.board.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ControllerAdvice
public class GlobalControllerAdvice {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleConstraintViolationException(
            MethodArgumentNotValidException ex,
            @RequestBody String body) {

        log.warn("validation 조건을 위반하였습니다.");
        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(PasswordNotMatchException.class)
    public ResponseEntity<Object> handlePasswordNotMatchException(
            PasswordNotMatchException ex,
            @RequestBody String body) {

        log.warn("게시글의 비밀번호가 일치하지 않습니다.");
        return new ResponseEntity<>(body, HttpStatus.UNAUTHORIZED);
    }
}