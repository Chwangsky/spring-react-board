package com.board.demo.exception;

/**
 * Custom exception class for handling path not found scenarios.
 */
public class PathNotFoundException extends RuntimeException {

    /**
     * Default constructor.
     */
    public PathNotFoundException() {
        super();
    }

    /**
     * Constructor with a custom message.
     *
     * @param message the detail message
     */
    public PathNotFoundException(String message) {
        super(message);
    }

    /**
     * Constructor with a custom message and cause.
     *
     * @param message the detail message
     * @param cause the cause of the exception
     */
    public PathNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    /**
     * Constructor with a cause.
     *
     * @param cause the cause of the exception
     */
    public PathNotFoundException(Throwable cause) {
        super(cause);
    }
}
