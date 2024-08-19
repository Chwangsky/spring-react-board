package com.board.demo.dto.response.list;

import lombok.Builder;
import lombok.Getter;

/**
 * DTO for pagination information.
 */
@Getter
@Builder
public class PaginationDTO {
    private int totalItems; // 전체 항목 수
    private int itemsPerPage; // 한 페이지당 항목 수
    private int pagesPerSection; // 한 섹션당 페이지 수
    private int totalPage; // 총 페이지 수

    private int currentPage; // 현재 페이지
    private int currentSectionPageBegin; // 현재 섹션의 시작 페이지
    private int currentSectionPageEnd; // 현재 섹션의 끝 페이지

    private int currentSection; // 현재 섹션
    private int totalSection; // 전체 섹션

    /**
     * Creates a PaginationDto from totalItems, itemsPerPage, pagesPerSection, and
     * currentPage.
     *
     * @param totalItems      Total number of items.
     * @param itemsPerPage    Number of items per page.
     * @param pagesPerSection Number of pages per section.
     * @param currentPage     Current page number.
     * @return PaginationDto containing pagination information.
     */
    public static PaginationDTO createPaginationDto(int totalItems, int itemsPerPage,
            int pagesPerSection, int currentPage) {

        int totalPage = calculateTotalPage(totalItems, itemsPerPage);
        int totalSection = calculateTotalSection(totalPage, pagesPerSection);
        int currentSection = calculateCurrentSection(currentPage, pagesPerSection);
        int currentSectionPageBegin = calculateCurrentPageBegin(currentSection, pagesPerSection);
        int currentSectionPageEnd = calculateCurrentPageEnd(currentSection, pagesPerSection, totalPage);

        return PaginationDTO.builder()
                .totalItems(totalItems)
                .itemsPerPage(itemsPerPage)
                .pagesPerSection(pagesPerSection)
                .currentPage(currentPage)
                .totalPage(totalPage)
                .totalSection(totalSection)
                .currentSection(currentSection)
                .currentSectionPageBegin(currentSectionPageBegin)
                .currentSectionPageEnd(currentSectionPageEnd)
                .build();
    }

    /**
     * Calculates the total number of pages.
     *
     * @param totalItems   Total number of items.
     * @param itemsPerPage Number of items per page.
     * @return The total number of pages.
     */
    private static int calculateTotalPage(int totalItems, int itemsPerPage) {
        return (int) Math.ceil((double) totalItems / itemsPerPage);
    }

    /**
     * Calculates the total number of sections.
     *
     * @param totalPage       Total number of pages.
     * @param pagesPerSection Number of pages per section.
     * @return The total number of sections.
     */
    private static int calculateTotalSection(int totalPage, int pagesPerSection) {
        return (int) Math.ceil((double) totalPage / pagesPerSection);
    }

    /**
     * Calculates the current section number.
     *
     * @param currentPage     Current page number.
     * @param pagesPerSection Number of pages per section.
     * @return The current section number.
     */
    private static int calculateCurrentSection(int currentPage, int pagesPerSection) {
        return (int) Math.ceil((double) currentPage / pagesPerSection);
    }

    /**
     * Calculates the start page number for the current section.
     *
     * @param currentSection  Current section number.
     * @param pagesPerSection Number of pages per section.
     * @return The start page number for the current section.
     */
    private static int calculateCurrentPageBegin(int currentSection, int pagesPerSection) {
        return (currentSection - 1) * pagesPerSection + 1;
    }

    /**
     * Calculates the end page number for the current section.
     *
     * @param currentSection  Current section number.
     * @param pagesPerSection Number of pages per section.
     * @param totalPage       Total number of pages.
     * @return The end page number for the current section.
     */
    private static int calculateCurrentPageEnd(int currentSection, int pagesPerSection,
            int totalPage) {
        return Math.min(currentSection * pagesPerSection, totalPage);
    }
}
