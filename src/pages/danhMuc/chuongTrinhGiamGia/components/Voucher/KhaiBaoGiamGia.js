import React, { forwardRef, useImperativeHandle, useState, useMemo } from "react";
import { Checkbox, Input, Form, DatePicker, Button, Row, Col, InputNumber } from "antd";
import { Select } from "components";
import TableWrapper from "components/TableWrapper";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { HIEU_LUC } from "constants/index";

import moment from 'moment';
import { connect } from "react-redux"

const KhaiBaoGiamGia = (props) => {
  const [form] = Form.useForm();
  const [dataEdit, setDataEdit] = useState(null);
  const [loaiDichVu, setLoaiDichVu] = useState(null);
  const [loaiDichVuThau, setLoaiDichVuThau] = useState(null);
  const [show, setShow] = useState(false);

  const [state, _setState] = useState({
    active: false,
    data: [],
    services: [],
    listAllLoaiDoiTuong: [],
  });

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const onSave = () => {
    form.validateFields().then((values) => {
      props.handleSubmit(values);
    }).catch((error) => { });
  };

  const onRow = (record = {}, index) => {
    return {
     onClick: (event) => {
        setState({
          currentItem: JSON.parse(JSON.stringify(record)),
          currentIndex: index,
        });
      },
    };
  };
  const onClickSort = (key, value) => {
    props.onSortChange({
      [key]: value,
    });
  };

  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else if (e?._d) value = e.format("YYYY-MM-DD");
    else value = e;
    props.onChangeInputSearch({
      [key]: value,
      // dichVuId,
    });
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 40,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
  ];


  return (
    <>
      <EditWrapper
        title="Khai báo giảm giá"
        onCancel={props.onCancel}
        onSave={onSave}
        showAdded={true}
        isShowSaveButton={true}
        isShowCancelButton={true}
      >
        <TableWrapper
          scroll={{ y: 500, x: 700 }}
          columns={columns}
          dataSource={[]}
          onRow={onRow}
        ></TableWrapper>
        
      </EditWrapper>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
   
  };
};
export default connect(mapStateToProps, null)(KhaiBaoGiamGia);
