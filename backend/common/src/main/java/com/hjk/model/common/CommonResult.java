package com.hjk.model.common;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class CommonResult<T> {
    private long code;

    private String message;

    private T data;

    protected CommonResult(long code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public static <T> CommonResult<T> success(T data) {
        return new CommonResult<>(ResponseCode.SUCCESS.getCode(), ResponseCode.SUCCESS.getMessage(), data);
    }

    public static <T> CommonResult<T> success(T data, String message) {
        return new CommonResult<>(ResponseCode.SUCCESS.getCode(), message, data);
    }

    public static <T> CommonResult<T> failed(String message) {
        return new CommonResult<T>(ResponseCode.FAILED.getCode(), message, null);
    }

    public static <T> CommonResult<T> failed(ErrorCode errorCode) {
        return new CommonResult<T>(errorCode.getCode(), errorCode.getMessage(), null);
    }

    public static <T> CommonResult<T> failed() {
        return failed(ResponseCode.FAILED.getMessage());
    }

    public static <T> CommonResult<T> notFoundFailed() {
        return failed(ResponseCode.NOT_FOUND.getMessage());
    }

    public static <T> CommonResult<T> emailFailed(T data) {
        return new CommonResult<T>(ResponseCode.EMAIL_NOT_MATCHED.getCode(), ResponseCode.EMAIL_NOT_MATCHED.getMessage(), data);
    }

    public static <T> CommonResult<T> passwordFailed(T data) {
        return new CommonResult<T>(ResponseCode.PASSWORD_NOT_MATCHED.getCode(), ResponseCode.PASSWORD_NOT_MATCHED.getMessage(), data);
    }
    public static <T> CommonResult<T> unAuthorized(T data) {
        return new CommonResult<T>(ResponseCode.UNAUTHORIZED.getCode(), ResponseCode.UNAUTHORIZED.getMessage(), data);
    }

    public static <T> CommonResult<T> forBidden(T data) {
        return new CommonResult<T>(ResponseCode.FORBIDDEN.getCode(), ResponseCode.FORBIDDEN.getMessage(), data);
    }

}

