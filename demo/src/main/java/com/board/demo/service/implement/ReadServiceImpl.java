package com.board.demo.service.implement;

import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.board.demo.dto.request.read.PostCommentRequestDTO;
import com.board.demo.dto.response.ResponseDTO;
import com.board.demo.dto.response.read.BoardReadResponseDTO;
import com.board.demo.dto.response.read.PostCommentResponseDTO;
import com.board.demo.entity.BoardDetailEntity;
import com.board.demo.entity.CommentEntity;
import com.board.demo.entity.FileEntity;
import com.board.demo.mapper.BoardReadMapper;
import com.board.demo.service.ReadService;

@Service
public class ReadServiceImpl implements ReadService {

    private final BoardReadMapper mapper;

    public ReadServiceImpl(BoardReadMapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public ResponseEntity<? super BoardReadResponseDTO> getBoardDetail(int boardId) {

        mapper.incrementViewCount(boardId);

        try {
            BoardDetailEntity boardDetailEntity = mapper.selectBoardDetailById(boardId);
            List<CommentEntity> commentEntities = mapper.selectCommentsByBoardId(boardId);
            List<FileEntity> fileEntities = mapper.selectFilesByBoardId(boardId);

            return BoardReadResponseDTO.success(
                    boardDetailEntity, commentEntities, fileEntities);

        } catch (DataAccessException e) {
            return ResponseDTO.databaseError();
        }
    }

    @Override
    public ResponseEntity<? super PostCommentResponseDTO> postComment(PostCommentRequestDTO commentPostRequestDTO) {

        Integer boardId = commentPostRequestDTO.getBoardId();
        String content = commentPostRequestDTO.getContent();
        String writer = commentPostRequestDTO.getWriter();

        try {
            mapper.insertComment(boardId, writer, content);
        } catch (DataAccessException e) {
            return ResponseDTO.databaseError();
        }

        return PostCommentResponseDTO.success(boardId);

    }

}
