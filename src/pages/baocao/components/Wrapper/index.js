import React, { } from "react";
import { Main } from "./styled";

const Index = ({
  title = "Báo cáo",
  children,
  ...props
}) => {
  return (
    <Main>
      <div className="title">
        {title}
      </div>
      <div className="container">
        {children}
      </div>
    </Main>
  )
}

export default Index;