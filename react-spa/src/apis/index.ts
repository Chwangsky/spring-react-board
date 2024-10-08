import axios from "axios";
import { BoardListResponseDTO } from "./response/list";
import ResponseDTO from "./response/response.dto";
import { BoardDetailResponseDTO, PostCommentResponseDTO } from "./response/detail";
import { BoardListRequestDTO, DeleteRequestDTO, PostCommentRequestDTO } from "./request";
import { GetBoardWriteResponseDTO } from "./response/write/write-response.dto";
import { PostBoardResponseDTO } from "./response/write";
import { GetUpdateResponseDTO, PostUpdateResponseDTO } from "./response/update";

const DOMAIN = 'http://localhost:8080';
const LIST_URL = () => `${DOMAIN}/boards/free/list`;
const VIEW_URL = (boardId: number) => `${DOMAIN}/boards/free/views/${boardId}`;
const COMMENT_URL = () => `${DOMAIN}/boards/free/views`;
const DELETE_URL = () => `${DOMAIN}/boards/free/delete`;
const WRITE_URL = () => `${DOMAIN}/boards/free/write`;
const UPDATE_URL = () => `${DOMAIN}/boards/free/modify`;

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

export const deleteRequest = async (requestBody: DeleteRequestDTO) => {
    const result = await axios.delete(DELETE_URL(), {
        data: requestBody
    })
    .then(response => {
        const responseBody: ResponseDTO = response.data;
        return responseBody;
    })
    .catch(error => {
        if (!error.response) return null;
        const responseBody: ResponseDTO = error.response.data;
        return responseBody;
    })
    return result;
}

export const getWriteRequest = async () => {
    const result = await axios.get(WRITE_URL())
        .then(
            response => {
                const responseBody: GetBoardWriteResponseDTO = response.data;
                return responseBody;
            }
        )
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDTO = error.response.data;
            return responseBody;
        })
    return result;        
}

export const postBoardRequest = async (formData: FormData) => {
    const result = await axios.post(WRITE_URL(), formData)
        .then(response => {
            const responseBody: PostBoardResponseDTO = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDTO = error.response.data;
            return responseBody;
        })
    return result;
}

export const getUpdateRequest = async (boardId : number) => {
    const result = await axios.get(UPDATE_URL(), {
            params: {
                boardId,
            }
        })
        .then(
            response => {
                const responseBody: GetUpdateResponseDTO = response.data;
                return responseBody;
            }
        )
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDTO = error.response.data;
            return responseBody;
        })
    return result;        
}

export const postUpdateRequest = async (formData: FormData) => {
    const result = axios.post(UPDATE_URL(), formData)
        .then(response => {
            const responseBody: PostUpdateResponseDTO = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDTO = error.response.data;
            return responseBody;
        })
return result;
}