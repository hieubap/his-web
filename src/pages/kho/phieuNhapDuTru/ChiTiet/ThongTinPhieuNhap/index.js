import React, { memo } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Col, Row } from "antd";
import { Main } from "./styled";
import { openInNewTab } from "utils";

const ThongTinPhieuNhap = ({ thongTinPhieuNhap, ...props }) => {
  return (
    <Main>
      <Row className="info-full">
        {/* <div className="info"> */}
        <Col sm={24} md={24} xl={24} xxl={24}>
          <div className="title" style={{ fontSize: "1.1rem" }}>
            Thông tin phiếu nhập
          </div>
        </Col>
        {/* </div> */}
        <Col sm={24} md={24} xl={24} xxl={24}>
          <Row>
            <Col sm={6} md={6} xl={6} xxl={6} className="info">
              <Row className="">
                <div
                  onClick={() => openInNewTab("/kho/quan-tri-kho")}
                  className="title pointer"
                  style={{ marginRight: 35 }}
                >
                  Kho xuất:{" "}
                </div>
                <div className="detail">
                  {thongTinPhieuNhap?.khoDoiUng?.ten}
                </div>
              </Row>
            </Col>
            <Col sm={6} md={6} xl={6} xxl={6} className="info">
              <Row className="">
                <div className="title last" style={{ marginRight: 20 }}>
                  Tháng dự trù:{" "}
                </div>
                <div className="detail last">
                  {thongTinPhieuNhap?.thangDuTru}
                </div>
              </Row>
            </Col>
            <Col sm={6} md={6} xl={6} xxl={6} className="info">
              <Row className="">
                <div className="title last" style={{ marginRight: 20 }}>
                  Số phiếu :{" "}
                </div>
                <div className="detail last">{thongTinPhieuNhap?.soPhieu}</div>
              </Row>
            </Col>
            <Col sm={6} md={6} xl={6} xxl={6} className="info">
              <Row className="">
                <div className="title last" style={{ marginRight: 20 }}>
                  Người tạo phiếu :{" "}
                </div>
                <div className="detail last">
                  {thongTinPhieuNhap?.nguoiTaoPhieu?.ten}
                </div>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col sm={6} md={6} xl={6} xxl={6} className="info">
              <Row className="">
                <div className="title" style={{ marginRight: 35 }}>
                  Hình thức nhập :{" "}
                </div>
                <div className="detail">
                  {thongTinPhieuNhap?.hinhThucNhapXuat?.ten}
                </div>
              </Row>
            </Col>
            <Col sm={6} md={6} xl={6} xxl={6} className="info">
              <Row className="">
                <div className="title last" style={{ marginRight: 20 }}>
                  Kho :{" "}
                </div>
                <div className="detail last">{thongTinPhieuNhap?.kho?.ten}</div>
              </Row>
            </Col>
            {/* <Col sm={6} md={6} xl={6} xxl={6} className="info">
                <Row className="">
                  <div className="title last" style={{ marginRight: 20 }}>Số phiếu đối ứng : </div>
                  <div className="detail last">54654sadasdasd</div>
                </Row>
              </Col> */}
            <Col sm={6} md={6} xl={6} xxl={6} className="info">
              <Row className="">
                <div className="title last" style={{ marginRight: 20 }}>
                  Ghi chú :{" "}
                </div>
                <div className="detail last">{thongTinPhieuNhap?.ghiChu}</div>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Main>
  );
};
const mapStateToProps = (state) => ({
  thongTinPhieuNhap: state.phieuNhapDuTru.thongTinPhieuNhap,
});
const mapDispatchToProps = ({}) => ({});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ThongTinPhieuNhap);
