package com.hjk.exception;

import com.hjk.exception.common.BaseException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CartException implements BaseException {

    NOT_FOUND_CART(4000, 200, "해당 카트가 없습니다");

    private final int errorCode;
    private final int httpStatus;
    private final String errorMessage;

}