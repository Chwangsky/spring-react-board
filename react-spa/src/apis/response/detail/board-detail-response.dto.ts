import BoardDetailItem from "../../../types/interface/board-detail-item.interface";
import commentItem from "../../../types/interface/comment-item.interface";
import FileItem from "../../../types/interface/file-item.interface";
import ResponseDTO from "../response.dto";

export default interface BoardDetailResponseDTO extends ResponseDTO {
    boardDetailItem: BoardDetailItem;
    commentItems: commentItem[];
    fileItems: FileItem[];
}