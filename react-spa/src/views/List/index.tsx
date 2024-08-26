import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FaPaperclip } from "react-icons/fa6";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getBoardListRequest } from "../../apis";
import { BoardListRequestDTO } from "../../apis/request";
import { BoardListResponseDTO } from "../../apis/response/list";
import ResponseDTO from "../../apis/response/response.dto";
import { Pagination } from "../../components/Pagination";
import { LIST_PATH, READ_PATH, WRITE_PATH } from "../../constant";
import {
  BoardListItem,
  CategoryIdNameItem,
  PaginationItem,
} from "../../types/interface";
import { formatDate } from "../../util/formatDate";

const BoardList = () => {
  const now = dayjs();

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

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

  // effect: 컴포넌트 초기화 시 데이터를 한 번만 로드
  useEffect(() => {
    const regDateStart =
      searchParams.get("regDateStart") ||
      now.subtract(1, "year").format("YYYY-MM-DD");
    const regDateEnd =
      searchParams.get("regDateEnd") || now.format("YYYY-MM-DD");
    const keyword = searchParams.get("keyword") || "";
    const categoryId = searchParams.get("categoryId") || null;
    const page = searchParams.get("page") || "1";

    fetchBoardList(
      regDateStart,
      regDateEnd,
      categoryId != null ? Number(categoryId) : null,
      keyword,
      Number(page)
    );
  }, []);

  // function: 검색어에 따른 목록을 get하는 함수
  const fetchBoardList = (
    regDateStart: string,
    regDateEnd: string,
    categoryId: number | null,
    keyword: string,
    page: number
  ) => {
    console.log(categoryId);
    const requestBody: BoardListRequestDTO = {
      regDateStart,
      regDateEnd,
      categoryId,
      keyword,
      page,
    };
    getBoardListRequest(requestBody).then(getBoardListResponse);
  };

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

  // handler: 검색 버튼 클릭 핸들러
  const onSearchButtonClickHandler = () => {
    navigate(
      `${LIST_PATH()}?regDateStart=${regDateStart}&regDateEnd=${regDateEnd}&keyword=${keyword}&categoryId=${categoryId}&page=${page}`
    );
  };

  // change: 페이지 버튼 클릭 핸들러
  const onPageButtonClickHandler = (page: number) => {
    navigate(
      `${LIST_PATH()}?regDateStart=${regDateStart}&regDateEnd=${regDateEnd}&keyword=${keyword}&categoryId=${categoryId}&page=${page}`
    );
  };

  const truncateTitle = (title: string) => {
    if (title.length > 80) title = title.substring(0, 80) + "...";
    return title;
  };

  const changeToClip = (fileCount: number) => {
    if (fileCount === 0) return;
    else return <FaPaperclip />;
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">자유게시판 - 목록</h1>

      {/* 검색 필터 */}
      <div className="flex flex-row items-center  mb-8">
        <div className="space-x-4">
          <label className="font-medium">등록일:</label>
          <input
            type="date"
            value={regDateStart}
            onChange={(e) => setRegDateStart(e.target.value)}
            className="border rounded px-4 py-2"
          />
        </div>
        ~
        <div className="flex items-center space-x-4 pr-4">
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

      <div>총 {totalCount} 건</div>

      {/* 게시글 목록 섹션 */}
      <div>
        <table className="board-list-section min-w-full divide-y divide-gray-500 overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-center w-10">카테고리</th>
              {/* 첨부파일 */}
              <th className="text-center w-10"></th>

              <th className="text-center w-60">제목</th>
              <th className="text-center w-8">작성자</th>
              <th className="text-center w-8">조회수</th>
              <th className="text-center w-12">등록 일시</th>
              <th className="text-center w-12">수정 일시</th>
            </tr>
          </thead>
          <tbody>
            {boardListItems.map((item) => (
              <tr key={item.boardId}>
                <td className="text-center">{item.category}</td>
                <td className="text-center">{changeToClip(item.fileCount)}</td>
                <td
                  className="text-center hover:text-blue-500 hover:underline cursor-pointer"
                  onClick={() => navigate(READ_PATH(String(item.boardId)))}
                >
                  {truncateTitle(item.title)}
                </td>
                <td className="text-center">{item.writer}</td>
                <td className="text-center">{item.views}</td>
                <td className="text-center">{formatDate(item.regDate)}</td>
                <td className="text-center">{formatDate(item.regDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <div className="flex flex-row justify-center">
        {paginationItem && (
          <Pagination
            {...paginationItem}
            onPageButtonClickHandler={onPageButtonClickHandler}
          />
        )}
      </div>

      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={() => navigate(WRITE_PATH())}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          글쓰기
        </button>
      </div>
    </>
  );
};

export default BoardList;
