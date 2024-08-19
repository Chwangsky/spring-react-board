package com.board.demo.service;

import com.board.demo.dto.request.update.UpdatePostRequestDTO;
import com.board.demo.dto.response.update.UpdateResponseDTO;

public interface UpdateService {

    UpdateResponseDTO getupdate(int boardId);

    Integer postUpdate(UpdatePostRequestDTO updatePostRequestDTO);
}
