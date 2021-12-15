import React, { memo } from "react";
import { StyleBody } from "./styled";
import TopContent from "./TopContent";
import MiddleContent from "./MiddleContent";
import {Col, Row} from "antd";
import { connect } from "react-redux";

function Body(props) {
  const {
    dataSearch
  } = props;

  return (
    <StyleBody
    >
      <Row>
      <Col span={11}  style={{marginRight:"25px"}}> <TopContent
      /></Col>
      {dataSearch.loaiQms && dataSearch.phongId && 
      <Col span={12}> <MiddleContent
      /></Col>
}
    </Row>

    </StyleBody>
  );
}

const mapStateToProps = (state) => {
  return {
    dataSearch: state.kiosk.dataSearch
  };
};
const mapDispatchToProps = ({
}) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Body);