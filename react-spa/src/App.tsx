import { Route, Routes } from "react-router-dom";
import "./App.css";
import { LIST_PATH, MODIFY_PATH, READ_PATH, WRITE_PATH } from "./constant";
import Container from "./layouts/Container";
import Test from "./Test";
import BingoGame from "./views/bingo";
import BoardDetail from "./views/Detail";
import BoardList from "./views/List";
import BoardWrite from "./views/Write";

function App() {
  return (
    <Routes>
      <Route element={<Container />}>
        <Route path={"/"} element={<Test />} />
        <Route path={LIST_PATH()} element={<BoardList />} />
        <Route path={READ_PATH(":boardId")} element={<BoardDetail />} />
        <Route path={WRITE_PATH()} element={<BoardWrite />} />
        <Route path={MODIFY_PATH(":boardId")} />
        <Route path={"/test"} element={<BingoGame />} />
      </Route>
    </Routes>
  );
}

export default App;
