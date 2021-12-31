import React, { } from "react";
import { Main } from "./styled";

const Index = ({
  title = "Báo cáo",
  children,
  action,
  ...props
}) => {
  return (
    <Main>
      <div className="title">
        <div className="left">{title}</div>
        <div className="right">{action}</div>
      </div>
      <div className="container">
        {children}
      </div>
    </Main>
  )
}

export default Index;