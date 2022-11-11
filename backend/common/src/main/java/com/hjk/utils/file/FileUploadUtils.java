package com.hjk.utils.file;

import java.io.File;
import java.util.Iterator;
import java.util.Objects;

import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;


import cn.hutool.core.lang.UUID;

public class FileUploadUtils {

    public static final String USER_IMAGE_FOLDER = "user-images";
    public static final String PRODUCT_IMAGE_FOLDER = "product";

    public static String getSaveFilePath(MultipartFile file, String image) {
        String random = UUID.randomUUID().toString();
        random = random.replace("-", "");

        String fileExtension = getExtension(Objects.requireNonNull(file.getOriginalFilename()));

        return image + "/" + random + "." + fileExtension;
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

    public static String upload(MultipartHttpServletRequest request) throws Exception {
        File dir = ResourceUtils.getFile("classpath:static");
        String folderPath = dir.getAbsolutePath() + "/img/" + PRODUCT_IMAGE_FOLDER + "/";

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
