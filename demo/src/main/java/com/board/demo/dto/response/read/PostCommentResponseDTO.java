package com.board.demo.dto.response.read;

import org.springframework.http.ResponseEntity;

import com.board.demo.common.ResponseCode;
import com.board.demo.common.ResponseMessage;
import com.board.demo.dto.response.ResponseDTO;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class PostCommentResponseDTO extends ResponseDTO {

    Integer boardId;

    private static PostCommentResponseDTO fromBoardId(Integer boardId) {
        return PostCommentResponseDTO.builder()
                .boardId(boardId)
                .code(ResponseCode.SUCCESS)
                .message(ResponseMessage.SUCCESS)
                .build();
    }

    public static ResponseEntity<PostCommentResponseDTO> success(Integer boardId) {
        PostCommentResponseDTO result = PostCommentResponseDTO.fromBoardId(boardId);
        return ResponseEntity.ok().body(result);
    }

}
