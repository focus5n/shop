package com.hjk.controller;

import com.hjk.model.common.CommonResult;
import com.hjk.model.dto.LikesDto;
import com.hjk.service.LikesService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/shop/likes")
@RequiredArgsConstructor
public class LikesController {

    private final LikesService likesService;

    @RequestMapping(value = "/get/{userId}", method = RequestMethod.GET)
    public CommonResult<List<LikesDto.Response>> get(@PathVariable Long userId) {
        return CommonResult.success(likesService.findAllByUserId(userId));
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public CommonResult<LikesDto.Response> upload(@RequestBody LikesDto.saveRequestDto request) {
        return CommonResult.success(likesService.save(request));
    }

    @RequestMapping(value = "/delete/{likeId}", method = RequestMethod.DELETE)
    public CommonResult<LikesDto.Response> delete(@PathVariable Long likeId) {
        return CommonResult.success(likesService.delete(likeId));
    }
}
