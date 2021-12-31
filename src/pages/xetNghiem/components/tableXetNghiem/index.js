import { Row } from "antd";
import React from "react";
import { MainTableXN, ContentTable } from "./styled";

function Index(props) {
  const { contentHeaderLeft = "", contentHeaderRight = null } = props;
  return (
    <MainTableXN styleMargin={props.styleMargin}>
      <Row className="header-table">
        <div className="header-table__left">{contentHeaderLeft}</div>
        <div className="header-table__right">{contentHeaderRight}</div>
      </Row>
      <ContentTable>{props.children}</ContentTable>
    </MainTableXN>
  );
}

export default Index;
