package com.board.demo.dto.response.write;

import org.springframework.http.ResponseEntity;

import com.board.demo.common.ResponseCode;
import com.board.demo.dto.response.ResponseDTO;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class PostBoardResponseDTO extends ResponseDTO {

    private Integer boardId;

    private static PostBoardResponseDTO of(Integer boardId) {
        return PostBoardResponseDTO.builder()
                .boardId(boardId)
                .code(ResponseCode.SUCCESS)
                .message(ResponseCode.SUCCESS)
                .build();
    }

    public static ResponseEntity<PostBoardResponseDTO> success(Integer boardId) {
        PostBoardResponseDTO result = PostBoardResponseDTO.of(boardId);
        return ResponseEntity.ok().body(result);
    }

}
