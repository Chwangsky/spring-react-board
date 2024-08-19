package com.board.demo.dto.response.read;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FileItem {
    private Integer fileId;
    private String attachType;
    private Integer byteSize;
    private String uuidName;
    private String orgName;
    private String fileDir;
}
