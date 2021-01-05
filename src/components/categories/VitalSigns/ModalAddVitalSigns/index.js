import React, { useImperativeHandle, useState, forwardRef } from "react";
import { Main } from "./styled";
import { Button, Form, Input, Checkbox, Spin, Select } from "antd";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

const ModalAddForm = (props, ref) => {
  const { getFieldDecorator } = props.form;
  const { t } = useTranslation();

  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: (item = {}, readOnly) => {
      setState({
        show: true,
        readOnly,
        id: item?.id || "",
        ten: item?.ten || "",
        donVi: item?.donVi || "",
        giaTriLonNhat: item?.giaTriLonNhat || "",
        giaTriNhoNhat: item?.giaTriNhoNhat || "",
        khoaIds: item?.khoaIds || [],
        active: item?.active === undefined || item?.active ? true : false,
      });
      props.form.resetFields();
    },
  }));

  const handleSubmit = () => {};

  const onChange = (key) => (e) => {
    setState({ [key]: e?.target?.value || "" });
  };
  const onOK = (ok) => () => {
    if (ok) {
      props.form.validateFields((errors, values) => {
        if (!errors) {
          props
            .createEditCategory({
              id: state.id,
              ten: state.ten,
              donVi: state.donVi,
              khoaIds: state.khoaIds,
              giaTriLonNhat: state.giaTriLonNhat,
              giaTriNhoNhat: state.giaTriNhoNhat,
              active: state.active,
            })
            .then((s) => {
              setState({ show: false });
            });
        }
      });
    } else setState({ show: false });
  };
  return (
    <Main
      visible={state.show}
      style={{ maxWidth: 420 }}
      closable={false}
      centered
      onCancel={onOK(false)}
      footer={[null]}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <Spin spinning={props.isLoadingCreate}>
        <div className="modal-des">
          <h4 className="title-des">
            {state.id
              ? state.readOnly
                ? "CHI TIẾT "
                : "CHỈNH SỬA "
              : "THÊM MỚI "}
            CHỈ SỐ
          </h4>
          <div className="content-des">
            <Form onSubmit={handleSubmit}>
              <Form.Item label={"Tên chỉ số"} className={"props-form-item"}>
                {getFieldDecorator("ten", {
                  rules: [
                    { required: true, message: "Vui lòng nhập tên chỉ số!" },
                  ],
                  initialValue: state.ten,
                })(
                  <Input
                    disabled={!!state.readOnly}
                    onChange={onChange("ten")}
                    placeholder={"Nhập tên chỉ số"}
                  />
                )}
              </Form.Item>

              <Form.Item label={"Đơn vị"} className={"props-form-item"}>
                {getFieldDecorator("donVi", {
                  rules: [{ required: true, message: "Vui lòng nhập đơn vị!" }],
                  initialValue: state.donVi,
                })(
                  <Input
                    disabled={!!state.readOnly}
                    onChange={onChange("donVi")}
                    placeholder={"Nhập đơn vị"}
                  />
                )}
              </Form.Item>

              <Form.Item label={"Giá trị tối đa"} className={"props-form-item"}>
                {getFieldDecorator("giaTriLonNhat", {
                  // rules: [{ required: true, message: "Vui lòng nhập đơn vị!" }],
                  initialValue: state.giaTriLonNhat,
                })(
                  <Input
                    disabled={!!state.readOnly}
                    onChange={onChange("giaTriLonNhat")}
                    placeholder={"Nhập giá trị lớn nhất"}
                  />
                )}
              </Form.Item>

              <Form.Item
                label={"Giá trị tối thiểu"}
                className={"props-form-item"}
              >
                {getFieldDecorator("giaTriNhoNhat", {
                  // rules: [{ required: true, message: "Vui lòng nhập đơn vị!" }],
                  initialValue: state.giaTriNhoNhat,
                })(
                  <Input
                    disabled={!!state.readOnly}
                    onChange={onChange("giaTriNhoNhat")}
                    placeholder={"Nhập giá trị nhỏ nhất"}
                  />
                )}
              </Form.Item>

              <Form.Item label={"Khoa áp dụng"}>
                {getFieldDecorator("departmentSelected", {
                  rules: [
                    { required: true, message: "Vui lòng chọn khoa áp dụng!" },
                  ],
                  initialValue: state.khoaIds,
                })(
                  <Select
                    onChange={(e) => {
                      setState({ khoaIds: e });
                    }}
                    placeholder={"Chọn khoa"}
                    className="search-item"
                    mode="multiple"
                    style={{ width: "100%", minHeight: 40, borderRadius: 50 }}
                    disabled={!!state.readOnly}
                  >
                    {props.departments.map((item, index) => {
                      return (
                        <Select.Option
                          key={index}
                          value={item.id}
                          name={item.name}
                        >
                          <div title={item.name}>{item.name}</div>
                        </Select.Option>
                      );
                    })}
                  </Select>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("active", {
                  valuePropName: "checked",
                  initialValue: state.active,
                })(
                  <Checkbox
                    disabled={!!state.readOnly}
                    onChange={(e) => {
                      setState({
                        active: e.target.checked,
                      });
                    }}
                  >
                    {t("permission.effective")}
                  </Checkbox>
                )}
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="action-footer">
          {state.readOnly ? (
            <Button
              type="danger"
              style={{
                minWidth: 100,
              }}
              onClick={onOK(false)}
            >
              Đóng
            </Button>
          ) : (
            <>
              <Button
                type="danger"
                style={{
                  minWidth: 100,
                }}
                onClick={onOK(false)}
              >
                Huỷ
              </Button>
              <Button
                type="primary"
                style={{
                  minWidth: 100,
                }}
                onClick={onOK(true)}
              >
                Lưu
              </Button>
            </>
          )}
        </div>
      </Spin>
    </Main>
  );
};

export default Form.create({})(
  connect(
    (state) => ({
      isLoadingCreate: state.form.isLoadingCreate || false,
      departments: state.department.departments || [],
    }),
    ({ vitalSigns: { createEditCategory } }) => ({
      createEditCategory,
    }),
    null,
    { forwardRef: true }
  )(forwardRef(ModalAddForm))
);
