import { Checkbox, Form, Input } from "antd";
import { Select } from "components";
import BaseDm from "components/BaseDm";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { HIEU_LUC, ROLES } from "constants/index";
import DanhSach from "pages/danhMuc/templateQms/components/DanhSach";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";

const MauQms = ({
  listTemplate,
  totalElements,
  page,
  size,
  dataEditDefault,
  dataSearch,
  dataSort,
  dataSortColumn,
  listloaiQms,
  currentItem,
  createOrEdit,

  getUtils,
  onSearch,
  onSortChange,
  onChangeInputSearch,
  updateData,
  onDelete,
  onSizeChange,
}) => {
  useEffect(() => {
    getUtils({ name: "loaiQms" });
  }, []);
  const getColumns = ({ onClickSort, dataSortColumn, onSearchInput }) => [
    {
      title: <HeaderSearch title="STT" />,
      width: 40,
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã mẫu QMS"
          sort_key="ma"
          dataSort={dataSortColumn["ma"] || 0}
          onClickSort={onClickSort}
          search={
            <Input
              placeholder="Nhập mã mẫu qms"
              onChange={onSearchInput("ma")}
            />
          }
        />
      ),
      width: 60,
      dataIndex: "ma",
      key: "ma",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          title="Tên mẫu QMS"
          sort_key="ten"
          dataSort={dataSortColumn["ten"] || 0}
          onClickSort={onClickSort}
          search={
            <Input
              placeholder="Nhập tên mẫu qms"
              onChange={onSearchInput("ten")}
            />
          }
        />
      ),
      width: 80,
      dataIndex: "ten",
      key: "ten",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          title="Loại QMS"
          sort_key="loaiQms"
          dataSort={dataSortColumn["loaiQms"] || 0}
          onClickSort={onClickSort}
          searchSelect={
            <Select
              data={[{ id: "", ten: "Tất cả" }, ...(listloaiQms || [])]}
              placeholder="Nhập loại QMS"
              onChange={onSearchInput("loaiQms")}
            />
          }
        />
      ),
      width: 70,
      dataIndex: "loaiQms",
      key: "loaiQms",
      align: "left",
      render: (item) => {
        return listloaiQms?.find((x) => x.id == item)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Có hiệu lực"
          sort_key="active"
          dataSort={dataSortColumn["active"] || 0}
          onClickSort={onClickSort}
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              defaultValue=""
              onChange={onSearchInput("active")}
            />
          }
        />
      ),
      width: 40,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item}></Checkbox>;
      },
    },
  ];

  const renderForm = ({ form, editStatus, refAutoFocus, autoFocus }) => {
    return (
      <>
        <Form.Item
          label="Mã mẫu QMS"
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã mẫu QMS",
            },
          ]}
        >
          <Input
            autoFocus={autoFocus}
            ref={refAutoFocus}
            placeholder="Vui lòng nhập mã mẫu QMS"
          ></Input>
        </Form.Item>
        <Form.Item
          label="Tên mẫu QMS"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên mẫu QMS",
            },
          ]}
        >
          <Input placeholder="Vui lòng nhập tên mẫu QMS"></Input>
        </Form.Item>
        <Form.Item
          label="Loại QMS"
          name="loaiQms"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn loại QMS",
            },
          ]}
        >
          <Select data={listloaiQms}></Select>
        </Form.Item>
        <Form.Item
          label="Link mẫu QMS"
          name="url"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập link mẫu QMS",
            },
          ]}
        >
          <Input placeholder="Vui lòng nhập link mẫu QMS"></Input>
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
        titleTable="Danh mục mẫu QMS"
        dataEditDefault={dataEditDefault}
        getColumns={getColumns}
        createOrEdit={createOrEdit}
        updateData={updateData}
        renderForm={renderForm}
        getData={onSearch}
        listData={listTemplate}
        dataSearch={dataSearch}
        totalElements={totalElements}
        page={page}
        size={size}
        roleSave={[ROLES["DANH_MUC"].MAU_QMS_THEM]}
        roleEdit={[ROLES["DANH_MUC"].MAU_QMS_SUA]}
      />
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    template: {
      listTemplate,
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
      dataSort,
      dataSortColumn,
      currentItem,
    },
    utils: { listloaiQms },
  } = state;

  return {
    listTemplate,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    dataSort,
    dataSortColumn,
    listloaiQms,
    currentItem,
  };
};
const mapDispatchToProps = ({
  utils: { getUtils },
  template: {
    onSearch,
    onSortChange,
    onChangeInputSearch,
    updateData,
    onDelete,
    onSizeChange,
  },
}) => ({
  getUtils,
  onSearch,
  onSortChange,
  onChangeInputSearch,
  updateData,
  onDelete,
  onSizeChange,
});

export default connect(mapStateToProps, mapDispatchToProps)(MauQms);
