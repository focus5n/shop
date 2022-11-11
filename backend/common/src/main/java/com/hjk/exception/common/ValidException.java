package com.hjk.exception.common;

import org.springframework.validation.BindingResult;

import lombok.Getter;

@Getter
public class ValidException extends RuntimeException {

    private final BindingResult exception;

    public ValidException(BindingResult exception) {
        super(exception.getAllErrors().get(0).getDefaultMessage());
        this.exception = exception;
    }
}
