package com.board.demo.controller;

import jakarta.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.board.demo.dto.request.read.PostCommentRequestDTO;
import com.board.demo.dto.response.read.BoardReadResponseDTO;
import com.board.demo.service.ReadService;

@Controller
@RequestMapping("/boards/free/views")
public class ReadController {

    private final ReadService boardReadService;

    public ReadController(ReadService boardReadService) {
        this.boardReadService = boardReadService;
    }

    @GetMapping("/{boardId}")
    public String getBoardDetail(@PathVariable("boardId") Integer boardId, Model model) {
        BoardReadResponseDTO boardReadResponseDTO = boardReadService.getBoardDetail(boardId);

        model.addAttribute("dto", boardReadResponseDTO);

        return "/boards/free/read";
    }

    @PostMapping
    public String postComment(@Valid PostCommentRequestDTO postCommentRequestDTO) {

        int boardId = boardReadService.postComment(postCommentRequestDTO);

        return "redirect:/boards/free/views/" + String.valueOf(boardId);
    }

}
