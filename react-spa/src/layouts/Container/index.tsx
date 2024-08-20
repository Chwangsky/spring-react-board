import { Outlet } from "react-router-dom";
import Footer from "../Footer";

export default function Container() {
  //          state: 현재 페이지 path name 상태          /

  //          render: 컨테이너 레이아웃 헨더링          //
  return (
    <>
      <Outlet></Outlet>
      <Footer />
    </>
  );
}
