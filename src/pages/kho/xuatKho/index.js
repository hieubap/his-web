import React, { useState } from "react";
import { Main } from "./styled";
import HomeWrapper from "components/HomeWrapper";
import { Col, Row } from "antd";
import TimKiemPhieuXuat from "pages/kho/components/TimKiemPhieuXuat";
import DanhSachPhieuXuat from "pages/kho/components/DanhSachPhieuXuat";
import ThongTinHangHoa from "pages/kho/components/ThongTinHangHoa";
import DanhSachRutGon from "pages/kho/components/DanhSachRutGon";
import { connect } from "react-redux";
import ThongTinHangHoaChiTiet from "pages/kho/components/ThongTinHangHoaChiTiet";
import Breadcrumb from "components/Breadcrumb";
const XuatKho = (props) => {
  return (
    <Main>
      <Breadcrumb
        chains={[
          { title: "Kho", link: "/kho" },
          { title: "Xuất kho", link: "/kho/xuat-kho" },
        ]}
      >
        <Row xs={24}>
          <TimKiemPhieuXuat />
        </Row>
        <Row>
          <DanhSachPhieuXuat />
        </Row>
      </Breadcrumb>
    </Main>
  );
};

export default XuatKho;
