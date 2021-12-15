import React, { memo, useEffect } from "react";
import SelectedService from "./SelectedService";
import SumMoney from "./SumMoney";
import { Main, Main2 } from "./styledMain";
import { compose } from "redux";
import { connect } from "react-redux";
import CustomButton from "../../CustomeButton";
import IcThongKe from "assets/svg/tiep-don/iconThongKe.svg";
import IconBack from "assets/svg/tiep-don/iconBack.svg";
import Icon from "@ant-design/icons";
import { Col, Row } from "antd";
import { useHistory } from "react-router";

const RightPanel = (props) => {
  const {
    id,
    searchNbDvKyThuat,
    getDetail,
    updateDataTiepDon,
    getListAllPhong,
  } = props;
  useEffect(() => {
    if (id) {
      if (props.idIndex !== id) getDetail(id);
      searchNbDvKyThuat({
        nbDotDieuTriId: id,
        chiDinhTuLoaiDichVu: 200,
      });
      // updateDataTiepDon({ disableTiepDon: true });
    }
    getListAllPhong({});
  }, []);
  const history = useHistory();
  const handleBack = () => {
    history.goBack();
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
            <p
              onClick={() => {
                props.showTabThongTin &&
                  props.showTabThongTin({ isVisible: true });
              }}
              className="btn-thong-ke"
            >
              Xem thống kê
              <Icon component={IcThongKe} />
            </p>
          </Col>
        </Row>
      </Col>
      <Col md={24} xl={24} xxl={24}>
        <Main className="service-welcome">
          <SelectedService deleteDvKyThuat={props.deleteDvKyThuat} />
          <SumMoney id={id} />
        </Main>
      </Col>
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
  tiepDon: { getDetail, updateData: updateDataTiepDon },
  phong: { getListAllPhong },
}) => ({
  searchNbDvKyThuat,
  getDetail,
  updateDataTiepDon,
  getListAllPhong,
  tamTinhTien,
  deleteDvKyThuat,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(RightPanel);
