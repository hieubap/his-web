import React, { useEffect } from "react";
import TableWrapper from "components/TableWrapper";
import { Main, ContentTable } from "./styled";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { formatNumber } from "utils";

let timer = null;

const DanhSach = (props) => {
  const {
    dataSortColumn,
    getListPhieuNhap,
    onSizeChange,
    listPhieuNhap,
    getUtils,
    listTrangThaiPhieuNhapXuat,
    totalElements,
    page,
    size,
    updateDataNhapKho,
    phieuNhapXuatId,
    onChangeInputSearch,
    onSortChange,
    updateData,
  } = props;
  useEffect(() => {
    onSizeChange(10);
    getUtils({ name: "TrangThaiPhieuNhapXuat" });
  }, []);

  const onChangePage = (page) => {
    getListPhieuNhap({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size });
  };

  const onClickSort = (key, value) => {
    onSortChange({ [key]: value });
  };

  const history = useHistory();

  const onRow = (record) => {
    return {
      onClick: () => {
        let path = "/kho/nhap-kho/chi-tiet/";
        if (record?.thangDuTru) {
          path = "/kho/phieu-nhap-du-tru/chi-tiet/";
        }
        const { id } = record;
        history.push(`${path}${id}`);
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
          dataSort={dataSortColumn["soPhieu"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "soPhieu",
      key: "soPhieu",
    },
    {
      title: (
        <HeaderSearch
          title="Thành tiền"
          sort_key="thanhTien"
          dataSort={dataSortColumn["thanhTien"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "thanhTien",
      key: "thanhTien",
      align: "right",
      render: (field, _, __) => field && formatNumber(Number.parseFloat(`${field}`)) || "",
    },
    {
      title: (
        <HeaderSearch
          title="Trạng thái"
          sort_key="trangThai"
          dataSort={dataSortColumn["trangThai"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (item) => {
        return listTrangThaiPhieuNhapXuat.find((x) => x.id == item)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Số hóa đơn"
          sort_key="soHoaDon"
          dataSort={dataSortColumn["soHoaDon"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "soHoaDon",
      key: "soHoaDon",
    },
    {
      title: (
        <HeaderSearch
          title="Nhà cung cấp"
          sort_key="nhaCungCapId"
          dataSort={dataSortColumn["nhaCungCapId"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "150px",
      dataIndex: "nhaCungCap",
      key: "nhaCungCap",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tháng dự trù"
          sort_key="thangDuTru"
          dataSort={dataSortColumn["thangDuTru"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "thangDuTru",
      key: "thangDuTru",
      align: "right",
    },
    {
      title: (
        <HeaderSearch
          title="Quyết định thầu"
          sort_key="quyetDinhThauId"
          dataSort={dataSortColumn["quyetDinhThauId"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "100px",
      dataIndex: "quyetDinhThau",
      key: "quyetDinhThau",
      render: (item) => {
        return item?.quyetDinhThau;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nguồn nhập kho"
          sort_key="nguonNhapKhoId"
          dataSort={dataSortColumn["nguonNhapKhoId"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "150px",
      dataIndex: "nguonNhapKho",
      key: "nguonNhapKho",
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
          dataSource={listPhieuNhap}
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
    nhapKho: { listPhieuNhap, totalElements, page, size, dataSortColumn },
    utils: { listTrangThaiPhieuNhapXuat = [] },
    nhapKhoChiTiet: { phieuNhapXuatId },
    nguonNhapKho: { listData: listNguonNhapKho },
    quyetDinhThau: { listAllQuyetDinhThau },
    nhaSanXuat: { listNhaSanXuat },
  } = state;
  return {
    listPhieuNhap,
    listTrangThaiPhieuNhapXuat,
    totalElements,
    page,
    size,
    phieuNhapXuatId,
    listNguonNhapKho,
    listAllQuyetDinhThau,
    listNhaSanXuat,
    dataSortColumn,
  };
};
const mapDispatchToProps = ({
  nhapKho: {
    getListPhieuNhap,
    onSizeChange,
    updateData,
    onChangeInputSearch,
    onSortChange,
  },
  utils: { getUtils },
  nhapKhoChiTiet: { updateData: updateDataNhapKho },
}) => ({
  getListPhieuNhap,
  getUtils,
  onSizeChange,
  updateDataNhapKho,
  updateData,
  onChangeInputSearch,
  onSortChange,
});
export default connect(mapStateToProps, mapDispatchToProps)(DanhSach);
