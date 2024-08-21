import React from "react";
import PaginationItem from "../../apis/response/list/pagination.dto";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";

interface PaginationProps extends PaginationItem {
  onPageChange: (page: number) => void;
}

export const Pagination = (props: PaginationProps) => {
  const {
    totalPage,
    currentPage,
    currentSectionPageBegin,
    currentSectionPageEnd,
    onPageChange,
  } = props;

  const pageNumbers = [];

  // 현재 섹션의 시작 페이지부터 끝 페이지까지의 숫자를 배열에 추가
  for (let i = currentSectionPageBegin; i <= currentSectionPageEnd; i++) {
    if (i > totalPage) break; // 마지막 페이지를 초과하지 않도록 처리
    pageNumbers.push(i);
  }

  const onLeftButtonClickHandler = () => {
    if (currentSectionPageBegin === 1) return;
    onPageChange(currentSectionPageBegin - 1);
  };

  const onRightButtonClickHandler = () => {
    if (currentSectionPageEnd === totalPage) return;
    onPageChange(currentSectionPageEnd + 1);
  };

  return (
    <div className="pagination">
      {/* << 버튼*/}
      <button disabled={currentPage === 1} onClick={() => onPageChange(1)}>
        <FaAngleDoubleLeft />
      </button>

      {/* < 버튼*/}
      <button disabled={currentPage === 1} onClick={onLeftButtonClickHandler}>
        <FaAngleLeft />
      </button>

      {/* 페이지 숫자 버튼들 */}
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={pageNumber === currentPage ? "active" : ""}
        >
          {pageNumber}
        </button>
      ))}

      {/* > 버튼*/}
      <button
        disabled={currentSectionPageEnd === totalPage}
        onClick={onRightButtonClickHandler}
      >
        <FaAngleRight />
      </button>

      {/* >> 버튼*/}
      <button
        disabled={currentSectionPageEnd === totalPage}
        onClick={() => onPageChange(totalPage)}
      >
        <FaAngleDoubleRight />
      </button>
    </div>
  );
};

export default Pagination;
