package com.board.demo.entity;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentEntity {
    private int commentId;
    private String content;
    private String writer;
    private LocalDateTime regDate;
}
