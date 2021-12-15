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

const VanBangChuyenMon = ({
  listVanBang,
  totalElements,
  page,
  size,
  dataEditDefault,
  dataSearch,
  updateData,
  searchVanBang,
  createOrEdit,
  onDelete,
}) => {
  const getColumns = ({ onClickSort, dataSortColumn, onSearchInput }) => [
    {
      title: <HeaderSearch title="STT" />,
      width: 15,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã VB chuyên môn"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma || 0}
          search={
            <Input
              placeholder="Tìm mã VB chuyên môn"
              onChange={(e) => {
                onSearchInput(e.target.value, "ma");
              }}
            />
          }
        />
      ),
      width: 70,
      dataIndex: "ma",
      key: "ma",
      render: (item) => {
        return item && <span>{item}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tên VB chuyên môn"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten || 0}
          search={
            <Input
              placeholder="Tìm tên VB chuyên môn"
              onChange={(e) => {
                onSearchInput(e.target.value, "ten");
              }}
            />
          }
        />
      ),
      width: 70,
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
      width: 50,
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
          label="Mã VB chuyên môn"
          name="ma"
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã VB chuyên môn!",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã VB chuyên môn không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã VB chuyên môn!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập mã VB chuyên môn"
            ref={refAutoFocus}
            autoFocus={autoFocus}
          />
        </Form.Item>
        <Form.Item
          label="Tên VB chuyên môn"
          name="ten"
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên VB chuyên môn!",
            },
            {
              max: 1000,
              message: "Vui lòng nhập tên VB chuyên môn không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên VB chuyên môn!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên VB chuyên môn"
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
        titleTable="Danh mục văn bằng chuyên môn"
        dataEditDefault={dataEditDefault}
        getColumns={getColumns}
        createOrEdit={createOrEdit}
        updateData={updateData}
        renderForm={renderForm}
        getData={searchVanBang}
        listData={listVanBang}
        dataSearch={dataSearch}
        totalElements={totalElements}
        page={page}
        size={size}
        roleSave={[ROLES["DANH_MUC"].VAN_BANG_THEM]}
        roleEdit={[ROLES["DANH_MUC"].VAN_BANG_SUA]}
        classNameForm={"form-custom--one-line"}
      />
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    vanBang: {
      listVanBang,
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
      dataSort,
    },
  } = state;

  return {
    listVanBang,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    dataSort,
  };
};
const mapDispatchToProps = ({
  vanBang: { searchVanBang, createOrEdit, onDelete, updateData },
}) => ({
  searchVanBang,
  createOrEdit,
  onDelete,
  updateData,
});

export default connect(mapStateToProps, mapDispatchToProps)(VanBangChuyenMon);
