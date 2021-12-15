import { Checkbox, Input } from "antd";
import { HeaderSearch, Select } from "components";
import { HIEU_LUC } from "constants/index";
import React from "react";
import { getState, dispatch } from "redux-store/stores";

export default (item) => ({
  ...item,
  tab: "Tất cả",
  getColumns: ({ onClickSort, onSearchInput, sortData }) => [
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
              onChange={(e) => onSearchInput(e.target.value, "quocGia.ten")}
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
              onChange={(e) =>
                onSearchInput(e.target.value, "tinhThanhPho.ten")
              }
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
              onChange={(e) => onSearchInput(e.target.value, "quanHuyen.ten")}
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
              onChange={(e) => onSearchInput(e.target.value, "ten")}
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
              onChange={(e) => onSearchInput(e.target.value, "active")}
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
  ],
});
