package com.board.demo.service;

import org.springframework.http.ResponseEntity;

import com.board.demo.dto.request.read.PostCommentRequestDTO;
import com.board.demo.dto.response.read.BoardReadResponseDTO;
import com.board.demo.dto.response.read.PostCommentResponseDTO;

public interface ReadService {
    ResponseEntity<? super BoardReadResponseDTO> getBoardDetail(int boardId);

    ResponseEntity<? super PostCommentResponseDTO> postComment(PostCommentRequestDTO commentPostRequestDTO);

}
