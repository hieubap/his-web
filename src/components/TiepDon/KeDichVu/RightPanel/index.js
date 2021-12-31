import React, { memo, useEffect, useRef } from "react";
import DichVuDaChon from "./DichVuDaChon";
import TongTien from "./TongTien";
import { Main, Main2 } from "./styledMain";
import { compose } from "redux";
import { connect } from "react-redux";
import IcThongKe from "assets/svg/tiep-don/iconThongKe.svg";
import IconBack from "assets/svg/tiep-don/iconBack.svg";
import Icon from "@ant-design/icons";
import { Col, Row } from "antd";
import { useHistory } from "react-router";
import TabThongTin from "components/TiepDon/DanhSachBenhNhan/TabThongTin";
import { useParams } from "react-router-dom";

const RightPanel = (props) => {
  const refTabThongTin = useRef(null);
  const { id } = useParams();

  const { searchNbDvKyThuat, getDetail, getListAllPhong } = props;
  useEffect(() => {
    if (id) {
      if (props.idIndex !== id) getDetail(id);
      searchNbDvKyThuat({
        nbDotDieuTriId: id,
        chiDinhTuLoaiDichVu: 200,
      });
    }
    getListAllPhong({});
  }, []);
  const history = useHistory();
  const handleBack = () => {
    history.goBack();
  };
  const onViewThongKe = () => {
    refTabThongTin.current && refTabThongTin.current.show({ isVisible: true });
  };
  return (
    <Main2>
      <Col md={24} sl={24} xxl={24}>
        <Row className="btn-group">
          <Col md={24} xl={24} xxl={24} className="header-panel">
            <p className="btn-back" onClick={handleBack}>
              <Icon component={IconBack} />
              <span>Quay lại</span>
            </p>
            <p onClick={onViewThongKe} className="btn-thong-ke">
              Xem thống kê
              <Icon component={IcThongKe} />
            </p>
          </Col>
        </Row>
      </Col>
      <Col md={24} xl={24} xxl={24}>
        <Main className="service-welcome">
          <DichVuDaChon deleteDvKyThuat={props.deleteDvKyThuat} />
          <TongTien />
        </Main>
      </Col>
      <TabThongTin ref={refTabThongTin} />
    </Main2>
  );
};

const mapStateToProps = (state) => {
  return {
    idIndex: state.tiepDon.id || "",
  };
};
const mapDispatchToProps = ({
  tiepDonDichVu: { searchNbDvKyThuat, tamTinhTien, deleteDvKyThuat },
  tiepDon: { getDetail },
  phong: { getListAllPhong },
}) => ({
  searchNbDvKyThuat,
  getDetail,
  getListAllPhong,
  tamTinhTien,
  deleteDvKyThuat,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(RightPanel);
