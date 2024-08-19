package com.board.demo.dto.request.read;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PostCommentRequestDTO {

    @NotNull
    Integer boardId;

    @NotBlank
    String writer;

    @NotBlank
    String content;
}
