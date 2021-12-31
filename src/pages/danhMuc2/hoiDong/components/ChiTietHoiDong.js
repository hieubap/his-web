import { Checkbox, Form, Input, Select } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import FormElement from "../../../../components/common/FormElement";

const ChiTietHoiDong = ({ _createOrEdit, getUtils }) => {
  console.log("render 1");
  useEffect(() => {
    getUtils({ name: "doiTuong" });
  }, []);
  const renderForm = ({ form, editStatus }) => {
    return <></>;
  };
  return <FormElement renderForm={renderForm} createOrEdit={_createOrEdit} />;
};

export default connect(
  ({ hoiDongKiemKe: {} }) => ({}),
  ({ hoiDongKiemKe: { _createOrEdit }, utils: { getUtils } }) => ({
    _createOrEdit,
    getUtils,
  })
)(ChiTietHoiDong);
