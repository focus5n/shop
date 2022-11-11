package com.hjk.exception.common;

import lombok.Getter;

@Getter
public class CustomException extends RuntimeException {

    private final BaseException exception;

    public CustomException(BaseException exception) {
        super(exception.getErrorMessage());
        this.exception = exception;
    }
}
