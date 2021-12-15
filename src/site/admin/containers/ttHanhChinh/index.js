import React, { useState, useEffect } from "react";
import { Form, Button, Input, Radio } from "antd";
import { connect } from "react-redux";
import actionTtHanhChinh from "@actions/ttHanhChinh";
import actionReport from "@actions/report";
import actionAddress from "@actions/address";
import { AdminPage, Panel } from "@admin/components/admin";
import "./style.scss";
// import { saveAs } from 'file-saver';
import { SelectBox } from "@admin/components/admin/Select";
import { withTranslate } from "react-redux-multilingual";
import settingProvider from "@data-access/setting-provider";
import actionSetting from "@actions/setting";
function index(props) {
  const { translate, onSearchSetting, auth, clickMenu, clearData } = props;
  const { getFieldDecorator, resetFields } = props.form;
  const [state, _setState] = useState({
    checkValidate: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    if (clickMenu) {
      clearData();
      resetFields();
      props.updateData({ clickMenu: false });
    }
    props.onQuocGia(0);
    props.onSearchTinhTp(0, 9999);
    props.searchNgheNghiep();
  }, []);

  useEffect(() => {
    onSearchSetting(auth.donViId);
  }, [auth.donViId]);
  useEffect(() => {
    try {
      let checkSdt = settingProvider.getValue(
        props.dataSetting,
        "yeu_cau_so_dien_thoai",
        ""
      );
      setState({
        checkSdt,
      });
    } catch (error) {}
  }, [props.dataSetting]);

  const handleSubmit = (e) => {
    if (
      props.quanHuyenId &&
      props.xaPhuongId &&
      props.tinhThanhPhoId &&
      props.ngaySinh
    ) {
      setState({
        checkValidate: false,
      });
    } else {
      setState({
        checkValidate: true,
      });
    }
    if (!props.ngaySinh) {
      setState({
        checkNgaySinh: true,
      });
    }
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (
        !err &&
        props.quanHuyenId &&
        props.xaPhuongId &&
        props.tinhThanhPhoId &&
        props.ngaySinh &&
        !state.dinhdangngaysinh
      ) {
        props.createOrEdit().then((s) => {
          toggleDownload(s.qr, s.hoVaTen);
        });
      }
    });
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
        if (state.checkSdt == "true") {
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
  const checkShowPhone = (value) => {
    let checkValue = value.replaceAll(" ", "");
    let number = checkValue.slice(0, 4);
    let match = checkValue.slice(4, checkValue.length);
    var parts = [number];
    for (let i = 0, len = match.length; i < len; i += 3) {
      parts.push(match.substring(i, i + 3));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };
  const toggleDownload = (data, name) => {
    var a = document.createElement("a");
    a.href = "data:application/octet-stream;base64," + data;
    a.accept = "image/png";
    a.download = `"iVisitor_"${name}.png`;
    a.click();
  };
  const reset = () => {
    props.updateData({
      id: "",
      hoVaTen: "",
      soCanCuoc: "",
      ngaySinh: null,
      gioiTinh: "1",
      quocTichId: 22,
      tinhThanhPhoId: "",
      quanHuyenId: "",
      xaPhuongId: "",
      soNha: "",
      qr: "",
      soDienThoai: "",
      sdtNguoiBaoHo: "",
      ma: "",
      ngheNghiepId: "",
      nguoiBaoHo: "",
      dataXaPhuong: [],
      dataQuanHuyen: [],
    });
    props.history.push(translate("thongtinhanhchinhherf"));
  };
  const copyInfo = () => {
    props.updateData({
      id: "",
      hoVaTen: "",
      soCanCuoc: "",
      ma: "",
      qr: "",
    });
    props.history.push(translate("thongtinhanhchinhherf"));
  };

  return (
    <AdminPage
      className="mgr-form-types"
      icon="subheader-icon fal fa-window"
      header={translate("qr")}
      subheader="   "
    >
      <div className="button-reset">
        <Button
          className="button btn-create waves-effect"
          onClick={() => copyInfo()}
        >
          {translate("saochepthongtin")}
        </Button>
        <Button
          className="button btn-create waves-effect"
          onClick={() => reset()}
        >
          {translate("lammoi")}
        </Button>
      </div>
      <div className="row">
        <div className="col-lg-4 ui-sortable sortable-grid">
          <Panel
            id={"mgr-info"}
            allowClose={false}
            // allowCollapse={false}
            title={translate("thongtincanhan")}
          >
            <Form layout="vertical" hideRequiredMark>
              <div className="row">
                <div className="col">
                  <Form.Item
                    label={
                      <>
                        <span>{translate("hovaten")}</span>
                        <span style={{ color: "red" }}> *</span>{" "}
                      </>
                    }
                  >
                    {getFieldDecorator("hoVaTen", {
                      rules: [
                        {
                          required: true,
                          message: translate("vuilongnhaphovaten"),
                        },
                      ],
                      initialValue: props.hoVaTen ? props.hoVaTen : "",
                    })(
                      <Input
                        disabled={props.id ? true : false}
                        autoComplete="off"
                        onChange={(e) => {
                          props.updateData({ hoVaTen: e.target.value });
                        }}
                        placeholder={translate("nhaphovaten")}
                      />
                    )}
                  </Form.Item>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <Form.Item
                    label={
                      <>
                        <span>{translate("sdt")}</span>
                        {state.checkSdt == "true" ? (
                          <span style={{ color: "red" }}> *</span>
                        ) : null}{" "}
                      </>
                    }
                  >
                    {getFieldDecorator("soDienThoai", {
                      rules: [{ validator: checkSoDienThoai }],
                      initialValue: checkShowPhone(props.soDienThoai),
                    })(
                      <Input
                        autoComplete="off"
                        onChange={(e) => {
                          props.updateData({ soDienThoai: e.target.value });
                        }}
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
                      initialValue: props.soCanCuoc,
                    })(
                      <Input
                        disabled={props.id ? true : false}
                        autoComplete="off"
                        onChange={(e) => {
                          props.updateData({ soCanCuoc: e.target.value });
                        }}
                        placeholder={translate("nhapcmt")}
                      />
                    )}
                  </Form.Item>
                </div>
              </div>
              <div className="row address">
                <div className="col">
                  <div className="address-title">
                    {translate("ngaysinh")}{" "}
                    <span style={{ color: "red" }}> *</span>
                  </div>
                  <Input
                    autoComplete="off"
                    onChange={(e) =>
                      props.updateData({ ngaySinh: e.target.value })
                    }
                    value={props.ngaySinh}
                    placeholder={translate("nhapngaysinh")}
                    onBlur={() => {
                      if (props.ngaySinh) {
                        props.ngaySinh
                          .completeDate(new Date(), null)
                          .then((date) => {
                            setState({
                              checkNgaySinh: false,
                              dinhdangngaysinh: false,
                            });
                            props.updateData({
                              ngaySinh: date.format("dd/MM/yyyy"),
                            });
                          })
                          .catch(() => {
                            setState({
                              dinhdangngaysinh: true,
                            });
                          });
                      } else {
                        props.updateData({
                          ngaySinh: null,
                        });
                      }
                    }}
                  />
                </div>
                {state.checkValidate && state.checkNgaySinh ? (
                  <label className="error">
                    {translate("vuilongnhapngaysinh")}
                  </label>
                ) : state.dinhdangngaysinh ? (
                  <label className="error">
                    {translate("dungdinhdangngay")}
                  </label>
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
                      initialValue: props.gioiTinh,
                    })(
                      <Radio.Group>
                        <Radio
                          value="2"
                          onClick={(e) =>
                            props.updateData({ gioiTinh: e.target.value })
                          }
                        >
                          {translate("nu")}
                        </Radio>
                        <Radio
                          value="1"
                          onClick={(e) =>
                            props.updateData({ gioiTinh: e.target.value })
                          }
                        >
                          {translate("nam")}
                        </Radio>
                      </Radio.Group>
                    )}
                  </Form.Item>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
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
                      initialValue: props.quocTichId,
                    })(
                      <SelectBox
                        listOption={props.dataQuocGia}
                        placeholder={translate("chonquoctich")}
                        selected={props.quocTichId}
                        getIdObject={(item) => {
                          return item.id;
                        }}
                        getLabelObject={(item) => {
                          return item.ten;
                        }}
                        onChangeSelect={(lists, ids) => {
                          props.updateData({
                            quocTichId: ids,
                          });
                        }}
                        id="quocTichId"
                        name="quocTichId"
                      />
                    )}
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <Form.Item label={translate("nghenghiep")}>
                    {getFieldDecorator("ngheNghiepId", {
                      initialValue: props.ngheNghiepId,
                    })(
                      <SelectBox
                        listOption={props.dataNgheNghiep}
                        placeholder={translate("chonnghenghiep")}
                        selected={props.ngheNghiepId}
                        getIdObject={(item) => {
                          return item.id;
                        }}
                        getLabelObject={(item) => {
                          return item.ten;
                        }}
                        onChangeSelect={(lists, ids) => {
                          props.updateData({
                            ngheNghiepId: ids,
                          });
                        }}
                        id="ngheNghiepId"
                        name="ngheNghiepId"
                      />
                    )}
                  </Form.Item>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <Form.Item label={translate("nguoibaoho")}>
                    {getFieldDecorator("nguoiBaoHo", {
                      initialValue: props.nguoiBaoHo,
                    })(
                      <Input
                        autoComplete="off"
                        onChange={(e) =>
                          props.updateData({ nguoiBaoHo: e.target.value })
                        }
                        placeholder={translate("nhaphovatennguoibaoho")}
                      />
                    )}
                  </Form.Item>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <Form.Item label={translate("sdtnguoibaoho")}>
                    {getFieldDecorator("sdtNguoiBaoHo", {
                      rules: [{ validator: checkSoDienThoai }],
                      initialValue: checkShowPhone(props.sdtNguoiBaoHo),
                    })(
                      <Input
                        autoComplete="off"
                        onChange={(e) =>
                          props.updateData({ sdtNguoiBaoHo: e.target.value })
                        }
                        placeholder={translate("nhapsdt")}
                      />
                    )}
                  </Form.Item>
                </div>
              </div>
            </Form>
          </Panel>
        </div>
        <div className="col-lg-4 ui-sortable sortable-grid">
          <Panel
            id={"mgr-info2"}
            allowClose={false}
            title={translate("diachivn")}
          >
            <Form layout="vertical" hideRequiredMark>
              <div className="row address">
                <div className="col">
                  <div className="address-title">
                    {translate("tp")} <span style={{ color: "red" }}> *</span>
                  </div>
                  <SelectBox
                    listOption={[
                      { id: "", ten: translate("chontp") },
                      ...props.dataTinhTp,
                    ]}
                    placeholder={translate("chontp")}
                    selected={props.tinhThanhPhoId}
                    getIdObject={(item) => {
                      return item.id;
                    }}
                    getLabelObject={(item) => {
                      return item.ten;
                    }}
                    onChangeSelect={(lists, ids) => {
                      props.updateDataAddress({
                        dataQuanHuyen: [],
                        dataXaPhuong: [],
                      });
                      props.updateData({
                        tinhThanhPhoId: ids,
                        quanHuyenId: "",
                        xaPhuongId: "",
                      });
                      props.onSearchQuanHuyen(ids);
                    }}
                    id="tinhThanhPhoId"
                    name="tinhThanhPhoId"
                    validates={
                      state.checkValidate && !props.tinhThanhPhoId
                        ? translate("vuilongchonTP")
                        : null
                    }
                  />
                </div>
              </div>
              <div className="row address">
                <div className="col">
                  <div className="address-title">
                    {translate("huyen")}{" "}
                    <span style={{ color: "red" }}> *</span>
                  </div>
                  <SelectBox
                    listOption={[
                      { id: "", ten: translate("chonhuyen") },
                      ...props.dataQuanHuyen,
                    ]}
                    placeholder={translate("chonhuyen")}
                    selected={props.quanHuyenId}
                    getIdObject={(item) => {
                      return item.id;
                    }}
                    getLabelObject={(item) => {
                      return item.ten;
                    }}
                    onChangeSelect={(lists, ids) => {
                      props.updateDataAddress({
                        dataXaPhuong: [],
                      });
                      props.updateData({
                        quanHuyenId: ids,
                        xaPhuongId: "",
                      });
                      props.onSearchXaPhuong(ids);
                    }}
                    id="quanHuyenId"
                    name="quanHuyenId"
                    validates={
                      state.checkValidate && !props.quanHuyenId
                        ? translate("vuilongchonhuyen")
                        : null
                    }
                  />
                </div>
              </div>
              <div className="row address">
                <div className="col">
                  <div className="address-title">
                    {translate("xa")} <span style={{ color: "red" }}> *</span>
                  </div>
                  <SelectBox
                    listOption={[
                      { id: "", ten: translate("chonxa") },
                      ...props.dataXaPhuong,
                    ]}
                    placeholder={translate("chonxa")}
                    selected={props.xaPhuongId}
                    getIdObject={(item) => {
                      return item.id;
                    }}
                    getLabelObject={(item) => {
                      return item.ten;
                    }}
                    onChangeSelect={(lists, ids) => {
                      props.updateData({
                        xaPhuongId: ids,
                      });
                    }}
                    id="xaPhuongId"
                    name="xaPhuongId"
                    validates={
                      state.checkValidate && !props.xaPhuongId
                        ? translate("vuilongchonxa")
                        : null
                    }
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <Form.Item
                    label={
                      <>
                        <span>{translate("sonha")}</span>
                        <span style={{ color: "red" }}> *</span>
                      </>
                    }
                  >
                    {getFieldDecorator("soNha", {
                      rules: [
                        {
                          required: true,
                          message: translate("vuilongnhapsonha"),
                        },
                      ],
                      initialValue: props.soNha,
                    })(
                      <Input
                        autoComplete="off"
                        onChange={(e) =>
                          props.updateData({ soNha: e.target.value })
                        }
                        placeholder={translate("nhapsonha")}
                      />
                    )}
                  </Form.Item>
                </div>
              </div>
            </Form>
          </Panel>
          <div className="button-submit">
            <Button className="button" onClick={handleSubmit}>
              {translate("qr")}
            </Button>
          </div>
        </div>
        <div className="col-lg-4 ui-sortable sortable-grid">
          <Panel
            id={"mgr-info3"}
            allowClose={false}
            title={translate("thongtinqr")}
          >
            {props.qr ? (
              <>
                <img
                  style={{ width: "100%", paddingBottom: 63, paddingTop: 20 }}
                  src={"data:image/jpeg;base64," + props.qr}
                />
                <div className="button-submit button-hide">
                  <Button
                    className="button"
                    onClick={() => {
                      toggleDownload(props.qr, props.hoVaTen);
                    }}
                  >
                    {translate("luuqr")}
                  </Button>
                </div>
              </>
            ) : null}
          </Panel>
        </div>
      </div>
    </AdminPage>
  );
}

export default connect(
  (state) => {
    return {
      auth: (state.auth && state.auth.auth) || {},
      data: state.ttHanhChinh.data || [],
      size: state.ttHanhChinh.size || 10,
      page: state.ttHanhChinh.page || 1,
      total: state.ttHanhChinh.total || 0,
      id: state.ttHanhChinh.id,
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
      qr: state.ttHanhChinh.qr || "",
      quocTichId: state.ttHanhChinh.quocTichId || 22,
      soNha: state.ttHanhChinh.soNha || "",
      tinhThanhPhoId: state.ttHanhChinh.tinhThanhPhoId || "",
      quanHuyenId: state.ttHanhChinh.quanHuyenId || "",
      xaPhuongId: state.ttHanhChinh.xaPhuongId || "",
      dataQuocGia: state.address.data || [],
      dataTinhTp: state.address.dataTinhTp || [],
      dataQuanHuyen: state.address.dataQuanHuyen || [],
      dataXaPhuong: state.address.dataXaPhuong || [],
      dataNgheNghiep: state.report.dataNgheNghiep,
      clickMenu: state.ttHanhChinh.clickMenu,
      dataSetting: state.setting.data || [],
    };
  },
  {
    updateData: actionTtHanhChinh.updateData,
    updateDataAddress: actionAddress.updateData,
    onSizeChange: actionTtHanhChinh.onSizeChange,
    gotoPage: actionTtHanhChinh.gotoPage,
    createOrEdit: actionTtHanhChinh.createOrEdit,
    onQuocGia: actionAddress.onSearchQuocGia,
    onSearchQuanHuyen: actionAddress.onSearchQuanHuyen,
    onSearchTinhTp: actionAddress.onSearchTinhTp,
    onSearchXaPhuong: actionAddress.onSearchXaPhuong,
    reset: actionTtHanhChinh.reset,
    searchNgheNghiep: actionReport.searchNgheNghiep,
    onSearchSetting: actionSetting.onSearch,
    clearData: actionTtHanhChinh.clearData,
  }
)(Form.create()(withTranslate(index)));
