package com.hjk.exception.common;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ErrorDto {

    private int errorCode;
    private int httpStatus;
    private String errorMessage;

    public ErrorDto(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public static ErrorDto create(String errorMessage) {
        return new ErrorDto(errorMessage);
    }

    public static ErrorDto create(BaseException baseException) {
        return new ErrorDto(baseException.getErrorCode(), baseException.getHttpStatus(), baseException.getErrorMessage());
    }
}
