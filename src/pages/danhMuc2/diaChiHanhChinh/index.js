import { Tabs } from "antd";
import BaseDmTab from "components/BaseDmTab";
import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import quanHuyen from "./models/quanHuyen";
import quocGia from "./models/quocGia";
import tatCa from "./models/tatCa";
import tinhThanhPho from "./models/tinhThanhPho";
import xaPhuong from "./models/xaPhuong";
import { Main } from "./styled";
import QuocGia from "./components/QuocGia";
import Tinh from "./components/Tinh";
import QuanHuyen from "./components/Huyen";
import XaPhuong from "./components/XaPhuong";
import TatCa from "./components/TatCa";
import FormQuocGia from "./components/QuocGia/FormQuocGia";
import { FormHuyen, FormTinh, FormXaPhuong } from "./components";

const { TabPane } = Tabs;
const DiaChiHanhChinh = ({
  listTatCa,
  listQuocGia,
  listTinh,
  listQuanHuyen,
  listXaPhuong,

  dataSortQuocGia,
  dataSortTinh,
  dataSortHuyen,
  dataSortXa,

  totalQuocGia,
  totalTinh,
  totalHuyen,
  totalXa,

  getQuocGia,
  getTinh,
  getQuanHuyen,
  getXaPhuong,

  getListAllQuocGia,
  getListTinh,
  getListHuyen,
}) => {
  useEffect(() => {
    getListAllQuocGia();
    getListTinh({ size: 999 });
    getListHuyen({ size: 999 });
  }, []);

  const tabObject = [
    {
      tab: "Tất cả",
      table: TatCa,
    },
    {
      tab: "Quốc gia",
      table: QuocGia,
      form: FormQuocGia,
    },
    {
      tab: "Tỉnh/TP",
      table: Tinh,
      form: FormTinh,
    },
    {
      tab: "Quận/Huyện",
      table: QuanHuyen,
      form: FormHuyen,
    },
    {
      tab: "Xã/Phường",
      table: XaPhuong,
      form: FormXaPhuong,
    },
  ];
  return (
    <Main>
      <BaseDmTab tabObject={tabObject} />
    </Main>
  );
};

export default connect(
  (state) => ({
    listTatCa: state.xaTongHop?.listData,
    listQuocGia: state.ttHanhChinh?.listQuocGia,
    listTinh: state.ttHanhChinh?.listTinh,
    listQuanHuyen: state.huyenTongHop?.listData,
    listXaPhuong: state.xaTongHop?.listData,

    dataSortQuocGia: state.ttHanhChinh?.dataSortQuocGia,
    dataSortTinh: state.ttHanhChinh?.dataSortTinh,
    dataSortHuyen: state.huyenTongHop?.dataSortColumn,
    dataSortXa: state.xaTongHop?.dataSortColumn,

    totalQuocGia: state.ttHanhChinh?.totalQuocGia,
    totalTinh: state.ttHanhChinh?.totalTinh,
    totalHuyen: state.huyenTongHop?.totalElements,
    totalXa: state.xaTongHop?.totalElements,
  }),
  (dispatch) => ({
    getQuocGia: dispatch.ttHanhChinh?.getListQuocGia2,
    getTinh: dispatch.ttHanhChinh?.searchTinh,
    getQuanHuyen: dispatch.huyenTongHop?.onSearch,
    getXaPhuong: dispatch.xaTongHop?.onSearch,

    getListAllQuocGia: dispatch.ttHanhChinh?.getListAllQuocGia,
    getListTinh: dispatch.ttHanhChinh?.getListTinh,
    getListHuyen: dispatch.ttHanhChinh?.getListHuyen,
  })
)(DiaChiHanhChinh);
