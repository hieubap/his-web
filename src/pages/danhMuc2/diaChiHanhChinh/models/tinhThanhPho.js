import { Checkbox, Input } from "antd";
import { HeaderSearch, Select } from "components";
import { HIEU_LUC } from "constants/index";
import React from "react";

export default (item) => ({
  ...item,
  tab: "Tỉnh/TP",
  getColumns: ({ onClickSort, onSearchInput, sortData }) => [
    {
      title: <HeaderSearch title="STT" />,
      width: 7,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã tỉnh"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={sortData.ma || 0}
          search={
            <Input
              placeholder="Tìm mã"
              onChange={(e) => {
                onSearchInput(e.target.value, "ma");
              }}
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
          title="Tên tỉnh"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={sortData.ten || 0}
          search={
            <Input
              placeholder="Tìm tên tỉnh"
              onChange={(e) => {
                onSearchInput(e.target.value, "ten");
              }}
            />
          }
        />
      ),
      width: 14,
      dataIndex: "ten",
      key: "ten",
    },
    // {
    //   title: (
    //     <HeaderSearch
    //       title="Quốc gia"
    //       sort_key="quocGia.ten"
    //       onClickSort={onClickSort}
    //       dataSort={sortData["quocGia.ten"] || 0}
    //       searchSelect={
    //         <Select
    //           defaultValue=""
    //           data={[{ id: "", ten: "Tất cả" }, ...listAllQuocGia]}
    //           placeholder="Chọn quốc gia"
    //           onChange={(value) => {
    //             onSearchInput(value, "quocGiaId");
    //           }}
    //         />
    //       }
    //     />
    //   ),
    //   width: 14,
    //   dataIndex: "quocGia",
    //   key: "quocGia",
    //   render: (item) => {
    //     return item?.ten;
    //   },
    // },
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
              onChange={(e) => {
                onSearchInput(e.target.value, "vietTat");
              }}
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
              onChange={(value) => {
                onSearchInput(value, "active");
              }}
            />
          }
        />
      ),
      width: 14,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
  ],
});
