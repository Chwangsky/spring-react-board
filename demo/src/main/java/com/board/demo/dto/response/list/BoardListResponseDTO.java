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
    private int totalCount;
    private List<BoardDetailResponseItem> boardDetailResponseItems;
    private PaginationDTO paginationDto;
    private List<CategoryIdNameItem> categoryIdNameItems;

    // form 을 계속 저장하면서 가지고 다니기 위한 변수들
    private String regDateStart;
    private String regDateEnd;
    private String keyword;
    private String categoryName;

    // 기존 buildResponse 메서드 제거, SuperBuilder를 이용해 직접 빌드하도록 설정

    // success 메서드 구현
    public static ResponseEntity<BoardListResponseDTO> success(
            int totalCount,
            List<BoardDetailResponseItem> boardDetailResponseItems,
            List<CategoryIdNameItem> categoryIdNameItems,
            PaginationDTO paginationDto,
            String regDateStart,
            String regDateEnd,
            String keyword,
            String categoryName) {

        BoardListResponseDTO responseDTO = BoardListResponseDTO.builder()
                .totalCount(totalCount)
                .boardDetailResponseItems(boardDetailResponseItems)
                .categoryIdNameItems(categoryIdNameItems)
                .paginationDto(paginationDto)
                .regDateStart(regDateStart)
                .regDateEnd(regDateEnd)
                .keyword(keyword)
                .categoryName(categoryName)
                .code(ResponseCode.SUCCESS)
                .message(ResponseMessage.SUCCESS)
                .build();

        // 응답 생성
        return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
    }
}
