package com.board.demo.service.implement;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.board.demo.dto.request.list.BoardListRequestDTO;
import com.board.demo.dto.response.ResponseDTO;
import com.board.demo.dto.response.list.BoardListItem;
import com.board.demo.dto.response.list.BoardListResponseDTO;
import com.board.demo.dto.response.list.CategoryIdNameItem;
import com.board.demo.dto.response.list.PaginationItem;
import com.board.demo.entity.BoardSearchEntity;
import com.board.demo.entity.CategoryIdNameEntity;
import com.board.demo.mapper.BoardSearchMapper;
import com.board.demo.service.ListService;

@Service
public class ListServiceImpl implements ListService {

        private final BoardSearchMapper mapper;

        private final int itemsPerPage;

        private final int pagePerSection;

        public ListServiceImpl(BoardSearchMapper mapper,
                        @Value("${board.items-per-page}") int itemsPerPage,
                        @Value("${board.page-per-section}") int pagePerSection) {
                this.mapper = mapper;
                this.itemsPerPage = itemsPerPage;
                this.pagePerSection = pagePerSection;
        }

        @Override
        public ResponseEntity<? super BoardListResponseDTO> searchBoards(BoardListRequestDTO boardListDTO) {
                Integer page = boardListDTO.getPage() != null ? boardListDTO.getPage() : 1;
                Integer offset = (page - 1) * itemsPerPage;

                String regDateStart = boardListDTO.getRegDateStart();
                String regDateEnd = boardListDTO.getRegDateEnd();
                String keyword = boardListDTO.getKeyword();
                Integer categoryId = boardListDTO.getCategoryId();

                String regDateEndDay = regDateEnd != null ? regDateEnd + " 23:59:59" : null; // 그 날의 23시59분59초를 검색하기 위한
                                                                                             // 변수

                try {

                        // 데이터베이스에서 게시글 검색
                        List<BoardSearchEntity> boardSearchEntities = mapper.boardSearch(regDateStart, regDateEndDay,
                                        categoryId,
                                        keyword, itemsPerPage, offset);

                        List<BoardListItem> boardDetailResponseItems = boardSearchEntities.stream()
                                        .map(BoardListItem::fromEntity)
                                        .collect(Collectors.toList());

                        // 전체 카운트 조회
                        int totalCount = mapper.boardSearchCount(regDateStart, regDateEndDay, categoryId, keyword);

                        // 카테고리 목록 조회
                        List<CategoryIdNameEntity> categoryEntities = mapper.findAllCategoryIdsAndNames();
                        List<CategoryIdNameItem> categoriesItems = categoryEntities.stream()
                                        .map(CategoryIdNameItem::fromEntity)
                                        .toList();

                        // Pagination DTO 생성
                        PaginationItem paginationItem = PaginationItem.createPaginationItem(totalCount, itemsPerPage,
                                        pagePerSection, page);

                        // 성공 응답 반환
                        return BoardListResponseDTO.success(totalCount, boardDetailResponseItems, categoriesItems,
                                        paginationItem,
                                        regDateStart, regDateEnd, keyword, categoryId);

                } catch (DataAccessException e) {
                        // 데이터베이스 오류가 발생한 경우
                        return ResponseDTO.databaseError();
                }
        }
}
