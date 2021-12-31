import { Checkbox, Form, Input } from "antd";
import Select from "components/Select";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { HIEU_LUC, ROLES } from "constants/index";
import React from "react";
import { connect } from "react-redux";
import BaseDm from "components/BaseDm";

let timer = null;

const ChucVu = ({
  getListChucVu,
  createOrEdit,
  onDelete,
  updateData,
  listChucVu,
  dataSearch,
  dataSort,
  totalElements,
  page,
  size,
  dataEditDefault,
  ...props
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
          title="Mã chức vụ"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma || 0}
          search={
            <Input
              placeholder="Tìm mã chức vụ"
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
          title="Tên chức vụ"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten || 0}
          search={
            <Input
              placeholder="Tìm tên chức vụ"
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
      width: 40,
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
          label="Mã chức vụ"
          name="ma"
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã chức vụ!",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã chức vụ không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã chức vụ!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập mã chức vụ"
            autoFocus
          />
        </Form.Item>
        <Form.Item
          label="Tên chức vụ"
          name="ten"
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên chức vụ!",
            },
            {
              max: 1000,
              message: "Vui lòng nhập tên chức vụ không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên chức vụ!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên chức vụ"
          />
        </Form.Item>
        <Form.Item label="Ghi chú" name="ghiChu" style={{ width: "100%" }}>
          <Input.TextArea
            row={4}
            placeholder="Vui lòng nhập ghi chú"
            style={{ height: "auto" }}
            showCount
            maxLength={1000}
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
    <BaseDm
      titleTable="Danh mục chức vụ"
      dataEditDefault={dataEditDefault}
      getColumns={getColumns}
      createOrEdit={createOrEdit}
      updateData={updateData}
      renderForm={renderForm}
      getData={getListChucVu}
      listData={listChucVu}
      dataSearch={dataSearch}
      totalElements={totalElements}
      page={page}
      size={size}
      roleSave={[ROLES["DANH_MUC"].CHUC_VU_THEM]}
      roleEdit={[ROLES["DANH_MUC"].CHUC_VU_SUA]}
    />
  );
};

const mapStateToProps = (state) => {
  const {
    chucVu: {
      listChucVu,
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
      dataSort,
    },
  } = state;

  return {
    listChucVu,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    dataSort,
  };
};
const mapDispatchToProps = ({
  chucVu: { getListChucVu, createOrEdit, onDelete, updateData },
}) => ({
  getListChucVu,
  createOrEdit,
  onDelete,
  updateData,
});

export default connect(mapStateToProps, mapDispatchToProps)(ChucVu);
