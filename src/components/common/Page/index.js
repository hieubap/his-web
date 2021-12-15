import React from "react";
import { Main } from "./styled";
import { Card } from "antd";
const Page = (props) => {
  let child = () => {
    return (
      <>
        {props.header && <div className="header">{props.header}</div>}
        <div className="page-body">{props.children}</div>
      </>
    );
  };
  if (props.showPage === false) return child(); 
  return (
    <Main {...props}>
      <div className="layout-body">
        <div className="layout-middle">
          <Card>{child()}</Card>
        </div>
      </div>
    </Main>
  );
};

export default Page;
