package com.hjk.aws;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@RestController
@RequestMapping("/api/shop/file")
@CrossOrigin("*")
@RequiredArgsConstructor
public class FileController {

    private final FileUploadUtils fileUploadUtils;

    @RequestMapping(value="upload", method=RequestMethod.POST)
    public String requestMethodName(MultipartFile file) throws Exception {
        return fileUploadUtils.awsUpload(file);
    }

}
