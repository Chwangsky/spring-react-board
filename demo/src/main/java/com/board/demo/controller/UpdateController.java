package com.board.demo.controller;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
            @Valid @RequestPart(name = "data") UpdatePostRequestDTO updatePostRequestDTO,
            @RequestPart(name = "files", required = false) MultipartFile[] filesToUpload) {
        return boardUpdateService.postUpdate(updatePostRequestDTO, filesToUpload);
    }

}
