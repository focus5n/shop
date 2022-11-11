package com.hjk.model;

import com.hjk.model.common.Base;
import com.hjk.model.dto.MainCategoryDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Entity
@Table(name = "main_category")
@NoArgsConstructor
public class MainCategory extends Base {

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "main_category", cascade = CascadeType.ALL)
    private List<SubCategory> subCategoryList;

    @Builder
    public MainCategory(String name) {
        this.name = name;
    }

    public MainCategoryDto.Response toResponseDto() {
        String[] nullSubCategory = {"서브 카테고리가 없습니다"};
        List<String> subCategoryNameList;
        if(subCategoryList != null && subCategoryList.size() != 0) {
            subCategoryNameList = subCategoryList.stream().map(SubCategory::getName).toList();
        } else {
            subCategoryNameList = Arrays.asList(nullSubCategory);
        }

        return MainCategoryDto.Response.builder()
                .id(this.id)
                .name(this.name)
                .subCategoryList(subCategoryNameList)
                .build();
    }

    public static List<MainCategoryDto.Response> toResponseDtoList(List<MainCategory> mainCategories) {
        return mainCategories.stream().map(MainCategoryDto.Response::new).collect(Collectors.toList());
    }
}
