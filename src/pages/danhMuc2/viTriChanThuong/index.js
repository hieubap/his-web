import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import HomeWrapper from "components/HomeWrapper";
import TableWrapper from "components/TableWrapper";
import CreatedWrapper from "components/CreatedWrapper";
import moment from "moment";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import { Main } from "./styled";
import { combineSort } from "utils";
import { SORT_DEFAULT } from "constants/page/therapyConstant";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  PAGE_DEFAULT,
  ADD_LAYOUT,
  TABLE_LAYOUT,
  HIEU_LUC,
  ROLES,
} from "constants/index";
import { Checkbox, Col, Input, Modal, Form } from "antd";
import FormWraper from "components/FormWraper";
import { checkRole } from "app/Sidebar/constant";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import stringUtils from "mainam-react-native-string-utils";
import BaseDm from "components/BaseDm";

let timer = null;

const ViTriChanThuong = ({
  listViTriTranThuong,
  totalElements,
  page,
  size,
  dataEditDefault,
  dataSearch,
  updateData,
  getListViTriTranThuong,
  createOrEdit,
  onDelete,
  listData,
}) => {
  const getColumns = ({ onClickSort, dataSortColumn, onSearchInput }) => [
    {
      title: <HeaderSearch title="STT" />,
      width: 60,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã vị trí chấn thương"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma || 0}
          search={
            <Input
              placeholder="Tìm mã vị trí chấn thương"
              onChange={(e) => {
                onSearchInput(e.target.value, "ma");
              }}
            />
          }
        />
      ),
      width: 180,
      dataIndex: "ma",
      key: "ma",
      render: (item) => {
        return item && <span>{item}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tên vị trí chấn thương"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten || 0}
          search={
            <Input
              placeholder="Tìm tên vị trí chấn thương"
              onChange={(e) => {
                onSearchInput(e.target.value, "ten");
              }}
            />
          }
        />
      ),
      width: 260,
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              defaultValue=""
              onChange={(value) => {
                onSearchInput(value, "active");
              }}
            />
          }
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.active || 0}
          title="Có hiệu lực"
        />
      ),
      width: 100,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    // {
    //   title: <HeaderSearch title="Thao tác" />,
    //   width: 10,
    //   dataIndex: "action",
    //   key: "action",
    //   fixed: "right",
    //   align: "center",
    //   render: (item) => {
    //     return (
    //       <div className="support">
    //         <img
    //           onClick={() => handleDeleteItem(item)}
    //           src={require("assets/images/his-core/iconDelete.png")}
    //         ></img>
    //       </div>
    //     );
    //   },
    // },
  ];
  const renderForm = ({ form, editStatus, refAutoFocus, autoFocus }) => {
    return (
      <>
        <Form.Item
          label="Mã vị trí chấn thương"
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã vị trí chấn thương!",
            },
            {
              max: 20,
              message:
                "Vui lòng nhập mã vị trí chấn thương không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã vị trí chấn thương!",
            },
          ]}
        >
          <Input
            ref={refAutoFocus}
            autoFocus={autoFocus}
            className="input-option"
            placeholder="Vui lòng nhập mã vị trí chấn thương"
          />
        </Form.Item>
        <Form.Item
          label="Tên vị trí chấn thương"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên vị trí chấn thương!",
            },
            {
              max: 1000,
              message:
                "Vui lòng nhập tên vị trí chấn thương không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên vị trí chấn thương!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên vị trí chấn thương"
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
    <Main>
      <BaseDm
        titleTable="Danh mục vị trí chấn thương"
        dataEditDefault={dataEditDefault}
        getColumns={getColumns}
        createOrEdit={createOrEdit}
        updateData={updateData}
        renderForm={renderForm}
        getData={getListViTriTranThuong}
        listData={listViTriTranThuong}
        dataSearch={dataSearch}
        totalElements={totalElements}
        page={page}
        size={size}
        roleSave={[ROLES["DANH_MUC"].VI_TRI_CHAN_THUONG_THEM]}
        roleEdit={[ROLES["DANH_MUC"].VI_TRI_CHAN_THUONG_SUA]}
        classNameForm={"form-custom--one-line"}
      />
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    viTriChanThuong: {
      listViTriTranThuong,
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
      dataSort,
    },
  } = state;

  return {
    listViTriTranThuong,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    dataSort,
  };
};
const mapDispatchToProps = ({
  viTriChanThuong: {
    getListViTriTranThuong,
    createOrEdit,
    onDelete,
    updateData,
  },
}) => ({
  getListViTriTranThuong,
  createOrEdit,
  onDelete,
  updateData,
});

export default connect(mapStateToProps, mapDispatchToProps)(ViTriChanThuong);
