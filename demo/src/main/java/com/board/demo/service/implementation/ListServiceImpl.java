package com.board.demo.service.implementation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.board.demo.dto.request.list.BoardListRequestDTO;
import com.board.demo.dto.response.list.BoardDetailResponseItem;
import com.board.demo.dto.response.list.BoardListResponseDTO;
import com.board.demo.dto.response.list.CategoryIdNameItem;
import com.board.demo.dto.response.list.PaginationDTO;
import com.board.demo.entity.BoardSearchEntity;
import com.board.demo.entity.CategoryIdNameEntity;
import com.board.demo.mapper.BoardSearchMapper;
import com.board.demo.service.ListService;

@Service
public class ListServiceImpl implements ListService {

    private final BoardSearchMapper mapper;
    private final int itemsPerPage;
    private final int pagePerSection;

    public ListServiceImpl(
            BoardSearchMapper mapper,
            @Value("${board.items-per-page}") int itemsPerPage,
            @Value("${board.page-per-section}") int pagePerSection) {
        this.mapper = mapper;
        this.itemsPerPage = itemsPerPage;
        this.pagePerSection = pagePerSection;
    }

    @Override
    public BoardListResponseDTO searchBoards(BoardListRequestDTO boardListDTO) {

        int page = boardListDTO.getPage() != null ? boardListDTO.getPage() : 1;
        int offset = (page - 1) * itemsPerPage;

        String regDateStart = boardListDTO.getRegDateStart();
        String regDateEnd = boardListDTO.getRegDateEnd();
        String keyword = boardListDTO.getKeyword();
        String categoryName = boardListDTO.getCategoryName();

        List<BoardSearchEntity> boardSearchEntities = mapper.boardSearch(regDateStart, regDateEnd, categoryName,
                keyword, itemsPerPage, offset);

        List<BoardDetailResponseItem> boardDetailResponseItems = boardSearchEntities.stream()
                .map(BoardDetailResponseItem::fromEntity)
                .collect(Collectors.toList());

        int totalCount = mapper.boardSearchCount(regDateStart, regDateEnd, categoryName, keyword);

        List<CategoryIdNameEntity> categoryEntities = mapper.findAllCategoryIdsAndNames();
        List<CategoryIdNameItem> categoriesItems = categoryEntities.stream()
                .map(CategoryIdNameItem::fromEntity)
                .toList();

        PaginationDTO paginationDto = PaginationDTO.createPaginationDto(totalCount, itemsPerPage,
                pagePerSection, page);

        return BoardListResponseDTO.builder()
                .totalCount(totalCount)
                .boardDetailResponseItems(boardDetailResponseItems)
                .categoryIdNameItems(categoriesItems)
                .paginationDto(paginationDto)
                .regDateStart(regDateStart)
                .regDateEnd(regDateEnd)
                .keyword(keyword)
                .categoryName(categoryName)
                .build();
    }
}
