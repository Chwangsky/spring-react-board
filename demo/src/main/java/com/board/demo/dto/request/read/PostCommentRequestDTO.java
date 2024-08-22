package com.board.demo.dto.request.read;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PostCommentRequestDTO {

    @NotNull
    Integer boardId;

    @Size(min = 3, max = 4, message = "또틀렸냐")
    String writer;

    @NotBlank
    String content;
}
