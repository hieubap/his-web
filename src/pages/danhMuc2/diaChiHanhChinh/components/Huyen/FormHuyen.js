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
const CreateOrUpdate = (
  { onSubmit, listAllQuocGia, listAllTinh1, ...props },
  ref
) => {
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
          label="Mã quận/huyện"
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã quận/huyện!",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã quận/huyện không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã quận/huyện!",
            },
            // {
            //   pattern: new RegExp(/\d*[a-zA-Z][a-zA-Z0-9]*/),
            //   message: "Mã phải có ít nhất một ký tự là chữ!",
            // },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập mã quận/huyện"
            ref={refAutoFocus}
          />
        </Form.Item>
        <Form.Item
          label="Tên quận/huyện"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên quận/huyện!",
            },
            {
              max: 1000,
              message: "Vui lòng nhập tên quận/huyện không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên quận/huyện!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập quận/huyện"
          />
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
          label="Tỉnh/Tp"
          name="tinhThanhPhoId"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập chọn tỉnh/tp!",
            },
          ]}
        >
          <Select data={listAllTinh1} placeholder="Chọn tỉnh/tp" />
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
  ({
    ttHanhChinh: { dataEditHuyen: dataEdit, listAllQuocGia, listAllTinh1 },
  }) => ({
    dataEdit,
    listAllQuocGia,
    listAllTinh1,
  }),
  ({
    ttHanhChinh: { createOrEditQuocGia: onSubmit, getListQuocGia: getData },
  }) => ({
    getData,
    onSubmit,
  })
)(forwardRef(CreateOrUpdate));
