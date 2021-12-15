import React, { useRef, useEffect, useState } from "react";
import { Form, Input, Radio } from "antd";
import { connect } from "react-redux";
import actionTtHanhChinh from "@actions/ttHanhChinh";
import "../ttHanhChinh/style.scss";
import { SelectBox } from "@admin/components/admin/Select";
import { withTranslate } from "react-redux-multilingual";
import snackbar from "@utils/snackbar-utils";
function index(props) {
  const {
    translate,
    getFieldDecorator,
    hoVaTen,
    updateData,
    soDienThoai,
    id,
    checkShowPhone,
    soCanCuoc,
    ngaySinh,
    sdtNguoiBaoHo,
    nguoiBaoHo,
    ngheNghiepId,
    dataNgheNghiep,
    quocTichId,
    dataQuocGia,
    gioiTinh,
    checkValidate,
    checkNgaySinh,
    dinhdangngaysinh,
    checkSdt,
    hashTag,
  } = props;
  const refName = useRef();
  const refDate = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (refName.current) refName.current.scrollIntoView({ block: "center" });
    }, 800);
  }, []);
  useEffect(() => {
    if (hashTag === "refThongTinCaNhan") {
      if (!hoVaTen) {
        refName.current.scrollIntoView({ block: "center" });
      } else if (checkNgaySinh || dinhdangngaysinh) {
        refDate.current.scrollIntoView({ block: "center" });
      }
    }
  }, [hashTag]);
  const checkHoVaTen = (rule, value, callback) => {
    if (!value.trim()) {
      callback([new Error(translate("vuilongnhaphovaten"))]);
    } else {
      if (value.length > 255) {
        callback([new Error(translate("hovaten255"))]);
      } else {
        callback();
      }
    }
  };
  const checkSoCanCuoc = (rule, value, callback) => {
    if (!value.trim()) {
      callback();
    } else {
      if (value.length > 12 || value.checkSpecialCharacters()) {
        callback([new Error(translate("checkcancuoc"))]);
      } else {
        callback();
      }
    }
  };
  const checkSoDienThoai = (rule, value, callback) => {
    if (!value) {
      if (rule.field === "sdtNguoiBaoHo") {
        callback();
      } else {
        if (checkSdt == "true") {
          callback([
            new Error(translate("vui_long_nhap_so_dien_thoai") + " !"),
          ]);
        } else {
          callback();
        }
      }
    } else {
      let checkValue = value.replaceAll(" ", "");
      if (checkValue === "0") {
        callback();
      } else {
        if (value.length < 10 || value.length > 18) {
          callback([new Error(translate("checksdt"))]);
        } else {
          if (!checkValue.uintTextBox()) {
            callback([new Error(translate("checksdt"))]);
          } else {
            callback();
          }
        }
      }
    }
  };
  const updateInput = (name, value) => {
    updateData({
      [`${name}`]: value,
      checkButtonSubmit: false,
    });
  };
  return (
    <>
      <p>{translate("thongtincanhan")}</p>
      <Form layout="vertical" hideRequiredMark>
        <div className="row">
          <div className="col" ref={refName}>
            <Form.Item
              label={
                <>
                  <span>{translate("hovaten")}</span>
                  <span style={{ color: "red" }}> *</span>{" "}
                </>
              }
            >
              {getFieldDecorator("hoVaTen", {
                rules: [{ validator: checkHoVaTen }],
                initialValue: hoVaTen ? hoVaTen : "",
              })(
                <Input
                  id="hoVaTen"
                  autoFocus
                  disabled={id ? true : false}
                  autoComplete="off"
                  onChange={(e) => updateInput("hoVaTen", e.target.value)}
                  placeholder={translate("nhaphovaten")}
                />
              )}
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col" ref={refName}>
            <Form.Item
              label={
                <>
                  <span>{translate("sdt")}</span>
                  {checkSdt == "true" ? (
                    <span style={{ color: "red" }}> *</span>
                  ) : null}{" "}
                </>
              }
            >
              {getFieldDecorator("soDienThoai", {
                rules: [{ validator: checkSoDienThoai }],
                initialValue: checkShowPhone(soDienThoai),
              })(
                <Input
                  disabled={id ? true : false}
                  autoComplete="off"
                  onChange={(e) => updateInput("soDienThoai", e.target.value)}
                  placeholder={translate("nhapsdt")}
                />
              )}
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Form.Item label={translate("cmt")}>
              {getFieldDecorator("soCanCuoc", {
                rules: [{ validator: checkSoCanCuoc }],
                initialValue: soCanCuoc,
              })(
                <Input
                  id="soCanCuoc"
                  disabled={id ? true : false}
                  autoComplete="off"
                  onChange={(e) => updateInput("soCanCuoc", e.target.value)}
                  placeholder={translate("nhapcmt")}
                />
              )}
            </Form.Item>
          </div>
        </div>
        <div className="row address" ref={refDate}>
          <div
            className={
              (checkValidate && checkNgaySinh) || dinhdangngaysinh
                ? "col border-color-error"
                : "col"
            }
          >
            <div className="address-title">
              {translate("ngaysinh")} <span style={{ color: "red" }}> *</span>
            </div>
            <Input
              id="ngaySinh"
              disabled={id ? true : false}
              autoComplete="off"
              onChange={(e) => updateData({ ngaySinh: e.target.value })}
              value={ngaySinh}
              placeholder={translate("nhapngaysinh")}
              onBlur={() => {
                if (ngaySinh) {
                  ngaySinh
                    .completeDate(new Date(), null)
                    .then((date) => {
                      updateData({
                        ngaySinh: date.format("dd/MM/yyyy"),
                        checkNgaySinh: false,
                        dinhdangngaysinh: false,
                        checkButtonSubmit: false,
                      });
                    })
                    .catch(() => {
                      updateData({ dinhdangngaysinh: true });
                    });
                } else {
                  updateData({ ngaySinh: null });
                }
              }}
            />
          </div>
          {checkValidate && checkNgaySinh ? (
            <label className="error">{translate("vuilongnhapngaysinh")}</label>
          ) : dinhdangngaysinh ? (
            <label className="error">{translate("dungdinhdangngay")}</label>
          ) : null}
        </div>
        <div className="row">
          <div className="col">
            <Form.Item
              name="radio-group"
              label={
                <>
                  <span>{translate("gioitinh")}</span>
                  <span style={{ color: "red" }}> *</span>
                </>
              }
            >
              {getFieldDecorator("gioiTinh", {
                rules: [
                  {
                    required: true,
                    message: translate("chongioitinh"),
                  },
                ],
                initialValue: gioiTinh,
              })(
                <Radio.Group disabled={id ? true : false}>
                  <Radio
                    value="2"
                    onClick={(e) => updateInput("gioiTinh", e.target.value)}
                  >
                    {translate("nu")}
                  </Radio>
                  <Radio
                    value="1"
                    onClick={(e) => updateInput("gioiTinh", e.target.value)}
                  >
                    {translate("nam")}
                  </Radio>
                </Radio.Group>
              )}
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col" style={{ marginBottom: 20 }}>
            <Form.Item
              label={
                <>
                  <span>{translate("quoctich")}</span>
                  <span style={{ color: "red" }}> *</span>
                </>
              }
            >
              {getFieldDecorator("quocTichId", {
                rules: [
                  {
                    required: true,
                    message: translate("chonquoctich"),
                  },
                ],
                initialValue: quocTichId,
              })(
                <SelectBox
                  isDisabled={id ? true : false}
                  listOption={dataQuocGia}
                  placeholder={translate("chonquoctich")}
                  selected={quocTichId}
                  getIdObject={(item) => {
                    return item.id;
                  }}
                  getLabelObject={(item) => {
                    return item.ten;
                  }}
                  onChangeSelect={(lists, ids) =>
                    updateInput("quocTichId", ids)
                  }
                  id="quocTichId"
                  name="quocTichId"
                />
              )}
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col" style={{ marginBottom: 20 }}>
            <Form.Item label={translate("nghenghiep")}>
              <SelectBox
                isDisabled={id ? true : false}
                listOption={dataNgheNghiep}
                placeholder={translate("chonnghenghiep")}
                selected={ngheNghiepId}
                getIdObject={(item) => {
                  return item.id;
                }}
                getLabelObject={(item) => {
                  return item.ten;
                }}
                onChangeSelect={(lists, ids) =>
                  updateInput("ngheNghiepId", ids)
                }
                value={ngheNghiepId}
                id="ngheNghiepId"
                name="ngheNghiepId"
              />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Form.Item label={translate("nguoibaoho")}>
              <Input
                disabled={id ? true : false}
                autoComplete="off"
                onChange={(e) => updateInput("nguoiBaoHo", e.target.value)}
                value={nguoiBaoHo}
                placeholder={translate("nhaphovatennguoibaoho")}
              />
            </Form.Item>
          </div>
          <div className="col-12">
            <Form.Item label={translate("sdtnguoibaoho")}>
              {getFieldDecorator("sdtNguoiBaoHo", {
                rules: [{ validator: checkSoDienThoai }],
                initialValue: checkShowPhone(sdtNguoiBaoHo),
              })(
                <Input
                  disabled={id ? true : false}
                  autoComplete="off"
                  onChange={(e) => updateInput("sdtNguoiBaoHo", e.target.value)}
                  placeholder={translate("nhapsdt")}
                />
              )}
            </Form.Item>
          </div>
        </div>
      </Form>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    id: state.ttHanhChinh.id,
    dinhdangngaysinh: state.ttHanhChinh.dinhdangngaysinh,
    checkNgaySinh: state.ttHanhChinh.checkNgaySinh,
    checkValidate: state.ttHanhChinh.checkValidate,
    hoVaTen: state.ttHanhChinh.hoVaTen || "",
    soCanCuoc: state.ttHanhChinh.soCanCuoc || "",
    ngaySinh: state.ttHanhChinh.ngaySinh || null,
    ngheNghiepId: state.ttHanhChinh.ngheNghiepId || "",
    nguoiBaoHo: state.ttHanhChinh.nguoiBaoHo || "",
    gioiTinh:
      (state.ttHanhChinh.gioiTinh && state.ttHanhChinh.gioiTinh.toString()) ||
      "1",
    soDienThoai: state.ttHanhChinh.soDienThoai || "",
    sdtNguoiBaoHo: state.ttHanhChinh.sdtNguoiBaoHo || "",
    quocTichId: state.ttHanhChinh.quocTichId || 22,
    quanHuyenId: state.ttHanhChinh.quanHuyenId || "",
    dataQuocGia: state.address.data || [],
    dataNgheNghiep: state.report.dataNgheNghiep,
    hashTag: state.ttHanhChinh.hashTag,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateData: (event) => dispatch(actionTtHanhChinh.updateData(event)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(withTranslate(index)));
