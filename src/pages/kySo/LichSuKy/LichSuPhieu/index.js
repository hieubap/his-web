import React, { useState, useEffect } from "react";
import { Main } from "./styled";
import HomeWrapper from "components/HomeWrapper";
import { Col, Row } from "antd";
import TimKiem from "./TimKiem";
import { connect, useDispatch } from "react-redux";
import DanhSach from "./DanhSach";
import Breadcrumb from "components/Breadcrumb";
import TTCoBan from "./TTCoBan";
const LichSuPhieu = (props) => {
  return (
    <Main>
      {/* <HomeWrapper title="Ký số"> */}
      <Breadcrumb
        chains={[
          { title: "Ký số", link: "/ky-so" },
          { title: "Lịch sử ký", link: "/ky-so/lich-su-ky/danh-sach-nguoi-benh" },
          { title: "Danh sách người bệnh", link: "/ky-so/lich-su-ky/danh-sach-nguoi-benh" },
          { title: "Danh sách phiếu", link: `/ky-so/lich-su-ky/danh-sach-nguoi-benh/danh-sach-phieu/${props?.match?.params?.id}` },
          { title: "Lịch sử phiếu chi tiết", link: `/ky-so/lich-su-ky/danh-sach-nguoi-benh/danh-sach-phieu/${props?.match?.params?.id}/lich-su-phieu/${props?.match?.params?.lichSuPhieuId}` },
        ]}
      >
        <TimKiem />
        <Row xs={24}>
          <TTCoBan />
          <div><b>Tên phiếu</b>: {props?.listData[0]?.tenBaoCao} - Số phiếu ký: {props?.listData[0]?.soPhieu}</div>
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
    lichSuKyLichSuPhieu: { listData },
  } = state;
  return {
    listData,
  };
};
export default connect(mapStateToProps, null)(LichSuPhieu);
