import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { Checkbox, Input, Form } from "antd";
import { CreatedWrapper, Select } from "components";
import { checkRole } from "app/Sidebar/constant";
import { ROLES } from "constants/index";
import { connect, useDispatch } from "react-redux";
import FormRight from "../../../../../components/BaseDmTab/FormRight";
const CreateOrUpdate = ({ onSubmit, listAllQuocGia, ...props }, ref) => {
  const onUpdateData =
    ({ form }, name) =>
    (e) => {
      form.setFieldsValue({
        [name]: e.target?.value?.toLowerCase().replaceAll(" ", ""),
      });
    };

  const renderForm = ({ form, refAutoFocus, dataEdit }) => {
    return (
      <>
        <Form.Item
          label="Mã tỉnh/tp"
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã tỉnh/tp!",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã tỉnh/tp không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã tỉnh/tp!",
            },
            // {
            //   pattern: new RegExp(/\d*[a-zA-Z][a-zA-Z0-9]*/),
            //   message: "Mã phải có ít nhất một ký tự là chữ!",
            // },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập mã tỉnh/tp"
            ref={refAutoFocus}
          />
        </Form.Item>
        <Form.Item
          label="Tên tỉnh/tp"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên tỉnh/tp!",
            },
            {
              max: 1000,
              message: "Vui lòng nhập tên tỉnh/tp không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên tỉnh/tp!",
            },
          ]}
        >
          <Input className="input-option" placeholder="Vui lòng nhập tỉnh/tp" />
        </Form.Item>
        <Form.Item
          label="Tên viết tắt"
          name="vietTat"
          rules={[
            {
              pattern: new RegExp(/^.{1,2}$/),
              message: "Vui lòng nhập tên viết tắt không quá 2 ký tự!",
            },
          ]}
        >
          <Input
            className="input-option"
            onChange={onUpdateData({ form }, "vietTat")}
            placeholder="Vui lòng nhập tên viết tắt"
          />
        </Form.Item>
        <Form.Item
          label="Quốc gia"
          name="quocGiaId"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập chọn quốc gia!",
            },
          ]}
        >
          <Select data={listAllQuocGia} placeholder="Chọn quốc gia" />
        </Form.Item>
        {dataEdit && (
          <Form.Item name="active" valuePropName="checked">
            <Checkbox>Có hiệu lực</Checkbox>
          </Form.Item>
        )}
      </>
    );
  };
  return <FormRight renderForm={renderForm} onSubmit={onSubmit} {...props} />;
};

export default connect(
  ({ ttHanhChinh: { dataEditTinh: dataEdit, listAllQuocGia } }) => ({
    dataEdit,
    listAllQuocGia,
  }),
  ({
    ttHanhChinh: { createOrEditQuocGia: onSubmit, getListQuocGia: getData },
  }) => ({
    getData,
    onSubmit,
  })
)(forwardRef(CreateOrUpdate));
