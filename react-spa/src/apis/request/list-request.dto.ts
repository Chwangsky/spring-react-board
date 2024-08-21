export interface BoardListRequestDTO {
  regDateStart: string;
  regDateEnd: string;
  categoryId: number | null;
  keyword: string | null;
  page: number | null;
}
