package com.board.demo.service;

import org.springframework.http.ResponseEntity;

import com.board.demo.dto.request.update.UpdatePostRequestDTO;
import com.board.demo.dto.response.update.PostUpdateResponseDTO;
import com.board.demo.dto.response.update.UpdateResponseDTO;

public interface UpdateService {

    ResponseEntity<? super UpdateResponseDTO> getupdate(int boardId);

    ResponseEntity<? super PostUpdateResponseDTO> postUpdate(UpdatePostRequestDTO updatePostRequestDTO);
}
