package com.board.demo.service.implementation;

import java.util.List;

import org.springframework.stereotype.Service;

import com.board.demo.dto.request.read.PostCommentRequestDTO;
import com.board.demo.dto.response.read.BoardReadResponseDTO;
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
    public BoardReadResponseDTO getBoardDetail(int boardId) {

        mapper.incrementViewCount(boardId);

        BoardDetailEntity boardDetailEntity = mapper.selectBoardDetailById(boardId);
        List<CommentEntity> commentEntities = mapper.selectCommentsByBoardId(boardId);
        List<FileEntity> fileEntities = mapper.selectFilesByBoardId(boardId);

        return BoardReadResponseDTO.fromEntities(
                boardDetailEntity, commentEntities, fileEntities);

    }

    @Override
    public Integer postComment(PostCommentRequestDTO commentPostRequestDTO) {

        Integer boardId = commentPostRequestDTO.getBoardId();
        String content = commentPostRequestDTO.getContent();
        String writer = commentPostRequestDTO.getWriter();

        mapper.insertComment(boardId, writer, content);

        return boardId;
    }

}
