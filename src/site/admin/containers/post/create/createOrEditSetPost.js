import React, { useEffect } from "react";
import { Form, Button, Input, Select, Switch } from "antd";
import { connect } from "react-redux";
import actionPost from "@actions/post";
import actionReport from "@actions/report";
import { withTranslate } from "react-redux-multilingual";
import "../style.scss";
const { Option } = Select;
function index(props) {
  const { translate } = props;
  const isCreate = window.location.pathname.indexOf("create");
  useEffect(() => {
    if (isCreate !== -1) {
      props.updateData({
        donViId: "",
        khuVucIds: [],
        doiTuongIds: [],
      });
    }
  }, []);
  const createOrEditSetPost = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        props
          .createOrEditSetPost()
          .then((s) => {
            props.updateData({
              boCauHoiId: s.id,
              showInput: false,
              dataShow: {},
              dataShowLanguage: {},
              showChoosePost: false,
              checkMacDinh: "",
              khuVuc: s.khuVuc,
              doiTuong: s.doiTuong,
              donVi: s.donVi,
            });
          })
          .catch((e) => {});
      }
    });
  };
  const { getFieldDecorator, resetFields } = props.form;
  return (
    <div className="change-input">
      <div className="input-item">
        <Form.Item
          label={translate("mabocauhoi") + " (*)"}
          onClick={() => props.showLanguage("null")}
        >
          {getFieldDecorator("ma", {
            rules: [
              {
                required: true,
                message: translate("vuilongnhapmacauhoi"),
              },
            ],
            initialValue: props.ma,
          })(
            <Input
              autoComplete="off"
              placeholder={translate("nhapmacauhoi")}
              onChange={(e) => {
                props.updateData({
                  ma: e.target.value,
                });
              }}
            />
          )}
        </Form.Item>
        <div className="row">
          <div
            className={`col-md-${
              props.dataShowLanguage[`onShowLanguage${"tenbocauhoi"}`]
                ? "6"
                : "12"
            }`}
            onClick={() => props.showLanguage("tenbocauhoi")}
          >
            <Form.Item label={translate("tenbocauhoi") + " (*)"}>
              {getFieldDecorator("ten", {
                rules: [
                  {
                    required: true,
                    message: translate("vuilongnhaptencauhoi"),
                  },
                ],
                initialValue: props.ten,
              })(
                <Input
                  autoComplete="off"
                  placeholder={translate("vuilongnhapcauhoi")}
                  onChange={(e) => {
                    props.intl === "vi"
                      ? (props.trls[0].ten = e.target.value)
                      : (props.trls[1].ten = e.target.value);
                    props.updateData({
                      ten: e.target.value,
                      trls: [...props.trls],
                    });
                  }}
                />
              )}
            </Form.Item>
          </div>
          {props.dataShowLanguage[`onShowLanguage${"tenbocauhoi"}`] ? (
            <div className="col-md-6 language-detail">
              <Form.Item label={translate("ngonngu")}>
                {props.trls.map((option, index) => {
                  return (
                    <div className="row language-item" key={index}>
                      <div className="col-md-3">
                        {translate(option.translate)}
                      </div>
                      <div className="col-md-9">
                        <Input
                          onChange={(e) => {
                            option.ten = e.target.value;
                            props.updateData({
                              trls: [...props.trls],
                            });
                          }}
                          value={option.ten}
                        />
                      </div>
                    </div>
                  );
                })}
              </Form.Item>
            </div>
          ) : null}
        </div>
        <Form.Item
          label={translate("donvi") + "1 (*)"}
          onClick={() => props.showLanguage("null")}
        >
          {getFieldDecorator("donViId", {
            rules: [
              {
                required: true,
                message: translate("vuilongchondonvi"),
              },
            ],
            initialValue: props.donViId,
          })(
            <Select
              disabled={
                props.rolesLogin === "ROLE_admin_ivisitor" ? false : true
              }
              className="select-post"
              onChange={(e) => {
                props.updateData({
                  donViId: e,
                  khuVucIds: [],
                  doiTuongIds: [],
                });
                resetFields(["khuVucIds", "doiTuongIds", []]);
                props.searchKhuVuc(e);
                props.searchDoiTuong(e);
              }}
              showSearch
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .unsignText()
                  .indexOf(input.toLowerCase().unsignText()) >= 0
              }
              placeholder={translate("chondonvi")}
            >
              {props.dataDonVi.map((option, index) => {
                return (
                  <Option key={index} value={option.id}>
                    {option.ten}
                  </Option>
                );
              })}
            </Select>
          )}
        </Form.Item>
        <Form.Item
          label={translate("khuvuc")}
          onClick={() => props.showLanguage("null")}
        >
          {getFieldDecorator("khuVucIds", {
            rules: [
              {
                required: false,
              },
            ],
            initialValue: props.khuVucIds,
          })(
            <Select
              // defaultValue={props.khuVucIds}
              mode="multiple"
              className="select-post"
              onChange={(e) => {
                props.updateData({ khuVucIds: e });
              }}
              showSearch
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .unsignText()
                  .indexOf(input.toLowerCase().unsignText()) >= 0
              }
              placeholder={translate("chonkhuvuc")}
            >
              {props.dataKhuVuc.map((option, index) => {
                return (
                  <Option key={index} value={option.id}>
                    {option.ten}
                  </Option>
                );
              })}
            </Select>
          )}
        </Form.Item>
        <Form.Item
          label={translate("doituong")}
          onClick={() => props.showLanguage("null")}
        >
          {getFieldDecorator("doiTuongIds", {
            rules: [
              {
                required: false,
              },
            ],
            initialValue: props.doiTuongIds,
          })(
            <Select
              // defaultValue={props.doiTuongIds}
              mode="multiple"
              className="select-post"
              onChange={(e) => {
                props.updateData({ doiTuongIds: e });
              }}
              showSearch
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .unsignText()
                  .indexOf(input.toLowerCase().unsignText()) >= 0
              }
              placeholder={translate("chondoituong")}
            >
              {props.dataDoiTuong.map((option, index) => {
                return (
                  <Option key={index} value={option.id}>
                    {option.ten}
                  </Option>
                );
              })}
            </Select>
          )}
        </Form.Item>
        <Form.Item onClick={() => props.showLanguage("null")}>
          <Switch
            checked={props.active ? true : false}
            onChange={(e) => {
              props.updateData({
                active: e,
              });
            }}
          />{" "}
          <span style={{ paddingLeft: 8, paddingRight: 30 }}>
            {translate("hieuluc")}
          </span>
        </Form.Item>
        {props.boCauHoiId ? (
          <Button className="button-post" onClick={createOrEditSetPost}>
            <i className="fal fa-plus"></i>
            {translate("capnhapbocauhoi")}
          </Button>
        ) : (
          <Button className="button-post" onClick={createOrEditSetPost}>
            <i className="fal fa-plus"></i>
            {translate("themmoibocauhoi")}
          </Button>
        )}
      </div>
    </div>
  );
}
export default connect(
  (state) => {
    return {
      intl: (state.Intl || {}).locale,
      auth: state.auth && state.auth.auth,
      active: state.post.active,
      ma: state.post.ma,
      ten: state.post.ten,
      donViId: state.post.donViId
        ? state.post.donViId
        : state.auth && state.auth.auth && state.auth.auth.donViId,
      khuVucIds: state.post.khuVucIds || [],
      boCauHoiId: state.post.boCauHoiId,
      doiTuongIds: state.post.doiTuongIds || [],
      donVi: state.post.donVi,
      doiTuong: state.post.doiTuong,

      dataDonVi: state.report.dataDonVi || [],
      dataKhuVuc: state.report.dataKhuVuc || [],
      dataDoiTuong: state.report.dataDoiTuong || [],
      trls: state.post.trls || [],

      showInput: state.post.showInput,
      showChoosePost: state.post.showChoosePost,
      dataShow: state.post.dataShow || {},
      dataShowLanguage: state.post.dataShowLanguage || {},
    };
  },
  {
    updateData: actionPost.updateData,
    createOrEditSetPost: actionPost.createOrEditSetPost,
    searchKhuVuc: actionReport.searchKhuVuc,
    searchDoiTuong: actionReport.searchDoiTuong,
  }
)(Form.create()(withTranslate(index)));
