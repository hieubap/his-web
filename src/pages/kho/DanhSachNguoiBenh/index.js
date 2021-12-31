import React, { useState } from "react";
import { Main } from "./styled";
import HomeWrapper from "components/HomeWrapper";
import { Col, Row } from "antd";
import TimKiemPhieu from "pages/kho/components/TimKiemPhieu";
import DanhSach from "pages/kho/components/DanhSach";
import { connect } from "react-redux";
const DanhSachNguoiBenh = (props) => {
  return (
    <Main>
      <HomeWrapper title="Hồ sơ bệnh án">
        <Row xs={24}>
          <TimKiemPhieu />
        </Row>
        <Row>
          <DanhSach />
        </Row>
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
export default connect(mapStateToProps, null)(DanhSachNguoiBenh);
