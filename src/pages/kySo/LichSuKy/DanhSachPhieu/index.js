import React, { useState, useEffect } from "react";
import { Main } from "./styled";
import HomeWrapper from "components/HomeWrapper";
import { Col, Row } from "antd";
import TimKiem from "./TimKiem";
import { connect, useDispatch } from "react-redux";
import DanhSach from "./DanhSach";
import Breadcrumb from "components/Breadcrumb";
import TTCoBan from "./TTCoBan";
const DanhSachPhieu = (props) => {
  return (
    <Main>
      {/* <HomeWrapper title="Ký số"> */}
      <Breadcrumb
        chains={[
          { title: "Ký số", link: "/ky-so" },
          { title: "Lịch sử ký", link: "/ky-so/lich-su-ky/danh-sach-nguoi-benh" },
          { title: "Danh sách người bệnh", link: "/ky-so/lich-su-ky/danh-sach-nguoi-benh" },
          { title: "Danh sách phiếu", link: `/ky-so/lich-su-ky/danh-sach-nguoi-benh/danh-sach-phieu/${props?.match?.params?.id}` },
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

export default DanhSachPhieu;
