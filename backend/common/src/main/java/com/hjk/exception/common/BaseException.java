package com.hjk.exception.common;

public interface BaseException {
    int getErrorCode();
    int getHttpStatus();
    String getErrorMessage();
}

