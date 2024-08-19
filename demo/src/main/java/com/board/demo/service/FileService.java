package com.board.demo.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.board.demo.entity.FileInsertEntity;

public interface FileService {

    List<FileInsertEntity> saveFiles(MultipartFile[] files, Integer boardId);

}
