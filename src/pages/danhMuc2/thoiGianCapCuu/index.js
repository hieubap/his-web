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
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
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
import stringUtils from "mainam-react-native-string-utils";
import BaseDm from "components/BaseDm";
let timer = null;

const ThoiGianCapCuu = ({
  listThoiGianCapCuu,
  totalElements,
  page,
  size,
  dataEditDefault,
  dataSearch,
  updateData,
  getListThoiGianCapCuu,
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
          title="Mã thời gian cấp cứu"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma || 0}
          search={
            <Input
              placeholder="Tìm mã thời gian cấp cứu"
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
          title="Tên thời gian cấp cứu"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten || 0}
          search={
            <Input
              placeholder="Tìm tên thời gian cấp cứu"
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
          label="Mã thời gian cấp cứu"
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã thời gian cấp cứu!",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã thời gian cấp cứu không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã thời gian cấp cứu!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập mã thời gian cấp cứu"
            ref={refAutoFocus}
            autoFocus={autoFocus}
          />
        </Form.Item>
        <Form.Item
          label="Tên thời gian cấp cứu"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên thời gian cấp cứu!",
            },
            {
              max: 1000,
              message:
                "Vui lòng nhập tên thời gian cấp cứu không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên thời gian cấp cứu!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên thời gian cấp cứu"
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
        titleTable="Danh mục thời gian cấp cứu"
        dataEditDefault={dataEditDefault}
        getColumns={getColumns}
        createOrEdit={createOrEdit}
        updateData={updateData}
        renderForm={renderForm}
        getData={getListThoiGianCapCuu}
        listData={listThoiGianCapCuu}
        dataSearch={dataSearch}
        totalElements={totalElements}
        page={page}
        size={size}
        roleSave={[ROLES["DANH_MUC"].TG_CC_THEM]}
        roleEdit={[ROLES["DANH_MUC"].TG_CC_SUA]}
        classNameForm={"form-custom--one-line"}
      />
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    thoiGianCapCuu: {
      listThoiGianCapCuu,
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
      dataSort,
    },
  } = state;

  return {
    listThoiGianCapCuu,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    dataSort,
  };
};
const mapDispatchToProps = ({
  thoiGianCapCuu: { getListThoiGianCapCuu, createOrEdit, onDelete, updateData },
}) => ({
  getListThoiGianCapCuu,
  createOrEdit,
  onDelete,
  updateData,
});

export default connect(mapStateToProps, mapDispatchToProps)(ThoiGianCapCuu);
