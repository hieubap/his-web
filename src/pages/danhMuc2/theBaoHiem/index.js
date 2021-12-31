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
import { Checkbox, Col, Input, Form } from "antd";
import FormWraper from "components/FormWraper";
import { checkRole } from "app/Sidebar/constant";
import { openInNewTab } from "utils";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import stringUtils from "mainam-react-native-string-utils";
import BaseDm from "components/BaseDm";

let timer = null;
const { TextArea } = Input;

const TheBaoHiem = ({
  listTheBaoHiem,
  totalElements,
  page,
  size,
  dataEditDefault,
  dataSearch,
  listNgheNghiep,
  updateData,
  getListTheBaoHiem,
  getListNgheNghiepTongHop,
  createOrEdit,
}) => {
  useEffect(() => {
    getListNgheNghiepTongHop({ page: 0, size: 500 });
  }, []);

  const getColumns = ({ onClickSort, dataSortColumn, onSearchInput }) => [
    {
      title: <HeaderSearch title="STT" />,
      width: 80,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã thẻ BH"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma || 0}
          search={
            <Input
              placeholder="Tìm mã thẻ BH"
              onChange={(e) => {
                onSearchInput(e.target.value, "ma");
              }}
            />
          }
        />
      ),
      width: 140,
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: (
        <HeaderSearch
          title="Tên thẻ BH"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten || 0}
          search={
            <Input
              placeholder="Tìm tên thẻ BH"
              onChange={(e) => {
                onSearchInput(e.target.value, "ten");
              }}
            />
          }
        />
      ),
      width: 190,
      dataIndex: "ten",
      key: "ten",
    },

    {
      title: (
        <HeaderSearch
          title="Mức hưởng"
          sort_key="mucHuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.mucHuong || 0}
          search={
            <Input
              placeholder="Tìm mức hưởng"
              onChange={(e) => {
                onSearchInput(e.target.value, "mucHuong");
              }}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "mucHuong",
      key: "mucHuong",
      render: (item) => {
        return item && <span>{`${item}%`}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nghề nghiệp"
          sort_key="ngheNghiep.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ngheNghiep.ten"] || 0}
          searchSelect={
            <Select
              data={listNgheNghiep}
              placeholder="Tìm nghề nghiệp"
              onChange={(value) => {
                onSearchInput(value, "ngheNghiepId");
              }}
            />
          }
        />
      ),
      width: 130,
      dataIndex: "ngheNghiep",
      key: "ngheNghiep",
      render: (item) => {
        return item && <span>{item.ten}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Ghi chú"
          sort_key="ghiChu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ghiChu || 0}
          search={
            <Input
              placeholder="Tìm ghi chú"
              onChange={(e) => {
                onSearchInput(e.target.value, "ghiChu");
              }}
            />
          }
        />
      ),
      width: 180,
      dataIndex: "ghiChu",
      key: "ghiChu",
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              onChange={(value) => {
                onSearchInput(value, "active");
              }}
            />
          }
          title="Có hiệu lực"
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.active || 0}
        />
      ),
      width: 140,
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
          label="Mã thẻ bảo hiểm"
          name="ma"
          rules={[
            { required: true, message: "Vui lòng nhập mã thẻ BH!" },
            {
              max: 20,
              message: "Vui lòng nhập mã thẻ BH không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã thẻ BH!",
            },
            {
              pattern: /\D+/,
              message: "Mã phải có ít nhất một ký tự là chữ!",
            },
          ]}
        >
          <Input
            ref={refAutoFocus}
            autoFocus={autoFocus}
            className="input-option"
            placeholder="Nhập mã thẻ bảo hiểm"
          />
        </Form.Item>
        <Form.Item
          label="Tên thẻ bảo hiểm"
          name="ten"
          rules={[
            { required: true, message: "Vui lòng nhập tên thẻ BH!" },
            {
              max: 1000,
              message: "Vui lòng nhập tên thẻ BH không quá 1000 ký tự!",
            },
          ]}
        >
          <Input className="input-option" placeholder="Nhập tên thẻ bảo hiểm" />
        </Form.Item>

        <Form.Item
          label="Mức hưởng"
          name="mucHuong"
          rules={[{ required: true, message: "Vui lòng nhập mức hưởng!" }]}
        >
          <Input
            className="input-option"
            type="number"
            placeholder="Nhập mức hưởng"
          />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/nghe-nghiep")}
            >
              Nghề nghiệp
            </div>
          }
          name="ngheNghiepId"
        >
          <Select data={listNgheNghiep} placeholder="Chọn nghề nghiệp"></Select>
        </Form.Item>
        <Form.Item label="Ghi chú" name="ghiChu">
          <TextArea
            rows={4}
            placeholder="Nhập ghi chú"
            maxLength={1000}
            showCount
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
        titleTable="Danh mục thẻ bảo hiểm"
        dataEditDefault={dataEditDefault}
        getColumns={getColumns}
        createOrEdit={createOrEdit}
        updateData={updateData}
        renderForm={renderForm}
        getData={getListTheBaoHiem}
        listData={listTheBaoHiem}
        dataSearch={dataSearch}
        totalElements={totalElements}
        page={page}
        size={size}
        roleSave={[ROLES["DANH_MUC"].THE_BAO_HIEM_THEM]}
        roleEdit={[ROLES["DANH_MUC"].THE_BAO_HIEM_SUA]}
      />
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    theBaoHiem: {
      listTheBaoHiem,
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
    },
    ngheNghiep: { listNgheNghiep },
  } = state;

  return {
    listTheBaoHiem,
    listNgheNghiep,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
  };
};
const mapDispatchToProps = ({
  theBaoHiem: { getListTheBaoHiem, createOrEdit, onDelete, updateData },
  ngheNghiep: { getListNgheNghiepTongHop },
}) => ({
  getListTheBaoHiem,
  getListNgheNghiepTongHop,
  createOrEdit,
  onDelete,
  updateData,
});

export default connect(mapStateToProps, mapDispatchToProps)(TheBaoHiem);
