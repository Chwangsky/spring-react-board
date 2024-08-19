package com.board.demo.service;

import org.springframework.http.ResponseEntity;

import com.board.demo.dto.request.list.BoardListRequestDTO;
import com.board.demo.dto.response.list.BoardListResponseDTO;

public interface ListService {
    public ResponseEntity<? super BoardListResponseDTO> searchBoards(BoardListRequestDTO boardListDTO);
}