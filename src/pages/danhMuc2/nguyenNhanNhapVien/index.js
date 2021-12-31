import { Checkbox, Form, Input } from "antd";
import Select from "components/Select";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { HIEU_LUC, ROLES } from "constants/index";
import React from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import BaseDm from "components/BaseDm";
let timer = null;

const NguyenNhanNhapVien = ({
  listNguyenNhanNhapVien,
  totalElements,
  page,
  size,
  dataEditDefault,
  dataSearch,
  updateData,
  getListNguyenNhanNhapVien,
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
          title="Mã nguyên nhân nhập viện"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma || 0}
          search={
            <Input
              placeholder="Tìm mã nguyên nhân nhập viện"
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
          title="Tên nguyên nhân nhập viện"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten || 0}
          search={
            <Input
              placeholder="Tìm tên nguyên nhân nhập viện"
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
          label="Mã nguyên nhân nhập viện"
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã nguyên nhân nhập viện!",
            },
            {
              max: 20,
              message:
                "Vui lòng nhập mã nguyên nhân nhập viện không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã nguyên nhân nhập viện!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập mã nguyên nhân nhập viện"
            ref={refAutoFocus}
            autoFocus={autoFocus}
          />
        </Form.Item>
        <Form.Item
          label="Tên nguyên nhân nhập viện"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên nguyên nhân nhập viện!",
            },
            {
              max: 1000,
              message:
                "Vui lòng nhập tên nguyên nhân nhập viện không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên nguyên nhân nhập viện!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên nguyên nhân nhập viện"
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
        titleTable="Danh mục nguyên nhân nhập viện"
        dataEditDefault={dataEditDefault}
        getColumns={getColumns}
        createOrEdit={createOrEdit}
        updateData={updateData}
        renderForm={renderForm}
        getData={getListNguyenNhanNhapVien}
        listData={listNguyenNhanNhapVien}
        dataSearch={dataSearch}
        totalElements={totalElements}
        page={page}
        size={size}
        roleSave={[ROLES["DANH_MUC"].NGUYEN_NHAN_NHAP_VIEN_THEM]}
        roleEdit={[ROLES["DANH_MUC"].NGUYEN_NHAN_NHAP_VIEN_SUA]}
        classNameForm={"form-custom--one-line"}
      />
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    nguyenNhanNhapVien: {
      listNguyenNhanNhapVien,
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
      dataSort,
    },
  } = state;

  return {
    listNguyenNhanNhapVien,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    dataSort,
  };
};
const mapDispatchToProps = ({
  nguyenNhanNhapVien: {
    getListNguyenNhanNhapVien,
    createOrEdit,
    onDelete,
    updateData,
  },
}) => ({
  getListNguyenNhanNhapVien,
  createOrEdit,
  onDelete,
  updateData,
});

export default connect(mapStateToProps, mapDispatchToProps)(NguyenNhanNhapVien);
