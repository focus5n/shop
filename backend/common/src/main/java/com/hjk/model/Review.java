package com.hjk.model;

import com.hjk.model.common.Base;
import com.hjk.model.dto.ProductDto;
import com.hjk.model.dto.ReviewDto;
import com.hjk.utils.DateUtils;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Entity
@Table(name = "review")
@NoArgsConstructor
public class Review extends Base {

    @Column(name = "comment")
    private String comment;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product;

    @Builder
    public Review(String comment, User user, Product product) {
        this.comment = comment;
        this.user = user;
        this.product = product;
    }

    public ReviewDto.Response toResponseDto() {
        return ReviewDto.Response.builder()
                .reviewId(this.getId())
                .userId(this.user.getId())
                .userName(this.user.getName())
                .comment(this.comment)
                .createdAt(DateUtils.LocalDateFormat(this.createdAt))
                .build();
    }

    public static List<ReviewDto.Response> toResponseDtoList(List<Review> reviews) {
        return reviews.stream().map(ReviewDto.Response::new).collect(Collectors.toList());
    }
}
