import React, { memo, useState, useEffect, useRef } from "react";
import { compose } from "redux";
import { connect, useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { Col, Row, Input, Form, Radio } from "antd";
import { Main, PopoverWrapper, GlobalStyle, InputSearch } from "./styled";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import DOBInput from "components/DOBInput";
import { MAX_MONTH_AGE } from "components/TiepDon/ThongTinTiepDon/configs";

import { isNil } from "lodash";
import AddressFull from "components/AddressFull";

const ThemMoi = ({layerId, ...props}) => {
  const [form] = Form.useForm();
  const tuoi = useSelector(state => state.themMoiThuoc.tuoi)
  const thangTuoi = useSelector(state => state.themMoiThuoc.thangTuoi)
  const checkValidate = useSelector(state => state.themMoiThuoc.checkValidate)
  const nbDotDieuTri = useSelector(state => state.themMoiThuoc.nbDotDieuTri)
  const nbDiaChi = useSelector(state => state.themMoiThuoc?.nbDotDieuTri?.nbDiaChi || "")
  const nbNguoiBaoLanh = useSelector(state => state.themMoiThuoc?.nbDotDieuTri?.nbNguoiBaoLanh || "")
  const ngaySinhTime = useSelector(state => state.themMoiThuoc?.ngaySinhTime || "")
  const ngaySinh = useSelector(state => state.themMoiThuoc?.ngaySinh)
  const updateData = useDispatch().themMoiThuoc.updateData
  const resetModel = useDispatch().themMoiThuoc.resetModel

  const { onRegisterHotkey } = useDispatch().phimTat;
  const refHoTen = useRef();

  const [state, _setState] = useState({
    diaChi: "",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const {
    diaChi,
    tenNb,
    // ngaySinh,
    validate,
    soDienThoai,
    soBaoHiemXaHoi,
    soNha,
    diaChiNuocNgoai,
    sdtNguoiBaoLanh,
    hoTenNguoiBaoLanh,
    gioiTinh
  } = state;
  const onChange = (value, variables) => {
    let newData = { [`${variables}`]: value };
    // if (variables === "doiTuong" && value) {
    //   newData.loaiDoiTuongId = null;
    //   if (value === 1) newData.nbTheBaoHiem = {};
    //   getListAllLoaiDoiTuong({ doiTuong: value });
    // }
    // if (variables === "anhMatTruoc" || variables === "anhMatSau") {
    //   props.nbGiayToTuyThan[`${variables}`] = value;
    //   newData.nbGiayToTuyThan = { ...props.nbGiayToTuyThan };
    // }
    // updateData(newData);
    // if (variables == "gioiTinh") {
    //   onCheckTrungThongTin(value, variables);
    // }
  };
  const {
    // onChange,
    // selectAddress,
    // quocTichId,
    // listAllNgheNghiep,
    // checkValidate,
    // nbDiaChi,
    // disableTiepDon,
    // ngaySinhTime,
    // tuoi,
    // thangTuoi,
    // gioiTinh,
    // ngheNghiepId,
    // listgioiTinh,
    // listAllQuocGia,
    // onCheckTrungThongTin,
    // daXacThucThongTin,
  } = props;
  // useEffect(() => {

  //   // updateData({ [`${variables}`]: value });
  // }, [state])
  const update = (value, variables) => {
    setState({ [`${variables}`]: value });
    if (
      variables === "tenNb" ||
      variables === "gioiTinh" ||
      variables === "tuoi" ||
      variables === "soDienThoai" ||
      variables === "tenNb"
    ) {
      updateData({
        nbDotDieuTri: {
          ...nbDotDieuTri,
          [`${variables}`]: value
        }
      });
    } else if (variables === "soNha") {
      updateData({
        nbDotDieuTri: {
          ...nbDotDieuTri,
          nbDiaChi: {
            ...nbDiaChi,
            [`${variables}`]: value
          }
        }
      });
    } else if (variables === "sdtNguoiBaoLanh" || variables === "hoTenNguoiBaoLanh") {
      let keyCustom = variables === "hoTenNguoiBaoLanh" ? "hoTen" : "soDienThoai"
      updateData({
        nbDotDieuTri: {
          ...nbDotDieuTri,
          nbNguoiBaoLanh: {
            ...nbNguoiBaoLanh,
            [`${keyCustom}`]: value
          }
        }
      });
    } else {
      updateData({ [`${variables}`]: value });
    }
  };
  const selectAddress = async (data) => {
    let address = {};
    if (data?.tinhThanhPho && data?.quanHuyen) {
      address = {
        ...props.nbDiaChi,
        tinhThanhPhoId: data?.tinhThanhPho?.id,
        quanHuyenId: data?.quanHuyen?.id,
        xaPhuongId: data?.id,
        diaChi: data?.displayText,
      };
    } else if (data?.tinhThanhPho) {
      address = {
        ...props.nbDiaChi,
        tinhThanhPhoId: data?.tinhThanhPho?.id,
        quanHuyenId: data?.id,
        diaChi: data?.displayText,
      };
    } else {
      address = {
        ...props.nbDiaChi,
        tinhThanhPhoId: data?.id,
        diaChi: data?.displayText,
      };
    }
    updateData({
      nbDotDieuTri: {
        ...nbDotDieuTri,
        nbDiaChi: {
          ...nbDiaChi,
          ...address
        },
      }
    });
    // onCheckTrungThongTin(address, "diaChi");
  };
  const checkGender = (value) => {
    let dataTen = value.toUpperCase();
    let genderVan = dataTen.search("V??N");
    let genderThi = dataTen.search("TH???");
    let valueGender = ""
    if (genderVan >= 0 && genderThi < 0) {
      // updateData({ gioiTinh: 1 });
      updateData({
        nbDotDieuTri: {
          ...nbDotDieuTri,
          gioiTinh: 1,
        }
      });
      valueGender = 1
    } else if (genderThi >= 0) {
      updateData({
        nbDotDieuTri: {
          ...nbDotDieuTri,
          gioiTinh: 2,
        }
      });
      valueGender = 2
    } else {
      updateData({
        nbDotDieuTri: {
          ...nbDotDieuTri,
          gioiTinh: "",
        }
      });
    }
    setState({ gioiTinh: valueGender });
  };
  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 114, //F3
          onEvent: () => {
            refHoTen.current && refHoTen.current.focus();
          },
        }
      ],
    });
    return () => {
      resetModel()
      updateData({
        nbDotDieuTri: {
          "nbDiaChi": {
            "quocGiaId": 1,
            "quocTichId": 1
          }
        },
      })
    }
  }, [])
  // const update = (value, variables) => {
  //   setState({ [`${variables}`]: value });
  // };
  const onBlur = (value, variables) => {
    // if (variables === "diaChiNuocNgoai" || variables === "soNha") {
    //   let data = nbDiaChi || {};
    //   data[`${variables}`] = value;
    //   updateData({ nbDiaChi: { ...data } });
    // } else onChange(value, variables);
    if (variables === "tenNb") checkGender(value);
    // if (
    //   variables === "tenNb" ||
    //   variables === "diaChi" ||
    //   variables === "soDienThoai"
    // ) {
    //   onCheckTrungThongTin(value, variables);
    // }
    // if (variables === "soDienThoai")
    //   updateData({ soDienThoai: formatPhone(value)?.trim() });
  };
  return (
    <Main className="them-moi">
      <div className="body-info">
        <Form form={form} layout="horizontal">
          {/* <Row className="info-full"> */}
          <div className="title">Th??ng tin kh??ch h??ng </div>
          <Row>
            <Row justify={"space-between"} style={{ width: '100%' }}>
              <Col span={8} className="form-item">
                <div className="item-input paddingLeft" style={{ marginLeft: 10 }}>
                  <Input
                    ref={refHoTen}
                    placeholder={`H??? v?? t??n`}
                    value={tenNb}
                    style={{ textTransform: "uppercase" }}
                    onChange={(e) => update(e.target.value, "tenNb")}
                    onBlur={(e) => onBlur(e.target.value, "tenNb")}
                  // disabled={disableTiepDon}
                  />
                  {!nbDotDieuTri?.tenNb && (
                    <span
                      style={{ position: "absolute", left: 97, color: "red" }}
                    >*</span>
                  )}
                  {/* <span class="floating-label">H??? v?? t??n</span> */}
                  {/* {checkValidate && !tenNb ? (
                    <div className="error">Vui l??ng nh???p t??n ng?????i b???nh!</div>
                  ) : null} */}
                </div>
              </Col>

              <Col className="form-item" span={8}>
                <div className="paddingLeft" style={{ marginLeft: 10 }}>
                  <Radio.Group value={gioiTinh || 1} onChange={(e) => update(e.target.value, "gioiTinh")}>
                    <Radio value={1}>Nam</Radio>
                    <Radio value={2}>N???</Radio>
                  </Radio.Group>
                </div>
              </Col>

              <Col span={8} className="form-item" >
                <div className="paddingLeft" style={{ marginLeft: 10 }}>
                  <Input
                    placeholder="S??? ??i???n tho???i:"
                    autoFocus
                    value={soDienThoai}
                    onChange={(e) => update(e.target.value, "soDienThoai")}
                    onBlur={(e) => onBlur(e.target.value, "soDienThoai")}
                  />
                  {soDienThoai && !soDienThoai.replaceAll(" ", "").isPhoneNumber() ? (
                    <div className="error">S??? ??i???n tho???i sai ?????nh d???ng!</div>
                  ) : null}
                </div>
              </Col>
            </Row>

            <Row justify={"space-between"} style={{ width: '100%' }}>
              <Col span={8} className="form-item" >
                <div className="paddingLeft" style={{ marginLeft: 10 }}>
                  <Input
                    placeholder="SN/ Th??n/ X??m"
                    value={soNha}
                    onChange={(e) => update(e.target.value, "soNha")}
                    onBlur={(e) => onBlur(e.target.value, "soNha")}
                  // disabled={disableTiepDon}
                  // onChange={onChange("qrBN", true)}
                  // onKeyDown={onKeyDown}
                  />
                </div>
              </Col>
              <Col span={8} className="form-item" >
                {/* <div className="item-input" style={{ marginBottom: 0 }}> */}
                {/* <label className={!diaChi ? `label label-error` : "label"}>
                    Ph?????ng/X??, Qu???n/Huy???n, T???nh/TP
              <span style={{ color: "red" }}> *</span>
                  </label> */}
                <AddressFull
                  className="form-item_address"
                  onChange={(e) => setState({ diaChi: e })}
                  onBlur={() => onChange(diaChi, "diaChi")}
                  placeholder="Ph?????ng/X??, Qu???n/Huy???n, T???nh/Th??nh Ph???"
                  value={diaChi}
                  selectAddress={selectAddress}
                // disabled={disableTiepDon}
                >
                  {!diaChi && (
                    <span
                      style={{ position: "absolute", left: 280, color: "red" }}
                    >*</span>
                  )}
                </AddressFull>
                {/* </div> */}
                <div
                  style={{
                    fontStyle: "italic",
                    opacity: 0.8,
                    fontSize: 12,
                    lineHeight: "15px",
                    paddingLeft: "10px"
                  }}
                >
                  VD: Kh????ng Mai, Thanh Xu??n, H?? N???i
                </div>
                {checkValidate && !diaChi ? (
                  <div className="error">
                    Vui l??ng nh???p Ph?????ng/X??, Qu???n/Huy???n, T???nh/Th??nh Ph???!
                  </div>
                ) : null}
              </Col>

              <Col span={8} className="form-item" >
                <div className="paddingLeft" style={{ marginLeft: 10 }}>
                  <Input
                    placeholder="Ng?????i b???o l??nh"
                    value={hoTenNguoiBaoLanh}
                    // autoFocus
                    onChange={(e) => update(e.target.value, "hoTenNguoiBaoLanh")}
                    onBlur={() => update(hoTenNguoiBaoLanh, "hoTenNguoiBaoLanh")}
                  // onChange={onChange("qrBN", true)}
                  // onKeyDown={onKeyDown}
                  />
                </div>
              </Col>
            </Row>

            <Row justify={"space-between"} style={{ width: '100%' }}>
              <Col span={8} className="form-item"  >
                <div className="paddingLeft" style={{ marginLeft: 10 }}>
                  {!ngaySinh && (
                    <span
                      style={{ position: "absolute", left: 173, color: "red" , zIndex: 1 }}
                    >*</span>
                  )}
                  <DOBInput
                    className="item-born"
                    value={ngaySinh || ""}
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
                      // onCheckTrungThongTin(e, "ngaySinh");
                    }}
                    // disabled={disableTiepDon}
                    onChange={(e) => update(e, "ngaySinh")}
                    placeholder={"Ng??y sinh (dd/mm/yyyy)"}
                  />
                  {validate && validate !== 0 && ngaySinh?.str ? (
                    <div className="error">Ng??y sinh sai ?????nh d???ng!</div>
                  ) : checkValidate && !props.checkNgaySinh && !ngaySinh?.str ? (
                    <div className="error">Vui l??ng nh???p ng??y sinh!</div>
                  ) : null}
                </div>
              </Col>

              <Col span={8} className="form-item" >
                <div className="paddingLeft" style={{ marginLeft: 10 }}>
                  <div className="item-input">
                    <Input
                      value={
                        !isNil(thangTuoi) && thangTuoi <= MAX_MONTH_AGE
                          ? `${thangTuoi} th??ng`
                          : tuoi
                      }
                      placeholder="Tu???i"
                      // onChange={(e) => setState({ diaChi: e })}
                      // onBlur={() => update(tuoi, "tuoi")}
                      disabled
                    />
                  </div>
                </div>
              </Col>

              <Col span={8} className="form-item" >
                <div className="paddingLeft" style={{ marginLeft: 10 }}>
                  <Input
                    placeholder="S??T ng?????i b???o l??nh"
                    value={sdtNguoiBaoLanh}
                    onChange={(e) => setState({ sdtNguoiBaoLanh: e.target.value })}
                    onBlur={() => update(sdtNguoiBaoLanh, "sdtNguoiBaoLanh")}
                  // onChange={onChange("qrBN", true)}
                  // onKeyDown={onKeyDown}
                  />
                  {sdtNguoiBaoLanh && !sdtNguoiBaoLanh.replaceAll(" ", "").isPhoneNumber() ? (
                    <div className="error">S??T ng?????i b???o l??nh sai ?????nh d???ng!</div>
                  ) : null}
                </div>
              </Col>
            </Row>
          </Row>
          {/* </Row> */}
        </Form>
      </div>
    </Main>
  );
};
const mapStateToProps = (state) => { };
const mapDispatchToProps = ({ tiepDon: { updateData, getDetail } }) => ({

});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ThemMoi);
