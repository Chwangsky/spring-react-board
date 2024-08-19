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
public class BoardUpdateDetailEntity {
    int boardId;
    String category;
    LocalDateTime regDate;
    LocalDateTime updateDate;
    int views;
    String writer;
    String password;
    String title;
    String content;
}
