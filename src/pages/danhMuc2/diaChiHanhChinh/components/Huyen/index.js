import { Checkbox, Input } from "antd";
import { HeaderSearch, Select } from "components";
import TableLeft from "components/BaseDmTab/TableLeft";
import { HIEU_LUC } from "constants/index";
import React from "react";
import { connect } from "react-redux";

const Huyen = ({
  listData,
  getData,
  updateData,
  listAllQuocGia,
  listAllTinh1,
  listAllQuanHuyen,
  ...props
}) => {
  const getColumns = ({ onClickSort, onSearchInput, sortData }) => [
    {
      title: <HeaderSearch title="STT" />,
      width: 5,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã quận/huyện"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={sortData["ma"] || 0}
          search={
            <Input
              placeholder="Tìm mã quận/huyện"
              onChange={onSearchInput("ma")}
            />
          }
        />
      ),
      width: 20,
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: (
        <HeaderSearch
          title="Tên quận/huyện"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={sortData["ten"] || 0}
          search={
            <Input
              placeholder="Tìm tên quận/huyện"
              onChange={onSearchInput("ten")}
            />
          }
        />
      ),
      width: 20,
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch
          title="Tên viết tắt"
          sort_key="vietTat"
          onClickSort={onClickSort}
          dataSort={sortData["vietTat"] || 0}
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
          dataSort={sortData["active"] || 0}
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

  const addHeader = ({ dataSearch, onSearchInput }) => [
    {
      content: (
        <>
          <Select
            value={dataSearch?.quocGiaId}
            data={listAllQuocGia}
            placeholder="Chọn quốc gia"
            onChange={onSearchInput("quocGiaId")}
            style={{ marginRight: "5pt", width: "22%" }}
          />
        </>
      ),
    },
    {
      content: (
        <>
          <Select
            value={dataSearch?.tinhThanhPhoId}
            data={listAllTinh1}
            placeholder="Chọn tỉnh"
            onChange={onSearchInput("tinhThanhPhoId")}
            style={{ width: "22%" }}
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
      updateDataEdit={(dataEditHuyen) => updateData({ dataEditHuyen })}
      updateData={updateData}
      addHeader={addHeader}
      {...props}
    />
  );
};

export default connect(
  ({
    huyenTongHop: { listData, totalElements: total, page, size },
    ttHanhChinh: {
      dataEditHuyen: dataEdit,
      listAllQuocGia,
      listAllTinh1,
      listAllQuanHuyen,
      dataSearch,
    },
  }) => ({
    dataSearch,
    listData,
    total,
    page,
    size,
    dataEdit,
    listAllQuocGia,
    listAllTinh1,
    listAllQuanHuyen,
  }),
  (dispatch) => ({
    getData: dispatch?.ttHanhChinh?.searchQuanHuyen,
    updateData: dispatch?.ttHanhChinh?.updateData,
  })
)(Huyen);
