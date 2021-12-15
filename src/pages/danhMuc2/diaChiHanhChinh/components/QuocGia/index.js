import React, { useEffect, useMemo, useRef, useState } from "react";
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
import TableLeft from "components/BaseDmTab/TableLeft";
let timer = null;

const QuocGia = ({ getData, listData, updateData, ...props }) => {
  const getColumns = ({ onClickSort, onSearchInput, sortData }) => [
    {
      title: <HeaderSearch title="STT" />,
      width: 7,
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã quốc gia"
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
          title="Tên quốc gia"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={sortData.ten || 0}
          search={
            <Input
              placeholder="Tìm tên quốc gia"
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
              defaultValue=""
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              onChange={onSearchInput("active")}
            />
          }
        />
      ),
      width: 10,
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
      updateDataEdit={(dataEditQuocGia) => updateData({ dataEditQuocGia })}
      updateData={updateData}
      {...props}
    />
  );
};

export default connect(
  ({
    ttHanhChinh: {
      listQuocGia: listData,
      totalQuocGia: total,
      pageQuocGia: page,
      sizeQuocGia: size,
      dataEditQuocGia: dataEdit,
    },
  }) => ({
    page,
    size,
    listData,
    total,
    dataEdit,
  }),
  (dispatch) => ({
    getData: dispatch.ttHanhChinh?.getListQuocGia,
    updateData: dispatch.ttHanhChinh?.updateData,
  })
)(QuocGia);
