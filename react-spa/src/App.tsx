import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Container from "./layouts/Container";
import { LIST_PATH, MODIFY_PATH, READ_PATH, WRITE_PATH } from "./constant";
import Test from "./Test";
import BoardList from "./views/List";

function App() {
  return (
    <Routes>
      <Route element={<Container />}>
        <Route path={"/"} element={<Test />} />
        <Route path={LIST_PATH()} element={<BoardList />} />
        <Route path={READ_PATH(":boardId")} />
        <Route path={WRITE_PATH()} />
        <Route path={MODIFY_PATH(":boardId")} />
      </Route>
    </Routes>
  );
}

export default App;
