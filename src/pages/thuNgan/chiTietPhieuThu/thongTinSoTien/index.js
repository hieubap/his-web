import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { Main } from "./styled";
import { connect } from "react-redux";
import AuthWrapper from "components/AuthWrapper";
import { ROLES } from "constants/index";
import IconHistory from "assets/images/thuNgan/icHistory.svg";
import { formatDecimal } from "./configs";

function ThongTinThongTien(props) {
  const { thongTinTongTienNB, data, nbDotDieuTriId } = props;
  useEffect(() => {
    thongTinTongTienNB({ id: nbDotDieuTriId });
  }, []);
  return (
    <Main>
      <div className="title-header">
        <div>Thông tin số tiền</div>
        <AuthWrapper accessRoles={[ROLES["THU_NGAN"].LICH_SU_TAM_UNG]}>
          <IconHistory className="ic-history" />
        </AuthWrapper>
      </div>
      <Row className="info">
        <Col xs={14} className="info-left">
          Số tiền còn lại:
        </Col>
        <Col xs={10} className="info-right" style={{ fontSize: 18 }}>
          {formatDecimal(String(data?.tienConLai))}
        </Col>
        <Col xs={14} className="info-left">
          Số tiền tạm ứng:
        </Col>
        <Col xs={10} className="info-right">
          {formatDecimal(String(data?.tienTamUng))}
        </Col>
        <Col xs={14} className="info-left">
          Số tiền chưa TT:
        </Col>
        <Col xs={10} className="info-right">
          {formatDecimal(String(data?.tienChuaThanhToan))}
        </Col>
        <Col xs={14} className="info-left">
          Số tiền đã TT:
        </Col>
        <Col xs={10} className="info-right">
          {formatDecimal(String(data?.tienDaThanhToan))}
        </Col>
      </Row>
    </Main>
  );
}

const mapStateToProps = (state) => {
  const {
    nbDotDieuTri: { data = [] },
  } = state;
  return {
    data,
  };
};

const mapDispatchToProps = ({ nbDotDieuTri: { thongTinTongTienNB } }) => ({
  thongTinTongTienNB,
});

export default connect(mapStateToProps, mapDispatchToProps)(ThongTinThongTien);
