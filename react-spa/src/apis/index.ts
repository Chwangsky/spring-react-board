import axios from "axios";
import { BoardListResponseDTO } from "./response/list";
import ResponseDTO from "./response/response.dto";
import { BoardListRequestDTO } from "./request/list-request.dto";
import { BoardDetailResponseDTO, PostCommentResponseDTO } from "./response/detail";
import PostCommentRequestDTO from "./request/post-comment.request.dto";

const DOMAIN = 'http://localhost:8080';
const LIST_URL = () => `${DOMAIN}/boards/free/list`;
const VIEW_URL = (boardId: number) => `${DOMAIN}/boards/free/views/${boardId}`;
const COMMENT_URL = () => `${DOMAIN}/boards/free/views`;

export const getBoardListRequest = async (requestBody: BoardListRequestDTO) => {
    const result = await axios.get(LIST_URL(), { params: requestBody })
        .then(response => {
            const responseBody: BoardListResponseDTO = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDTO = error.response.data;
            return responseBody;
        });
    return result;
}

export const getBoardDetailRequest = async (boardId: number) => {
    const result = await axios.get(VIEW_URL(boardId))
        .then(response => {
            const responseBody: BoardDetailResponseDTO = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDTO = error.response.data;
            return responseBody;
        });
    return result;
}

export const postCommentRequest = async (requestBody: PostCommentRequestDTO) => {
    console.log(requestBody);
    const result = await axios.post(COMMENT_URL(), requestBody)
        .then(response => {
            const responseBody: PostCommentResponseDTO = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDTO = error.response.data;
            return responseBody;
        })
    return result;
}

