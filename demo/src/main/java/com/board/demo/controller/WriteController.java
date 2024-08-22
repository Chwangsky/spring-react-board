package com.board.demo.controller;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.board.demo.dto.request.write.BoardPostBoardRequestDTO;
import com.board.demo.dto.response.write.BoardWriteResponseDTO;
import com.board.demo.dto.response.write.PostBoardResponseDTO;
import com.board.demo.service.WriteService;

@RestController
@RequestMapping("/boards/free/write")
public class WriteController {

    public final WriteService boardWriteService;

    public WriteController(WriteService boardWriteService) {
        this.boardWriteService = boardWriteService;
    }

    @GetMapping
    public ResponseEntity<? super BoardWriteResponseDTO> getWriteForm() {
        return boardWriteService.getWriteForm();
    }

    @PostMapping
    public ResponseEntity<? super PostBoardResponseDTO> postBoard(
            @Valid @RequestBody BoardPostBoardRequestDTO boardPostBoardRequestDTO) {

        return boardWriteService.postBoard(boardPostBoardRequestDTO); // 작성한 게시물로 리다이렉트 (PGR)
    }

}
