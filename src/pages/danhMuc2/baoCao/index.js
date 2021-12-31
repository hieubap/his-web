import { Checkbox, Input } from "antd";
import Select from "components/Select";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { HIEU_LUC, IN_NHANH_KYSO } from "constants/index";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import BaseDmTabForm from "../../../components/BaseDmTabForm";
import BaoCaoChiTiet from "./components/BaoCaoChiTiet";
import { SORT_DEFAULT } from "./configs";
import { GlobalStyle, Main } from "./styled";
import ThietLapChanKy from "./components/ThietLapChanKy";

const getUploadedFileName = (url = "") => {
  const indexSlash = url?.lastIndexOf("/");
  let updatedName = url?.slice(indexSlash + 1);

  return `${updatedName}`;
};

const BaoCao = ({
  listData,
  onSizeChange,
  onChangeInputSearch,
  onSortChange,
  dataSortColumn,
  totalElements,
  page,
  size,
  onSearch,
  createOrEdit,
  getUtils,
  listhuongGiay,
  listkhoGiay,
  listDinhDangBaoCao,
  getByBaoCaoId,
  dataChanKy,
  ...props
}) => {
  const [state, _setState] = useState({
    mauBaoCao: null,
    editStatus: false,
    defaultFileList: [],
    isSelected: false,
    showFullTable: false,
    activeKeyTab: "1",
  });

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    getUtils({ name: "huongGiay" });
    getUtils({ name: "khoGiay" });
    getUtils({ name: "DinhDangBaoCao" });
  }, []);

  const getColumns = ({ onClickSort, onSearchInput }) => [
    {
      title: <HeaderSearch title="STT" />,
      width: "70px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã báo cáo"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma}
          search={
            <Input
              placeholder="Tìm mã báo cáo"
              onChange={onSearchInput("ma")}
            />
          }
        />
      ),
      width: "120px",
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: (
        <HeaderSearch
          title="Tên báo cáo"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ten"] || 0}
          search={
            <Input
              placeholder="Tìm tên báo cáo"
              onChange={onSearchInput("ten")}
            />
          }
        />
      ),
      width: "120px",
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch
          title="Khổ giấy"
          sort_key="khoGiay"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["khoGiay"] || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={[{ id: "", ten: "Tất cả" }, ...(listkhoGiay || [])]}
              placeholder="Chọn khổ giấy"
              onChange={onSearchInput("khoGiay")}
            />
          }
        />
      ),
      width: "100px",
      dataIndex: "khoGiay",
      key: "khoGiay",
      render: (record) => {
        const currentName = (listkhoGiay || []).find(
          (item) => item.id === record
        );
        return <span>{currentName?.ten}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Kích thước chiều dọc(mm)"
          sort_key="chieuDoc"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["chieuDoc"] || 0}
          search={
            <Input
              placeholder="Tìm theo kích thước chiều dọc"
              onChange={onSearchInput("chieuDoc")}
            />
          }
        />
      ),
      width: "160px",
      dataIndex: "chieuDoc",
      key: "chieuDoc",
      align: "right",
    },
    {
      title: (
        <HeaderSearch
          title="Kích thước chiều ngang(mm)"
          sort_key="chieuNgang"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["chieuNgang"] || 0}
          search={
            <Input
              placeholder="Tìm theo kích thước chiều ngang"
              onChange={onSearchInput("chieuNgang")}
            />
          }
        />
      ),
      width: "160px",
      dataIndex: "chieuNgang",
      key: "chieuNgang",
      align: "right",
    },
    {
      title: (
        <HeaderSearch
          title="Hướng giấy"
          sort_key="huongGiay"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["huongGiay"] || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={[{ id: "", ten: "Tất cả" }, ...(listhuongGiay || [])]}
              placeholder="Chọn hướng giấy"
              onChange={onSearchInput("huongGiay")}
            />
          }
        />
      ),
      width: "100px",
      dataIndex: "huongGiay",
      key: "huongGiay",
      render: (record) => {
        const currentName = (listhuongGiay || []).find(
          (item) => item.id === record
        );
        return <span>{currentName?.ten}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Định dạng xuất file"
          sort_key="dinhDang"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dinhDang"] || 0}
          searchSelect={
            <Select
              defaultValue={null}
              data={[
                { id: null, ten: "Tất cả" },
                ...(listDinhDangBaoCao || []),
              ]}
              placeholder="Chọn định dạng"
              onChange={onSearchInput("dinhDang")}
            />
          }
        />
      ),
      width: "100px",
      dataIndex: "dinhDang",
      key: "dinhDang",
      render: (record) => {
        const dinhDangBC =
          (listDinhDangBaoCao || []).find((element) => element.id === record) ||
          {};
        return <span>{dinhDangBC.ten}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="In nhanh"
          sort_key="inNhanh"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["inNhanh"] || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={IN_NHANH_KYSO}
              placeholder="Chọn in nhanh"
              onChange={onSearchInput("inNhanh")}
            />
          }
        />
      ),
      width: "100px",
      dataIndex: "inNhanh",
      key: "inNhanh",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Ký số"
          sort_key="kySo"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["kySo"] || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={IN_NHANH_KYSO}
              placeholder="Chọn ký số"
              onChange={onSearchInput("kySo")}
            />
          }
        />
      ),
      width: "100px",
      dataIndex: "kySo",
      key: "kySo",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.active || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              onChange={onSearchInput("active")}
            />
          }
          title="Có hiệu lực"
        />
      ),
      width: "100px",
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
      title: "Thông tin dịch vụ",
      render: BaoCaoChiTiet,
    },
    {
      title: "THIẾT LẬP CHÂN KÝ",
      render: ThietLapChanKy,
    },
  ];
  return (
    <Main>
      <GlobalStyle />
      <BaseDmTabForm
        listPanel={listPanel}
        getColumns={getColumns}
        listData={listData}
        {...props}
      />
    </Main>
  );
};

const mapStateToProps = ({
  baoCao: {
    listData,
    totalElements,
    page,
    size,
    dataSearch,
    dataSort,
    currentItem,
    dataSortColumn,
    dataEditDefault,
    dataChanKy,
  },
  utils: { listkhoGiay, listhuongGiay, listDinhDangBaoCao },
}) => {
  return {
    listData,
    totalElements,
    page,
    size,
    currentItem,
    dataSearch: dataSearch || {},
    dataSort,
    dataSortColumn: dataSortColumn || SORT_DEFAULT,
    dataEditDefault,
    listhuongGiay,
    listkhoGiay,
    listDinhDangBaoCao,
    dataChanKy,
  };
};
const mapDispatchToProps = ({
  baoCao: {
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
    createOrEdit,
    getByBaoCaoId,
  },
  utils: { getUtils },
}) => ({
  onSearch,
  onSizeChange,
  onSortChange,
  onChangeInputSearch,
  getUtils,
  updateData,
  createOrEdit,
  getByBaoCaoId,
});
export default connect(mapStateToProps, mapDispatchToProps)(BaoCao);
