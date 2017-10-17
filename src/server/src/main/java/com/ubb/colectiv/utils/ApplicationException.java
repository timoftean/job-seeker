package com.ubb.colectiv.utils;

public class ApplicationException extends RuntimeException {
    private int code;

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public ApplicationException() {
        super();
    }

    public ApplicationException(int code, String message) {
        super(message);
        this.code = code;
    }

    public ApplicationException(int code, String message, Throwable cause) {
        super(message, cause);
        this.code = code;
    }

    public ApplicationException(Throwable cause) {
        super(cause);
    }
}
