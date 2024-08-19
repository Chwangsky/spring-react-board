package com.board.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.board.demo.dto.request.write.BoardPostBoardRequestDTO;
import com.board.demo.dto.response.write.BoardWriteResponseDTO;
import com.board.demo.service.WriteService;

@Controller
@RequestMapping("/boards/free/write")
public class WriteController {

    public final WriteService boardWriteService;

    public WriteController(WriteService boardWriteService) {
        this.boardWriteService = boardWriteService;
    }

    @GetMapping
    public String getWriteForm(Model model) {
        BoardWriteResponseDTO BoardWriteResponseDTO = boardWriteService.getWriteForm();

        model.addAttribute("dto", BoardWriteResponseDTO);

        return "/boards/free/write";
    }

    @PostMapping
    public String postBoard(BoardPostBoardRequestDTO boardPostBoardRequestDTO) {

        Integer boardNumber = boardWriteService.postBoard(boardPostBoardRequestDTO);

        return "redirect:/boards/free/views/" + String.valueOf(boardNumber); // 작성한 게시물로 리다이렉트 (PGR)
    }

}
