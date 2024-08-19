package com.board.demo.dto.request.delete;

import jakarta.annotation.Nonnull;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BoardDeleteRequestDTO {
    @Nonnull
    Integer boardId;

    @Nonnull
    String password;
}
