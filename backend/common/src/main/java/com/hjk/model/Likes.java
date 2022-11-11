package com.hjk.model;


import com.hjk.model.common.Base;
import com.hjk.model.dto.LikesDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Entity
@Table(name = "likes")
@NoArgsConstructor
public class Likes extends Base {

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product;

    @Builder
    public Likes(User user, Product product) {
        this.user = user;
        this.product = product;
    }

    public LikesDto.Response toResponseDto() {
        return LikesDto.Response.builder()
                .likesId(this.id)
                .productId(this.product.getId())
                .userId(this.user.getId())
                .build();
    }

    public static List<LikesDto.Response> toResponseDtoList(List<Likes> carts) {
        return carts.stream().map(LikesDto.Response::new).collect(Collectors.toList());
    }
}
