package com.hjk.aws;

import cn.hutool.core.lang.UUID;
import com.amazonaws.services.s3.AmazonS3;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.io.IOException;
import java.util.Iterator;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class FileUploadUtils {

    private final AWSS3Utils awss3Utils;

    public static final String USER_IMAGE_FOLDER = "user-images";
    public static final String PRODUCT_IMAGE_FOLDER = "product";

    public static String getSaveFilePath(MultipartFile file, String folder) {
        return folder + "/" + file.getOriginalFilename();
    }

    public static String getSaveFilePath(String img) {
        return "http://localhost:8080" + "/img/" + PRODUCT_IMAGE_FOLDER + "/" + img;
    }


    private static String getExtension(String fileName) {
        int pos = fileName.lastIndexOf('.');

        if(pos != -1 && fileName.length() - 1 > pos) {
            return fileName.substring(pos + 1);
        } else {
            return "";
        }
    }

    public String awsUpload(MultipartFile file) throws IOException {
        AmazonS3 s3Client = awss3Utils.getS3Client();

        String saveFilePath = getSaveFilePath(file, "static");

        // S3에 파일 저장 후 url 반환
        String result =  awss3Utils.putObjectToS3AndGetUrl(s3Client, saveFilePath, file);
        return result;
    }

    public static String upload(MultipartHttpServletRequest request) throws Exception {
        //File dir = ResourceUtils.getFile("classpath:static");
        ClassPathResource classPathResource = new ClassPathResource("static");

        String folderPath = "/docker" + "/img/" + PRODUCT_IMAGE_FOLDER + "/";

        Iterator<String> iterator = request.getFileNames();

        if(!iterator.hasNext()) {
            return "파일 업로드 실패";
        }

        while(iterator.hasNext()) {
            MultipartFile multipartFile = request.getFile(iterator.next());

            assert multipartFile != null;
            if(!multipartFile.isEmpty()) {
                String fileName = multipartFile.getOriginalFilename();
                String savePath = folderPath + fileName;
                File file = new File(savePath);
                multipartFile.transferTo(file);
            }
        }

        return "파일을 업로드 하였습니다";
    }
}
