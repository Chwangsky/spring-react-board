import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

// BingoGame 컴포넌트 (부모 컴포넌트)
const BingoGame = () => {
  const player1Ref = useRef<BingoBoardHandle>(null);
  const player2Ref = useRef<BingoBoardHandle>(null);

  // 모든 빙고판을 리셋하는 함수
  const resetAllBoards = () => {
    player1Ref.current?.resetBoard();
    player2Ref.current?.resetBoard();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bingo Game</h1>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Player 1</h2>
        <PlayerBingoBoard ref={player1Ref} />
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Player 2</h2>
        <PlayerBingoBoard ref={player2Ref} />
      </div>
      <button
        onClick={resetAllBoards}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Reset All Boards
      </button>
    </div>
  );
};

export default BingoGame;

// 빙고판을 제어할 수 있는 메서드 정의 (인터페이스)
export interface BingoBoardHandle {
  resetBoard: () => void;
}

// PlayerBingoBoard 컴포넌트 (자식 컴포넌트)
const PlayerBingoBoard = forwardRef<BingoBoardHandle>((_, ref) => {
  const [board, setBoard] = useState<number[][]>(generateBingoBoard());
  const [marked, setMarked] = useState<boolean[][]>(
    Array.from({ length: 5 }, () => Array(5).fill(false)) // 5x5 false 행렬 생성
  );

  useImperativeHandle(ref, () => ({
    resetBoard() {
      setBoard(generateBingoBoard());
      setMarked(Array.from({ length: 5 }, () => Array(5).fill(false)));
    },
  }));

  // 셀 클릭 핸들러 (셀의 상태를 토글)
  const handleCellClick = (row: number, col: number) => {
    setMarked((prevMarked) => {
      const newMarked = prevMarked.map((r, rowIndex) =>
        r.map((cell, colIndex) =>
          rowIndex === row && colIndex === col ? !cell : cell
        )
      );
      return newMarked;
    });
  };

  // 빙고판 UI 렌더링
  return (
    <div className="w-full max-w-52 mx-auto grid grid-cols-5 gap-1">
      {board.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {row.map((number, colIndex) => (
            <div
              key={colIndex}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              className={`w-10 h-10 flex items-center justify-center cursor-pointer border border-black rounded ${
                marked[rowIndex][colIndex] ? "bg-green-300" : "bg-gray-300"
              }`}
            >
              {number}
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
});

// 빙고판을 생성하는 함수
function generateBingoBoard() {
  let numbers = Array.from({ length: 25 }, (_, i) => i + 1);
  numbers = numbers.sort(() => Math.random() - 0.5); // 무작위로 섞음
  return Array.from({ length: 5 }, (_, i) => numbers.slice(i * 5, i * 5 + 5)); // 5x5 행렬 생성
}
