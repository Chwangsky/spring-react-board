package com.board.demo.controller;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.board.demo.dto.request.update.UpdatePostRequestDTO;
import com.board.demo.dto.response.update.PostUpdateResponseDTO;
import com.board.demo.dto.response.update.UpdateResponseDTO;
import com.board.demo.service.UpdateService;

@RestController
@RequestMapping("/boards/free/modify")
public class UpdateController {

    final UpdateService boardUpdateService;

    public UpdateController(UpdateService boardUpdateService) {
        this.boardUpdateService = boardUpdateService;
    }

    @GetMapping
    public ResponseEntity<? super UpdateResponseDTO> getModifyForm(@RequestParam("boardId") Integer boardId) {
        return boardUpdateService.getupdate(boardId);
    }

    @PostMapping
    public ResponseEntity<? super PostUpdateResponseDTO> postModifyForm(
            @RequestBody @Valid UpdatePostRequestDTO updatePostRequestDTO) {
        return boardUpdateService.postUpdate(updatePostRequestDTO);
    }

}
