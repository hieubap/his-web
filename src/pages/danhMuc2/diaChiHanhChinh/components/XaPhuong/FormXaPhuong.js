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
  {
    onSubmit,
    listAllQuocGia,
    listAllTinh1,
    listAllQuanHuyen,
    updateData,
    ...props
  },
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
          label="Mã xã/phường"
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã xã/phường!",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã xã/phường không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã xã/phường!",
            },
            // {
            //   pattern: new RegExp(/\d*[a-zA-Z][a-zA-Z0-9]*/),
            //   message: "Mã phải có ít nhất một ký tự là chữ!",
            // },
          ]}
        >
          <Input
            autoFocus={true}
            className="input-option"
            placeholder="Vui lòng nhập mã xã/phường"
            ref={refAutoFocus}
          />
        </Form.Item>
        <Form.Item
          label="Tên xã/phường"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên xã/phường!",
            },
            {
              max: 1000,
              message: "Vui lòng nhập tên xã/phường không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên xã/phường!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập xã/phường"
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
            placeholder="Vui lòng nhập tên viết tắt"
            onChange={onUpdateData({ form }, "vietTat")}
          />
        </Form.Item>
        <Form.Item
          label="Quận/huyện"
          name="quanHuyenId"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập chọn quận/huyện!",
            },
          ]}
        >
          <Select data={listAllQuanHuyen} placeholder="Chọn quận/huyện" />
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
  return (
    <FormRight
      renderForm={renderForm}
      onSubmit={onSubmit}
      updateDataEdit={(dataEditXaPhuong) => updateData({ dataEditXaPhuong })}
      updateData={updateData}
      {...props}
    />
  );
};

export default connect(
  ({
    ttHanhChinh: {
      dataEditXaPhuong: dataEdit,
      listAllQuocGia,
      listAllTinh1,
      listAllQuanHuyen,
    },
  }) => ({
    dataEdit,
    listAllQuocGia,
    listAllTinh1,
    listAllQuanHuyen,
  }),
  ({
    ttHanhChinh: {
      createOrEditQuocGia: onSubmit,
      getListQuocGia: getData,
      updateData,
    },
  }) => ({
    getData,
    onSubmit,
    updateData,
  })
)(forwardRef(CreateOrUpdate));
