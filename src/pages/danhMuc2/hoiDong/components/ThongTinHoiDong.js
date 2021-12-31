import { Checkbox, Form, Input } from "antd";
import React, { useEffect } from "react";
import Select from "components/Select";
import { connect } from "react-redux";
import FormElement from "../../../../components/common/FormElement";

const ThongTinHoiDong = ({
  _dataSearch,
  _createOrEdit,
  _dataEdit,
  _getList,
  updateData,
  listLoaiHoiDongKiemKe,
  ...props
}) => {
  console.log("render 2");
  const renderForm = ({ form, editStatus }) => {
    return (
      <>
        <Form.Item
          label="Mã hội đồng"
          name="ma"
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã Hội đồng!",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã Hội đồng không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã hội đồng!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Nhập mã hội đồng"
            autoFocus
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item
          label="Tên hội đồng"
          name="ten"
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên hội đồng!",
            },
            {
              max: 1000,
              message: "Vui lòng nhập tên không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên hội đồng!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Nhập tên hội đồng"
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item
          label="Loại hội đồng"
          name="loai"
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Vui lòng chọn loại hội đồng!",
            },
          ]}
        >
          <Select
            data={listLoaiHoiDongKiemKe}
            placeholder="Chọn loại hội đồng"
          />
        </Form.Item>

        {editStatus && (
          <Form.Item name="active" valuePropName="checked">
            <Checkbox>Có hiệu lực</Checkbox>
          </Form.Item>
        )}
      </>
    );
  };
  return (
    <FormElement
      {...props}
      renderForm={renderForm}
      createOrEdit={_createOrEdit}
      dataEdit={_dataEdit}
      updateData={updateData}
      getData={_getList}
      dataSearch={_dataSearch}
    />
  );
};

export default connect(
  ({
    hoiDongKiemKe: { _dataEdit, _dataSearch },
    utils: { listLoaiHoiDongKiemKe },
  }) => ({
    listLoaiHoiDongKiemKe,
    _dataEdit,
    _dataSearch,
  }),
  ({ hoiDongKiemKe: { _createOrEdit, _getList, updateData } }) => ({
    _createOrEdit,
    updateData,
    _getList,
  })
)(ThongTinHoiDong);
