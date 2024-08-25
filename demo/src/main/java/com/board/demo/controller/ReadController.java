package com.board.demo.controller;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.board.demo.dto.request.read.PostCommentRequestDTO;
import com.board.demo.dto.response.read.BoardReadResponseDTO;
import com.board.demo.dto.response.read.PostCommentResponseDTO;
import com.board.demo.service.ReadService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/boards/free/views")
public class ReadController {

    private final ReadService boardReadService;

    public ReadController(ReadService boardReadService) {
        this.boardReadService = boardReadService;
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<? super BoardReadResponseDTO> getBoardDetail(@PathVariable("boardId") Integer boardId,
            Model model) {
        return boardReadService.getBoardDetail(boardId);
    }

    @PostMapping
    public ResponseEntity<? super PostCommentResponseDTO> postComment(
            @Valid @RequestBody PostCommentRequestDTO postCommentRequestDTO) {

        return boardReadService.postComment(postCommentRequestDTO);
    }

}
