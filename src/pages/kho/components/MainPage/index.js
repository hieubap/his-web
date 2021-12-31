import React from "react";
import { Main } from "./styled";

const MainPage = ({ title, children, ...props }) => {
  return (
    <Main className="main-page">
      <div className="title-category">{title}</div>
      {children}
    </Main>
  );
};

export default MainPage;
