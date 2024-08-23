import {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { CategoryIdNameItem } from "../../types/interface";
import { getWriteRequest, postBoardRequest } from "../../apis";
import ResponseDTO from "../../apis/response/response.dto";
import { GetBoardWriteResponseDTO } from "../../apis/response/write/write-response.dto";
import { PostBoardRequestDTO } from "../../apis/request";
import { PostBoardResponseDTO } from "../../apis/response/write";
import { useNavigate } from "react-router-dom";
import { READ_PATH } from "../../constant";

const BoardWrite = () => {
  const [categoryIdNameItems, setCategoryIdNameItems] = useState<
    CategoryIdNameItem[]
  >([]);

  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [fileInputs, setFileInputs] = useState<number[]>([1, 2, 3]);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const navigate = useNavigate();

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

  const addFileInput = () => {
    if (fileInputs.length < 10) {
      setFileInputs([...fileInputs, fileInputs.length + 1]);
    }
  };

  // function: 댓글 상자의 길이를 자동으로 맞춰주는 함수
  const onContentChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = e.target;

    if (!contentRef.current) return;
    // 댓글 상자의 상하 길이를 늘려줌
    contentRef.current.style.height = "auto";
    const minheight = Math.max(contentRef.current.scrollHeight, 50 * 4);
    contentRef.current.style.height = `${minheight}px`; // 타이핑하면 스크롤이 생기지 않고 상자가 길어지게 하도록

    setContent(value);
  };

  const onPostButtonClickHandler = async () => {
    if (categoryId == null) {
      alert("카테고리를 선택해 주세요");
      return;
    }

    const requestBody: PostBoardRequestDTO = {
      categoryId,
      writer,
      password,
      title,
      content,
      files, // We send files directly as an array of File objects
    };

    postBoardRequest(requestBody).then(postBoardResponse);
  };

  const postBoardResponse = (
    responseBody: null | ResponseDTO | PostBoardResponseDTO
  ) => {
    if (responseBody === null) return;
    const { code } = responseBody;
    if (code === "DBE") alert("데이터베이스 오류입니다.");
    if (code === "FE") alert("형식 오류입니다.");
    if (code !== "SU") return;
    const { boardId } = responseBody as PostBoardResponseDTO;
    alert("게시글이 등록되었습니다.");
    console.log(boardId);

    navigate(READ_PATH(String(boardId)));
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">게시판 - 등록</h1>

      <table className="table-auto w-full mb-6">
        <tbody>
          {/* Category Dropdown */}
          <tr>
            <td className="font-bold bg-gray-100 p-4 text-center border">
              카테고리
            </td>
            <td className="border">
              <select
                value={categoryId || ""}
                onChange={(e) =>
                  setCategoryId(e.target.value ? Number(e.target.value) : null)
                }
                className="border rounded px-4 py-2 w-full"
              >
                <option value="">전체</option>
                {categoryIdNameItems.map((item) => (
                  <option key={item.categoryId} value={item.categoryId}>
                    {item.name}
                  </option>
                ))}
              </select>
            </td>
          </tr>

          {/* Writer */}
          <tr>
            <td className="font-bold bg-gray-100 p-4 text-center border">
              작성자
            </td>
            <td className="border">
              <input
                type="text"
                value={writer}
                onChange={(e) => setWriter(e.target.value)}
                className="border rounded px-4 py-2 w-full"
                placeholder="작성자"
              />
            </td>
          </tr>

          {/* Password */}
          <tr>
            <td className="font-bold bg-gray-100 p-4 text-center border">
              비밀번호
            </td>
            <td className="border flex flex-row space-x-5">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded px-4 py-2 w-full"
                placeholder="비밀번호"
              />
              <input
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="border rounded px-4 py-2 w-full"
                placeholder="비밀번호 확인"
              />
            </td>
          </tr>

          {/* Title */}
          <tr>
            <td className="font-bold bg-gray-100 p-4 text-center border">
              제목
            </td>
            <td className="border">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded px-4 py-2 w-full"
                placeholder="제목"
              />
            </td>
          </tr>

          {/* Content */}
          <tr>
            <td className="font-bold bg-gray-100 p-4 text-center border">
              내용
            </td>
            <td className="border">
              <textarea
                ref={contentRef}
                value={content}
                onChange={onContentChangeHandler}
                className="border rounded px-4 py-2 w-full h-50"
                placeholder="내용"
              />
            </td>
          </tr>

          {/* File Attachments */}
          <tr>
            <td className="font-bold bg-gray-100 p-4 text-center border">
              파일첨부
            </td>
            <td className="border">
              {fileInputs.map((input, index) => (
                <input key={index} type="file" className="block mb-2 w-full" />
              ))}
              {fileInputs.length < 10 && (
                <button
                  type="button"
                  onClick={addFileInput}
                  className="text-blue-500 hover:underline mt-2"
                >
                  파일 추가
                </button>
              )}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Action Buttons */}
      <div className="flex flex-row justify-between my-10">
        <button className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">
          취소
        </button>
        <button
          onClick={onPostButtonClickHandler}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          저장
        </button>
      </div>
    </>
  );
};

export default BoardWrite;
