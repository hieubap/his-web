import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import HomeWrapper from "components/HomeWrapper";
import TableWrapper from "components/TableWrapper";
import CreatedWrapper from "components/CreatedWrapper";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import { Main } from "./styled";
import { combineSort } from "utils";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  PAGE_DEFAULT,
  ADD_LAYOUT,
  TABLE_LAYOUT,
  HIEU_LUC,
  NCC_KHAC,
  ROLES,
} from "constants/index";
import { Checkbox, Col, Input, Form } from "antd";
import FormWraper from "components/FormWraper";
import { checkRole } from "app/Sidebar/constant";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import stringUtils from "mainam-react-native-string-utils";
import BaseDm from "components/BaseDm";

const PTTT = ({
  listData,
  totalElements,
  page,
  size,
  dataEditDefault,
  dataSearch,
  updateData,
  onSearch,
  createOrEdit,
  dataSortColumn,
}) => {
  const getColumns = ({ onClickSort, dataSortColumn, onSearchInput }) => [
    {
      title: <HeaderSearch title="STT" />,
      width: 45,
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã mã máy"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma || 0}
          search={
            <Input placeholder="Tìm mã mã máy" onChange={onSearchInput("ma")} />
          }
        />
      ),
      width: 120,
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: (
        <HeaderSearch
          title="Tên mã máy"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten || 0}
          search={
            <Input
              placeholder="Tìm tên mã máy"
              onChange={onSearchInput("ten")}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch
          title="Mã máy gửi BHYT"
          sort_key="maBhyt"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.maBhyt || 0}
          search={
            <Input
              placeholder="Tìm mã máy gửi BHYT"
              onChange={onSearchInput("maBhyt")}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "maBhyt",
      key: "maBhyt",
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              defaultValue=""
              onChange={onSearchInput("active")}
            />
          }
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.active || 0}
          title="Có hiệu lực"
        />
      ),
      width: 120,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
  ];

  const renderForm = ({ form, editStatus, refAutoFocus, autoFocus }) => {
    return (
      <>
        <Form.Item
          label="Mã máy"
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã máy!",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã  máy không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập  mã máy!",
            },
          ]}
        >
          <Input
            ref={refAutoFocus}
            autoFocus={autoFocus}
            className="input-option"
            placeholder="Vui lòng nhập mã máy"
          />
        </Form.Item>
        <Form.Item
          label="Tên mã máy"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên mã máy!",
            },
            {
              max: 1000,
              message: "Vui lòng nhập tên mã máy không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên mã máy!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên mã máy"
          />
        </Form.Item>
        <Form.Item
          label="Mã máy gửi BHYT"
          name="maBhyt"
          rules={[
            {
              required: true,
              message: "Vui lòng mã máy gửi BHYT!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập mã máy gửi BHYT"
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
        titleTable="Danh mục mã máy"
        dataEditDefault={dataEditDefault}
        getColumns={getColumns}
        createOrEdit={createOrEdit}
        updateData={updateData}
        renderForm={renderForm}
        getData={onSearch}
        listData={listData}
        dataSearch={dataSearch}
        totalElements={totalElements}
        page={page}
        size={size}
        roleSave={[ROLES["DANH_MUC"].MA_MAY_THEM]}
        roleEdit={[ROLES["DANH_MUC"].MA_MAY_SUA]}
      />
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    maMay: {
      listData,
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
      dataSortColumn,
    },
  } = state;

  return {
    listData,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    dataSortColumn,
  };
};
const mapDispatchToProps = ({
  maMay: {
    onSearch,
    createOrEdit,
    updateData,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
  },
}) => ({
  onSearch,
  createOrEdit,
  updateData,
  onSizeChange,
  onSortChange,
  onChangeInputSearch,
});

export default connect(mapStateToProps, mapDispatchToProps)(PTTT);
