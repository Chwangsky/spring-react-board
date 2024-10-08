package com.board.demo.dto.response.list;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.board.demo.common.ResponseCode;
import com.board.demo.common.ResponseMessage;
import com.board.demo.dto.response.ResponseDTO;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class BoardListResponseDTO extends ResponseDTO {
    private Integer totalCount;
    private List<BoardListItem> boardListItems;
    private PaginationItem paginationItem;
    private List<CategoryIdNameItem> categoryIdNameItems;

    // form 을 계속 저장하면서 가지고 다니기 위한 변수들
    private String regDateStart;
    private String regDateEnd;
    private String keyword;
    private Integer categoryId;

    public static ResponseEntity<BoardListResponseDTO> success(
            int totalCount,
            List<BoardListItem> boardListItems,
            List<CategoryIdNameItem> categoryIdNameItems,
            PaginationItem paginationItem,
            String regDateStart,
            String regDateEnd,
            String keyword,
            Integer categoryId) {

        BoardListResponseDTO responseDTO = BoardListResponseDTO.builder()
                .totalCount(totalCount)
                .boardListItems(boardListItems)
                .categoryIdNameItems(categoryIdNameItems)
                .paginationItem(paginationItem)
                .regDateStart(regDateStart)
                .regDateEnd(regDateEnd)
                .keyword(keyword)
                .categoryId(categoryId)
                .code(ResponseCode.SUCCESS)
                .message(ResponseMessage.SUCCESS)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
    }
}
