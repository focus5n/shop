package com.hjk.model.dto;

import com.hjk.enums.ProductStatus;
import com.hjk.model.Cart;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

public class CartDto {

    @Getter
    @NoArgsConstructor
    public static class saveRequestDto {
        @Min(value = 1, message = "수량은 최소 1개 이상이여야 합니다")
        @NotNull(message = "수량을 입력 해주세요")
        private Integer productCount;

        private Long userId;

        private Long productId;
    }

    @Getter
    @NoArgsConstructor
    public static class Response {

        private Long cartId;
        private Long productId;
        private String productName;
        private String productDescription;
        private String productImg;
        private Integer productPrice;
        private Integer productStock;
        private ProductStatus productStatus;
        private Integer productCount;
        private String productMainCategory;
        private String productSubCategory;
        private Integer totalPrice;

        public Response(Cart cart) {
            this.cartId = cart.getId();
            this.productId = cart.getProduct().getId();
            this.productName = cart.getProduct().getName();
            this.productDescription = cart.getProduct().getDescription();
            this.productImg = cart.getProduct().getImg();
            this.productMainCategory = cart.getProduct().getMainCategory();
            this.productSubCategory = cart.getProduct().getSubCategory();
            this.productStatus = cart.getProduct().getStatus();
            this.productPrice = cart.getProduct().getPrice();
            this.productCount = cart.getProductCount();
            this.productStock = cart.getProduct().getStock();
            this.totalPrice = cart.getProduct().getPrice() * cart.getProductCount();
        }

        @Builder
        public Response(Long cartId, Long productId, String productName, Integer productStock , ProductStatus productStatus, String productDescription, Integer productCount, Integer productPrice, String productImg, String productMainCategory, String productSubCategory, Integer totalPrice) {
            this.cartId = cartId;
            this.productId = productId;
            this.productName = productName;
            this.productDescription = productDescription;
            this.productCount = productCount;
            this.productStock = productStock;
            this.productPrice = productPrice;
            this.productImg = productImg;
            this.productStatus = productStatus;
            this.productMainCategory = productMainCategory;
            this.productSubCategory = productSubCategory;
            this.totalPrice = totalPrice;
        }


    }
}
