package com.board.demo.service;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;

public interface FileDownloadService {
    ResponseEntity<Resource> downloadFile(int id);
}
