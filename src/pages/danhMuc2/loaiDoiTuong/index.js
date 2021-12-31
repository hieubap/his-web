import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import HomeWrapper from "components/HomeWrapper";
import TableWrapper from "components/TableWrapper";
import CreatedWrapper from "components/CreatedWrapper";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import { Main } from "./styled";
import { QUANNHAN } from "./configs";
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
import { checkRole } from "app/Sidebar/constant";
import FormWraper from "components/FormWraper";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import stringUtils from "mainam-react-native-string-utils";
import BaseDm from "components/BaseDm";

const { TextArea } = Input;
let timer = null;

const LoaiDoiTuong = ({
  listLoaiDoiTuong,
  listdoiTuong,
  totalElements,
  page,
  size,
  dataEditDefault,
  dataSearch,
  updateData,
  getListLoaiDoiTuong,
  getUtils,
  createOrEdit,
  onDelete,
}) => {
  useEffect(() => {
    getUtils({ name: "doiTuong" });
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
          title="Mã loại đối tượng"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma || 0}
          search={
            <Input
              placeholder="Tìm mã loại đối tượng"
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
      render: (item) => {
        return item && <span>{item}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tên loại đối tượng"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten || 0}
          search={
            <Input
              placeholder="Tìm tên loại đối tượng"
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
          title="Đối tượng"
          sort_key="doiTuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.doiTuong || 0}
          searchSelect={
            <Select
              data={[{ id: "", ten: "Tất cả" }, ...listdoiTuong]}
              placeholder="Chọn đối tượng"
              defaultValue=""
              onChange={(value) => {
                onSearchInput(value, "doiTuong");
              }}
            />
          }
        />
      ),
      width: 130,
      dataIndex: "doiTuong",
      key: "doiTuong",
      render: (item) => {
        const index = listdoiTuong.findIndex((dt) => dt.id === item);
        if (index === -1) return;
        return listdoiTuong[index].ten;
      },
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={QUANNHAN}
              placeholder="Chọn quân nhân"
              defaultValue=""
              onChange={(value) => {
                onSearchInput(value, "quanNhan");
              }}
            />
          }
          sort_key="quanNhan"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.quanNhan || 0}
          title="Quân nhân"
        />
      ),
      width: 130,
      dataIndex: "quanNhan",
      key: "quanNhan",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
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
      width: 130,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
  ];

  const renderForm = ({ form, editStatus, autoFocus, refAutoFocus }) => {
    return (
      <>
        <Form.Item
          label="Mã loại đối tượng"
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã loại đối tượng!",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã loại đối tượng không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã loại đối tượng!",
            },
          ]}
        >
          <Input
            ref={refAutoFocus}
            autoFocus={autoFocus}
            className="input-option"
            placeholder="Vui lòng nhập mã loại đối tượng"
          />
        </Form.Item>
        <Form.Item
          label="Tên loại đối tượng"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên loại đối tượng!",
            },
            {
              max: 1000,
              message: "Vui lòng nhập tên loại đối tượng không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên loại đối tượng!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên loại đối tượng"
          />
        </Form.Item>
        <Form.Item
          label="Đối tượng"
          name="doiTuong"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn đối tượng!",
            },
          ]}
        >
          <Select data={listdoiTuong} placeholder="Chọn đối tượng" />
        </Form.Item>

        <Form.Item label=" " name="quanNhan" valuePropName="checked">
          <Checkbox>Quân nhân</Checkbox>
        </Form.Item>
        <Form.Item
          label="Ghi chú"
          name="ghiChu"
          rules={[
            {
              max: 1000,
              message: "Vui lòng nhập ghi chú không quá 1000 ký tự!",
            },
          ]}
        >
          <TextArea
            showCount={true}
            maxLength={1000}
            rows="4"
            placeholder="Nhập ghi chú"
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
        titleTable="Danh mục loại đối tượng"
        dataEditDefault={dataEditDefault}
        getColumns={getColumns}
        createOrEdit={createOrEdit}
        updateData={updateData}
        renderForm={renderForm}
        getData={getListLoaiDoiTuong}
        listData={listLoaiDoiTuong}
        dataSearch={dataSearch}
        totalElements={totalElements}
        page={page}
        size={size}
        roleSave={[ROLES["DANH_MUC"].LOAI_DOI_TUONG_THEM]}
        roleEdit={[ROLES["DANH_MUC"].LOAI_DOI_TUONG_SUA]}
      />
      {/* <HomeWrapper title="Danh mục">
        <Col
          {...(!state.showFullTable
            ? collapseStatus
              ? TABLE_LAYOUT_COLLAPSE
              : TABLE_LAYOUT
            : null)}
          span={state.showFullTable ? 24 : null}
          className={`pr-3 ${
            state.changeShowFullTbale ? "" : "transition-ease"
          }`}
        >
          <TableWrapper
            title="Danh mục loại đối tượng"
            scroll={{ x: 1000 }}
            classNameRow={"custom-header"}
            styleMain={{ marginTop: 0 }}
            styleContainerButtonHeader={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingRight: 35,
            }}
            buttonHeader={
              checkRole([ROLES["DANH_MUC"].LOAI_DOI_TUONG_THEM])
                ? [
                    {
                      title: "Thêm mới",
                      onClick: handleClickedBtnAdded,
                      buttonHeaderIcon: (
                        <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
                      ),
                    },
                    {
                      className: "btn-change-full-table",
                      title: (
                        <Icon
                          component={state.showFullTable ? thuNho : showFull}
                        />
                      ),
                      onClick: handleChangeshowTable,
                    },
                    {
                      className: "btn-collapse",
                      title: (
                        <Icon
                          component={
                            collapseStatus ? extendTable : extendChiTiet
                          }
                        />
                      ),
                      onClick: handleCollapsePane,
                    },
                  ]
                : [
                    {
                      className: "btn-change-full-table",
                      title: (
                        <Icon
                          component={state.showFullTable ? thuNho : showFull}
                        />
                      ),
                      onClick: handleChangeshowTable,
                    },
                    {
                      className: "btn-collapse",
                      title: (
                        <Icon
                          component={
                            collapseStatus ? extendTable : extendChiTiet
                          }
                        />
                      ),
                      onClick: handleCollapsePane,
                    },
                  ]
            }
            columns={columns}
            dataSource={data}
            onRow={onRow}
            rowClassName={setRowClassName}
          ></TableWrapper>
          {totalElements && (
            <Pagination
              onChange={onPageChange}
              current={page + 1}
              pageSize={size}
              total={totalElements}
              listData={data}
              onShowSizeChange={onSizeChange}
              style={{ flex: 1, justifyContent: "flex-end" }}
            />
          )}
        </Col>
        {!state.showFullTable && (
          <Col
            {...(collapseStatus ? ADD_LAYOUT_COLLAPSE : ADD_LAYOUT)}
            className={`mt-3 ${
              state.changeShowFullTbale ? "" : "transition-ease"
            }`}
            style={
              state.isSelected
                ? { border: "2px solid #c1d8fd", borderRadius: 20 }
                : {}
            }
          >
            <CreatedWrapper
              title="Thông tin chi tiết"
              onCancel={handleCancel}
              cancelText="Hủy"
              onOk={handleAdded}
              okText="Lưu"
              roleSave={[ROLES["DANH_MUC"].LOAI_DOI_TUONG_THEM]}
              roleEdit={[ROLES["DANH_MUC"].LOAI_DOI_TUONG_SUA]}
              editStatus={editStatus}
            >
              <FormWraper
                disabled={
                  editStatus
                    ? !checkRole([ROLES["DANH_MUC"].LOAI_DOI_TUONG_SUA])
                    : !checkRole([ROLES["DANH_MUC"].LOAI_DOI_TUONG_THEM])
                }
                form={form}
                layout="vertical"
                style={{ width: "100%" }}
                className="form-custom"
              ></FormWraper>
            </CreatedWrapper>
          </Col>
        )}
      </HomeWrapper> */}
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    loaiDoiTuong: {
      listLoaiDoiTuong,
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
    },
    utils: { listdoiTuong = [] },
  } = state;

  return {
    listLoaiDoiTuong,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    listdoiTuong,
  };
};
const mapDispatchToProps = ({
  loaiDoiTuong: { getListLoaiDoiTuong, createOrEdit, onDelete, updateData },
  utils: { getUtils },
}) => ({
  getListLoaiDoiTuong,
  getUtils,
  createOrEdit,
  onDelete,
  updateData,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoaiDoiTuong);
