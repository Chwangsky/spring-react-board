package com.board.demo.dto.response.read;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CommentItem {
    private Integer commentId;
    private String content;
    private String writer;
    private LocalDateTime regDate;

}
