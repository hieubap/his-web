import React, { useEffect } from "react";
import { Col, Spin } from "antd";
import ThongTinTiepDon from "components/TiepDon/ThongTinTiepDon";
import { Main, GlobalStyle } from "./styled";
import { connect } from "react-redux";

const TiepDon = (props) => {
  const id = props.match.params.id;
  const path = window.location.pathname.split("/") || [];
  const checkPath = path.includes("tiep-don") && !path.includes("dich-vu");
  useEffect(() => {
    if (props.auth.id) {
      props.getListAllTheBaoHiem();
      props.getUtils({ name: "doiTuong" });
      props.getUtils({ name: "gioiTinh" });
      props.getUtils({ name: "loaiGiayTo" });
      props.getUtils({ name: "loaiMienPhi" });
      props.resetData({
        checkValidate: false,
        dinhdangngaysinh: false,
        checkNgaySinh: false,
        // ...(id ? { disableTiepDon: true } : {}),
      }); //nếu đang ở chế độ xem chi tiết 1 bệnh nhân thì bật disable để readonly các trường
      props.macDinh(id || "");
    }
  }, [props.auth.id]);

  useEffect(() => {
    if (checkPath && id) {
      props.getDetail(id);
    }
  }, [checkPath, id]);

  return (
    <Spin
      spinning={props.loadingNotification}
      tip="Đang kiểm tra thông tin thẻ BHYT với Cổng giám định bảo hiểm. Vui lòng đợi trong giây lát!"
    >
      <Main>
        <Col md={24} xl={24} xxl={24} className="body" style={{ background: "#F4F5F7" }}>
          <GlobalStyle />
          <ThongTinTiepDon history={props.history} idLink={id} />
        </Col>
      </Main>
    </Spin>
  );
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth.auth || {},
    loadingNotification: state.tiepDon.loadingNotification || false,
    checkFormInfo: state.tiepDon.checkFormInfo || false,
    checkFormBhyt: state.tiepDon.checkFormBhyt || false,
    checkFormttbosung: state.tiepDon.checkFormttbosung || false,
  };
};
const mapDispatchToProps = ({
  tiepDon: { resetData, macDinh, getDetail },
  utils: { getUtils },
  theBaoHiem: { getListAllTheBaoHiem },
}) => ({
  getUtils,
  getListAllTheBaoHiem,
  resetData,
  macDinh,
  getDetail,
});

export default connect(mapStateToProps, mapDispatchToProps)(TiepDon);
