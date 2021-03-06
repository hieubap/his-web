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
            title="Th??ng tin b??? sung"
            content={
              <div>
                Nh???n <span>[F8] </span>????? th??m th??ng tin kh??c{" "}
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
                H??? t??n ng?????i b???o l??nh
                {tuoi < 6 ? <span style={{ color: "red" }}> *</span> : ""}
              </label>
              <Input
                ref={refHoTen}
                // style={{ textTransform: "uppercase" }}
                className="input"
                placeholder="Nh???p h??? t??n ng?????i b???o l??nh"
                value={hoTen}
                onChange={(e) => onChange(e.target.value, "hoTen")}
                onBlur={(e) => onBlur(e.target.value, "hoTen")}
                disabled={disableTiepDon}
              />
              {checkValidate && tuoi < 6 && !hoTen && (
                <div className="error">
                  Vui l??ng nh??p h??? t??n ng?????i b???o l??nh!
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
                M???i qh v???i NB
                {tuoi < 6 ? <span style={{ color: "red" }}> *</span> : ""}
              </label>
              <Select
                onChange={(e) => onChange(e, "moiQuanHeId")}
                value={moiQuanHeId}
                className="select"
                placeholder={"Ch???n m???i qh v???i NB"}
                data={listAllQuanHe}
                disabled={disableTiepDon}
              />
              {checkValidate && tuoi < 6 && !moiQuanHeId && (
                <div className="error">Vui l??ng ch???n m???i qh v???i NB!</div>
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
                S??T ng?????i b???o l??nh
                {tuoi < 6 ? <span style={{ color: "red" }}> *</span> : ""}
              </label>
              <Input
                className="input"
                placeholder="Nh???p S??T ng?????i b???o l??nh"
                value={soDienThoai}
                onChange={(e) => onChange(e.target.value, "soDienThoai")}
                onBlur={(e) => onBlur(e.target.value, "soDienThoai")}
                disabled={disableTiepDon}
              />
              {checkValidate && tuoi < 6 && !soDienThoai ? (
                <div className="error">Vui l??ng nh??p S??T ng?????i b???o l??nh!</div>
              ) : soDienThoai &&
                !soDienThoai.replaceAll(" ", "").isPhoneNumber() ? (
                <div className="error">S??? ??i???n tho???i sai ?????nh d???ng!</div>
              ) : null}
            </div>
          </Col>
          <Col md={12} xl={12} xxl={12}>
            <div className="item-input">
              <label className="title label">CMND ng?????i b???o l??nh</label>
              <Input
                className="input"
                placeholder="Nh???p CMND ng?????i b???o l??nh"
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
                Ngu???n ng?????i b???nh
              </label>
              <Select
                onChange={(e) => onChange(e, "nguonNbId")}
                value={nguonNbId}
                className="select"
                placeholder={"Ch???n ngu???n ng?????i b???nh"}
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
                  Ng?????i gi???i thi???u<span style={{ color: "red" }}> *</span>
                </label>
              ) : (
                <label
                  className="title label pointer"
                  onClick={() =>
                    openInNewTab("/danh-muc/nguon-nguoi-benh?tab=1")
                  }
                >
                  Ng?????i gi???i thi???u
                </label>
              )}
              <Select
                onChange={(e) => onChange(e, "nguoiGioiThieuId")}
                value={nguoiGioiThieuId}
                className="select"
                placeholder={"Ch???n ng?????i gi???i thi???u"}
                data={listAllNguoiGioiThieu}
                disabled={disableTiepDon}
              />
              {requiredNguoiGioiThieu && checkValidate && !nguoiGioiThieuId ? (
                <div className="error">Vui l??ng ch???n ng?????i gi???i thi???u!</div>
              ) : null}
            </div>
          </Col>
          {/* {checkFormttbosung && ( */}
          <Col md={24} xl={24} xxl={24}>
            <div className="item-input">
              <label className="title label">Ghi ch??</label>
              <Input.TextArea
                rows={6}
                className="input"
                placeholder="Nh???p ghi ch??"
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
              <label className="title label">Lo???i mi???n ph??</label>
              <Select
                onChange={(e) => onChange(e, "loaiMienPhi")}
                value={loaiMienPhi}
                className="select"
                placeholder={"Ch???n lo???i mi???n ph??"}
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
                Ng?????i duy???t mi???n ph??
              </label>
              <SelectMore
                className="nguoiDuyetId"
                placeholder={"Ch???n ng?????i duy???t mi???n ph??"}
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
            <span>{checkFormttbosung ? "Thu g???n" : "Xem th??m  "}</span>
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
