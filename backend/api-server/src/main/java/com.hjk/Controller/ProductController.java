package com.hjk.Controller;

import com.hjk.exception.common.ValidException;
import com.hjk.model.common.CommonResult;
import com.hjk.model.dto.ProductDto;
import com.hjk.model.dto.ReviewDto;
import com.hjk.model.page.CommonPage;
import com.hjk.model.page.PageDto;
import com.hjk.model.page.PageRequest;
import com.hjk.model.page.Pagination;
import com.hjk.service.ProductService;
import com.hjk.service.ReviewService;
import com.hjk.service.search.ProductSearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/shop/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    private final ProductSearchService productSearchService;

    private final ReviewService reviewService;

    @RequestMapping(value = "/get/{productId}", method = RequestMethod.GET)
    public CommonResult<ProductDto.Response> get(@PathVariable Long productId) {
        return CommonResult.success(productService.findById(productId));
    }

    @RequestMapping(value = "/get/bestProduct", method = RequestMethod.GET)
    public CommonResult<ProductDto.Response> bestProduct() {
        return CommonResult.success(productSearchService.bestProduct());
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public CommonResult<List<ProductDto.Response>> list() {
        return CommonResult.success(productService.findAll());
    }

    @RequestMapping(value="/page/list", method = RequestMethod.GET)
    public CommonPage<ProductDto.Response> pageSearchList(@RequestParam(value = "search", required = false)String search, PageRequest pageRequest) {
        PageDto<ProductDto.Response> pageDto = productSearchService.pageSearchList(search, pageRequest.of());
        return CommonPage.success(pageDto.getContents(), Pagination.build(pageDto));
    }
    @RequestMapping(value="/category/list", method = RequestMethod.GET)
    public CommonPage<ProductDto.Response> categorySearch(@RequestParam(value = "mainCategory", required = false)String mainCategory, @RequestParam(value = "subCategory", required = false)String subCategory, PageRequest pageRequest) {
        PageDto<ProductDto.Response> pageDto = productSearchService.categorySearch(mainCategory,subCategory, pageRequest.of());
        return CommonPage.success(pageDto.getContents(), Pagination.build(pageDto));
    }

    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public CommonResult<ProductDto.Response> upload(@Valid @RequestBody ProductDto.uploadRequestDto request, BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            throw new ValidException(bindingResult);
        }

        return CommonResult.success(productService.uploadProduct(request));
    }

    @RequestMapping(value = "/update/{productId}", method = RequestMethod.PATCH)
    public CommonResult<ProductDto.Response> update(@PathVariable Long productId, @RequestBody ProductDto.updateRequestDto request) {
        return CommonResult.success(productService.updateProduct(productId, request));
    }

    @RequestMapping(value = "/delete/{productId}", method = RequestMethod.DELETE)
    public CommonResult<ProductDto.Response> delete(@PathVariable Long productId) {
        return CommonResult.success(productService.deleteProduct(productId));
    }
}
