package com.board.demo.dto.response.write;

import java.util.List;
import java.util.stream.Collectors;

import lombok.Builder;
import lombok.Getter;

import com.board.demo.entity.CategoryIdNameEntity;

@Getter
@Builder
public class BoardWriteResponseDTO {
    List<CategoryIdNameItem> categories;

    public static BoardWriteResponseDTO fromEntities(List<CategoryIdNameEntity> entities) {
        return BoardWriteResponseDTO.builder()
                .categories(entities.stream()
                        .map(entity -> CategoryIdNameItem.builder()
                                .categoryId(entity.getCategoryId())
                                .name(entity.getName())
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }
}
