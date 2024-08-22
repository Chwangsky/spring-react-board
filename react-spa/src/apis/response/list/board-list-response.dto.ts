import { BoardListItem, CategoryIdNameItem } from "../../../types/interface";
import ResponseDTO from "../response.dto";
import PaginationItem from "../../../types/interface/pagination-item";

export default interface BoardListResponseDTO extends ResponseDTO {
    totalCount: number;
    boardListItems: BoardListItem[];
    categoryIdNameItems: CategoryIdNameItem[];
    paginationItem: PaginationItem;

    regDateStart: string;
    regDateEnd: string;
    keyword: string;
    categoryId: number;
}