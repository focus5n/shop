package com.hjk.model;

import com.hjk.enums.ProductStatus;
import com.hjk.exception.OrderException;
import com.hjk.exception.common.CustomException;
import com.hjk.model.common.Base;
import com.hjk.model.dto.ProductDto;
import com.hjk.utils.DateUtils;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Entity
@Table(name = "product")
@NoArgsConstructor
public class Product extends Base {

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private Integer price;

    @Column(name = "stock")
    private Integer stock;

    @Column(name = "like_count")
    private Integer likeCount;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private ProductStatus status;

    @Column(name = "main_category")
    private String mainCategory;

    @Column(name = "sub_category")
    private String subCategory;

    @Column(name = "img")
    private String img;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Cart> carts;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Orders> orders;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Likes> likes;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Review> reviews;

    public void likeUp() {
        this.likeCount += 1;
    }

    public void likeDown() {
        this.likeCount -= 1;
    }

    public void stockUp() {
        this.stock += 1;
        if(this.stock > 0) {
            SALE();
        }
    }

    public void stockMinus() {
        if(this.stock == 0) {
            throw new CustomException(OrderException.OUT_OF_STOCK);
        }
        this.stock -= 1;
        if(this.stock == 0) {
            soldOut();
        }
    }

    public void SALE() {
        this.status = ProductStatus.SALE;
    }

    public void soldOut() {
        this.status = ProductStatus.SOLD_OUT;
    }

    @Builder
    public Product(String name, String description, Integer price, Integer stock, ProductStatus status, String img, String mainCategory, String subCategory) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.status = status;
        this.img = img;
        this.likeCount = 0;
        this.mainCategory = mainCategory;
        this.subCategory = subCategory;
    }

    public void updateProduct(ProductDto.updateRequestDto request) {
        this.name = request.getName() == null ? this.name : request.getName();
        this.description = request.getDescription() == null ? this.description : request.getDescription();
        this.price = request.getPrice() == null ? this.price : request.getPrice();
        this.stock = request.getStock() == null ? this.stock : request.getStock();
        this.status = request.getStatus() == null ? this.status : request.getStatus();
        this.mainCategory = request.getMainCategory() == null ? this.mainCategory : request.getMainCategory();
        this.subCategory = request.getSubCategory() == null ? this.subCategory : request.getSubCategory();
        String path = "https://shop-upload.s3.ap-northeast-2.amazonaws.com/static/" + request.getImg();
        this.img = request.getImg() == null ? this.img : path;
    }

    public ProductDto.Response toResponseDto() {
        return ProductDto.Response.builder()
                .id(this.id)
                .name(this.name)
                .description(this.description)
                .price(this.price)
                .stock(this.stock)
                .status(this.status)
                .mainCategory(this.mainCategory)
                .subCategory(this.subCategory)
                .img(this.img)
                .createAt(DateUtils.LocalDateFormat(this.createdAt))
                .build();
    }

    public static List<ProductDto.Response> toResponseDtoList(List<Product> products) {
        return products.stream().map(ProductDto.Response::new).collect(Collectors.toList());
    }
}
