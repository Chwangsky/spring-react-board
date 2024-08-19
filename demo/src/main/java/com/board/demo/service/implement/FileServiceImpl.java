package com.board.demo.service.implement;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.board.demo.entity.FileInsertEntity;
import com.board.demo.exception.FileWriteException;
import com.board.demo.service.FileService;

@Service
public class FileServiceImpl implements FileService {

    private final String uploadDirectory;

    public FileServiceImpl(
            @Value("${upload.directory}") String uploadDirectory) {
        this.uploadDirectory = uploadDirectory;
    }

    // 파일 저장 로직
    public List<FileInsertEntity> saveFiles(MultipartFile[] files, Integer boardId) {
        List<FileInsertEntity> savedFiles = new ArrayList<>();

        for (MultipartFile file : files) {
            if (file.isEmpty())
                continue;

            String originalFileName = file.getOriginalFilename();
            String uuidName = UUID.randomUUID().toString();
            Path filePath = Paths.get(uploadDirectory, uuidName);

            try {

                synchronized (this) { // 여러 스레드가 동시에 폴더를 만들려는 시도 방지
                    Files.createDirectories(Paths.get(uploadDirectory));
                }

                try (InputStream inputStream = file.getInputStream()) {
                    Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
                }

                FileInsertEntity fileEntity = FileInsertEntity.builder()
                        .attachType(file.getContentType())
                        .boardId(boardId)
                        .byteSize((int) file.getSize())
                        .fileDir(filePath.toString())
                        .orgName(originalFileName)
                        .uuidName(uuidName)
                        .build();

                savedFiles.add(fileEntity);

            } catch (IOException e) {
                throw new FileWriteException("파일 저장 중 오류가 발생했습니다.", e);
            } catch (DataAccessException e) {
                throw new FileWriteException("데이터 베이스 저장 중 오류가 발생했습니다.", e);
            }
        }

        return savedFiles;
    }
}