package com.board.demo.controller;

import jakarta.validation.constraints.NotNull;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.board.demo.service.FileDownloadService;

@RestController
public class FileDownloadController {

    private final FileDownloadService fileDownloadService;

    public FileDownloadController(FileDownloadService fileDownloadService) {
        this.fileDownloadService = fileDownloadService;
    }

    @GetMapping("/download.do")
    public ResponseEntity<Resource> downloadFile(@RequestParam("id") @NotNull Integer id) {

        return fileDownloadService.downloadFile(id);
    }
}
