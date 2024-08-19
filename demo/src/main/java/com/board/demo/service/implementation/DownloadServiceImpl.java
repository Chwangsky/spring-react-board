package com.board.demo.service.implementation;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.board.demo.entity.FileDownloadEntity;
import com.board.demo.mapper.DownloadMapper;
import com.board.demo.service.FileDownloadService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class DownloadServiceImpl implements FileDownloadService {

    private final DownloadMapper mapper;

    public DownloadServiceImpl(DownloadMapper mapper) {
        this.mapper = mapper;
    }

    public ResponseEntity<Resource> downloadFile(int id) {
        try {
            FileDownloadEntity fileDownloadEntity = mapper.selectFileById(id);
            if (fileDownloadEntity == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            String filePath = fileDownloadEntity.getFileDir();
            String attachType = fileDownloadEntity.getAttachType();
            String orgFileName = getEncodedFileName(fileDownloadEntity.getOrgName());

            File downloadFile = new File(filePath);

            if (!downloadFile.exists() || !downloadFile.isFile() || !downloadFile.canRead()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            // 첨부파일 타입이 지정되지 않은 경우 기본 타입으로 설정
            if (attachType == null || attachType.isEmpty()) {
                attachType = "application/octet-stream";
            }

            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_TYPE, attachType);
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + orgFileName + "\"");
            headers.setContentLength(downloadFile.length());

            // 파일을 리소스로 래핑
            Resource resource = new FileSystemResource(downloadFile);

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(resource);

        } catch (IOException e) {
            log.error("Error occurred during file download: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    private String getEncodedFileName(String fileName) throws UnsupportedEncodingException {
        return URLEncoder.encode(fileName, StandardCharsets.UTF_8.toString()).replaceAll("\\+", "%20");
    }
}
