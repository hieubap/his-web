import React, { useState, memo, useEffect, useRef } from "react";
import { Row, Col, Input } from "antd";
import Header from "components/Header";
import Select from "components/Select";
import { Main } from "./styled";
import { connect, useDispatch } from "react-redux";
import SelectMore from "components/SelectMore";
import { formatPhone, openInNewTab } from "utils";

const Index = (props) => {
  const {
    tiepDon: { updateData },
  } = useDispatch();

  const refHeight = useRef();
  const refHoTen = useRef(null);
  const [state, _setState] = useState({});
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };
  const {
    nbNguoiBaoLanh,
    nbMienPhi,
    listAllQuanHe,
    listloaiMienPhi,
    tuoi,
    checkValidate,
    onCheckTrungThongTin,
    disableTiepDon,
    checkFormttbosung,
    listNguonNguoiBenh,
    listAllNguoiGioiThieu,
    requiredNguoiGioiThieu,
    nbNguonNb,
  } = props;
  useEffect(() => {
    if (!!nbMienPhi)
      setState({
        loaiMienPhi: nbMienPhi?.loaiMienPhi,
        nguoiDuyetId: nbMienPhi?.nguoiDuyetId,
        nguoiDuyetTen: nbMienPhi?.nguoiDuyet?.ten,
      });
  }, [nbMienPhi]);
  useEffect(() => {
    setState({
      hoTen: nbNguoiBaoLanh?.hoTen,
      soDienThoai: nbNguoiBaoLanh?.soDienThoai,
      soCanCuoc: nbNguoiBaoLanh?.soCanCuoc,
      moiQuanHeId: nbNguoiBaoLanh?.moiQuanHeId,
    });
  }, [nbNguoiBaoLanh]);
  useEffect(() => {
    props.getListAllNhanVien();
    props.getListAllQuanHe();
    props.searchListNguoiGioiThieu({ active: true });
    props.searchListNguonNguoiBenh({ page: 0, size: 9999, active: true });
    document.addEventListener("keydown", (e) => {
      if (e.code === "F8") {
        e.preventDefault();
        refHoTen.current.focus();
      }
    });
  }, []);

  const {
    moiQuanHeId,
    soCanCuoc,
    soDienThoai,
    hoTen,
    nguoiDuyetId,
    loaiMienPhi,
    nguoiDuyetTen,
    nguonNbId,
    nguoiGioiThieuId,
    ghiChu,
  } = state;
  const showItemBosung = () => {
    // refHeight.current.style.height = "500px";
    updateData({ checkFormttbosung: !checkFormttbosung });
  };
  const onChange = (value, variables) => {
    setState({ [`${variables}`]: value });
    if (variables === "loaiMienPhi") {
      nbMienPhi[`${variables}`] = value;
      updateData({ nbMienPhi: { ...nbMienPhi } });
    }
    if (variables === "nguoiDuyetId") {
      let data = nbMienPhi || {};
      data[`${variables}`] = nguoiDuyetId;
      updateData({ nbMienPhi: { ...data } });
    }
    if (variables === "moiQuanHeId") {
      let data = nbNguoiBaoLanh || {};
      data[`${variables}`] = value;
      updateData({ nbNguoiBaoLanh: { ...data } });
    }
    if (variables === "nguonNbId") {
      let data = nbNguonNb || {};
      data[`${variables}`] = value;
      updateData({ nbNguonNb: { ...data } });
    }
    if (variables === "nguoiGioiThieuId") {
      let data = nbNguonNb || {};
      data[`${variables}`] = value;
      updateData({ nbNguonNb: { ...data } });
    }
    if (variables === "ghiChu") {
      let data = nbNguonNb || {};
      data[`${variables}`] = value;
      updateData({ nbNguonNb: { ...data } });
    }
  };
  const onBlur = (value, variables) => {
    let data = nbNguoiBaoLanh || {};
    data[`${variables}`] =
      variables === "soDienThoai" ? formatPhone(value)?.trim() : value;
    updateData({ nbNguoiBaoLanh: { ...data } });
    if (variables === "soDienThoai") onCheckTrungThongTin(value, variables);
  };
  useEffect(() => {
    props.searchListNguoiGioiThieu({ active: true, dsNguonNbId: nguonNbId });
    const nguonNb = listNguonNguoiBenh?.find((nb) => nb.id == nguonNbId);
    updateData({
      nbNguonNb: {
        ...nbNguonNb,
        nguoiGioiThieuId: "",
      },
      requiredNguoiGioiThieu: nguonNb?.nguoiGioiThieu,
    });
  }, [nguonNbId]);
  useEffect(() => {
    setState({
      ...nbNguonNb,
    });
  }, [nbNguonNb]);
  return (
    <Main ref={refHeight}>
      <div className="flame">
        <Row>
          <Header
            title="Thông tin bổ sung"
            content={
              <div>
                Nhấn <span>[F8] </span>để thêm thông tin khác{" "}
              </div>
            }
          />
        </Row>
        <Row className="info-main-bottom-mini">
          <Col md={12} xl={12} xxl={12}>
            <div className="item-input">
              <label
                className={
                  !hoTen && tuoi < 6 ? `title label label-error` : "title label"
                }
              >
                Họ tên người bảo lãnh
                {tuoi < 6 ? <span style={{ color: "red" }}> *</span> : ""}
              </label>
              <Input
                ref={refHoTen}
                // style={{ textTransform: "uppercase" }}
                className="input"
                placeholder="Nhập họ tên người bảo lãnh"
                value={hoTen}
                onChange={(e) => onChange(e.target.value, "hoTen")}
                onBlur={(e) => onBlur(e.target.value, "hoTen")}
                disabled={disableTiepDon}
              />
              {checkValidate && tuoi < 6 && !hoTen && (
                <div className="error">
                  Vui lòng nhâp họ tên người bảo lãnh!
                </div>
              )}
            </div>
          </Col>
          <Col md={12} xl={12} xxl={12}>
            <div className="item-select">
              <label
                onClick={() => openInNewTab("/danh-muc/moi-quan-he")}
                className={
                  !moiQuanHeId && tuoi < 6
                    ? `label label-error pointer`
                    : " pointer label"
                }
              >
                Mối qh với NB
                {tuoi < 6 ? <span style={{ color: "red" }}> *</span> : ""}
              </label>
              <Select
                onChange={(e) => onChange(e, "moiQuanHeId")}
                value={moiQuanHeId}
                className="select"
                placeholder={"Chọn mối qh với NB"}
                data={listAllQuanHe}
                disabled={disableTiepDon}
              />
              {checkValidate && tuoi < 6 && !moiQuanHeId && (
                <div className="error">Vui lòng chọn mỗi qh với NB!</div>
              )}
            </div>
          </Col>
          <Col md={12} xl={12} xxl={12}>
            <div className="item-input">
              <label
                className={
                  !soDienThoai && tuoi < 6
                    ? `title label label-error`
                    : "label title"
                }
              >
                SĐT người bảo lãnh
                {tuoi < 6 ? <span style={{ color: "red" }}> *</span> : ""}
              </label>
              <Input
                className="input"
                placeholder="Nhập SĐT người bảo lãnh"
                value={soDienThoai}
                onChange={(e) => onChange(e.target.value, "soDienThoai")}
                onBlur={(e) => onBlur(e.target.value, "soDienThoai")}
                disabled={disableTiepDon}
              />
              {checkValidate && tuoi < 6 && !soDienThoai ? (
                <div className="error">Vui lòng nhâp SĐT người bảo lãnh!</div>
              ) : soDienThoai &&
                !soDienThoai.replaceAll(" ", "").isPhoneNumber() ? (
                <div className="error">Số điện thoại sai định dạng!</div>
              ) : null}
            </div>
          </Col>
          <Col md={12} xl={12} xxl={12}>
            <div className="item-input">
              <label className="title label">CMND người bảo lãnh</label>
              <Input
                className="input"
                placeholder="Nhập CMND người bảo lãnh"
                value={soCanCuoc}
                onChange={(e) => onChange(e.target.value, "soCanCuoc")}
                onBlur={(e) => onBlur(e.target.value, "soCanCuoc")}
                disabled={disableTiepDon}
              />
            </div>
          </Col>
          <Col md={12} xl={12} xxl={12}>
            <div className="item-select">
              <label
                className="title label pointer"
                onClick={() => openInNewTab("/danh-muc/nguon-nguoi-benh?tab=2")}
              >
                Nguồn người bệnh
              </label>
              <Select
                onChange={(e) => onChange(e, "nguonNbId")}
                value={nguonNbId}
                className="select"
                placeholder={"Chọn nguồn người bệnh"}
                data={listNguonNguoiBenh}
                disabled={disableTiepDon}
              />
            </div>
          </Col>
          <Col md={12} xl={12} xxl={12}>
            <div className="item-select">
              {requiredNguoiGioiThieu ? (
                <label
                  onClick={() =>
                    openInNewTab("/danh-muc/nguon-nguoi-benh?tab=1")
                  }
                  className={
                    !nguoiGioiThieuId
                      ? `label label-error pointer`
                      : "label pointer"
                  }
                >
                  {" "}
                  Người giới thiệu<span style={{ color: "red" }}> *</span>
                </label>
              ) : (
                <label
                  className="title label pointer"
                  onClick={() =>
                    openInNewTab("/danh-muc/nguon-nguoi-benh?tab=1")
                  }
                >
                  Người giới thiệu
                </label>
              )}
              <Select
                onChange={(e) => onChange(e, "nguoiGioiThieuId")}
                value={nguoiGioiThieuId}
                className="select"
                placeholder={"Chọn người giới thiệu"}
                data={listAllNguoiGioiThieu}
                disabled={disableTiepDon}
              />
              {requiredNguoiGioiThieu && checkValidate && !nguoiGioiThieuId ? (
                <div className="error">Vui lòng chọn người giới thiệu!</div>
              ) : null}
            </div>
          </Col>
          {/* {checkFormttbosung && ( */}
          <Col md={24} xl={24} xxl={24}>
            <div className="item-input">
              <label className="title label">Ghi chú</label>
              <Input.TextArea
                rows={6}
                className="input"
                placeholder="Nhập ghi chú"
                value={ghiChu}
                onChange={(e) => onChange(e.target.value, "ghiChu")}
                onBlur={(e) => onBlur(e.target.value, "ghiChu")}
                disabled={disableTiepDon}
              />
            </div>
          </Col>
          {/* )} */}
          {/* {checkFormttbosung && ( */}
          <Col md={12} xl={12} xxl={12}>
            <div className="item-select">
              <label className="title label">Loại miễn phí</label>
              <Select
                onChange={(e) => onChange(e, "loaiMienPhi")}
                value={loaiMienPhi}
                className="select"
                placeholder={"Chọn loại miễn phí"}
                data={listloaiMienPhi}
                disabled={disableTiepDon}
              />
            </div>
          </Col>
          {/* )} */}
          {/* {checkFormttbosung && ( */}
          <Col md={12} xl={12} xxl={12}>
            <div className="item-input">
              <label
                onClick={() => openInNewTab("/quan-tri/danh-muc-tai-khoan")}
                className="label pointer"
              >
                Người duyệt miễn phí
              </label>
              <SelectMore
                className="nguoiDuyetId"
                placeholder={"Chọn người duyệt miễn phí"}
                data={props.listAllNhanVien}
                onChange={(e) => onChange(e, "nguoiDuyetId")}
                value={nguoiDuyetId}
                valueText={nguoiDuyetTen}
                disabled={disableTiepDon}
              />
            </div>
          </Col>
          {/* )} */}
          {/* <div className="button-clear" onClick={() => showItemBosung()}>
            <span>{checkFormttbosung ? "Thu gọn" : "Xem thêm  "}</span>
            {checkFormttbosung ? (
              <img
                className="icon"
                src={require("assets/images/welcome/arrow.png")}
              />
            ) : (
              <img
                className="icon"
                src={require("assets/images/welcome/arrowDown.png")}
              />
            )}
          </div> */}
          <div className="button-clear">
            <span>{""}</span>
            <img src="" alt="" className="icon" />
          </div>
        </Row>
      </div>
    </Main>
  );
};
const mapStateToProps = (state) => {
  return {
    nbNguoiBaoLanh: state.tiepDon.nbNguoiBaoLanh,
    nbMienPhi: state.tiepDon.nbMienPhi,
    requiredNguoiGioiThieu: state.tiepDon.requiredNguoiGioiThieu,
    listloaiMienPhi: state.utils.listloaiMienPhi || [],
    listAllNhanVien: state.nhanVien.listAllNhanVien || [],
    listAllQuanHe: state.moiQuanHe.listAllQuanHe || [],
    ngaySinh: state.tiepDon.ngaySinh,
    tuoi: state.tiepDon.tuoi,
    checkValidate: state.tiepDon.checkValidate,
    disableTiepDon: state.tiepDon.disableTiepDon,
    checkFormttbosung: state.tiepDon.checkFormttbosung || false,
    listAllNguoiGioiThieu: state.nguoiGioiThieu.listAllNguoiGioiThieu || [],
    listNguonNguoiBenh: state.nguonNguoiBenh.listNguonNguoiBenh || [],
    nbNguonNb: state.tiepDon.nbNguonNb,
  };
};
export default connect(
  mapStateToProps,
  ({
    nhanVien: { getListAllNhanVien },
    moiQuanHe: { getListAllQuanHe },
    nguoiGioiThieu: { searchAll: searchListNguoiGioiThieu },
    nguonNguoiBenh: { searchTongHop: searchListNguonNguoiBenh },
  }) => ({
    getListAllNhanVien,
    getListAllQuanHe,
    searchListNguoiGioiThieu,
    searchListNguonNguoiBenh,
  })
)(memo(Index));
