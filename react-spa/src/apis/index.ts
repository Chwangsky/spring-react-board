import axios from "axios";
import { BoardListResponseDTO } from "./response/list";
import ResponseDTO from "./response/response.dto";
import { BoardListRequestDTO } from "./request/list-request.dto";
import { BoardDetailResponseDTO } from "./response/detail";

const DOMAIN = 'http://localhost:8080';
const LIST_URL = () => `${DOMAIN}/boards/free/list`;
const VIEW_URL = (boardId: number) => `${DOMAIN}/boards/free/views/${boardId}`;

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

