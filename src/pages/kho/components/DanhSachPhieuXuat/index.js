import Pagination from "components/Pagination";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { ContentTable, Main } from "./styled";
import { TK_TRANG_THAI_PHIEU_XUAT } from "constants/index";

let timer = null;

const DanhSach = (props) => {
  const {
    dataSortColumn,
    getListPhieuXuat,
    onSizeChange,
    listPhieuXuat,
    getUtils,
    listTrangThaiPhieuNhapXuat,
    totalElements,
    page,
    size,
    updateDataNhapKho,
    phieuNhapXuatId,
    onChangeInputSearch,
    listNhaSanXuat,
    listNguonNhapKho,
    listAllQuyetDinhThau,
    updateData,
    sort = {},
  } = props;
  useEffect(() => {
    onSizeChange({
      page,
      size,
      dataSearch: {
        dsTrangThai: TK_TRANG_THAI_PHIEU_XUAT.map((item) => item.value),
      },
    });
    getUtils({ name: "TrangThaiPhieuNhapXuat" });
  }, []);
  const onClickSort = (key, value) => {
    getListPhieuXuat({ sort: { key, value } });
  };
  const onChangePage = (page) => {
    updateData({ page });
    getListPhieuXuat({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size });
  };

  const showChiTiet = () => {
    updateData({ chiTiet: false });
  };

  const history = useHistory();

  const onRow = (record) => {
    return {
      onClick: () => {
        const { id } = record;
        history.push("/kho/xuat-kho/chi-tiet/" + id);
        updateDataNhapKho({
          phieuNhapXuatId: id,
          currentItem: { ...record },
        });
      },
    };
  };

  const setRowClassName = (record) => {
    let idDiff;
    idDiff = phieuNhapXuatId;
    return record.id === idDiff ? "row-actived" : "";
  };

  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      value = e.target.value;
    } else if (e?._d) value = e.format("YYYY-MM-DD");
    else value = e;
    clearTimeout(timer);
    timer = setTimeout(() => {
      onChangeInputSearch({ [key]: value });
    }, 300);
  };
  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "25px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Số phiếu"
          sort_key="soPhieu"
          onClickSort={onClickSort}
          dataSort={sort.key === "soPhieu" ? sort.value : 0}
        />
      ),
      width: "50px",
      dataIndex: "soPhieu",
      key: "soPhieu",
    },
    {
      title: (
        <HeaderSearch
          title="Kho nhập"
          sort_key="kho"
          onClickSort={onClickSort}
          dataSort={sort.key === "kho" ? sort.value : 0}
        />
      ),
      width: "150px",
      dataIndex: "kho",
      key: "kho",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Trạng thái"
          sort_key="trangThai"
          onClickSort={onClickSort}
          dataSort={sort.key === "trangThai" ? sort.value : 0}
        />
      ),
      width: "70px",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (item) => {
        return listTrangThaiPhieuNhapXuat.find((x) => x.id == item)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Loại xuất"
          sort_key="loaiNhapXuat"
          onClickSort={onClickSort}
          dataSort={sort.key === "loaiNhapXuat" ? sort.value : 0}
        />
      ),
      width: "70px",
      key: "loaiNhapXuat",
      render: (_, data) => data?.hinhThucNhapXuat?.ten,
    },
    {
      title: (
        <HeaderSearch
          title="Tháng dự trù"
          sort_key="thangDuTru"
          onClickSort={onClickSort}
          dataSort={sort.key === "thangDuTru" ? sort.value : 0}
        />
      ),
      width: "70px",
      dataIndex: "thangDuTru",
      key: "thangDuTru",
      render: (item) => (item ? "Tháng " + item : ""),
    },
    {
      title: (
        <HeaderSearch
          title="Kho xuất"
          sort_key="khoDoiUng.ten"
          onClickSort={onClickSort}
          dataSort={sort.key === "khoDoiUng.ten" ? sort.value : 0}
        />
      ),
      width: "100px",
      dataIndex: "khoDoiUng",
      key: "khoDoiUng",
      render: (item) => {
        return item?.ten;
      },
    },
  ];
  return (
    <Main>
      <ContentTable>
        <TableWrapper
          columns={columns}
          dataSource={listPhieuXuat}
          onRow={onRow}
          rowKey={(record) => `${record.id}`}
          rowClassName={setRowClassName}
        />
        <Pagination
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          total={totalElements}
          onShowSizeChange={handleSizeChange}
          stylePagination={{ flex: 1, justifyContent: "flex-start" }}
        />
      </ContentTable>
    </Main>
  );
};
const mapStateToProps = (state) => {
  const {
    xuatKho: { sort, listPhieuXuat, totalElements, page, size },
    utils: { listTrangThaiPhieuNhapXuat = [] },
    nhapKhoChiTiet: { phieuNhapXuatId },
    nguonNhapKho: { listData: listNguonNhapKho },
    quyetDinhThau: { listAllQuyetDinhThau },
    nhaSanXuat: { listNhaSanXuat },
  } = state;
  return {
    listPhieuXuat,
    listTrangThaiPhieuNhapXuat,
    totalElements,
    sort,
    page,
    size,
    phieuNhapXuatId,
    listNguonNhapKho,
    listAllQuyetDinhThau,
    listNhaSanXuat,
  };
};
const mapDispatchToProps = ({
  xuatKho: { getListPhieuXuat, onSizeChange, updateData, onChangeInputSearch },
  utils: { getUtils },
  nhapKhoChiTiet: { updateData: updateDataNhapKho },
}) => ({
  getListPhieuXuat,
  getUtils,
  onSizeChange,
  updateDataNhapKho,
  updateData,
  onChangeInputSearch,
});
export default connect(mapStateToProps, mapDispatchToProps)(DanhSach);
