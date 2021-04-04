package dev.donhk.todo.jwt.resource;

public class AuthenticationException extends RuntimeException {

    private static final long serialVersionUID = -8229121780901570753L;

    public AuthenticationException(String message, Throwable cause) {
        super(message, cause);
    }
}