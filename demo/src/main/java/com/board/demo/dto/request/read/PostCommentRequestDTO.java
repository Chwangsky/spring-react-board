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

    @Size(min = 3, max = 4, message = "작성자의 이름은 3 이상 4 이하이어야 합니다.")
    String writer;

    @NotBlank
    String content;
}
