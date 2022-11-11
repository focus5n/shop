package com.hjk.service;

import com.hjk.exception.MainCategoryException;
import com.hjk.exception.common.CustomException;
import com.hjk.model.MainCategory;
import com.hjk.model.SubCategory;
import com.hjk.model.dto.SubCategoryDto;
import com.hjk.repository.MainCategoryRepository;
import com.hjk.repository.SubCategoryRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SubCategoryService {

    private final MainCategoryRepository mainCategoryRepository;
    private final SubCategoryRepository subCategoryRepository;

    public SubCategoryDto.Response create(SubCategoryDto.createRequestDto request) {
        MainCategory mainCategory = mainCategoryRepository.findById(request.getMainCategoryId()).orElseThrow(() -> new CustomException(MainCategoryException.NOT_FOUND_CATEGORY));
        SubCategory subCategoryToBeCreated = SubCategory.builder().name(request.getName()).mainCategory(mainCategory).build();
        subCategoryRepository.save(subCategoryToBeCreated);
        return subCategoryToBeCreated.toResponseDto();
    }
}
