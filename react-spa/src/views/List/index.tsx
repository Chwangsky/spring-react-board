import React, { ChangeEvent, useState } from "react";

const BoardList = () => {
  const regDateStart = useState<string | null>(null);

  const regDateEnd = useState<string | null>(null);

  const category = useState<number | null>(null);

  const keyword = useState<string | null>(null);

  const onSearchButtonClickHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    axios;
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-gray-800">자유게시판 - 목록</h1>
      <div>
        <div>등록일</div>
        {/* <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="p-2 border border-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="p-2 border border-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        /> */}
      </div>
      <button onClick={onSearchButtonClickHandler}>검색</button>
    </>
  );
};

export default BoardList;
