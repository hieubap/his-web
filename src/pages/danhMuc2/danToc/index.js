import { Checkbox, Form, Input } from "antd";
import { HeaderSearch, Select } from "components";
import { HIEU_LUC, ROLES } from "constants/index";
import React from "react";
import { connect } from "react-redux";
import BaseDm from "components/BaseDm";
import { Main } from "./styled";

let timer = null;

const DanToc = ({
  listDanToc,
  totalElements,
  page,
  size,
  dataEditDefault,
  dataSearch,
  updateData,
  getListDanToc,
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
          title="Mã dân tộc"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma || 0}
          search={
            <Input
              placeholder="Tìm mã dân tộc"
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
    },
    {
      title: (
        <HeaderSearch
          title="Tên dân tộc"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten || 0}
          search={
            <Input
              placeholder="Tìm tên dân tộc"
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

  const renderForm = ({ form, editStatus }) => {
    return (
      <>
        <Form.Item
          label="Mã dân tộc"
          name="ma"
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã dân tộc!",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã dân tộc không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã dân tộc!",
            },
            {
              pattern: new RegExp(/\d+/g),
              message: "Mã dân tộc chỉ chứa số!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập mã dân tộc"
            autoFocus
          />
        </Form.Item>
        <Form.Item
          label="Tên dân tộc"
          name="ten"
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên dân tộc!",
            },
            {
              max: 1000,
              message: "Vui lòng nhập tên dân tộc không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên dân tộc!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên dân tộc"
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
        titleTable="Danh mục dân tộc"
        dataEditDefault={dataEditDefault}
        getColumns={getColumns}
        createOrEdit={createOrEdit}
        onDelete={onDelete}
        updateData={updateData}
        renderForm={renderForm}
        getData={getListDanToc}
        listData={listDanToc}
        dataSearch={dataSearch}
        totalElements={totalElements}
        page={page}
        size={size}
        roleSave={[ROLES["DANH_MUC"].DAN_TOC_THEM]}
        roleEdit={[ROLES["DANH_MUC"].DAN_TOC_SUA]}
      />
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    danToc: {
      listDanToc,
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
      dataSort,
    },
  } = state;

  return {
    listDanToc,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    dataSort,
  };
};
const mapDispatchToProps = ({
  danToc: { getListDanToc, createOrEdit, onDelete, updateData },
}) => ({
  getListDanToc,
  createOrEdit,
  onDelete,
  updateData,
});

export default connect(mapStateToProps, mapDispatchToProps)(DanToc);
