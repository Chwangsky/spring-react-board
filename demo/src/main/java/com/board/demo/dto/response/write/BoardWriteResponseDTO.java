package com.board.demo.dto.response.write;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;

import com.board.demo.common.ResponseCode;
import com.board.demo.common.ResponseMessage;
import com.board.demo.dto.response.ResponseDTO;
import com.board.demo.entity.CategoryIdNameEntity;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class BoardWriteResponseDTO extends ResponseDTO {
    List<CategoryIdNameItem> categories;

    private static BoardWriteResponseDTO fromEntities(List<CategoryIdNameEntity> entities) {
        return BoardWriteResponseDTO.builder()
                .categories(entities.stream()
                        .map(entity -> CategoryIdNameItem.builder()
                                .categoryId(entity.getCategoryId())
                                .name(entity.getName())
                                .build())
                        .collect(Collectors.toList()))
                .code(ResponseCode.SUCCESS)
                .message(ResponseMessage.SUCCESS)
                .build();
    }

    public static ResponseEntity<BoardWriteResponseDTO> success(List<CategoryIdNameEntity> entities) {
        BoardWriteResponseDTO result = BoardWriteResponseDTO.fromEntities(entities);
        return ResponseEntity.ok().body(result);
    }
}
