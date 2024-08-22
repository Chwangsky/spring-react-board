import { useEffect, useState } from "react";
import { CategoryIdNameItem } from "../../types/interface";
import { getWriteRequest } from "../../apis";
import ResponseDTO from "../../apis/response/response.dto";
import { GetBoardWriteResponseDTO } from "../../apis/response/write/write-response.dto";

const BoardWrite = () => {
  const [categoryIdNameItems, setCategoryIdNameItems] = useState<
    CategoryIdNameItem[]
  >([]);

  const [categoryId, setCategoryId] = useState<number | null>(null);

  useEffect(() => {
    getWriteRequest().then(getWriteResponse);
  }, []);

  const getWriteResponse = (
    responseBody: GetBoardWriteResponseDTO | ResponseDTO | null
  ) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === "DBE") alert("데이터베이스 에러입니다.");
    if (code !== "SU") return;
    const { categoryIdNameItems } = responseBody as GetBoardWriteResponseDTO;
    console.log(categoryIdNameItems);
    setCategoryIdNameItems(categoryIdNameItems);
  };

  return (
    <>
      <h1>게시판 - 등록</h1>

      <div className="grid grid-cols-[1fr_5fr]">
        <div className=" border-y-lime-950">카테고리</div>
        <div className="">
          <select
            value={""}
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

        <div className=" border-y-lime-950">작성자</div>
        <div className="bg-green-500 text-white p-4 rounded">
          1:5 비율의 두 번째 열
        </div>
      </div>
    </>
  );
};

export default BoardWrite;
