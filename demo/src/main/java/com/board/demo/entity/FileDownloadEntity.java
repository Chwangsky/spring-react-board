package com.board.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FileDownloadEntity {
    private String fileDir;
    private String attachType;
    private String uuidName;
    private String orgName;
}
