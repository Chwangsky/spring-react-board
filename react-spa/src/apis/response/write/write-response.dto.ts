import { CategoryIdNameItem } from "../../../types/interface";
import ResponseDTO from "../response.dto";

export interface GetBoardWriteResponseDTO extends ResponseDTO {
    categoryIdNameItems: CategoryIdNameItem[];
}