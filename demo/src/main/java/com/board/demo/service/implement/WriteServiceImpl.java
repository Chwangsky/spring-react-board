package com.board.demo.service.implement;

import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.board.demo.dto.request.write.BoardPostBoardRequestDTO;
import com.board.demo.dto.response.write.BoardWriteResponseDTO;
import com.board.demo.dto.response.write.PostBoardResponseDTO;
import com.board.demo.entity.BoardCreateEntity;
import com.board.demo.entity.CategoryIdNameEntity;
import com.board.demo.entity.FileInsertEntity;
import com.board.demo.mapper.BoardWriteMapper;
import com.board.demo.service.FileService;
import com.board.demo.service.WriteService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class WriteServiceImpl implements WriteService {

    private final BoardWriteMapper mapper;
    private final FileService fileService;

    public WriteServiceImpl(
            BoardWriteMapper mapper,
            FileService fileService) {
        this.mapper = mapper;
        this.fileService = fileService;
    }

    @Override
    public ResponseEntity<? super BoardWriteResponseDTO> getWriteForm() {
        try {
            List<CategoryIdNameEntity> allCategoriesEntities = mapper.getAllCategories();
            return BoardWriteResponseDTO.success(allCategoriesEntities);
        } catch (DataAccessException e) {
            return BoardWriteResponseDTO.databaseError();
        }

    }

    @Override
    @Transactional
    public ResponseEntity<? super PostBoardResponseDTO> postBoard(BoardPostBoardRequestDTO dto) {

        MultipartFile[] parts = dto.getFiles();

        BoardCreateEntity boardCreateEntity = BoardCreateEntity.builder()
                .views(0)
                .categoryId(dto.getCategoryId())
                .content(dto.getContent())
                .password(dto.getPassword())
                .title(dto.getTitle())
                .writer(dto.getWriter())
                .build();

        Integer boardId = null;
        try {
            mapper.insertBoard(boardCreateEntity);
            boardId = boardCreateEntity.getBoardId();

            if (parts != null && parts.length > 0) {
                List<FileInsertEntity> savedFiles = fileService.saveFiles(parts, boardId);
                savedFiles.forEach(mapper::insertFile);
            }

        } catch (DataAccessException e) {
            return PostBoardResponseDTO.databaseError();
        }

        if (boardId != null) {
            return PostBoardResponseDTO.success(boardId);
        } else {
            return PostBoardResponseDTO.databaseError();
        }
    }
}
