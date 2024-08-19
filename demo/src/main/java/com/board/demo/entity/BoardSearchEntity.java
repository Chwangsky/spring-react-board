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
public class BoardSearchEntity {
    private String category;
    private int fileCount;
    private int boardId;
    private String title;
    private String writer;
    private int views;
    private LocalDateTime regDate;
    private LocalDateTime updateDate;
}
