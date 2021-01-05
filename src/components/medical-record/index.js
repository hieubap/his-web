import React from "react";
import { Row, Col } from "antd";
import { Main } from "./styled";
import RecordType from "./RecordType";
import Form from "./Form";
const MedicalRecord = (props) => {
  return (
    <Main>
      <Row gutter={[8, 8]}>
        <Col className="gutter-row" span={9}>
          <RecordType />
        </Col>
        <Col className="gutter-row" span={15}>
          <Form />
        </Col>
      </Row>
    </Main>
  );
};

export default MedicalRecord;
