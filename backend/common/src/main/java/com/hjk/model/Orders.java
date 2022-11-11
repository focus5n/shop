package com.hjk.model;

import com.hjk.enums.OrderStatus;
import com.hjk.model.common.Base;
import com.hjk.model.dto.OrderDto;
import com.hjk.utils.DateUtils;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Getter
@Entity
@Table(name = "orders")
@NoArgsConstructor
public class Orders extends Base {

    @Column(name = "order_number", nullable = false ,unique = true)
    private String orderNumber;
    @Column(name = "order_name")
    private String orderName;
    @Column(name = "request_message")
    private String requestMessage;

    @Column(name = "product_count")
    private Integer productCount;
    @Column(name = "amount")
    private Integer amount;
    @Column(name = "basic_address")
    private String basicAddress;
    @Column(name = "detail_address")
    private String detailAddress;

    @Column(name = "order_status", nullable = false)
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product;

    public void complete() {
        this.orderStatus = OrderStatus.COMPLETE;
    }

    public void refund() {
        this.orderStatus = OrderStatus.REFUND;
    }

    public void updateInfo(OrderDto.updateRequestDto request) {
        this.basicAddress = request.getBasicAddress() == null ? this.basicAddress : request.getBasicAddress();
        this.detailAddress = request.getDetailAddress() == null ? this.detailAddress : request.getDetailAddress();
        this.requestMessage = request.getRequestMessage() == null ? this.requestMessage : request.getRequestMessage();
    }

    @Builder
    public Orders(String orderName, String requestMessage, Integer productCount, Integer amount, String basicAddress, String detailAddress, OrderStatus orderStatus, User user, Product product) {
        this.orderNumber = UUID.randomUUID().toString();
        this.orderName = orderName;
        this.requestMessage = requestMessage;
        this.amount = amount;
        this.basicAddress = basicAddress;
        this.detailAddress = detailAddress;
        this.orderStatus = orderStatus;
        this.productCount = productCount;
        this.user = user;
        this.product = product;
    }

    public OrderDto.Response toResponseDto() {
        return OrderDto.Response.builder()
                .id(this.id)
                .orderNumber(this.orderNumber)
                .orderName(this.orderName)
                .requestMessage(this.requestMessage)
                .userId(this.getUser().getId())
                .productId(this.product.getId())
                .productCount(this.productCount)
                .amount(this.amount)
                .basicAddress(this.basicAddress)
                .detailAddress(this.detailAddress)
                .productImg(this.product.getImg())
                .productCategory(this.product.getMainCategory() + "-" + this.product.getSubCategory())
                .status(this.orderStatus)
                .createdAt(DateUtils.LocalDateFormat(this.createdAt))
                .build();
    }

    public static List<OrderDto.Response> toResponseDtoList(List<Orders> orders) {
        return orders.stream().map(OrderDto.Response::new).collect(Collectors.toList());
    }
}
