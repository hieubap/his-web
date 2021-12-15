import React, { useState, useEffect } from "react";
import { Main } from "./styled";
import HomeWrapper from "components/HomeWrapper";
import { Col, Row } from "antd";
import TimKiem from "./TimKiem";
import { connect, useDispatch } from "react-redux";
import DanhSach from "./DanhSach";
import Breadcrumb from "components/Breadcrumb";
const DanhSachPhieuChoKy = (props) => {
  return (
    <Main>
      {/* <HomeWrapper title="Ký số"> */}
      <Breadcrumb
        chains={[
          { title: "Ký số", link: "/ky-so" },
          { title: "Danh sách phiếu chờ ký", link: "/ky-so/danh-sach-phieu-cho-ky" },
        ]}
      >
        <Row xs={24}>
          <TimKiem />
        </Row>
        <Row>
          <DanhSach />
        </Row>
      </Breadcrumb>
      {/* </HomeWrapper> */}
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
export default connect(mapStateToProps, null)(DanhSachPhieuChoKy);
