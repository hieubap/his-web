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
const CreateOrUpdate = ({ onSubmit, ...props }, ref) => {
  const renderForm = ({ refAutoFocus, dataEdit }) => {
    return (
      <>
        <Form.Item
          label="Mã quốc gia"
          name="ma"
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã quốc gia!",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã quốc gia không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã quốc gia!",
            },
            // {
            //   pattern: new RegExp(/\d*[a-zA-Z][a-zA-Z0-9]*/),
            //   message: "Mã phải có ít nhất một ký tự là chữ!",
            // },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập mã quốc gia"
            ref={refAutoFocus}
          />
        </Form.Item>
        <Form.Item
          label="Tên quốc gia"
          name="ten"
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên quốc gia!",
            },
            {
              max: 1000,
              message: "Vui lòng nhập tên quốc gia không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên quốc gia!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên quốc gia"
          />
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
  ({ ttHanhChinh: { dataEditQuocGia: dataEdit } }) => ({
    dataEdit,
  }),
  ({
    ttHanhChinh: { createOrEditQuocGia: onSubmit, getListQuocGia: getData },
  }) => ({
    getData,
    onSubmit,
  })
)(forwardRef(CreateOrUpdate));
