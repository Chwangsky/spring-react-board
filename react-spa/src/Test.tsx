import React, { ChangeEvent, useState } from "react";

const DateInputForm: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Select a Date</h2>

      <div className="flex flex-col items-center">
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Choose a date:
        </label>

        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="p-2 border border-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        {selectedDate && (
          <p className="mt-4 text-blue-600">Selected Date: {selectedDate}</p>
        )}
      </div>
      <Dropdown />
    </div>
  );
};

const Dropdown = () => {
  // 선택한 옵션을 저장하는 상태
  const [selectedOption, setSelectedOption] = useState("");

  // 드롭다운이 변경될 때 호출되는 함수
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <label
        htmlFor="dropdown"
        className="block text-sm font-medium text-gray-700"
      >
        Select an option
      </label>
      <select
        id="dropdown"
        name="dropdown"
        value={selectedOption}
        onChange={handleChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="">Please select</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>

      {/* 선택한 옵션을 화면에 표시 */}
      <div className="mt-4 text-gray-700">
        {selectedOption
          ? `You selected: ${selectedOption}`
          : "No option selected"}
      </div>
    </div>
  );
};

export default DateInputForm;
