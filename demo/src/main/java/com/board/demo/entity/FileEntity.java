package com.board.demo.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileEntity {
    private int fileId;
    private String attachType;
    private int byteSize;
    private String uuidName;
    private String orgName;
    private String fileDir;
}
