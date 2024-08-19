package com.board.demo.dto.response.read;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BoardItem {
    private Integer boardId;
    private String category;
    private String title;
    private String content;
    private LocalDateTime regDate;
    private LocalDateTime updateDate;

}
