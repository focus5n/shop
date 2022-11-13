package com.hjk.model.dto;


import com.hjk.enums.ProductStatus;
import com.hjk.enums.helpers.EnumPattern;
import com.hjk.utils.DateUtils;
import com.hjk.model.Product;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;

public class ProductDto {

    @Getter
    @NoArgsConstructor
    public static class uploadRequestDto {

        @Size(min = 1, max = 10, message = "상품 이름은 최소 1자 이상, 최대 10자 이하 입니다")
        @NotBlank(message = "상품 이름을 입력 해주세요")
        private String name;

        @Size(min = 1, max = 100, message = "상품 설명은 최소 1자 이상, 최대 100자 이하 입니다")
        @NotBlank(message = "상품 설명을 입력 해주세요")
        private String description;

        @Min(value = 100, message = "가격은 최소 100원 이상이여야 합니다")
        @Max(value = 10000000, message = "가격은 천만원 이하여야 합니다")
        @NotNull(message = "가격을 입력 해주세요")
        private Integer price;

        @Min(value = 1, message = "수량은 최소 1개 이상이여야 합니다")
        @Max(value = 100, message = "수량은 최소 100개 이하여야 합니다")
        @NotNull(message = "수량을 입력 해주세요")
        private Integer stock;

        @EnumPattern(regexp = "SALE|SOLD_OUT", message = "올바른 상품 상태를 입력 해주세요")
        private ProductStatus status;

        @Size(min = 1, max = 100, message = "메인 카테고리는 최소 1자 이상, 최대 100자 이하 입니다")
        @NotBlank(message = "메인 카테고리를 입력 해주세요")
        private String mainCategory;

        @Size(min = 1, max = 100, message = "서브 카테고리는 최소 1자 이상, 최대 100자 이하 입니다")
        @NotBlank(message = "서브 카테고리를 입력 해주세요")
        private String subCategory;

        private String img;

        public Product toEntity() {

            String path = "https://shop-upload.s3.ap-northeast-2.amazonaws.com/static/" + this.img;

            return Product.builder()
                    .name(this.name)
                    .description(this.description)
                    .price(this.price)
                    .stock(this.stock)
                    .status(this.status)
                    .mainCategory(this.mainCategory)
                    .subCategory(this.subCategory)
                    .img(path)
                    .build();
        }
    }

    @Getter
    @NoArgsConstructor
    public static class updateRequestDto {

        private String name;

        private String description;

        private Integer price;

        private Integer stock;

        private ProductStatus status;

        private String mainCategory;

        private String subCategory;

        private String img;

    }

    @Getter
    @NoArgsConstructor
    public static class Response {

        private Long id;

        private String name;

        private String description;

        private Integer price;

        private Integer stock;

        private ProductStatus status;

        private String mainCategory;

        private String subCategory;

        private String createAt;

        private String img;

        public Response(Product product) {
            this.id = product.getId();
            this.name = product.getName();
            this.description = product.getDescription();
            this.price = product.getPrice();
            this.stock = product.getStock();
            this.status = product.getStatus();
            this.mainCategory = product.getMainCategory();
            this.subCategory = product.getSubCategory();
            this.createAt = DateUtils.LocalDateFormat(product.getCreatedAt());
            this.img = product.getImg();
        }

        @Builder
        public Response(Long id, String name, String description, Integer price, Integer stock, ProductStatus status, String img, String mainCategory, String subCategory, String createAt) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.price = price;
            this.stock = stock;
            this.status = status;
            this.img = img;
            this.mainCategory = mainCategory;
            this.subCategory = subCategory;
            this.createAt = createAt;
        }
    }
}
