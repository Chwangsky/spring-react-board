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
import { PostBoardResponseDTO } from "../../apis/response/write";
import { useNavigate } from "react-router-dom";
import { LIST_PATH, READ_PATH } from "../../constant";

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
  const [fileInputs, setFileInputs] = useState<number[]>([1, 2, 3]);

  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const fileRefs = useRef<(HTMLInputElement | null)[]>([]); //STUDY: 배열타입 ref 지정 시 타입 주의!

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
    const minHeight = Math.max(contentRef.current.scrollHeight, 50 * 4);
    contentRef.current.style.height = `${minHeight}px`; // 타이핑하면 스크롤이 생기지 않고 상자가 길어지게 하도록

    setContent(value);
  };

  /**
   * STUDY: multipart와 함께 json파일을 보내는 방법
   * 문제상황 : Spring Controller에서는 PostBoardRequestDTO로, 다른 타입들과 함께 Multipart[] 타입이 존재하는 상황.
   * 1. 기존의 interface와 type으로 File[] 타입으로 묶어서 보내는 방법을 쓰면, 415 Unsupported Media Type이 나온다.
   *  File 객체는 바이너리 객체로, JSON타입으로 직렬화 할 수 없기 때문
   * 2. 결국 모든 데이터를 multipart 타입으로 전송해야 한다.
   * 3. request로는 FormData를 이용한다. axios는 FormData타입을 자동으로 multipart 타입으로 전송한다.
   *  FormData는 파일과 같은 바이너리 데이터를 다루면서도 텍스트 데이터도 함께 전송할 수 있는 구조를 제공한다.
   * 
   * 4. Controller에서는 다음과 같이 @RequestPart로, name을 구분해서 받는다.
    * @PostMapping("/upload")
        public ResponseEntity<?> uploadFiles(
            @RequestPart("data") PostBoardRequestDTO data,
            @RequestPart("files") MultipartFile[] files) {
            // 파일 및 JSON 데이터 처리
        }
   *
   */
  const onPostButtonClickHandler = async () => {
    if (categoryId == null) {
      alert("카테고리를 선택해 주세요");
      return;
    }

    const formData = new FormData();

    // JSON 데이터를 문자열로 변환하여 추가
    const data = {
      categoryId: categoryId,
      writer: writer,
      password: password,
      title: title,
      content: content,
    };

    formData.append(
      "data",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    // 파일 추가
    fileRefs.current.forEach((fileRef) => {
      if (fileRef && fileRef.files) {
        Array.from(fileRef.files).forEach((file) => {
          formData.append("files", file);
        });
      }
    });

    postBoardRequest(formData).then(postBoardResponse);
  };

  const postBoardResponse = (
    responseBody: null | ResponseDTO | PostBoardResponseDTO
  ) => {
    if (responseBody === null) return;
    const { code } = responseBody;
    if (code === "DBE") alert("데이터베이스 오류입니다.");
    if (code === "FE") alert("형식 오류입니다.");
    if (code === "PTL") alert("업로드할 파일이 너무 큽니다.");
    if (code !== "SU") return;
    const { boardId } = responseBody as PostBoardResponseDTO;
    alert("게시글이 등록되었습니다.");

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
              {/*STUDY: ref={fileRefs[idx]} doesn't work */}
              {fileInputs.map((input, idx) => (
                <input
                  ref={(el) => (fileRefs.current[idx] = el)}
                  key={idx}
                  type="file"
                  className="block mb-2 w-full"
                />
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
        <button
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          onClick={() => navigate(LIST_PATH())}
        >
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
