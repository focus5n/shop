package com.hjk.exception;

import com.hjk.exception.common.BaseException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ReviewException implements BaseException {
    NOT_FOUND_REVIEW(2000, 200, "해당 리뷰가 없습니다");

    private final int errorCode;
    private final int httpStatus;
    private final String errorMessage;

}
