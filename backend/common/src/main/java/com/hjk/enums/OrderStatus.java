package com.hjk.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.stream.Stream;

@Getter
@RequiredArgsConstructor
public enum OrderStatus {
    PAYING("결제중"),
    COMPLETE("결제완료"),

    SHIPPING("배송중"),
    REFUND("환불완료");

    private final String status;

    @JsonCreator(mode = JsonCreator.Mode.DELEGATING)
    public static OrderStatus findByStatus(String status) {
        return Stream.of(OrderStatus.values())
                .filter(s -> s.status.equals(status))
                .findFirst()
                .orElse(null);
    }
}
