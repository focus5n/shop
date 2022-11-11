package com.hjk.model.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class SubCategoryDto {

    @Getter
    @NoArgsConstructor
    public static class createRequestDto {
        @NotNull(message = "메인 카테고리를 입력 해주세요")
        private Long mainCategoryId;

        @Size(min = 1, max = 10, message = "서브 카테고리는 최소 1자 이상, 최대 10자 이하 입니다")
        @NotBlank(message = "서브 카테고리를 입력 해주세요")
        private String name;
    }

    @Getter
    @NoArgsConstructor
    public static class Response {

        private String name;

        @Builder
        public Response(String name) {
            this.name = name;
        }
    }
}
