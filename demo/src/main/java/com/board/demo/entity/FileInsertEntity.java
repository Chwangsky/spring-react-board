package com.board.demo.entity;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FileInsertEntity {
    private int fileId;
    private String attachType;
    private int byteSize;
    private String uuidName;
    private String orgName;
    private String fileDir;
    private int boardId;
}
