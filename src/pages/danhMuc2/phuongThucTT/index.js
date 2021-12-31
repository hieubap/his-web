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
import { Checkbox, Col, Input, Form, InputNumber } from "antd";
import { handleBlurInput, handleKeypressInput } from "utils";
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
          title="Mã PTTT"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma || 0}
          search={
            <Input placeholder="Tìm mã PTTT" onChange={onSearchInput("ma")} />
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
          title="Tên PTTT"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten || 0}
          search={
            <Input placeholder="Tìm tên PTTT" onChange={onSearchInput("ten")} />
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
          title="Mã nhà cung cấp PTTT"
          sort_key="maNhaCungCap"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.maNhaCungCap || 0}
          search={
            <Input
              placeholder="Tìm mã nhà cung cấp"
              onChange={onSearchInput("maNhaCungCap")}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "maNhaCungCap",
      key: "maNhaCungCap",
    },
    {
      title: (
        <HeaderSearch
          title="Tên nhà cung cấp PTTT"
          sort_key="tenNhaCungCap"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tenNhaCungCap || 0}
          search={
            <Input
              placeholder="Tìm tên nhà cung cấp"
              onChange={onSearchInput("tenNhaCungCap")}
            />
          }
        />
      ),
      width: 170,
      dataIndex: "tenNhaCungCap",
      key: "tenNhaCungCap",
    },
    {
      title: (
        <HeaderSearch
          sort_key="nccKhacBv"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.nccKhacBv || 0}
          title="NCC khác BV"
          searchSelect={
            <Select
              data={NCC_KHAC}
              placeholder="Chọn NCC khác BV"
              defaultValue=""
              onChange={onSearchInput("nccKhacBv")}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "nccKhacBv",
      key: "nccKhacBv",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
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
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={NCC_KHAC}
              placeholder="Chọn tiền mặt"
              defaultValue=""
              onChange={onSearchInput("tienMat")}
            />
          }
          sort_key="tienMat"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tienMat || 0}
          title="Tiền mặt"
        />
      ),
      width: 120,
      dataIndex: "tienMat",
      key: "tienMat",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Mức độ ưu tiên"
          sort_key="uuTien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.uuTien || 0}
        />
      ),
      width: 150,
      dataIndex: "uuTien",
      key: "uuTien",
    },
  ];

  const renderForm = ({ form, editStatus, refAutoFocus, autoFocus }) => {
    return (
      <>
        <Form.Item
          label="Mã PTTT"
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã PTTT!",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã PTTT không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã PTTT!",
            },
          ]}
        >
          <Input
            ref={refAutoFocus}
            autoFocus={autoFocus}
            className="input-option"
            placeholder="Vui lòng nhập mã PTTT"
          />
        </Form.Item>
        <Form.Item
          label="Tên PTTT"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên PTTT!",
            },
            {
              max: 1000,
              message: "Vui lòng nhập tên PTTT không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên PTTT!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên PTTT"
          />
        </Form.Item>
        <Form.Item
          label="Mã nhà cung cấp PTTT"
          name="maNhaCungCap"
          rules={[
            {
              required: true,
              message: "Vui lòng mã nhà cung cấp PTTT!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập mã nhà cung cấp PTTT"
          />
        </Form.Item>
        <Form.Item
          label="Tên nhà cung cấp thanh toán"
          name="tenNhaCungCap"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên nhà cung cấp thanh toán!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên nhà cung cấp thanh toán"
          />
        </Form.Item>
        <Form.Item name="nccKhacBv" valuePropName="checked">
          <Checkbox>NCC khác BV</Checkbox>
        </Form.Item>
        <Form.Item
          label="Mức độ ưu Tiên"
          name="uuTien"
          rules={[
            {
              validator: (rule, value, callback) => {
                if (value) {
                  if (Number(value) > 2147483647) {
                    callback(
                      new Error("Vui lòng nhập ưu tiên nhỏ hơn 2147483648!")
                    );
                  } else {
                    callback();
                  }
                } else {
                  callback();
                }
              },
            },
          ]}
        >
          <InputNumber
            className="input-option"
            placeholder="Vui lòng nhập mức độ ưu tiên"
            onKeyDown={handleKeypressInput}
            onBlur={handleBlurInput}
          />
        </Form.Item>
        <Form.Item name="tienMat" valuePropName="checked">
          <Checkbox>Tiền mặt</Checkbox>
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
        titleTable="Danh mục phương thức thanh toán"
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
        roleSave={[ROLES["DANH_MUC"].PTTT_THEM]}
        roleEdit={[ROLES["DANH_MUC"].PTTT_SUA]}
      />
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    phuongThucTT: {
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
  phuongThucTT: {
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
