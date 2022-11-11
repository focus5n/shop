package com.hjk.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.stream.Stream;

@Getter
@RequiredArgsConstructor
public enum ProductStatus {
    SALE("판매중"),
    SOLD_OUT("품절");

    private final String status;

    @JsonCreator(mode = JsonCreator.Mode.DELEGATING)
    public static ProductStatus findByStatus(String status) {
        return Stream.of(ProductStatus.values())
                .filter(s -> s.status.equals(status))
                .findFirst()
                .orElse(null);
    }
}
