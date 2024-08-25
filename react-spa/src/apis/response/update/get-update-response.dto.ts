import { FileItem } from "../../../types/interface";
import ResponseDTO from "../response.dto";

export interface GetUpdateResponseDTO extends ResponseDTO {
    boardId: number;
    category: string;
    regDate: string;
    updateDate: string;
    views: number;
    writer: string;
    title: string;
    content: string;
    fileItems: FileItem[];
}

