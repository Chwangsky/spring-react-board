import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BoardDetailItem from "../../types/interface/board-detail-item.interface";
import commentItem from "../../types/interface/comment-item.interface";
import FileItem from "../../types/interface/file-item.interface";
import { getBoardDetailRequest } from "../../apis";
import { BoardDetailResponseDTO } from "../../apis/response/detail";
import ResponseDTO from "../../apis/response/response.dto";

const BoardDetail = () => {
  const { boardId } = useParams();
  const [boardDetailItem, setBoardDetailItem] = useState<BoardDetailItem>();
  const [fileItems, setFileItems] = useState<FileItem[]>([]);
  const [commentItems, setCommentItems] = useState<commentItem[]>([]);

  // 화면 초기화 시 실행할 함수
  useEffect(() => {
    getBoardDetailRequest(Number(boardId)).then(getBoardDetailResponse);
  }, []);

  const getBoardDetailResponse = (
    responseBody: BoardDetailResponseDTO | ResponseDTO | null
  ) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === "DBE") alert("데이터베이스 오류입니다.");
    if (code !== "SU") return;

    const { boardDetailItem, commentItems, fileItems } =
      responseBody as BoardDetailResponseDTO;
    setBoardDetailItem(boardDetailItem);
    setFileItems(fileItems);
    setCommentItems(commentItems);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">게시판 - 보기</h1>
      {boardDetailItem && (
        <div>
          <div>{boardDetailItem.writer}</div>
          <div>{boardDetailItem.regDate}</div>
        </div>
      )}
    </>
  );
};

export default BoardDetail;
