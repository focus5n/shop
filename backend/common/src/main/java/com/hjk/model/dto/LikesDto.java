package com.hjk.model.dto;

import com.hjk.model.Likes;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class LikesDto {

    @Getter
    @NoArgsConstructor
    public static class saveRequestDto {

        private Long userId;

        private Long productId;
    }

    @Getter
    @NoArgsConstructor
    public static class Response {

        private Long likesId;

        private Long userId;

        private Long productId;

        public Response(Likes likes) {
            this.likesId = likes.getId();
            this.userId = likes.getUser().getId();
            this.productId = likes.getProduct().getId();
        }

        @Builder
        public Response(Long likesId, Long userId, Long productId) {
            this.likesId = likesId;
            this.userId = userId;
            this.productId = productId;
        }
    }
}
