import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Container from "./layouts/Container";
import { LIST_PATH, MODIFY_PATH, READ_PATH, WRITE_PATH } from "./constant";
import Test from "./Test";
import BoardList from "./views/List";
import BingoGame from "./views/bingo";
import BoardDetail from "./views/Detail";

function App() {
  return (
    <Routes>
      <Route element={<Container />}>
        <Route path={"/"} element={<Test />} />
        <Route path={LIST_PATH()} element={<BoardList />} />
        <Route path={READ_PATH(":boardId")} element={<BoardDetail />} />
        <Route path={WRITE_PATH()} />
        <Route path={MODIFY_PATH(":boardId")} />
        <Route path={"/test"} element={<BingoGame />} />
      </Route>
    </Routes>
  );
}

export default App;
