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
          { title: "Lịch sử ký", link: "/ky-so/lich-su-ky/danh-sach-nguoi-benh" },
          { title: "Danh sách người bệnh", link: "/ky-so/lich-su-ky/danh-sach-nguoi-benh" },
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

export default DanhSachPhieuChoKy;
