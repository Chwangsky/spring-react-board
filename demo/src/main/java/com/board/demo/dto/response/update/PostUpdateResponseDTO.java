package com.board.demo.dto.response.update;

import org.springframework.http.ResponseEntity;

import com.board.demo.common.ResponseCode;
import com.board.demo.common.ResponseMessage;
import com.board.demo.dto.response.ResponseDTO;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class PostUpdateResponseDTO extends ResponseDTO {

    Integer boardId;

    private static PostUpdateResponseDTO fromBoardId(Integer boardId) {
        return PostUpdateResponseDTO.builder()
                .boardId(boardId)
                .code(ResponseCode.SUCCESS)
                .message(ResponseMessage.SUCCESS)
                .build();
    }

    public static ResponseEntity<PostUpdateResponseDTO> success(Integer boardId) {
        PostUpdateResponseDTO result = PostUpdateResponseDTO.fromBoardId(boardId);
        return ResponseEntity.ok().body(result);
    }
}
