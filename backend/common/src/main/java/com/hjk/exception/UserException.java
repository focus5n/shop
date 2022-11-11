package com.hjk.exception;

import com.hjk.exception.common.BaseException;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum UserException implements BaseException {

    NOT_FOUND_USER(1000,200,"해당 사용자가 존재하지 않습니다."),
    DUPLICATED_EMAIL(10001, 200, "이미 존재 하는 이메일입니다.");

    private final int errorCode;
    private final int httpStatus;
    private final String errorMessage;
}
