import {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import BoardDetailItem from "../../types/interface/board-detail-item.interface";
import commentItem from "../../types/interface/comment-item.interface";
import FileItem from "../../types/interface/file-item.interface";
import { getBoardDetailRequest, postCommentRequest } from "../../apis";
import {
  BoardDetailResponseDTO,
  PostCommentResponseDTO,
} from "../../apis/response/detail";
import ResponseDTO from "../../apis/response/response.dto";
import { formatDate } from "../../util/formatDate";
import PostCommentRequestDTO from "../../apis/request/post-comment.request.dto";
import { LIST_PATH, READ_PATH } from "../../constant";

const BoardDetail = () => {
  const { boardId } = useParams();
  const [boardDetailItem, setBoardDetailItem] = useState<BoardDetailItem>();
  const [fileItems, setFileItems] = useState<FileItem[]>([]);
  const [commentItems, setCommentItems] = useState<commentItem[]>([]);

  const [commentWriter, setCommentWriter] = useState<string>("");
  const [commentContent, setCommentContent] = useState<string>("");

  // 댓글 작성자칸 참조 상태
  const commentWriterRef = useRef<HTMLTextAreaElement | null>(null);

  // 댓글 내용 참조상태
  const commentContentRef = useRef<HTMLTextAreaElement | null>(null);

  //
  const navigate = useNavigate();

  useEffect(() => {
    getBoardDetailRequest(Number(boardId)).then(getBoardDetailResponse);
  }, [boardId]);

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

  // function: 댓글 상자를 댓글이 많을 수록 길이를 늘려주는 함수
  const onCommentContentChangeHandler: ChangeEventHandler<
    HTMLTextAreaElement
  > = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    if (!commentContentRef.current) return;
    // 댓글 상자의 상하 길이를 늘려줌
    commentContentRef.current.style.height = "auto";
    commentContentRef.current.style.height = `${commentContentRef.current.scrollHeight}px`; // 타이핑하면 스크롤이 생기지 않고 상자가 길어지게 하도록

    setCommentContent(value);
  };

  // function: 제출 버튼 클릭시 실행할 함수
  const onCommentSubmitButtonClickHandler = () => {
    // validation check TODO

    const writer = commentWriterRef.current?.value;
    const content = commentContentRef.current?.value;
    console.log(content);
    console.log(writer);
    console.log(boardId);

    if (!writer) return;
    if (!boardId) return;
    if (!content) return;

    const postCommentRequestDto: PostCommentRequestDTO = {
      boardId: Number(boardId),
      writer,
      content,
    };

    postCommentRequest(postCommentRequestDto).then(postCommentResponse);
  };

  const postCommentResponse = (
    responseBody: PostCommentResponseDTO | ResponseDTO | null
  ) => {
    if (!responseBody) return;

    const { code } = responseBody;
    if (code === "DBE") alert("데이터베이스 오류입니다.");
    if (code === "VF") alert("입력값 제한 오류입니다.");
    if (code !== "SU") return;

    const { boardId } = responseBody as PostCommentResponseDTO;
    navigate(READ_PATH(String(boardId)));
  };

  return (
    <div className="max-w-auto mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">게시판 - 보기</h1>
      {boardDetailItem && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <div className="flex flex-row">
            <div className="text-gray-600 basis-1/2">
              <span className="font-medium "></span>
              {boardDetailItem.writer}
            </div>
            <div className="text-gray-600 basis-1/4">
              <span className="font-medium">등록일시:</span>{" "}
              {formatDate(boardDetailItem.regDate)}
            </div>
            <div className="text-gray-600 basis-1/4">
              <span className="font-medium">수정일시:</span>{" "}
              {formatDate(boardDetailItem.updateDate)}
            </div>
          </div>

          <div className="flex flex-row justify-between">
            <div>
              <div className="text-gray-600 mr-5 font-medium flex flex-row">
                <div className="font-medium pr-5">
                  {"[ "}
                  {boardDetailItem.category}
                  {" ]"}
                </div>
                <div className="text-lg font-semibold text-gray-800">
                  {boardDetailItem.title}
                </div>
              </div>
            </div>

            <div className="">조회수: {boardDetailItem.views} </div>
          </div>

          <div className="border-t border-gray-500"></div>
          <div className="text-gray-800">
            <p>{boardDetailItem.content}</p>
          </div>
        </div>
      )}
      {fileItems.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            첨부 파일
          </h2>
          {fileItems.map((file: FileItem) => (
            <div
              key={file.fileId}
              className="border-b border-gray-200 py-2  flex flex-row space-x-5"
            >
              <a
                href={`http://localhost:8080/download.do?id=${file.fileId}`}
                className="text-blue-600 hover:underline"
              >
                {file.orgName}
              </a>
              <div className="text-gray-600 text-sm">{file.byteSize} bytes</div>
              <div className="text-gray-600 text-sm">{file.attachType}</div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">댓글</h2>
        {commentItems.map((comment: commentItem) => (
          <div
            key={comment.commentId}
            className="border-b border-gray-200 pb-4 mb-4"
          >
            <div className="text-gray-800 font-medium">{comment.writer}</div>
            <div className="text-gray-600 text-sm mb-2">
              {formatDate(comment.regDate)}
            </div>
            <div className="text-gray-800">{comment.content}</div>
          </div>
        ))}
        <div>
          <textarea
            ref={commentWriterRef}
            maxLength={4}
            className="p-2.5 w-20 h-1 resize-none overflow-hidden h-10"
            placeholder="작성자"
            defaultValue={"익게이"}
          ></textarea>
          <div className="flex flex-row ">
            <textarea
              ref={commentContentRef}
              onChange={onCommentContentChangeHandler}
              className="p-2.5 w-full resize-none overflow-hidden "
              placeholder="댓글을 입력해 주세요."
            ></textarea>
            <button onClick={onCommentSubmitButtonClickHandler}>등록</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
