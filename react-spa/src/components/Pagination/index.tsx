import React from "react";
import PaginationItem from "../../types/interface/pagination-item";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";

interface PaginationProps extends PaginationItem {
  onPageButtonClickHandler: (page: number) => void;
}

export const Pagination = (props: PaginationProps) => {
  const {
    totalPage,
    currentPage,
    currentSectionPageBegin,
    currentSectionPageEnd,
    onPageButtonClickHandler,
  } = props;

  const pageNumbers: number[] = [];

  // 현재 섹션의 시작 페이지부터 끝 페이지까지의 숫자를 배열에 추가
  for (let i = currentSectionPageBegin; i <= currentSectionPageEnd; i++) {
    if (i > totalPage) break; // 마지막 페이지를 초과하지 않도록 처리
    pageNumbers.push(i);
  }

  const onLeftButtonClickHandler = () => {
    if (currentSectionPageBegin === 1) return;
    onPageButtonClickHandler(currentSectionPageBegin - 1);
  };

  const onRightButtonClickHandler = () => {
    if (currentSectionPageEnd === totalPage) return;
    onPageButtonClickHandler(currentSectionPageEnd + 1);
  };

  return (
    <div className="pagination flex flex-row">
      {/* << 버튼*/}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageButtonClickHandler(1)}
      >
        <FaAngleDoubleLeft />
      </button>

      {/* < 버튼*/}
      <button disabled={currentPage === 1} onClick={onLeftButtonClickHandler}>
        <FaAngleLeft />
      </button>

      {/* 페이지 숫자 버튼들 */}
      {pageNumbers.map((pageNumber) => (
        <React.Fragment key={pageNumber}>
          <button
            onClick={() => onPageButtonClickHandler(pageNumber)}
            className={
              pageNumber === currentPage ? "underline disable" : "active"
            }
          >
            {pageNumber}
          </button>
          {pageNumber !== pageNumbers[pageNumbers.length - 1] && (
            <div className="px-2">|</div>
          )}
        </React.Fragment>
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
        onClick={() => onPageButtonClickHandler(totalPage)}
      >
        <FaAngleDoubleRight />
      </button>
    </div>
  );
};

export default Pagination;
