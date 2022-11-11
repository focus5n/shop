package com.hjk.model.dto;


import com.hjk.enums.OrderStatus;
import com.hjk.model.Orders;
import com.hjk.utils.DateUtils;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

public class OrderDto {

    @Getter
    @NoArgsConstructor
    public static class createRequestDto {
        private Integer productCount;

        private Long userId;

        private Long productId;
    }

    @Getter
    @NoArgsConstructor
    public static class updateRequestDto {
        @NotBlank(message = "기본 주소를 입력 해주세요")
        private String basicAddress;

        @NotBlank(message = "상세 주소를 입력 해주세요")
        private String detailAddress;

        private String requestMessage;
    }

    @Getter
    @NoArgsConstructor
    public static class Response {

        private Long id;

        private String orderNumber;

        private String orderName;

        private String requestMessage;


        private Long userId;

        private Long productId;

        private Integer productCount;

        private Integer amount;

        private String basicAddress;

        private String detailAddress;

        private String createdAt;


        private String productImg;


        private String productCategory;

        private OrderStatus status;

        public Response(Orders order) {
            this.id = order.getId();
            this.orderNumber = order.getOrderNumber();
            this.orderName = order.getOrderName();
            this.requestMessage = order.getRequestMessage();
            this.basicAddress = order.getBasicAddress();
            this.detailAddress = order.getDetailAddress();
            this.productCount = order.getProductCount();
            this.amount = order.getAmount();
            this.productImg = order.getProduct().getImg();
            this.userId = order.getUser().getId();
            this.productId = order.getProduct().getId();
            this.productCategory = order.getProduct().getMainCategory() + "-" + order.getProduct().getSubCategory();
            this.createdAt = DateUtils.LocalDateFormat(order.getCreatedAt());
            this.status = order.getOrderStatus();
        }

        @Builder
        public Response(Long id, String orderNumber, String orderName,Long userId,Long productId,Integer productCount, Integer amount, String requestMessage, String basicAddress, String detailAddress,String createdAt,String productCategory,String productImg, OrderStatus status) {
            this.id = id;
            this.orderNumber = orderNumber;
            this.orderName = orderName;
            this.requestMessage = requestMessage;
            this.productCount = productCount;
            this.amount = amount;
            this.basicAddress = basicAddress;
            this.productCategory = productCategory;
            this.userId = userId;
            this.productId = productId;
            this.productImg = productImg;
            this.detailAddress = detailAddress;
            this.createdAt = createdAt;
            this.status = status;
        }
    }
}
