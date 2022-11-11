package com.hjk.model;

import com.hjk.model.common.Base;
import com.hjk.model.dto.CartDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Entity
@Table(name = "cart")
@NoArgsConstructor
public class Cart extends Base {

    @Column(name = "product_count")
    private Integer productCount;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product;

    @Builder
    public Cart(Integer productCount, User user, Product product) {
        this.productCount = productCount;
        this.user = user;
        this.product = product;
    }

    public CartDto.Response toResponseDto() {
        return CartDto.Response.builder()
                .cartId(this.id)
                .productId(this.product.getId())
                .productName(this.product.getName())
                .productDescription(this.product.getDescription())
                .productPrice(this.product.getPrice())
                .productStock(this.product.getStock())
                .productCount(this.productCount)
                .productStatus(this.product.getStatus())
                .productImg(this.product.getImg())
                .productMainCategory(this.product.getMainCategory())
                .productSubCategory(this.product.getMainCategory())
                .totalPrice(this.product.getPrice() * productCount)
                .build();
    }

    public static List<CartDto.Response> toResponseDtoList(List<Cart> carts) {
        return carts.stream().map(CartDto.Response::new).collect(Collectors.toList());
    }
}
