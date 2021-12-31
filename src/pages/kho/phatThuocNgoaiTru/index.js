import React from "react";
import { Main } from "./styled";
import Breadcrumb from "components/Breadcrumb";
import {  Row } from "antd";
import TimKiemPhieu from "pages/kho/phatThuocNgoaiTru/TimKiemPhieu";
import DanhSach from "pages/kho/phatThuocNgoaiTru/DanhSach";
import { connect } from "react-redux";
const PhatThuocNgoaiTru = (props) => {
  return (
    <Main>
      <Row className="top-level-category" justify="space-between">
        <Breadcrumb
          chains={[
            { title: "Kho", link: "/kho" },
            { title: "Nhập kho", link: "/kho/nhap-kho" },
          ]}
        >
          <Row className="row-title" justify="space-between">
            <TimKiemPhieu />
          </Row>
          <Row>
            <DanhSach />
          </Row>
        </Breadcrumb>
      </Row>
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
export default connect(mapStateToProps, null)(PhatThuocNgoaiTru);
