export const MAIN_PATH = () => "/";
export const LIST_PATH = () => "/boards/free/list";
export const READ_PATH = (boardId: string) => `/boards/free/views/${boardId}`;
export const WRITE_PATH = () => `/boards/free/write`;
export const MODIFY_PATH = (boardId: string) =>
  `/boards/free/modify/${boardId}`;
