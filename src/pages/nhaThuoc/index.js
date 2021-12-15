import React, { useState, useEffect } from "react";
import { Main } from "./styled";
import HomeWrapper from "components/HomeWrapper";
import { Col, Row } from "antd";
import TimKiemDonThuoc from "pages/nhaThuoc/TimKiemDonThuoc";
import { connect, useDispatch } from "react-redux";
import DanhSachDonThuoc from "./DanhSachDonThuoc";
const NhaThuoc = (props) => {
  return (
    <Main>
        <HomeWrapper title="Nhà thuốc" link="nha-thuoc">
          <Row xs={24}>
            <TimKiemDonThuoc />
          </Row>
          <Row>
            <DanhSachDonThuoc />
          </Row>
        </HomeWrapper>
    </Main>
  );
};

export default NhaThuoc;
