package com.board.demo.entity;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BoardCreateEntity {

    private Integer boardId;
    private String title;
    private String writer;
    private int views;
    private int categoryId;
    private String content;
    private String password;
}
