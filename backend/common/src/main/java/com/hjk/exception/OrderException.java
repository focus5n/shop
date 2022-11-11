package com.hjk.exception;

import com.hjk.exception.common.BaseException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum OrderException implements BaseException {

    NOT_FOUND_ORDER(3000, 200, "해당 주문이 없습니다"),
    OUT_OF_STOCK(3001, 200, "재고가 부족 합니다");


    private final int errorCode;
    private final int httpStatus;
    private final String errorMessage;

}