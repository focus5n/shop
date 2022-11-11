package com.hjk.utils.file;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import org.springframework.web.bind.annotation.RequestMethod;

@RestController
@RequestMapping("/api/shop/file")
@CrossOrigin("*")
public class FileController {

    @RequestMapping(value="upload", method=RequestMethod.POST)
    public String requestMethodName(MultipartHttpServletRequest request) throws Exception {
        return FileUploadUtils.upload(request);
    }

}
