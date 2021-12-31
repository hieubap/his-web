import { Checkbox, Form, Input, message, Upload } from "antd";
import BaseDm from "components/BaseDm";
import Select from "components/Select";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { HIEU_LUC, ROLES } from "constants/index";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import fileProvider from "../../../data-access/file-provider";
import { WrapperStyled } from "./styled";
import BaseDmTabForm from "../../../components/BaseDmTabForm";
import ThongTinHoiDong from "./components/ThongTinHoiDong";
import ChiTietHoiDong from "./components/ChiTietHoiDong";

const HoiDong = ({
  _listData,
  _dataSearch,
  _dataSort,
  _page,
  _size,
  _totalElements,
  _dataEdit,

  _getList,
  _createOrEdit,
  _onDelete,
  updateData,
  store,

  listLoaiHoiDongKiemKe,
  getUtils,
  ...props
}) => {
  useEffect(() => {
    getUtils({ name: "LoaiHoiDongKiemKe" });
  }, []);
  const getColumns = ({ page, size, onClickSort, onSearchInput }) => [
    {
      title: <HeaderSearch title="STT" />,
      width: 15,
      dataIndex: "stt",
      key: "stt",
      align: "center",
      render: (_, __, index) => page * size + index + 1,
    },
    {
      title: (
        <HeaderSearch
          title="Mã"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={_dataSort.ma || 0}
          search={
            <Input
              placeholder="Tìm mã hội đồng"
              onChange={onSearchInput("ma")}
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
          title="Tên hội đồng"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={_dataSort.ten || 0}
          search={
            <Input
              placeholder="Tìm tên hội đồng"
              onChange={onSearchInput("ten")}
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
              data={[
                {
                  id: "",
                  ten: "Tất cả",
                },
                ...(listLoaiHoiDongKiemKe || []),
              ]}
              placeholder="Chọn loại hội đồng"
              defaultValue=""
              onChange={onSearchInput("loai")}
            />
          }
          sort_key="loai"
          onClickSort={onClickSort}
          dataSort={_dataSort.loai || 0}
          title="Loại hội đồng"
        />
      ),
      width: 50,
      dataIndex: "loai",
      key: "loai",
      align: "center",
      render: (item) => listLoaiHoiDongKiemKe?.find((i) => i.id === item)?.ten,
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
          dataSort={_dataSort.active || 0}
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

  const listPanel = ({}) => [
    {
      title: "Thông tin hội đồng",
      render: ThongTinHoiDong,
    },
    {
      title: "Thông tin chi tiết hội đồng",
      render: ChiTietHoiDong,
    },
  ];
  return (
    <WrapperStyled>
      <BaseDmTabForm
        title="Danh mục Hội đồng"
        listPanel={listPanel}
        getColumns={getColumns}
        listData={_listData}
        totalElements={_totalElements}
        page={_page}
        size={_size}
        dataSort={_dataSort}
        dataSearch={_dataSearch}
        dataEditDefault={_dataEdit}
        getData={_getList}
        updateData={updateData}
        rowKey={(record) => record.id}
        {...props}
      />
    </WrapperStyled>
  );
};

export default connect(
  ({
    hoiDongKiemKe: {
      _listData,
      _dataSearch = {},
      _dataSort = {},
      _page,
      _size,
      _totalElements,
      _dataEdit,
    },
    utils: { listLoaiHoiDongKiemKe },
    ...store
  }) => ({
    store,
    _listData,
    _dataSearch,
    _dataSort,
    _page,
    _size,
    _totalElements,
    _dataEdit,

    listLoaiHoiDongKiemKe,
  }),
  ({
    hoiDongKiemKe: { _getList, _createOrEdit, updateData, _onDelete },
    utils: { getUtils },
  }) => ({
    _getList,
    _createOrEdit,
    _onDelete,
    updateData,

    getUtils,
  })
)(HoiDong);
