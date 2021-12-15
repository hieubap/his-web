import React, { useEffect, useMemo, memo, useState, useRef } from "react";
import { Checkbox, Input } from "antd";
import { Pagination, HeaderSearch, TableWrapper, Select } from "components";
import { PAGE_DEFAULT, HIEU_LUC } from "constants/index";
import { combineSort } from "utils";
import { connect, useDispatch } from "react-redux";
import { checkRole } from "app/Sidebar/constant";
import { ROLES } from "constants/index";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import TableLeft from "../../../../../components/BaseDmTab/TableLeft";
let timer = null;

const Tinh = ({ listData, getData, updateData, listAllQuocGia, ...props }) => {
  const getColumns = ({ onClickSort, onSearchInput, sortData }) => [
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
          search={<Input placeholder="Tìm mã" onChange={onSearchInput("ma")} />}
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
            <Input placeholder="Tìm tên tỉnh" onChange={onSearchInput("ten")} />
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
        return <Checkbox checked={item} />;
      },
    },
  ];

  const quocGia = useMemo(() => {
    return [{ id: "", ten: "Tất cả Quốc gia" }, ...listAllQuocGia];
  }, [listAllQuocGia]);

  const addHeader = ({ dataSearch, onSearchInput }) => [
    {
      content: (
        <>
          <Select
            value={dataSearch?.quocGiaId || ""}
            data={quocGia}
            placeholder="Chọn quốc gia"
            onChange={onSearchInput("quocGiaId")}
          />
        </>
      ),
    },
  ];

  return (
    <TableLeft
      getColumns={getColumns}
      listData={listData}
      getData={getData}
      updateDataEdit={(dataEditTinh) => updateData({ dataEditTinh })}
      updateData={updateData}
      addHeader={addHeader}
      {...props}
    />
  );
};

export default connect(
  ({
    ttHanhChinh: {
      listTinh: listData,
      totalTinh: total,
      pageTinh: page,
      sizeTinh: size,
      dataEditTinh: dataEdit,
      listAllQuocGia,
      dataSearch,
    },
  }) => ({
    listData,
    total,
    page,
    size,
    dataEdit,
    listAllQuocGia,
    dataSearch,
  }),
  (dispatch) => ({
    getData: dispatch.ttHanhChinh?.searchTinh,
    updateData: dispatch.ttHanhChinh?.updateData,
  })
)(memo(Tinh));
