package com.board.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.board.demo.dto.request.list.BoardListRequestDTO;
import com.board.demo.dto.response.list.BoardListResponseDTO;
import com.board.demo.service.ListService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/boards/free/list")
public class ListController {

    private final ListService boardListService;

    public ListController(ListService boardListService) {
        this.boardListService = boardListService;
    }

    @GetMapping
    public ResponseEntity<? super BoardListResponseDTO> showBoardList(BoardListRequestDTO boardSearchDTO, Model model) {

        return boardListService.searchBoards(boardSearchDTO);
    }

}
