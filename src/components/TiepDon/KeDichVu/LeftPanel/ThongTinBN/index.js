import React, { memo } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { Col, Row } from "antd";
import { ROLES } from "constants/index";
import AuthWrapper from "components/AuthWrapper";
import { Main, PopoverWrapper, GlobalStyle } from "./styled";
import Image from "components/Image";
import { checkData, formatPhone } from "utils";
import { LENGTH_ZERO_PREFIX } from "../../../ThongTinTiepDon/configs";
import { addPrefixNumberZero } from "utils";
import fileUtils from "utils/file-utils";
import EditIcon from "assets/svg/hoSoBenhAn/edit.svg";
import { useParams } from "react-router-dom";

const ThongTinBN = (props) => {
  const { id } = useParams();

  const { hangThe } = props;
  const history = useHistory();
  const onBack = (id) => {
    // getDetail(id).then((s) => {
    //   // updateData({ disableTiepDon: true });
    //   if (s?.code === 0) history.push(`/tiep-don/${id}`);
    // });
    history.push(`/tiep-don/${id}`);
  };
  return (
    <Main className="info">
      <div className="avatar-header">
        {/* <div className="order">{addPrefixNumberZero(props.stt, LENGTH_ZERO_PREFIX)}</div> */}
        <div className="avatar">
          {hangThe && hangThe?.icon && (
            <div className="hangTheIcon">
              <GlobalStyle />
              <PopoverWrapper
                content={`${hangThe?.ten}`}
                placement="right"
                trigger="hover"
              >
                <img
                  src={`${fileUtils.absoluteFileUrl(hangThe?.icon)}`}
                  alt=""
                />
              </PopoverWrapper>
            </div>
          )}
          <Image
            src={props.anhDaiDien}
            defauleImage={require("assets/images/welcome/avatar.png")}
          />
        </div>
      </div>
      <div className="body-info">
        <div className="title-header">
          <div className="name">
            {addPrefixNumberZero(props.stt, LENGTH_ZERO_PREFIX)}
            {props.stt && " - "}
            {props.tenNb}
            {props.gioiTinh ? (
              <span className="gender">
                ({checkData(props.gioiTinh, props.listgioiTinh).ten})
              </span>
            ) : null}
          </div>
          <AuthWrapper accessRoles={[ROLES["TIEP_DON"].XEM_LAI_TT]}>
            <div className="button" onClick={() => onBack(id)}>
              <span>Sửa thông tin</span>
              <EditIcon className="icon" />
            </div>
          </AuthWrapper>
        </div>
        <Row className="info-full">
          <Col sm={12} md={12} xl={12} xxl={12} className="info">
            <div className="person">
              <div className="title small">Ngày sinh: </div>
              <div className="detail small">
                {props.ngaySinh?.date &&
                  moment(props.ngaySinh?.date).format("DD/MM/YYYY")}{" "}
                - {props.tuoi} tuổi
              </div>
            </div>
          </Col>
          <Col sm={12} md={12} xl={12} xxl={12} className="info">
            <div className="person">
              <div className="title">Số BHYT: </div>
              <div className="detail">{props.nbTheBaoHiem?.maThe}</div>
            </div>
          </Col>
          <Col sm={12} md={12} xl={12} xxl={12} className="info">
            <div className="person">
              <div className="title small address">Địa chỉ: </div>
              <div className="detail small address">
                {props.nbDiaChi?.diaChi}
              </div>
            </div>
          </Col>
          <Col sm={12} md={12} xl={12} xxl={12} className="info">
            <div className="person">
              <div className="title">Giá trị thẻ: </div>
              <div className="detail">
                {props.nbTheBaoHiem?.tuNgay
                  ? `Từ ${moment(props.nbTheBaoHiem?.tuNgay).format(
                      "DD/MM/YYYY"
                    )}`
                  : null}
                {props.nbTheBaoHiem?.denNgay
                  ? ` đến ${moment(props.nbTheBaoHiem?.denNgay).format(
                      "DD/MM/YYYY"
                    )}`
                  : null}
              </div>
            </div>
          </Col>
          <Col sm={12} md={12} xl={12} xxl={12} className="info">
            <div className="person">
              <div className="title small">Số giấy tờ tùy thân: </div>
              <div className="detail small">{props.nbGiayToTuyThan?.maSo}</div>
            </div>
          </Col>
          <Col sm={12} md={12} xl={12} xxl={12} className="info">
            <div className="person">
              <div className="title">Mã HS : </div>
              <div className="detail">{props.maHoSo}</div>
            </div>
          </Col>
          <Col sm={12} md={12} xl={12} xxl={12} className="info">
            <div className="person">
              <div className="title small">SĐT : </div>
              <div className="detail small">
                {props.soDienThoai && formatPhone(props.soDienThoai)}
              </div>
            </div>
          </Col>
          <Col sm={12} md={12} xl={12} xxl={12} className="info">
            <div className="person">
              <div className="title">Mã BN: </div>
              <div className="detail">{props.maNb}</div>
            </div>
          </Col>
        </Row>
      </div>
    </Main>
  );
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth.auth || {},
    maNb: state.tiepDon.maNb || "",
    maHoSo: state.tiepDon.maHoSo,
    tenNb: state.tiepDon.tenNb,
    gioiTinh: state.tiepDon.gioiTinh,
    ngaySinh: state.tiepDon.ngaySinh,
    soDienThoai: state.tiepDon.soDienThoai,
    tuoi: state.tiepDon.tuoi,
    nbDiaChi: state.tiepDon.nbDiaChi || {},
    nbTheBaoHiem: state.tiepDon.nbTheBaoHiem || {},
    nbGiayToTuyThan: state.tiepDon.nbGiayToTuyThan || {},
    stt: state.tiepDon.stt,
    listgioiTinh: state.utils.listgioiTinh || [],
    anhDaiDien: state.tiepDon.anhDaiDien || "",
    hangThe: state.tiepDon.hangThe || {},
  };
};
const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(ThongTinBN);
