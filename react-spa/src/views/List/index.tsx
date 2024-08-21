import React, { useCallback, useEffect, useState } from "react";
import { getBoardListRequest } from "../../apis";
import dayjs from "dayjs";
import { BoardListResponseDTO } from "../../apis/response/list";
import { BoardListRequestDTO } from "../../apis/request";
import ResponseDTO from "../../apis/response/response.dto";
import { BoardListItem, CategoryIdNameItem } from "../../types/interface";
import PaginationItem from "../../apis/response/list/pagination.dto";
import { Pagination } from "../../components/Pagination";

const BoardList = () => {
  const now = dayjs();

  // 상태 정의
  const [regDateStart, setRegDateStart] = useState<string>(
    now.subtract(1, "year").format("YYYY-MM-DD")
  );
  const [regDateEnd, setRegDateEnd] = useState<string>(
    now.format("YYYY-MM-DD")
  );
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [keyword, setKeyword] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  const [boardListItems, setBoardListItems] = useState<BoardListItem[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [categoryIdNameItems, setCategoryIdNameItems] = useState<
    CategoryIdNameItem[]
  >([]);
  const [paginationItem, setPaginationItem] = useState<PaginationItem | null>(
    null
  );

  // 데이터 로드 함수
  const loadBoardList = useCallback(() => {
    const requestBody: BoardListRequestDTO = {
      regDateStart,
      regDateEnd,
      categoryId,
      keyword,
      page,
    };
    getBoardListRequest(requestBody).then(getBoardListResponse);
  }, [regDateStart, regDateEnd, categoryId, keyword, page]);

  // effect: 컴포넌트 초기화 시 데이터를 한 번만 로드
  useEffect(() => {
    loadBoardList();
  }, []);

  useEffect(() => {
    if (page !== 1) {
      // 페이지가 변경될 때만 데이터를 로드
      loadBoardList();
    }
  }, [page, loadBoardList]);

  // 서버 응답 처리 함수
  const getBoardListResponse = (
    responseBody: BoardListResponseDTO | ResponseDTO | null
  ) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === "DBE") alert("데이터베이스 오류입니다.");
    if (code !== "SU") return;

    const {
      totalCount,
      boardListItems,
      categoryIdNameItems,
      paginationItem,
      regDateStart,
      regDateEnd,
      keyword,
      categoryId,
    } = responseBody as BoardListResponseDTO;

    // 상태 업데이트
    setTotalCount(totalCount);
    setBoardListItems(boardListItems);
    setCategoryIdNameItems(categoryIdNameItems);
    setPaginationItem(paginationItem);
    setRegDateStart(regDateStart);
    setRegDateEnd(regDateEnd);
    setKeyword(keyword);
    setCategoryId(categoryId);
  };

  // 검색 버튼 클릭 핸들러
  const onSearchButtonClickHandler = () => {
    setPage(1); // 검색 시 페이지를 초기화하고 데이터 로드
    loadBoardList();
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">자유게시판 - 목록</h1>

      {/* 검색 필터 */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center space-x-4">
          <label className="font-medium">등록일 시작:</label>
          <input
            type="date"
            value={regDateStart}
            onChange={(e) => setRegDateStart(e.target.value)}
            className="border rounded px-4 py-2"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="font-medium">등록일 끝:</label>
          <input
            type="date"
            value={regDateEnd}
            onChange={(e) => setRegDateEnd(e.target.value)}
            className="border rounded px-4 py-2"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="font-medium">카테고리:</label>
          <select
            value={categoryId || ""}
            onChange={(e) =>
              setCategoryId(e.target.value ? Number(e.target.value) : null)
            }
            className="border rounded px-4 py-2"
          >
            <option value="">전체</option>
            {categoryIdNameItems.map((item) => (
              <option key={item.categoryId} value={item.categoryId}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <label className="font-medium">검색어:</label>
          <input
            type="text"
            value={keyword || ""}
            onChange={(e) => setKeyword(e.target.value)}
            className="border rounded px-4 py-2"
          />
        </div>

        <button
          onClick={onSearchButtonClickHandler}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          검색
        </button>
      </div>

      {/* 게시글 목록 섹션 */}
      <div className="board-list-section">
        <h2 className="text-xl font-bold mb-4">게시글 목록</h2>
        {boardListItems.length === 0 ? (
          <p>게시글이 없습니다.</p>
        ) : (
          <ul className="space-y-4">
            {boardListItems.map((item) => (
              <li
                key={item.boardId}
                className="border rounded-lg p-4 bg-white shadow hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-between items-center mb-2">
                  <strong className="text-lg">{item.category}</strong>
                  <small className="text-gray-500">{item.regDate}</small>
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <div className="text-sm text-gray-600">
                  <span className="mr-4">작성자: {item.writer}</span>
                  <span className="mr-4">조회수: {item.views}</span>
                  <span>파일 수: {item.fileCount}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 페이지네이션 */}
      {paginationItem && (
        <Pagination {...paginationItem} onPageChange={handlePageChange} />
      )}
    </>
  );
};

export default BoardList;
