import React, { memo, useMemo } from "react";
import { compose } from "redux";
import { connect, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { Col, Row, Input } from "antd";
import { Main, PopoverWrapper, GlobalStyle, InputSearch } from "./styled";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { GIOI_TINH_BY_VALUE } from "../../../../../../constants";
const ThongTinNguoiBenh = (props) => {
  const history = useHistory()
  const infoPatient = useSelector(state => state.thuocChiTiet.infoPatient)
  const { nbDotDieuTri } = infoPatient
  const isVangLai = useMemo(() => {
    return nbDotDieuTri?.ngoaiVien
  }, [nbDotDieuTri])
  return (
    <Main className="info">
      <div className="body-info">
        <Row className="info-full">
          <div style={{ display: "table"}}>
            <div className="title">Thông tin Khách hàng: </div>
          </div>
          <div className="paddingLeft" style={{ marginLeft: 10 }}>
            <InputSearch>
              <img src={IconSearch} alt="IconSearch" className="icon-search" />
              <Input
                placeholder="Quét Qr người bệnh hoặc nhập mã hồ sơ để tìm đơn mới"
                autoFocus
              // onChange={onChange("qrBN", true)}
              // onKeyDown={onKeyDown}
              />
              {/* <img src={IconQR} alt="IconQrCode" className="qr-search" /> */}
            </InputSearch>
          </div>
          <Col sm={18} md={18} xl={18} xxl={18} className="info">
            <Row className="">
              <div className="title" style={{ marginRight: 90 }}>Họ và tên:</div>
              <div className="detail" >
                <b>{infoPatient?.nbDotDieuTri?.tenNb}{` (${moment(infoPatient?.nbDotDieuTri?.ngaySinh).format("DD/MM/YYYY")} - ${`${infoPatient?.nbDotDieuTri?.thangTuoi > 36 ? `${infoPatient?.nbDotDieuTri?.tuoi} tuổi` : `${infoPatient?.nbDotDieuTri?.thangTuoi} tháng`}`} - ${infoPatient?.nbDotDieuTri?.gioiTinh ? GIOI_TINH_BY_VALUE[infoPatient?.nbDotDieuTri?.gioiTinh] : ""})`}</b>
              </div>
            </Row>
          </Col>
          <Col sm={6} md={6} xl={6} xxl={6} className="info">
            <Row className="">
              <div className="title" style={{ marginRight: 35 }}>SĐT : </div>
              <div className="detail">
                {infoPatient?.nbDotDieuTri?.soDienThoai}
              </div>
            </Row>
          </Col>
          <Col sm={18} md={18} xl={18} xxl={18} className="info">
            <Row className="">
              <div className="title last" style={{ marginRight: 102 }}>Địa chỉ : </div>
              <div className="detail last">{infoPatient?.nbDotDieuTri?.nbDiaChi?.diaChi}</div>
            </Row>
          </Col>
          <Col sm={6} md={6} xl={6} xxl={6} className="info">
            <Row className="">
              <div className="title last" style={{ marginRight: 20 }}>Mã NB : </div>
              <div className="detail last">{infoPatient?.nbDotDieuTri?.maNb}</div>
            </Row>
          </Col>
          <Col sm={18} md={18} xl={18} xxl={18} className="info">
            <Row className="">
              <div className="title last" style={{ marginRight: 8 }}>Người bảo lãnh - SĐT : </div>
              <div className="detail last">
                {`${infoPatient?.nbDotDieuTri?.nbNguoiBaoLanh?.hoTen ? infoPatient?.nbDotDieuTri?.nbNguoiBaoLanh?.hoTen : ""}${infoPatient?.nbDotDieuTri?.nbNguoiBaoLanh?.soDienThoai ? ` - ${infoPatient?.nbDotDieuTri?.nbNguoiBaoLanh?.soDienThoai}` : ""}`}
              </div>
            </Row>
          </Col>
          <Col sm={6} md={6} xl={6} xxl={6} className="info">
            <Row className="">
              {isVangLai ? <div>
                <Checkbox
                  checked={true}
                // onChange={(e) => {
                //   setState({ ...state, detachLine: e.target.checked });
                // }}
                >
                  Khách vãng lai
                </Checkbox>
              </div>
                :
                <>
                  <div className="title last" style={{ marginRight: 20 }}>Mã HS : </div>
                  <div className="detail last">HH046</div>
                </>
              }
            </Row>
          </Col>
        </Row>
      </div>
    </Main>
  );
};
const mapStateToProps = (state) => { };
const mapDispatchToProps = ({ tiepDon: { updateData, getDetail } }) => ({

});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ThongTinNguoiBenh);
