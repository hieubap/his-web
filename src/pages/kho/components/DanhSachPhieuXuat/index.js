import React, { useEffect, useMemo } from "react";
import Pagination from "components/Pagination";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { TK_TRANG_THAI_PHIEU_NHAP_DU_TRU } from "constants/index";
import Card from "../Card";

const DanhSachPhieuXuat = (props) => {
  const history = useHistory();

  const {
    xuatKho: { sort = {}, listPhieuXuat, totalElements, page, size },
    utils: { listTrangThaiPhieuNhapXuat = [] },
    nhapKhoChiTiet: { phieuNhapXuatId },
  } = useSelector((state) => state);

  const {
    xuatKho: { getListPhieuXuat, onSizeChange },
    utils: { getUtils },
    nhapKhoChiTiet: { updateData: updateDataNhapKho },
  } = useDispatch();

  useEffect(() => {
    getUtils({ name: "TrangThaiPhieuNhapXuat" });
  }, []);

  const onClickSort = (key, value) => {
    getListPhieuXuat({ sort: { key, value } });
  };
  const onChangePage = (page) => {
    getListPhieuXuat({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size });
  };

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
    <Card noPadding={true} top={8}>
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
        listData={listPhieuXuat}
        total={totalElements}
        onShowSizeChange={handleSizeChange}
        stylePagination={{ flex: 1, justifyContent: "flex-start" }}
      />
    </Card>
  );
};

export default DanhSachPhieuXuat;
