package com.hjk.controller;

import com.hjk.model.common.CommonResult;
import com.hjk.model.dto.ReviewDto;
import com.hjk.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/shop/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public CommonResult<ReviewDto.Response> upload(@RequestBody ReviewDto.saveRequestDto request) {
        return CommonResult.success(reviewService.save(request));
    }

    @RequestMapping(value = "/get/{productId}", method = RequestMethod.GET)
    public CommonResult<List<ReviewDto.Response>> findByProduct(@PathVariable Long productId) {
        return CommonResult.success(reviewService.findByProduct(productId));
    }

    @RequestMapping(value = "/delete/{reviewId}", method = RequestMethod.DELETE)
    public CommonResult<ReviewDto.Response> delete(@PathVariable Long reviewId) {
        return CommonResult.success(reviewService.delete(reviewId));
    }
}
