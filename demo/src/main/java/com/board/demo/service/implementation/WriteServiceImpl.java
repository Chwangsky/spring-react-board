package com.board.demo.service.implementation;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.board.demo.dto.request.write.BoardPostBoardRequestDTO;
import com.board.demo.dto.response.write.BoardWriteResponseDTO;
import com.board.demo.entity.BoardCreateEntity;
import com.board.demo.entity.CategoryIdNameEntity;
import com.board.demo.entity.FileInsertEntity;
import com.board.demo.exception.FileWriteException;
import com.board.demo.mapper.BoardWriteMapper;
import com.board.demo.service.WriteService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class WriteServiceImpl implements WriteService {

    private final BoardWriteMapper mapper;
    private final String uploadDirectory;

    public WriteServiceImpl(
            BoardWriteMapper mapper,
            @Value("${upload.directory}") String uploadDirectory) {
        this.mapper = mapper;
        this.uploadDirectory = uploadDirectory;
    }

    @Override
    public BoardWriteResponseDTO getWriteForm() {
        List<CategoryIdNameEntity> allCategoriesEntities = mapper.getAllCategories();
        return BoardWriteResponseDTO.fromEntities(allCategoriesEntities);
    }

    @Override
    @Transactional
    public Integer postBoard(BoardPostBoardRequestDTO dto) {

        MultipartFile[] parts = dto.getFiles();

        BoardCreateEntity boardCreateEntity = BoardCreateEntity.builder()
                .views(0)
                .categoryId(dto.getCategoryId())
                .content(dto.getContent())
                .password(dto.getPassword())
                .title(dto.getTitle())
                .writer(dto.getWriter())
                .build();

        mapper.insertBoard(boardCreateEntity);
        Integer boardId = boardCreateEntity.getBoardId();

        for (MultipartFile file : parts) {
            String originalFileName = file.getOriginalFilename();
            String uuidName = UUID.randomUUID().toString();
            Path filePath = Paths.get(uploadDirectory, uuidName);
            Integer fileSize = (int) (long) file.getSize();
            String attachType = file.getContentType();

            if (fileSize == 0)
                continue; // 만약 빈 MultipartFile을 받았을 경우 skip

            try {
                // 디렉토리가 없으면 생성
                Files.createDirectories(Paths.get(uploadDirectory));
                // 파일 저장
                Files.write(filePath, file.getBytes(), StandardOpenOption.CREATE_NEW);
            } catch (IOException e) {
                throw new FileWriteException("파일 저장 중 오류가 발생했습니다.", e);
            }

            FileInsertEntity fileEntity = FileInsertEntity.builder()
                    .attachType(attachType)
                    .boardId(boardId)
                    .byteSize(fileSize)
                    .fileDir(filePath.toString())
                    .orgName(originalFileName)
                    .uuidName(uuidName)
                    .build();

            mapper.insertFile(fileEntity);
        }

        return boardId;
    }
}
