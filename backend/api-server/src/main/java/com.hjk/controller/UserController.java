package com.hjk.controller;

import com.hjk.exception.common.ValidException;
import com.hjk.model.common.CommonResult;
import com.hjk.model.dto.UserDto;
import com.hjk.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/shop/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @RequestMapping(value = "/get/{userId}", method = RequestMethod.GET)
    public CommonResult<UserDto.Response> get(@PathVariable Long userId) {
        return CommonResult.success(userService.findById(userId));
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public CommonResult<List<UserDto.Response>> list() {
        return CommonResult.success(userService.findAll());
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public CommonResult<UserDto.Response> register(@Valid @RequestBody UserDto.registerRequestDto request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new ValidException(bindingResult);
        }
        return CommonResult.success(userService.register(request), "회원가입에 성공 하였습니다");
    }

    @RequestMapping(value = "/delete/{userId}", method = RequestMethod.DELETE)
    public CommonResult<UserDto.Response> delete(@PathVariable Long userId) {
        return CommonResult.success(userService.delete(userId), "회원을 삭제 하였습니다");
    }

    @RequestMapping(value = "/update/{userId}", method = RequestMethod.PATCH)
    public CommonResult<UserDto.Response> update(@PathVariable Long userId, @RequestBody UserDto.updateRequestDto request) {
        return CommonResult.success(userService.updateUser(userId, request));
    }

    @RequestMapping(value = "/update/admin/{userId}", method = RequestMethod.PATCH)
    public CommonResult<UserDto.Response> updateAdmin(@PathVariable Long userId) {
        return CommonResult.success(userService.updateAdmin(userId), "회원을 관리자로 업데이트 하였습니다");
    }
}
