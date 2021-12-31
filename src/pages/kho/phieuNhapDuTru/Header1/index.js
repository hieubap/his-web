import React, { memo } from "react";
import { Main } from "./styled";
const Header = ({ title, children, rightInfo }) => {
  return (
    <Main className="header">
      <div className="title">{title}</div>
      <div className="content">{children}</div>
      <div className="more-info">{rightInfo}</div>
    </Main>
  );
};
export default memo(Header);
