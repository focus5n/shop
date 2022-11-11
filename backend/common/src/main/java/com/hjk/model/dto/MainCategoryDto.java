package com.hjk.model.dto;

import com.hjk.model.MainCategory;
import com.hjk.model.SubCategory;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Arrays;
import java.util.List;

public class MainCategoryDto {

    @Getter
    @NoArgsConstructor
    public static class createRequestDto {
        @Size(min = 1, max = 10, message = "메인 카테고리는 최소 1자 이상, 최대 10자 이하 입니다")
        @NotBlank(message = "메인 카테고리를 입력 해주세요")
        private String name;
    }

    @Getter
    @NoArgsConstructor
    public static class Response {

        private Long id;

        private String name;

        private List<String> subCategoryList;

        public Response(MainCategory mainCategory) {
            String[] nullSubCategory = {"서브 카테고리가 없습니다"};
            List<String> subCategoryNameList;
            if(mainCategory.getSubCategoryList() != null && mainCategory.getSubCategoryList().size() != 0) {
                subCategoryNameList = mainCategory.getSubCategoryList().stream().map(SubCategory::getName).toList();
            } else {
                subCategoryNameList = Arrays.asList(nullSubCategory);
            }

            this.id = mainCategory.getId();
            this.name = mainCategory.getName();
            this.subCategoryList = subCategoryNameList;
        }

        @Builder
        public Response(Long id, String name, List<String> subCategoryList) {
            this.id = id;
            this.name = name;
            this.subCategoryList = subCategoryList;
        }
    }
}
