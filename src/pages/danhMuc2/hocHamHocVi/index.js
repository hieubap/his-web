import React, { useEffect, useState, forwardRef, useRef } from "react";
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

const HocHamHocVi = ({
  listHocHamHocVi,
  totalElements,
  page,
  size,
  dataEditDefault,
  dataSearch,
  updateData,
  getListHocHamHocVi,
  createOrEdit,
  onDelete,
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
          title="Mã học hàm học vị"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma || 0}
          search={
            <Input
              placeholder="Tìm mã học hàm học vị"
              onChange={(e) => {
                onSearchInput(e.target.value, "ma");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "ma",
      key: "ma",
      render: (item) => {
        return item && <span>{item}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tên viết tắt"
          sort_key="vietTat"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.vietTat || 0}
          search={
            <Input
              placeholder="Tìm tên viết tắt"
              onChange={(e) => {
                onSearchInput(e.target.value, "vietTat");
              }}
            />
          }
        />
      ),
      width: 180,
      dataIndex: "vietTat",
      key: "vietTat",
      render: (item) => {
        return item && <span>{item}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tên học hàm học vị"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten || 0}
          search={
            <Input
              placeholder="Tìm tên học hàm học vị"
              onChange={(e) => {
                onSearchInput(e.target.value, "ten");
              }}
            />
          }
        />
      ),
      width: 240,
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

  const renderForm = ({ form, editStatus }) => {
    return (
      <>
        <Form.Item
          label="Mã học hàm học vị"
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã học hàm học vị!",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã học hàm học vị không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã học hàm học vị!",
            },
          ]}
        >
          <Input
            autoFocus={true}
            className="input-option"
            placeholder="Vui lòng nhập mã học hàm học vị"
            autoFocus
          />
        </Form.Item>
        <Form.Item
          label="Tên viết tắt học hàm học vị"
          name="vietTat"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên viết tắt học hàm học vị!",
            },
            {
              max: 20,
              message:
                "Vui lòng nhập tên viết tắt học hàm học vị không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên viết tắt học hàm học vị!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên viết tắt học hàm học vị"
          />
        </Form.Item>
        <Form.Item
          label="Tên học hàm học vị"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên học hàm học vị!",
            },
            {
              max: 1000,
              message: "Vui lòng nhập tên học hàm học vị không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên học hàm học vị!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên học hàm học vị"
          />
        </Form.Item>
        {editStatus && (
          <Form.Item label=" " name="active" valuePropName="checked">
            <Checkbox>Có hiệu lực</Checkbox>
          </Form.Item>
        )}
      </>
    );
  };
  return (
    <Main>
      <BaseDm
        titleTable="Danh mục học hàm học vị"
        dataEditDefault={dataEditDefault}
        getColumns={getColumns}
        createOrEdit={createOrEdit}
        updateData={updateData}
        renderForm={renderForm}
        getData={getListHocHamHocVi}
        listData={listHocHamHocVi}
        dataSearch={dataSearch}
        totalElements={totalElements}
        page={page}
        size={size}
        roleSave={[ROLES["DANH_MUC"].HOC_HAM_THEM]}
        roleEdit={[ROLES["DANH_MUC"].HOC_HAM_SUA]}
        classNameForm={"form-custom--one-line"}
      />
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    hocHamHocVi: {
      listHocHamHocVi,
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
    },
  } = state;

  return {
    listHocHamHocVi,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
  };
};
const mapDispatchToProps = ({
  hocHamHocVi: { getListHocHamHocVi, createOrEdit, onDelete, updateData },
}) => ({
  getListHocHamHocVi,
  createOrEdit,
  onDelete,
  updateData,
});

export default connect(mapStateToProps, mapDispatchToProps)(HocHamHocVi);
