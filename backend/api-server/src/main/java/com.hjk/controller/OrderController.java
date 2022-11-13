package com.hjk.controller;

import com.hjk.exception.common.ValidException;
import com.hjk.model.common.CommonResult;
import com.hjk.model.dto.OrderDto;
import com.hjk.model.page.CommonPage;
import com.hjk.model.page.PageDto;
import com.hjk.model.page.PageRequest;
import com.hjk.model.page.Pagination;
import com.hjk.service.OrderService;
import com.hjk.service.search.OrderSearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/shop/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    private final OrderSearchService orderSearchService;

    @RequestMapping(value = "/get/myOrder", method = RequestMethod.GET)
    public CommonPage<OrderDto.Response> myOrder(@RequestParam(value = "userId")Long userId, PageRequest pageRequest) {
        PageDto<OrderDto.Response> pageDto = orderSearchService.search(userId, pageRequest.of());
        return CommonPage.success(pageDto.getContents(), Pagination.build(pageDto));
    }

    @RequestMapping(value = "/get/{orderId}", method = RequestMethod.GET)
    public CommonResult<OrderDto.Response> get(@PathVariable Long orderId) {
        return CommonResult.success(orderService.findOrder(orderId).toResponseDto());
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public CommonResult<OrderDto.Response> upload(@Valid @RequestBody OrderDto.createRequestDto request, BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            throw new ValidException(bindingResult);
        }
        return CommonResult.success(orderService.create(request));
    }

    @RequestMapping(value = "/update/{orderId}", method = RequestMethod.PATCH)
    public CommonResult<OrderDto.Response> complete(@PathVariable Long orderId, @Valid @RequestBody OrderDto.updateRequestDto request, BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            throw new ValidException(bindingResult);
        }
        return CommonResult.success(orderService.updateInfo(orderId, request));
    }

    @RequestMapping(value = "/refund/{orderId}", method = RequestMethod.DELETE)
    public CommonResult<OrderDto.Response> refund(@PathVariable Long orderId) {
        return CommonResult.success(orderService.refund(orderId));
    }

    @RequestMapping(value = "/delete/{orderId}", method = RequestMethod.DELETE)
    public CommonResult<OrderDto.Response> delete(@PathVariable Long orderId) {
        return CommonResult.success(orderService.delete(orderId));
    }

    @RequestMapping(value = "/complete/{orderId}", method = RequestMethod.PATCH)
    public CommonResult<OrderDto.Response> complete(@PathVariable Long orderId) {
        return CommonResult.success(orderService.complete(orderId));
    }
}
