package com.hjk.model.dto;

import com.hjk.model.Review;
import com.hjk.utils.DateUtils;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ReviewDto {

    @Getter
    @NoArgsConstructor
    public static class saveRequestDto {

        private String comment;

        private Long userId;

        private Long productId;
    }

    @Getter
    @NoArgsConstructor
    public static class Response {

        private Long reviewId;
        private Long userId;
        private String userName;
        private String comment;
        private String createdAt;

        public Response(Review review) {
            this.reviewId = review.getId();
            this.userId = review.getUser().getId();
            this.userName = review.getUser().getName();
            this.comment = review.getComment();
            this.createdAt = DateUtils.LocalDateFormat(review.getCreatedAt());
        }

        @Builder
        public Response(Long reviewId, Long userId, String userName, String comment, String createdAt) {
            this.reviewId = reviewId;
            this.userId = userId;
            this.userName = userName;
            this.comment = comment;
            this.createdAt = createdAt;
        }
    }
}
