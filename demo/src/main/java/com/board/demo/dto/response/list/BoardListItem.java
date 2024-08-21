package com.board.demo.dto.response.list;

import java.time.LocalDateTime;

import com.board.demo.entity.BoardSearchEntity;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BoardListItem {
    private String category;
    private int fileCount;
    private int boardId;
    private String title;
    private String writer;
    private int views;
    private LocalDateTime regDate;
    private LocalDateTime updateDate;

    public static BoardListItem fromEntity(BoardSearchEntity boardSearchEntity) {
        return BoardListItem.builder()
                .category(boardSearchEntity.getCategory())
                .fileCount(boardSearchEntity.getFileCount())
                .boardId(boardSearchEntity.getBoardId())
                .title(boardSearchEntity.getTitle())
                .writer(boardSearchEntity.getWriter())
                .views(boardSearchEntity.getViews())
                .regDate(boardSearchEntity.getRegDate())
                .updateDate(boardSearchEntity.getUpdateDate())
                .build();
    }
}