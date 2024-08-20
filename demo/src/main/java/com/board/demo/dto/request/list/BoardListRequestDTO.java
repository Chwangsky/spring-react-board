package com.board.demo.dto.request.list;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class BoardListRequestDTO {

    private String regDateStart;

    private String regDateEnd;

    private Integer categoryId;

    private String keyword;

    private Integer page;

    public BoardListRequestDTO() {
        this.regDateStart = LocalDateTime.now().minusYears(1).format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        this.regDateEnd = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }
}
