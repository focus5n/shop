package com.hjk.controller;

import com.hjk.exception.common.ValidException;
import com.hjk.model.common.CommonResult;
import com.hjk.model.dto.SubCategoryDto;
import com.hjk.service.SubCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/shop/subCategory")
@RequiredArgsConstructor
public class SubCategoryController {

    private final SubCategoryService subCategoryService;

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public CommonResult<SubCategoryDto.Response> upload(@Valid @RequestBody SubCategoryDto.createRequestDto request, BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            throw new ValidException(bindingResult);
        }
        return CommonResult.success(subCategoryService.create(request));
    }
}
