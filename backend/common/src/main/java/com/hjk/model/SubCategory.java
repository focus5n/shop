package com.hjk.model;

import com.hjk.model.common.Base;
import com.hjk.model.dto.SubCategoryDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "sub_category")
@NoArgsConstructor
public class SubCategory extends Base {

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "main_category_id", referencedColumnName = "id")
    private MainCategory main_category;

    @Builder
    public SubCategory(String name, MainCategory mainCategory) {
        this.name = name;
        this.main_category = mainCategory;
    }

    public SubCategoryDto.Response toResponseDto() {
        return SubCategoryDto.Response.builder()
                .name(this.name)
                .build();
    }
}
