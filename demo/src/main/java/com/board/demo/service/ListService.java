package com.board.demo.service;

import com.board.demo.dto.request.list.BoardListRequestDTO;
import com.board.demo.dto.response.list.BoardListResponseDTO;

public interface ListService {
    BoardListResponseDTO searchBoards(BoardListRequestDTO boardSearchDTO);
}