package com.hjk.service;

import com.hjk.exception.MainCategoryException;
import com.hjk.exception.common.CustomException;
import com.hjk.model.MainCategory;
import com.hjk.model.dto.MainCategoryDto;
import com.hjk.repository.MainCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MainCategoryService {

    private final MainCategoryRepository mainCategoryRepository;

    public MainCategoryDto.Response findById(Long categoryId) {
        return mainCategoryRepository.findById(categoryId).orElseThrow(() -> new CustomException(MainCategoryException.NOT_FOUND_CATEGORY)).toResponseDto();
    }
    public List<MainCategoryDto.Response> findAll() {
        return MainCategory.toResponseDtoList(mainCategoryRepository.findAll());
    }
    public MainCategoryDto.Response create(MainCategoryDto.createRequestDto request) {
        MainCategory mainCategoryToBeCreated = MainCategory.builder().name(request.getName()).build();
        mainCategoryRepository.save(mainCategoryToBeCreated);
        return mainCategoryToBeCreated.toResponseDto();
    }
}
