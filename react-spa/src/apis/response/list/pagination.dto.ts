export default interface PaginationItem {
    totalItems: number;           // 전체 항목 수
    itemsPerPage: number;         // 한 페이지당 항목 수
    pagesPerSection: number;      // 한 섹션당 페이지 수
    totalPage: number;            // 총 페이지 수

    currentPage: number;          // 현재 페이지
    currentSectionPageBegin: number; // 현재 섹션의 시작 페이지
    currentSectionPageEnd: number;   // 현재 섹션의 끝 페이지

    currentSection: number;       // 현재 섹션
    totalSection: number;         // 전체 섹션
}