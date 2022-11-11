package com.hjk.exception;

import com.hjk.exception.common.BaseException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MainCategoryException implements BaseException {

    NOT_FOUND_CATEGORY(6000, 200, "해당 카테고리가 없습니다");


    private final int errorCode;
    private final int httpStatus;
    private final String errorMessage;

}