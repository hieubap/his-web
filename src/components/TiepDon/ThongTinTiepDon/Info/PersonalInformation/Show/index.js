import React, { useState, memo, useEffect, useRef } from "react";
import { Row, Col, Input, TimePicker, message } from "antd";
import AddressFull from "components/AddressFull";
import { connect, useSelector, useDispatch } from "react-redux";
import moment from "moment";
import DOBInput from "components/DOBInput";
import Select from "components/Select";
import { isNil } from "lodash";
import { openInNewTab } from "utils";
import { formatPhone } from "utils";
import { MAX_MONTH_AGE } from "../../../configs";

const Index = (props) => {
  const { maHoSo } = useSelector((state) => state.tiepDon);
  const {
    tiepDon: { updateData },
  } = useDispatch();
  const refHoVaTen = useRef(null);
  const [state, _setState] = useState({
    diaChi: "",
    validate: 0,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const {
    diaChi,
    tenNb,
    ngaySinh,
    validate,
    soDienThoai,
    soNha,
    loaiGiayTo,
    maSo,
    email: nbEmail,
  } = state;

  const checkValidate = useSelector((state) => state.tiepDon.checkValidate);

  const {
    onChange,
    selectAddress,
    nbDiaChi,
    disableTiepDon,
    ngaySinhTime,
    listAllQuocGia,
    tuoi,
    thangTuoi,
    gioiTinh,
    listgioiTinh,
    onCheckTrungThongTin,
    nbGiayToTuyThan,
    quocTichId,
    listloaiGiayTo,
  } = props;

  useEffect(() => {
    setState({
      tenNb: props.tenNb,
      ngaySinh: props.ngaySinh,
      soDienThoai: props.soDienThoai,
      email: props.email,
    });
  }, [props.tenNb, props.ngaySinh, props.soDienThoai, props.email]);

  useEffect(() => {
    if (!!nbDiaChi)
      setState({
        soNha: nbDiaChi?.soNha,
        diaChi: nbDiaChi?.diaChi
          ? nbDiaChi?.diaChi
          : nbDiaChi?.tinhThanhPho
          ? `${nbDiaChi?.xaPhuong?.ten ? nbDiaChi?.xaPhuong?.ten : ""}${
              nbDiaChi?.quanHuyen?.ten ? `, ${nbDiaChi?.quanHuyen?.ten}` : ""
            }${
              nbDiaChi?.tinhThanhPho?.ten
                ? `, ${nbDiaChi?.tinhThanhPho?.ten}`
                : ""
            }`
          : "",
      });
  }, [nbDiaChi]);

  useEffect(() => {
    if (!nbGiayToTuyThan.loaiGiayTo) {
      updateData({ nbGiayToTuyThan: { loaiGiayTo: 1 } });
    } else
      setState({
        loaiGiayTo: nbGiayToTuyThan?.loaiGiayTo,
        maSo: nbGiayToTuyThan?.maSo,
      });
  }, [nbGiayToTuyThan]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.code === "F6") {
        e.preventDefault();
        refHoVaTen.current.focus();
      }
    });
    props.getListAllQuocGia();
    props.getListAllNgheNghiep();
  }, []);

  const checkGender = (value) => {
    if (maHoSo) return; //n???u ???? c?? m?? h??? s??, ngh??a l?? ng?????i b???nh c?? th?? ko c???n ph???i check l???i gi???i t??nh
    let dataTen = value.toUpperCase();
    let genderVan = dataTen.search("V??N");
    let genderThi = dataTen.search("TH???");
    if (genderVan >= 0 && genderThi < 0) {
      updateData({ gioiTinh: 1 });
    } else if (genderThi >= 0) {
      updateData({ gioiTinh: 2 });
    } else {
      updateData({ gioiTinh: "" });
    }
  };
  const update = (value, variables) => {
    setState({ [`${variables}`]: value });
  };

  const onBlur = (value, variables) => {
    if (variables === "soNha") {
      let data = nbDiaChi || {};
      data[`${variables}`] = value;
      updateData({ nbDiaChi: { ...data } });
    }
    // } else onChange(value, variables);
    if (variables == "maSo" || variables == "email") {
      nbGiayToTuyThan[`${variables}`] = value;
      updateData({ nbGiayToTuyThan: { ...nbGiayToTuyThan } });
      if (variables == "maSo") {
        onCheckTrungThongTin(value, variables);
      }
    } else {
      onChange(value, variables);
      if (variables === "tenNb") checkGender(value);
      if (
        (variables === "tenNb" && tenNb != props.tenNb) ||
        variables === "diaChi" ||
        variables === "soDienThoai"
      ) {
        onCheckTrungThongTin(value, variables);
      }
      if (variables === "soDienThoai")
        updateData({ soDienThoai: formatPhone(value)?.trim() });
    }
  };
  const onChangeIndex = (value, variables) => {
    setState({ [`${variables}`]: value });
    if (
      variables === "loaiGiayTo" ||
      variables === "anhMatTruoc" ||
      variables === "anhMatSau"
    ) {
      nbGiayToTuyThan[`${variables}`] = value;
      updateData({ nbGiayToTuyThan: { ...nbGiayToTuyThan } });
    }
  };
  const onErrorAddress = (address, listSuggest) => {
    updateData({ selectedAddress: false });
  };
  const onSelectAddress = (data) => {
    selectAddress && selectAddress(data);
    updateData({ selectedAddress: true });
  };
  return (
    <>
      <Row className="row-name" gutter={6}>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-input">
            <label className={!tenNb ? `label label-error` : "label"}>
              {" "}
              H??? v?? t??n<span style={{ color: "red" }}> *</span>
            </label>
            <Input
              ref={refHoVaTen}
              placeholder="Nh???p h??? v?? t??n"
              value={tenNb}
              style={{ textTransform: "uppercase" }}
              onChange={(e) => update(e.target.value, "tenNb")}
              onBlur={(e) => onBlur(e.target.value, "tenNb")}
              disabled={disableTiepDon}
            />
            {checkValidate && !tenNb ? (
              <div className="error">Vui l??ng nh???p t??n ng?????i b???nh!</div>
            ) : null}
          </div>
        </Col>
        <Col md={12} xl={12} xxl={12} style={{ paddingRight: 0 }}>
          <div className="item-input">
            <label className="label"> S??? ??i???n tho???i</label>
            <Input
              placeholder="Nh???p s??? ??i???n tho???i"
              value={soDienThoai}
              onChange={(e) => update(e.target.value, "soDienThoai")}
              onBlur={(e) => onBlur(e.target.value, "soDienThoai")}
              disabled={disableTiepDon}
            />
            {soDienThoai && !soDienThoai.replaceAll(" ", "").isPhoneNumber() ? (
              <div className="error">S??? ??i???n tho???i sai ?????nh d???ng!</div>
            ) : null}
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-date">
            <label
              className={
                !ngaySinh?.str
                  ? `label item-title label-error`
                  : "label item-title"
              }
            >
              {" "}
              Ng??y th??ng n??m sinh<span style={{ color: "red" }}> *</span>
            </label>
            <DOBInput
              className="item-born"
              value={ngaySinh}
              onBlur={(e, nofi, ageStr, chiNamSinh) => {
                let ngaySinhTime = nofi === 0 && e && e.date && e.date._d;
                let tuoi = nofi === 0 ? ngaySinhTime.getAge() : "";
                setState({ validate: nofi });
                updateData({
                  ngaySinh: e,
                  tuoi: tuoi,
                  thangTuoi: tuoi <= 3 ? (ageStr > 0 ? ageStr : null) : null,
                  ngaySinhTime: ngaySinhTime,
                  checkNgaySinh: nofi === 0 ? true : false,
                  chiNamSinh: chiNamSinh,
                });
                if (ngaySinh !== props.ngaySinh)
                  onCheckTrungThongTin(e, "ngaySinh");
              }}
              disabled={disableTiepDon}
              onChange={(e) => update(e, "ngaySinh")}
              placeholder={"Nh???p ng??y th??ng n??m sinh"}
            />
            {validate && validate !== 0 && ngaySinh?.str ? (
              <div className="error">Ng??y sinh sai ?????nh d???ng!</div>
            ) : checkValidate && !props.checkNgaySinh && !ngaySinh?.str ? (
              <div className="error">Vui l??ng nh???p ng??y sinh!</div>
            ) : null}
          </div>
        </Col>
        <Col md={4} xl={4} xxl={4}>
          <div className="item-date">
            <label className="label"> Gi??? sinh</label>
            <TimePicker
              suffixIcon={false}
              placeholder="00:00:00"
              className="item-time"
              value={ngaySinhTime}
              format="HH:mm:ss"
              onChange={(e) => onChange(e, "ngaySinhTime")}
              disabled={disableTiepDon}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-input">
            <label className="label"> Tu???i</label>
            <Input
              value={
                !isNil(thangTuoi) && thangTuoi <= MAX_MONTH_AGE
                  ? `${thangTuoi} th??ng`
                  : tuoi
              }
              disabled
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6} style={{ paddingRight: 0 }}>
          <div className="item-select">
            <label className={!gioiTinh ? `label label-error` : "label"}>
              Gi???i t??nh<span style={{ color: "red" }}> *</span>
            </label>
            <Select
              onChange={(e) => onChange(e, "gioiTinh")}
              value={gioiTinh}
              className="item-male"
              placeholder={"Ch???n gi???i t??nh"}
              data={listgioiTinh}
              disabled={disableTiepDon}
            />
            {checkValidate && !gioiTinh ? (
              <div className="error">Vui l??ng ch???n gi???i t??nh!</div>
            ) : null}
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8} style={{ marginBottom: 14 }}>
          <div className="item-input" style={{ marginBottom: 0 }}>
            <label className="label">S??? nh??/ Th??n/ X??m</label>
            <Input
              placeholder="SN/ Th??n/ X??m"
              value={soNha}
              onChange={(e) => update(e.target.value, "soNha")}
              onBlur={(e) => onBlur(e.target.value, "soNha")}
              disabled={disableTiepDon}
            />
          </div>
          {/* <span
            style={{
              fontStyle: "italic",
              opacity: 0.8,
              fontSize: 12,
              lineHeight: "15px",
            }}
          >
            VD: S??? 8, T??? 28
          </span> */}
        </Col>
        <Col
          md={16}
          xl={16}
          xxl={16}
          style={{ marginBottom: 14, paddingRight: 0 }}
        >
          <div className="item-input" style={{ marginBottom: 0 }}>
            <label className={!diaChi ? `label label-error` : "label"}>
              Ph?????ng/X??, Qu???n/Huy???n, T???nh/TP
              <span style={{ color: "red" }}> *</span>
            </label>
            <AddressFull
              onChange={(e) => setState({ diaChi: e })}
              onBlur={() => onChange(diaChi, "diaChi")}
              placeholder="Ph?????ng/X??, Qu???n/Huy???n, T???nh/Th??nh Ph???"
              value={diaChi}
              selectAddress={onSelectAddress}
              disabled={disableTiepDon}
              onError={onErrorAddress}
            />
          </div>
          {/* <div
            style={{
              fontStyle: "italic",
              opacity: 0.8,
              fontSize: 12,
              lineHeight: "15px",
            }}
          >
            VD: Kh????ng Mai, Thanh Xu??n, H?? N???i
          </div> */}
          {checkValidate && !diaChi ? (
            <div className="error">
              Vui l??ng nh???p Ph?????ng/X??, Qu???n/Huy???n, T???nh/Th??nh Ph???!
            </div>
          ) : null}
        </Col>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-input">
            <label className="label">Email</label>
            <Input
              className="input"
              placeholder="Nh???p email"
              onChange={(e) => onChangeIndex(e.target.value, "email")}
              onBlur={(e) => onChange(e.target.value, "email")}
              value={nbEmail}
              disabled={disableTiepDon}
            />
            <div className="error">
              {nbEmail && !nbEmail?.isEmail()
                ? "Vui l??ng nh???p ????ng ?????nh d???ng ?????a ch??? email!"
                : null}
            </div>
          </div>
        </Col>
        <Col md={12} xl={12} xxl={12}>
          {/* <div className="item"> */}
          <div className="item-select">
            <label
              className={
                !quocTichId ? `label label-error pointer` : "label pointer"
              }
              onClick={() =>
                openInNewTab("/danh-muc/dia-chi-hanh-chinh?level=1")
              }
            >
              Qu???c t???ch<span style={{ color: "red" }}> *</span>
            </label>
            <Select
              onChange={(e) => onChange(e, "quocTichId")}
              value={quocTichId}
              className="select"
              placeholder={"Ch???n qu???c t???ch"}
              data={listAllQuocGia}
              disabled={disableTiepDon}
            />
            {checkValidate && !quocTichId ? (
              <div className="error">Vui l??ng ch???n qu???c t???ch!</div>
            ) : null}
          </div>
          {/* </div> */}
        </Col>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-select">
            <label className="label">Lo???i gi???y t??? t??y th??n</label>
            <Select
              onChange={(e) => onChangeIndex(e, "loaiGiayTo")}
              value={loaiGiayTo}
              className="select"
              placeholder={"Ch???n lo???i gi???y t??? t??y th??n"}
              data={listloaiGiayTo}
              disabled={disableTiepDon}
            />
          </div>
        </Col>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-input">
            <label className="label">M?? s??? gi???y t??? t??y th??n</label>
            <Input
              className="input"
              placeholder="Nh???p m?? s??? gi???y t??? t??y th??n"
              value={maSo}
              onChange={(e) => onChangeIndex(e.target.value, "maSo")}
              onBlur={(e) => onBlur(e.target.value, "maSo")}
              disabled={disableTiepDon}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    tenNb: state.tiepDon.tenNb,
    ngaySinh: state.tiepDon.ngaySinh || "",
    ngaySinhTime:
      state.tiepDon.ngaySinhTime && moment(state.tiepDon.ngaySinhTime),
    tuoi: state.tiepDon.tuoi,
    listAllQuocGia: state.ttHanhChinh.listAllQuocGia || [],
    thangTuoi: state.tiepDon.thangTuoi,
    gioiTinh: state.tiepDon.gioiTinh,
    quocTichId: state.tiepDon.quocTichId,
    soDienThoai: state.tiepDon.soDienThoai,
    listgioiTinh: state.utils.listgioiTinh || [],
    nbTheBaoHiem: state.tiepDon.nbTheBaoHiem || {},
    checkNgaySinh: state.tiepDon.checkNgaySinh || false,
    nbDiaChi: state.tiepDon.nbDiaChi,
    disableTiepDon: state.tiepDon.disableTiepDon,
    dataMacDinh: state.tiepDon.dataMacDinh || {},
    email: state.tiepDon.email,
    nbGiayToTuyThan: state.tiepDon.nbGiayToTuyThan || {},
    listloaiGiayTo: state.utils.listloaiGiayTo || [],
    qrTxt: state.tiepDon.qrTxt || "",
  };
};
export default connect(
  mapStateToProps,
  ({
    ttHanhChinh: { getListAllQuocGia },
    ngheNghiep: { getListAllNgheNghiep },
  }) => ({
    getListAllQuocGia,
    getListAllNgheNghiep,
  })
)(memo(Index));
