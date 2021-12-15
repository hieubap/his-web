import React from "react";
import { Row } from "antd";
import { Main } from "./styled";
import { useHistory } from "react-router-dom";

const Index = (props) => {
  const history = useHistory();
  const gotoPage = (value) => {
    history.push(value);
  };
  const link = props.title?.toLowerCase().unsignText().split(" ").join("-");
  return (
    <Main>
      <div className="container">
        <Row className="home">
          <div className="home-breadcrumbs">
            <span onClick={() => gotoPage("/")}>Trang chủ</span>
            <span>/</span>
            <label onClick={() => gotoPage(`/${(link && link) || ""}`)}>
              {props.title}
            </label>
          </div>
        </Row>
        <Row>{props.children}</Row>
      </div>
    </Main>
  );
};

export default Index;
