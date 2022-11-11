package com.hjk.exception;

import com.hjk.exception.common.BaseException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum LikesException implements BaseException {

    NOT_FOUND_LIKES(5000, 200, "해당 추천이 없습니다"),
    ALREADY_LIKE_PRODUCT(5001, 200, "이미 해당 상품을 추천 하였습니다");


    private final int errorCode;
    private final int httpStatus;
    private final String errorMessage;

}