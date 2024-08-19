package com.board.demo.dto.response.list;

import com.board.demo.entity.CategoryIdNameEntity;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CategoryIdNameItem {

    private final int categoryId;
    private final String name;

    public static CategoryIdNameItem fromEntity(CategoryIdNameEntity categoryIdNameEntity) {
        return CategoryIdNameItem.builder()
                .categoryId(categoryIdNameEntity.getCategoryId())
                .name(categoryIdNameEntity.getName())
                .build();
    }
}
