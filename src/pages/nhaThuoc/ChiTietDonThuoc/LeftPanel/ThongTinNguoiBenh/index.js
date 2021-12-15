import React, { memo, useMemo, useState } from "react";
import { compose } from "redux";
import { connect, useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { Col, Row, Input, message } from "antd";
import { Main, PopoverWrapper, GlobalStyle, InputSearch } from "./styled";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { GIOI_TINH_VNI } from "../../../../../constants";
import thuocProvider from "data-access/kho/thuoc-provider";
const ThongTinNguoiBenh = (props) => {
  const { searchThuocByParams } = useDispatch().thuocKho
  const [state, _setState] = useState({});
  const setState = (newState) => {
    _setState((state) => {
      return { ...state, ...newState };
    });
  };
  const history = useHistory()
  const infoPatient = useSelector(state => state.thuocChiTiet.infoPatient)
  const { nbDotDieuTri } = infoPatient
  const isVangLai = useMemo(() => {
    return nbDotDieuTri?.ngoaiVien
  }, [nbDotDieuTri])
  const onChange = (key, needEnter) => (e, item) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    setState({
      [key]: value,
    });
    // if (needEnter) return;
    // if (key === "qrBN") {
    //   console.log('key: ', key);
    //   // if (/^[0-9]+$/.test(value)) {
    //   //   handleSearchBN(value);
    //   // }
    // }
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      const { qrBN = "" } = state;
      let isNumber = /^[0-9]+$/.test(qrBN)
      let str = qrBN.trim() || qrBN || "";
      let param = { maHoSo: isNumber ? qrBN : "" };
      let arr = (str && str.split(",")) || [];
      let children = [];
      children = arr.filter((el) => {
        let convertEl = el.includes("”") ? el.split("”") : el.split('"');
        return convertEl.some((et) => et === "maHoSo");
      });
      children = (children.length && children[0]) || "";
      let res = children
        ? children.includes("”")
          ? children.split("”")
          : children.split('"')
        : [];
      res = res.filter((et) => /^[0-9]+$/.test(et));
      if (res[0]?.length >= 10) {
        param = { maHoSo: Number(res[0]) };
      }
      if (param?.maHoSo) {
        // Search info nb
        param.khoId = infoPatient.khoId
        thuocProvider.searchObj(param)
          .then((s) => {
            if (!s.data) {
              message.error(
                `Không tồn tại người bệnh!`
              );
            } else {
              history.push(`/nha-thuoc/chi-tiet/${s.data.id}`);
            }
          })
          .catch((e) => {
            // notifiNotSearch();
          });
      }
      // else {
      //   if (str) {
      //     // notifiNotSearch();
      //   } else message.error("Vui lòng nhập thông tin tìm kiếm!");
      // }
      // if (res.length) {
      //   if (res[0].length >= 10) {
      //     param = { maHoSo: Number(res[0]) };
      //   }
      // }
      // if (Object.keys(param).length > 0) {
      //   // handleSearchBN()
      //   // danhSachBNRef.current.show({
      //   //   search: true,
      //   //   timKiem: param?.maHoSo || param?.soPhieu
      //   // });
      // } else {
      //   showDsNb()
      // }
      // handleSearchBN();
    }
  };
  return (
    <Main className="info">
      <div className="body-info">
        <Row className="info-full">
          <div style={{ display: "table" }}>
            <div className="title">Thông tin khách hàng: </div>
          </div>
          <div className="paddingLeft" style={{ marginLeft: 10 }}>
            <InputSearch>
              <img src={IconSearch} alt="IconSearch" className="icon-search" />
              <Input
                placeholder="Quét Qr người bệnh hoặc nhập mã hồ sơ để tìm đơn mới"
                autoFocus
                onChange={onChange("qrBN", true)}
                onKeyDown={onKeyDown}
              />
              {/* <img src={IconQR} alt="IconQrCode" className="qr-search" /> */}
            </InputSearch>
          </div>
          <Col sm={18} md={18} xl={18} xxl={18} className="info">
            <Row className="">
              <div className="title" style={{ marginRight: 90 }}>Họ và tên:</div>
              <div className="detail" >
                <b>{infoPatient?.nbDotDieuTri?.tenNb}{` (${moment(infoPatient?.nbDotDieuTri?.ngaySinh).format("DD/MM/YYYY")} - ${`${infoPatient?.nbDotDieuTri?.thangTuoi > 36 ? `${infoPatient?.nbDotDieuTri?.tuoi} tuổi` : `${infoPatient?.nbDotDieuTri?.thangTuoi} tháng`}`} - ${infoPatient?.nbDotDieuTri?.gioiTinh ? GIOI_TINH_VNI[infoPatient?.nbDotDieuTri?.gioiTinh] : ""})`}</b>
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
                  <div className="detail last">{infoPatient?.nbDotDieuTri?.maHoSo}</div>
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
