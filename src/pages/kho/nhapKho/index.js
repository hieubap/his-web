import React, { useState } from "react";
import { Main } from "./styled";
import HomeWrapper from "components/HomeWrapper";
import Breadcrumb from "components/Breadcrumb";
import { Col, Row } from "antd";
import TimKiemPhieu from "pages/kho/components/TimKiemPhieu";
import DanhSach from "pages/kho/components/DanhSach";
import ThongTinHangHoa from "pages/kho/components/ThongTinHangHoa";
import DanhSachRutGon from "pages/kho/components/DanhSachRutGon";
import { connect } from "react-redux";
import ThongTinHangHoaChiTiet from "pages/kho/components/ThongTinHangHoaChiTiet";
const NhapKho = (props) => {
  return (
    <Main>
      <Row className="top-level-category" justify="space-between">
        <Breadcrumb
          chains={[
            { title: "Kho", link: "/kho" },
            { title: "Nhập kho", link: "/kho/nhap-kho" },
          ]}
        >
          {props.chiTiet && (
            <>
              <Row className="row-title" justify="space-between">
                {/* <Row xs={24}> */}
                <TimKiemPhieu />
                {/* </Row> */}
              </Row>
              <Row>
                <DanhSach />
              </Row>
            </>
          )}
          {!props.chiTiet && (
            <Row>
              <Col xs={6}>
                <Row>
                  <Col className="left">
                    <DanhSachRutGon />
                  </Col>
                </Row>
              </Col>
              <Col xs={18} className="right">
                <ThongTinHangHoaChiTiet />
              </Col>
            </Row>
          )}
        </Breadcrumb>
      </Row>

    </Main>
    // <Main>
    //   {props.chiTiet && (
    //     <HomeWrapper title="Nhập kho">
    //       <Row xs={24}>
    //         <TimKiemPhieu />
    //       </Row>
    //       <Row>
    //         <DanhSach />
    //       </Row>
    //     </HomeWrapper>
    //   )}
    //   {!props.chiTiet && (
    //     <HomeWrapper title="Kho">
    //       <Col xs={6}>
    //         <Row>
    //           <Col className="left">
    //             <DanhSachRutGon />
    //           </Col>
    //         </Row>
    //       </Col>
    //       <Col xs={18} className="right">
    //         <ThongTinHangHoaChiTiet />
    //       </Col>
    //     </HomeWrapper>
    //   )}
    // </Main>
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
