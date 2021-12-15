import Checkbox from "antd/lib/checkbox/Checkbox";
import Pagination from "components/Pagination";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useMemo,
  useEffect,
} from "react";
import { connect } from "react-redux";
import { ContentTable, Main, Modal } from "./styled";
import { Radio } from "antd";

const ModalLuaChonDichVu = (
  {
    // state
    khoHienTai,
    listAllDichVuTonKho,
    page,
    size,
    totalElements,
    dataSortColumn,
    thongTinPhieuNhap,
    dsNhapXuatChiTiet,
    listAllKho,
    listKhoDoiUng,
    // dispatch
    onSearchAllDichVuTonKho,
    onSortChangeGetAll,
    updateData,
    ...props
  },
  ref
) => {
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }));
  };
  useImperativeHandle(ref, () => ({
    show: ({ timKiem }) => {
      setState({
        open: true,
        timKiem,
      });
    },
  }));

  const onClickSort = (key, value) => {
    onSortChangeGetAll({
      [key]: value,
    });
  };

  const columns = [
    {
      title: <HeaderSearch title="" />,
      key: "check",
      width: "7%",
      align: "center",
      render: (_, data, index) => (
        <Radio
          checked={state.index === index}
          onChange={() => {
            setState({ index });
            onCancel(index);
          }}
        />
      ),
    },
    {
      title: <HeaderSearch title="STT" sort_key="" />,
      key: "index",
      width: "7%",
      ellipsis: {
        showTitle: false,
      },
      dataIndex: "index",
    },
    {
      title: (
        <HeaderSearch
          title="Mã hàng hóa"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["ma"] || 0}
        />
      ),
      dataIndex: "ma",
      key: "ma",
      width: "15%",
      //   sorter: (a, b) => a - b,
      render: (field, item, index) => <b>{field}</b>,
    },
    {
      title: (
        <HeaderSearch
          title="Tên hàng hóa"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["ten"] || 0}
        />
      ),
      dataIndex: "ten",
      key: "ten",
      width: "30%",
      //   sorter: (a, b) => a - b,
      render: (field, item, index) => <b>{field}</b>,
    },
    {
      title: (
        <HeaderSearch
          title="Tên hoạt chất"
          sort_key="tenHoatChat"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["tenHoatChat"] || 0}
        />
      ),
      dataIndex: "tenHoatChat",
      key: "tenHoatChat",
      width: "15%",
      align: "right",
      //   sorter: (a, b) => a - b,
    },
    {
      title: (
        <HeaderSearch
          title="Hàm lượng"
          sort_key="hamLuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["hamLuong"] || 0}
        />
      ),
      dataIndex: "hamLuong",
      key: "hamLuong",
      width: "15%",
      align: "right",
      //   sorter: (a, b) => a - b,
    },
    {
      title: (
        <HeaderSearch
          title="ĐVT"
          sort_key="tenDonViTinh"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["tenDonViTinh"] || 0}
        />
      ),
      dataIndex: "tenDonViTinh",
      key: "tenDonViTinh",
      width: "15%",
      align: "right",
      //   sorter: (a, b) => a - b,
    },
    {
      title: (
        <HeaderSearch
          title="SL khả dụng"
          sort_key="soLuongKhaDung"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["soLuongKhaDung"] || 0}
        />
      ),
      dataIndex: "soLuongKhaDung",
      key: "soLuongKhaDung",
      width: "15%",
      align: "right",
      //   sorter: (a, b) => a - b,
    },
    {
      title: (
        <HeaderSearch
          title="Nhà sản xuất"
          sort_key="tenNhaCungCap"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["tenNhaCungCap"] || 0}
        />
      ),
      dataIndex: "tenNhaCungCap",
      key: "tenNhaCungCap",
      width: "15%",
      align: "right",
      //   sorter: (a, b) => a - b,
    },
  ];
  const onCancel = (index) => {
    const item = (listAllDichVuTonKho || [])[index];
    let ds = dsNhapXuatChiTiet || [];
    ds = [
      ...ds,
      { ...item, soLuong: item.soLuongKhaDung, index: (ds || []).length + 1 },
    ];
    updateData({ dsNhapXuatChiTiet: [...ds] });
    setState({ open: false, index: null });
  };
  const onChangePage = (page) => {
    let dataSearch = {
      timKiem: state.timKiem,
      khoId: thongTinPhieuNhap?.khoDoiUngId,
    };
    if (!thongTinPhieuNhap?.khoDoiUngId) {
      dataSearch.dsKhoId = (listKhoDoiUng || []).map((i) => i.khoQuanLyId);
    }
    onSearchAllDichVuTonKho({
      dataSearch,
      page: page - 1,
      size: 10,
    });
  };
  const onSizeChange = (size) => {
    let dataSearch = {
      timKiem: state.timKiem,
      khoId: thongTinPhieuNhap?.khoDoiUngId,
    };
    if (!thongTinPhieuNhap?.khoDoiUngId) {
      dataSearch.dsKhoId = (listKhoDoiUng || []).map((i) => i.khoQuanLyId);
    }
    onSearchAllDichVuTonKho({
      dataSearch,
      page: 0,
      size: size,
    });
  };
  useEffect(() => {
    if (state.open) {
      let dataSearch = {
        timKiem: state.timKiem,
        khoId: thongTinPhieuNhap?.khoDoiUngId,
      };
      if (!thongTinPhieuNhap?.khoDoiUngId) {
        dataSearch.dsKhoId = (listKhoDoiUng || []).map((i) => i.khoQuanLyId);
      }
      onSearchAllDichVuTonKho({
        dataSearch,
        page: 0,
        size: 10,
      });
    }
  }, [state.open]);
  const data = useMemo(() => {
    let ds = (listAllDichVuTonKho || []).map((item, index) => ({
      ...item,
    }));
    return ds;
  }, [listAllDichVuTonKho]);
  return (
    <Modal
      maskClosable={false}
      visible={state.open}
      onCancel={() => setState({ open: false })}
      footer={null}
      title={
        <div className="title">
          <h2>
            <b>Danh sách hàng hóa</b>
          </h2>
        </div>
      }
    >
      <Main>
        <ContentTable>
          <TableWrapper
            columns={columns}
            dataSource={data}
            //   onRow={onRow}
            rowKey={(record) => {}}
            // rowClassName={setRowClassName}
          />
          <Pagination
            onChange={onChangePage}
            current={page + 1}
            pageSize={size}
            total={totalElements}
            listData={data}
            onShowSizeChange={onSizeChange}
            stylePagination={{ flex: 1, justifyContent: "flex-start" }}
          />
        </ContentTable>
      </Main>
    </Modal>
  );
};

export default connect(
  (state) => ({
    khoHienTai: state.kho.currentItem,
    listAllDichVuTonKho: state.tonKho.listAllDichVuTonKho || [],
    page: state.tonKho.page || 0,
    size: state.tonKho.size || 10,
    totalElements: state.tonKho.totalElements,
    dataSortColumn: state.tonKho.dataSortColumn,
    thongTinPhieuNhap: state.phieuNhapDuTru.thongTinPhieuNhap,
    dsNhapXuatChiTiet: state.phieuNhapDuTru.dsNhapXuatChiTiet || [],
    listKhoDoiUng: state.quanTriKho.listData || [],
    listAllKho: state.kho.listAllKho || [],
  }),
  ({
    phieuNhapDuTru: { updateData },
    tonKho: { onSearchAllDichVuTonKho, onSortChangeGetAll },
  }) => ({
    updateData,
    onSortChangeGetAll,
    onSearchAllDichVuTonKho,
  }),
  null,
  { forwardRef: true }
)(forwardRef(ModalLuaChonDichVu));
