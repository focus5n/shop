package com.hjk.exception;

import com.hjk.exception.common.BaseException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ProductException implements BaseException {
    NOT_FOUND_PRODUCT(2000, 200, "해당 상품이 없습니다");

    private final int errorCode;
    private final int httpStatus;
    private final String errorMessage;

}
