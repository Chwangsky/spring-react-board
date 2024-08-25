import {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUpdateRequest, postUpdateRequest } from "../../apis";
import ResponseDTO from "../../apis/response/response.dto";
import {
  GetUpdateResponseDTO,
  PostUpdateResponseDTO,
} from "../../apis/response/update";
import { LIST_PATH, READ_PATH } from "../../constant";
import { FileItem } from "../../types/interface";
import { formatDate } from "../../util/formatDate";

const BoardUpdate = () => {
  const [category, setCategory] = useState<string>("");
  const [regDate, setRegDate] = useState<string>("");
  const [updateDate, setUpdateDate] = useState<string>("");
  const [views, setViews] = useState<number>(0);
  const [writer, setWriter] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [fileItems, setFileItems] = useState<FileItem[]>([]);

  const [fileIdsToDelete, setFileIdsToDelete] = useState<number[]>([]);

  const titleRef = useRef<HTMLInputElement | null>(null);
  const writerRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const [fileInputs, setFileInputs] = useState<number[]>([]);
  const fileToUploadRefs = useRef<(HTMLInputElement | null)[]>([]); //STUDY: 배열타입 ref 지정 시 타입 주의!

  const navigate = useNavigate();

  const { boardId } = useParams();

  useEffect(() => {
    getUpdateRequest(Number(boardId)).then(getUpdateResponse);
  }, []);

  const getUpdateResponse = (
    responseBody: GetUpdateResponseDTO | ResponseDTO | null
  ) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === "DBE") alert("데이터베이스 에러입니다.");
    if (code !== "SU") return;
    const {
      boardId,
      category,
      regDate,
      updateDate,
      views,
      writer,
      title,
      content,
      fileItems,
    } = responseBody as GetUpdateResponseDTO;

    setCategory(category);
    setRegDate(regDate);
    setUpdateDate(updateDate);
    setViews(views);
    setWriter(writer);
    setTitle(title);
    setContent(content);
    setFileItems(fileItems);
  };

  const addFileInput = () => {
    if (fileItems.length + fileInputs.length < 10) {
      setFileInputs([...fileInputs, fileInputs.length + 1]);
    } else {
      alert("최대 10개의 파일까지 추가할 수 있습니다.");
    }
  };

  // const addFileInput = () => {
  //   if (fileInputs.length < 10) {
  //     setFileInputs([...fileInputs, fileInputs.length + 1]);
  //   }
  // };

  // function: 내용 textarea의 높이를 자동으로 맞춰주는 함수
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

  const onFileDeleteButtonClickHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
    fileId: number
  ) => {
    //  STUDY: fileDiv.style.display = "none" 보다는 filter를 활용한 상태 update를 활용하자.
    setFileItems((prevItems) =>
      prevItems.filter((file) => file.fileId !== fileId)
    );
    setFileIdsToDelete((prev) => [...prev, fileId]);
  };

  const onPostButtonClickHandler = async () => {
    const formData = new FormData();

    //TODO VALIDATION CHECK in front
    const writer = writerRef.current?.value;
    const password = passwordRef.current?.value;
    const title = titleRef.current?.value;
    const content = contentRef.current?.value;

    // JSON 데이터를 문자열로 변환하여 추가
    const data = {
      boardId: Number(boardId),
      writer: writer,
      password: password,
      title: title,
      content: content,
      filesToRemove: fileIdsToDelete,
    };

    formData.append(
      "data",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    // 파일 추가
    fileToUploadRefs.current.forEach((fileRef) => {
      if (fileRef && fileRef.files) {
        Array.from(fileRef.files).forEach((file) => {
          formData.append("files", file);
        });
      }
    });

    postUpdateRequest(formData).then(postUpdateResponse);
  };

  const postUpdateResponse = (
    responseBody: null | ResponseDTO | PostUpdateResponseDTO
  ) => {
    if (responseBody === null) return;
    const { code } = responseBody;
    if (code === "DBE") alert("데이터베이스 오류입니다.");
    if (code === "FE") alert("형식 오류입니다.");
    if (code === "PTL") alert("업로드할 파일이 너무 큽니다.");
    if (code !== "SU") return;
    const { boardId } = responseBody as PostUpdateResponseDTO;
    alert("게시글이 등록되었습니다.");

    navigate(READ_PATH(String(boardId)));
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">게시판 - 수정</h1>

      <table className="table-auto w-full mb-6">
        <tbody>
          {/* Category */}
          <tr>
            <td className="font-bold bg-gray-100 p-4 text-center border">
              카테고리
            </td>
            <td className="border">{category}</td>
          </tr>

          {/* regDate */}
          <tr>
            <td className="font-bold bg-gray-100 p-4 text-center border">
              등록일
            </td>
            <td className="border">{formatDate(regDate)}</td>
          </tr>

          {/* updateDate */}
          <tr>
            <td className="font-bold bg-gray-100 p-4 text-center border">
              수정일
            </td>
            <td className="border">{formatDate(updateDate)}</td>
          </tr>

          {/* Category Dropdown */}
          <tr>
            <td className="font-bold bg-gray-100 p-4 text-center border">
              조회수
            </td>
            <td className="border">{views}</td>
          </tr>

          {/* Writer */}
          <tr>
            <td className="font-bold bg-gray-100 p-4 text-center border">
              작성자
            </td>
            <td className="border">
              <input
                ref={writerRef}
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
                ref={passwordRef}
                type="password"
                className="border rounded px-4 py-2 w-full"
                placeholder="비밀번호"
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
                ref={titleRef}
                defaultValue={title}
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
                defaultValue={content}
                onChange={onContentChangeHandler}
                className="border rounded px-4 py-2 w-full h-50"
                style={{ height: "200px" }}
                placeholder="내용"
              />
            </td>
          </tr>
          <tr>
            <td className="font-bold bg-gray-100 p-4 text-center border">
              기존 첨부 파일
            </td>
            <td>
              {fileItems.map((file: FileItem) => (
                <div
                  key={file.fileId}
                  id={"file-" + String(file.fileId)}
                  className="border-b border-gray-200 py-2  flex flex-row justify-between align-center "
                >
                  <div>
                    <a
                      href={`http://localhost:8080/download.do?id=${file.fileId}`}
                      className="text-blue-600 hover:underline"
                    >
                      {file.orgName}
                    </a>
                    <div className="text-gray-600 text-sm">
                      {file.byteSize} bytes
                    </div>
                    <div className="text-gray-400 text-xs">
                      {file.attachType}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <button
                      className="bg-slate-400"
                      onClick={(e) =>
                        onFileDeleteButtonClickHandler(e, file.fileId)
                      }
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </td>
          </tr>
          {/* File Attachments */}
          <tr>
            <td className="font-bold bg-gray-100 p-4 text-center border">
              첨부 파일 추가
            </td>
            <td className="border">
              {/*STUDY: ref={fileRefs[idx]} doesn't work */}
              {fileInputs.map((input, idx) => (
                <input
                  ref={(el) => (fileToUploadRefs.current[idx] = el)}
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

export default BoardUpdate;
