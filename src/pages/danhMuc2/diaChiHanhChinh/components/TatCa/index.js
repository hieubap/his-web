import React, { useEffect, useMemo, useRef, useState } from "react";
import { Checkbox, Input } from "antd";
import { Pagination, HeaderSearch, TableWrapper, Select } from "components";
import { HIEU_LUC } from "constants/index";
import { connect, useDispatch } from "react-redux";
import { customeSelect } from "../../config";
import { checkRole } from "app/Sidebar/constant";
import { ROLES } from "constants/index";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import TableLeft from "../../../../../components/BaseDmTab/TableLeft";
const XaPhuong = ({ listData, getData, ...props }) => {
  const getColumns = ({ onClickSort, onSearchInput, sortData }) => [
    {
      title: <HeaderSearch title="STT" />,
      width: 5,
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Quốc gia"
          sort_key="quanHuyen.tinhThanhPho.quocGia.ten"
          onClickSort={onClickSort}
          dataSort={sortData["quanHuyen.tinhThanhPho.quocGia.ten"] || 0}
          search={
            <Input
              placeholder="Tìm quốc gia"
              onChange={onSearchInput("quocGia.ten")}
            />
          }
        />
      ),
      width: 14,
      dataIndex: "quocGia",
      key: "quocGia",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tỉnh/TP"
          sort_key="quanHuyen.tinhThanhPho.ten"
          onClickSort={onClickSort}
          dataSort={sortData["quanHuyen.tinhThanhPho.ten"] || 0}
          search={
            <Input
              placeholder="Tìm tỉnh/TP"
              onChange={onSearchInput("tinhThanhPho.ten")}
            />
          }
        />
      ),
      width: 14,
      dataIndex: "tinhThanhPho",
      key: "tinhThanhPho",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Quận/Huyện"
          sort_key="quanHuyen.ten"
          onClickSort={onClickSort}
          dataSort={sortData["quanHuyen.ten"] || 0}
          search={
            <Input
              placeholder="Tìm quận/Huyện"
              onChange={onSearchInput("quanHuyen.ten")}
            />
          }
        />
      ),
      width: 14,
      dataIndex: "quanHuyen",
      key: "quanHuyen",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Xã/Phường"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={sortData.ten || 0}
          search={
            <Input
              placeholder="Tìm xã/Phường"
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
      {...props}
    />
  );
};

export default connect(
  ({ xaTongHop: { listData, totalElements, page, size } }) => ({
    page,
    size,
    listData,
    total: totalElements,
  }),
  (dispatch) => ({
    getData: dispatch.xaTongHop?.onSearch,
  })
)(XaPhuong);
