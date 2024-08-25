package com.board.demo.service.implement;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.board.demo.dto.request.update.UpdatePostRequestDTO;
import com.board.demo.dto.response.update.PostUpdateResponseDTO;
import com.board.demo.dto.response.update.UpdateResponseDTO;
import com.board.demo.entity.BoardUpdateDetailEntity;
import com.board.demo.entity.FileEntity;
import com.board.demo.entity.FileInsertEntity;
import com.board.demo.exception.PasswordNotMatchException;
import com.board.demo.listener.FileDeleteEvent;
import com.board.demo.mapper.BoardUpdateMapper;
import com.board.demo.service.FileService;
import com.board.demo.service.UpdateService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UpdateServiceImpl implements UpdateService {

    private final BoardUpdateMapper mapper;
    private final ApplicationEventPublisher eventPublisher;
    private final FileService fileService;

    public UpdateServiceImpl(BoardUpdateMapper mapper,
            ApplicationEventPublisher applicationEventPublisher,
            FileService fileService) {
        this.mapper = mapper;
        this.eventPublisher = applicationEventPublisher;
        this.fileService = fileService;
    }

    @Override
    public ResponseEntity<? super UpdateResponseDTO> getupdate(int boardId) {
        try {
            BoardUpdateDetailEntity boardDetailEntity = mapper.selectBoardDetailById(boardId);
            List<FileEntity> fileEntities = mapper.selectFilesByBoardId(boardId);
            return UpdateResponseDTO.success(boardDetailEntity, fileEntities);
        } catch (DataAccessException e) {
            return UpdateResponseDTO.databaseError();
        }
    }

    @Override
    @Transactional
    public ResponseEntity<? super PostUpdateResponseDTO> postUpdate(UpdatePostRequestDTO updatePostRequestDTO,
            MultipartFile[] newFiles)
            throws RuntimeException {

        Integer boardId = updatePostRequestDTO.getBoardId();
        String password = updatePostRequestDTO.getPassword();

        BoardUpdateDetailEntity boardUpdateDetailEntity = mapper.selectBoardDetailById(boardId);
        if (!boardUpdateDetailEntity.getPassword().equals(password)) {
            throw new PasswordNotMatchException();
        }

        List<Path> pathsToDelete;
        try {
            mapper.updateBoard(boardId, updatePostRequestDTO.getTitle(), updatePostRequestDTO.getContent(),
                    updatePostRequestDTO.getWriter());

            pathsToDelete = new ArrayList<>();

            // 파일 삭제 처리
            if (updatePostRequestDTO.getFilesToRemove() != null) {
                updatePostRequestDTO.getFilesToRemove().forEach(fileId -> {
                    String fileDir = mapper.getDirByFileId(fileId);
                    pathsToDelete.add(Paths.get(fileDir));
                    mapper.deleteFileById(fileId);
                });
            }

            // 새로운 파일 저장
            if (newFiles != null && newFiles.length > 0) {
                List<FileInsertEntity> savedFiles = fileService.saveFiles(newFiles, boardId);
                savedFiles.forEach(mapper::insertFile);
            }

            // 업데이트 날짜 갱신
            mapper.updateUpdateDate(boardId);
        } catch (DataAccessException e) {
            return PostUpdateResponseDTO.databaseError();
        }

        // 로컬 파일 삭제 이벤트 발생
        eventPublisher.publishEvent(new FileDeleteEvent(pathsToDelete));

        return PostUpdateResponseDTO.success(boardId);
    }
}