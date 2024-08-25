import {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import {
  deleteRequest,
  getBoardDetailRequest,
  postCommentRequest,
} from "../../apis";
import {
  BoardDetailResponseDTO,
  PostCommentResponseDTO,
} from "../../apis/response/detail";
import ResponseDTO from "../../apis/response/response.dto";
import { formatDate } from "../../util/formatDate";
import { LIST_PATH, MODIFY_PATH, READ_PATH } from "../../constant";
import { DeleteRequestDTO, PostCommentRequestDTO } from "../../apis/request";
import { BoardDetailItem, CommentItem, FileItem } from "../../types/interface";

const BoardDetail = () => {
  const { boardId } = useParams();
  const [boardDetailItem, setBoardDetailItem] = useState<BoardDetailItem>();
  const [fileItems, setFileItems] = useState<FileItem[]>([]);
  const [commentItems, setCommentItems] = useState<CommentItem[]>([]);

  const [commentWriter, setCommentWriter] = useState<string>("");
  const [commentContent, setCommentContent] = useState<string>("");

  // ref: 댓글 작성자칸 참조 상태
  const commentWriterRef = useRef<HTMLTextAreaElement | null>(null);

  // ref: 댓글 내용 참조상태
  const commentContentRef = useRef<HTMLTextAreaElement | null>(null);

  // 모달창 상태
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  // ref: 모달창의 비밀번호 참조상태
  const passwordRef = useRef<HTMLInputElement | null>(null);

  // 네비게이션 함수
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

  // function: 댓글 상자의 길이를 자동으로 맞춰주는 함수
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
    // TODO validation check

    const writer = commentWriterRef.current?.value;
    const content = commentContentRef.current?.value;

    if (!writer) return;
    if (!boardId) return;
    if (!content) return;

    const postCommentRequestDto: PostCommentRequestDTO = {
      boardId: Number(boardId),
      writer,
      content,
    };
    console.log(postCommentRequestDto);

    postCommentRequest(postCommentRequestDto).then(postCommentResponse);
  };

  const postCommentResponse = (
    responseBody: PostCommentResponseDTO | ResponseDTO | null
  ) => {
    if (!responseBody) return;

    const { code } = responseBody;
    if (code === "DBE") alert("데이터베이스 오류입니다.");
    if (code === "FE") alert("입력값 제한 오류입니다.");
    if (code !== "SU") return;

    const { boardId } = responseBody as PostCommentResponseDTO;
    navigate(0);
  };

  const onDeleteButtonClickHandler = () => {
    setModalVisible(true);
  };

  const onDeleteConfirmButtonClickhandler = () => {
    if (!passwordRef.current) return;
    const { value } = passwordRef.current;
    const password = value;
    const numBoardId = Number(boardId);
    const requestBody: DeleteRequestDTO = {
      boardId: numBoardId,
      password,
    };
    deleteRequest(requestBody).then(deleteResponse);
  };

  const deleteResponse = (result: ResponseDTO | null) => {
    if (!result) return;
    const { code } = result;
    if (code === "DBE") alert("데이터베이스 오류입니다.");
    if (code === "WP") alert("비밀번호가 일치하지 않습니다.");
    if (code !== "SU") return;
    navigate(LIST_PATH());
  };

  // component: 모달창 컴포넌트 //
  const Modal = () => {
    return (
      <>
        {/* 모달 오버레이 */}
        {isModalVisible && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <p className="mb-4">
                <label
                  className="text-xl font-semibold mr-10"
                  htmlFor="password"
                >
                  비밀번호
                </label>
                <input
                  ref={passwordRef}
                  id="password"
                  type="text"
                  placeholder="비밀번호를 입력해 주세요"
                />
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setModalVisible(false)}
                  className="bg-red-300 text-black px-4 py-2 rounded hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  취소
                </button>
                <button onClick={onDeleteConfirmButtonClickhandler}>
                  확인
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
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
          <div className="text-gray-800 p-10">
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

      {/* 댓글 박스 */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">댓글</h2>
        {commentItems.map((comment: CommentItem) => (
          <div
            key={comment.commentId}
            className="border-b border-gray-200 pb-4 mb-4"
          >
            <div className="text-gray-600 text-sm mb-2">
              {formatDate(comment.regDate)}
            </div>
            <div className="text-gray-800 font-medium h-20">
              {comment.writer}
            </div>
            <div className="text-gray-800">{comment.content}</div>
          </div>
        ))}
        {/* 댓글 입력 창 */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <textarea
              ref={commentWriterRef}
              maxLength={4}
              className="p-2.5 w-40 h-10 resize-none overflow-hidden border border-gray-300 rounded"
              placeholder="작성자"
              defaultValue={"익명"}
            ></textarea>
          </div>
          <div className="flex flex-row items-start space-x-4">
            <textarea
              ref={commentContentRef}
              onChange={onCommentContentChangeHandler}
              className="p-2.5 w-full h-24 resize-none border border-gray-300 rounded"
              placeholder="댓글을 입력해 주세요."
            ></textarea>
            <button
              onClick={onCommentSubmitButtonClickHandler}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
            >
              등록
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={() => navigate(LIST_PATH())}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          목록
        </button>
        <button
          onClick={() => navigate(MODIFY_PATH(String(boardId)))}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          수정
        </button>
        <button
          onClick={onDeleteButtonClickHandler}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          삭제
        </button>
      </div>
      <Modal />
    </div>
  );
};

export default BoardDetail;
