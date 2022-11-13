package com.hjk.controller;

import com.hjk.exception.common.ValidException;
import com.hjk.model.common.CommonResult;
import com.hjk.model.dto.CartDto;
import com.hjk.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/shop/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @RequestMapping(value = "/get/{userId}", method = RequestMethod.GET)
    public CommonResult<List<CartDto.Response>> get(@PathVariable Long userId) {
        return CommonResult.success(cartService.findAllByUserId(userId));
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public CommonResult<CartDto.Response> upload(@Valid @RequestBody CartDto.saveRequestDto request, BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            throw new ValidException(bindingResult);
        }

        return CommonResult.success(cartService.save(request));
    }

    @RequestMapping(value = "/delete/{cartId}", method = RequestMethod.DELETE)
    public CommonResult<CartDto.Response> delete(@PathVariable Long cartId) {
        return CommonResult.success(cartService.delete(cartId));
    }

}
