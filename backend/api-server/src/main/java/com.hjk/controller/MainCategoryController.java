package com.hjk.controller;

import com.hjk.exception.common.ValidException;
import com.hjk.model.common.CommonResult;
import com.hjk.model.dto.MainCategoryDto;
import com.hjk.service.MainCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/shop/mainCategory")
@RequiredArgsConstructor
public class MainCategoryController {

    private final MainCategoryService mainCategoryService;

    @RequestMapping(value = "/get/{mainCategoryId}", method = RequestMethod.GET)
    public CommonResult<MainCategoryDto.Response> get(@PathVariable Long mainCategoryId) {
        return CommonResult.success(mainCategoryService.findById(mainCategoryId));
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public CommonResult<List<MainCategoryDto.Response>> list() {
        return CommonResult.success(mainCategoryService.findAll());
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public CommonResult<MainCategoryDto.Response> upload(@Valid @RequestBody MainCategoryDto.createRequestDto request, BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            throw new ValidException(bindingResult);
        }
        return CommonResult.success(mainCategoryService.create(request));
    }
}
