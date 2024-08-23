package com.board.demo.service;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.board.demo.dto.request.write.BoardPostBoardRequestDTO;
import com.board.demo.dto.response.write.BoardWriteResponseDTO;
import com.board.demo.dto.response.write.PostBoardResponseDTO;

public interface WriteService {

    ResponseEntity<? super BoardWriteResponseDTO> getWriteForm();

    ResponseEntity<? super PostBoardResponseDTO> postBoard(BoardPostBoardRequestDTO dto, MultipartFile[] parts);

}
