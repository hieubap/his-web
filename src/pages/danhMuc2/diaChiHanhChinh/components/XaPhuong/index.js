import { Checkbox, Input } from "antd";
import { HeaderSearch, Select } from "components";
import TableLeft from "components/BaseDmTab/TableLeft";
import { HIEU_LUC } from "constants/index";
import React from "react";
import { connect } from "react-redux";
const XaPhuong = ({
  listData,
  getData,
  updateDataEdit,
  updateData,
  ...props
}) => {
  const getColumns = ({ onClickSort, onSearchInput, sortData }) => [
    {
      title: <HeaderSearch title="STT" />,
      width: 5,
      dataIndex: "index",
      key: "index",
    },
    {
      title: (
        <HeaderSearch
          title="Mã xã/phường"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={sortData.ma || 0}
          search={
            <Input
              placeholder="Tìm mã xã/Phường"
              onChange={onSearchInput("ma")}
            />
          }
        />
      ),
      width: 14,
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: (
        <HeaderSearch
          title="Tên xã/phường"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={sortData.ten || 0}
          search={
            <Input
              placeholder="Tìm tên xã/Phường"
              onChange={onSearchInput("ten")}
            />
          }
        />
      ),
      width: 14,
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch
          title="Tên viết tắt"
          sort_key="vietTat"
          onClickSort={onClickSort}
          dataSort={sortData.vietTat || 0}
          search={
            <Input
              placeholder="Tìm tên viết tắt"
              onChange={onSearchInput("vietTat")}
            />
          }
        />
      ),
      width: 14,
      dataIndex: "vietTat",
      key: "vietTat",
    },
    {
      title: (
        <HeaderSearch
          title="Có hiệu lực"
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={sortData.active || 0}
          searchSelect={
            <Select
              data={HIEU_LUC}
              defaultValue=""
              placeholder="Chọn hiệu lực"
              onChange={onSearchInput("active")}
            />
          }
        />
      ),
      width: 14,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} onClick={() => {}} />;
      },
    },
  ];
  return (
    <TableLeft
      getColumns={getColumns}
      listData={listData}
      getData={getData}
      updateDataEdit={(dataEditXaPhuong) => updateData({ dataEditXaPhuong })}
      updateData={updateData}
      {...props}
    />
  );
};

export default connect(
  ({
    ttHanhChinh: { dataEditXaPhuong: dataEdit },
    xaTongHop: { listData, totalElements: total, page, size },
  }) => ({
    size,
    page,
    listData,
    total,
    dataEdit,
  }),
  (dispatch) => ({
    getData: dispatch.ttHanhChinh?.searchXaPhuong,
    updateData: dispatch.ttHanhChinh?.updateData,
  })
)(XaPhuong);
