package com.hjk.exception.handlers;

import com.hjk.exception.common.CustomException;
import com.hjk.exception.common.ErrorDto;
import com.hjk.exception.common.ValidException;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(annotations = RestController.class)
@Order(Ordered.HIGHEST_PRECEDENCE)
public class ExceptionRestHandlers {

    @ExceptionHandler(value = CustomException.class)
    public ResponseEntity<ErrorDto> exception(CustomException exception) {
        return new ResponseEntity<>(ErrorDto.create(exception.getException()), HttpStatus.OK);
    }

    @ExceptionHandler(value = ValidException.class)
    public ResponseEntity<ErrorDto> handleMethodArgumentNotValid(ValidException exception) {
        return new ResponseEntity<>(ErrorDto.create(exception.getException().getAllErrors().get(0).getDefaultMessage()),
                HttpStatus.OK);
    }
}
