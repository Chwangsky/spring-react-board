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
public class BoardDetailEntity {
    private int boardId;
    private String category;
    private String title;
    private String writer;
    private String content;
    private LocalDateTime regDate;
    private LocalDateTime updateDate;
}
