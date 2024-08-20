package com.board.demo.dto.request.list;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import jakarta.annotation.Nullable;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter

@ToString
public class BoardListRequestDTO {

    @Nullable
    private String regDateStart;

    @Nullable
    private String regDateEnd;

    @Nullable
    private Integer categoryId;

    @Nullable
    private String keyword;

    @Nullable
    private Integer page;

    public BoardListRequestDTO() {
        this.regDateStart = LocalDateTime.now().minusYears(1).format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        this.regDateEnd = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }
}
