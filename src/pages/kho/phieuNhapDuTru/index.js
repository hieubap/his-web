import React, { useState } from "react";
import { Main } from "./styled";
import HomeWrapper from "components/HomeWrapper";
import { Col, Row } from "antd";
import { connect } from "react-redux";
const NhapKho = (props) => {
  return (
    <Main>
      <HomeWrapper title="Kho">

      </HomeWrapper>
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    nhapKho: { chiTiet },
  } = state;
  return {
    chiTiet,
  };
};
export default connect(mapStateToProps, null)(NhapKho);
