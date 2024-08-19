package com.board.demo.exception;

public class FileWriteException extends RuntimeException {

    public FileWriteException(String message) {
        super(message);
    }

    public FileWriteException(String message, Throwable cause) {
        super(message, cause);
    }

    public FileWriteException(Throwable cause) {
        super(cause);
    }

    public FileWriteException() {
        super("파일 쓰기 중 오류가 발생했습니다.");
    }
}
