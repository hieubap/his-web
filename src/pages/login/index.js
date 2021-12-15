import React from "react";
import Layout from "./LayOut";
import { Row, Col } from "antd";
import { WrapperContentLeft } from "./LayOut/divInner";

const Login = (props) => {
  return (
    <Layout>
      <div className="list-category">
        <Row className="box-list-module">
          <Col xs={24} md={12} xl={12}>
            <WrapperContentLeft />
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default Login;
