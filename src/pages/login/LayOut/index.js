import React from "react";
import { Main } from "./styled";
import { connect } from "react-redux";
import { Col, Row } from "antd";
import Notification from "../Notification";
import SubLogin from "../SubLogin";

const Index = (props) => {
  return (
    <Main>
      <Row className="page-home">
        <>
          <Col xs={24} lg={14} xl={12}>
            <div className="content-left">
              <SubLogin />
            </div>
          </Col>
          <Col xs={24} lg={10} xl={12}>
            <Notification />
          </Col>
        </>
      </Row>
    </Main>
  );
};
const mapState = (state) => ({
  
});

export default connect(mapState, null)(Index);
