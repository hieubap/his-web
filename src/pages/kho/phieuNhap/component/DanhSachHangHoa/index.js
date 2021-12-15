import { Radio } from "antd";
import Pagination from "components/Pagination";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
  useMemo,
} from "react";
import { connect } from "react-redux";
import { ContentTable, Main, Modal } from "./styled";

const DanhSachHangHoa = ({
  // state
  thongTinPhieuNhap,
  khoHienTai,
  listAllDichVuKho,
  page,
  size,
  totalElements,
  dataSortColumn,
  // dispatch
  getListThangSoBanLe,
  getAllListDichVuKho,
  onSortChangeGetAll,
  // utils
  focusSearchHangHoa,
  onClose = () => { },
  ...props
}, ref) => {
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }))
  }
  useImperativeHandle(ref, () => ({
    show: ({ dichVuId }) => {
      setState({
        open: true,
        index: -1,
        dichVuId,
      });
      getAllListDichVuKho({
        dataSearch: {
          quyetDinhThauId: thongTinPhieuNhap?.quyetDinhThauId,
          nhaCungCapId: thongTinPhieuNhap?.nhaCungCapId,
          dsLoaiDichVu: khoHienTai?.dsLoaiDichVu,
          dichVuId: dichVuId,
        },
        page: 0,
        size: 10,
      });
    },
  }));

  const onClickSort = (key, value) => {
    onSortChangeGetAll({
      [key]: value,
      // dataSearch: {
      //   quyetDinhThauId: thongTinPhieuNhap?.quyetDinhThauId,
      //   nhaCungCapId: thongTinPhieuNhap?.nhaCungCapId,
      //   dsLoaiDichVu: khoHienTai?.dsLoaiDichVu,
      //   dichVuId: state.dichVuId,
      // },
    });
  };
  const columns = [
    {
      title: <HeaderSearch title=" " />,
      key: "check",
      width: "7%",
      align: "center",
      render: (_, data, index) => (
        <Radio
          checked={state.index === index}
          onChange={() => {
            onCancel(index);
          }}
        />
      ),
    },
    {
      title: (
        <HeaderSearch
          title="STT"
        // sort_key=""
        // onClickSort={onClickSort}
        // dataSort={dataSortColumn?.["dichVu.dichVu.ma"] || 0}
        />
      ),
      key: "stt",
      width: "7%",
      align: "center",
      ellipsis: {
        showTitle: false,
      },
      dataIndex: "stt",
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
    },
    {
      title: (
        <HeaderSearch
          title="Quyết định thầu"
          sort_key="quyetDinhThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["quyetDinhThau"] || 0}
        />
      ),
      dataIndex: "quyetDinhThau",
      key: "quyetDinhThau",
      width: "15%",
      //   sorter: (a, b) => a - b,
    },
    {
      title: (
        <HeaderSearch
          title="SL thầu"
          sort_key="soLuongThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["soLuongThau"] || 0}
        />
      ),
      dataIndex: "soLuongThau",
      key: "soLuongThau",
      width: "15%",
      align: "right",
      //   sorter: (a, b) => a - b,
    },
    {
      title: (
        <HeaderSearch
          title="Số lượng còn lại"
          sort_key="soLuongConLai"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["soLuongConLai"] || 0}
        />
      ),
      dataIndex: "soLuongConLai",
      key: "soLuongConLai",
      width: "15%",
      align: "right",
      //   sorter: (a, b) => a - b,
    },
  ];
  const onCancel = (index) => {
    const item = (listAllDichVuKho || [])[index];
    onClose(item);
    setState({ open: false });
  };
  const onChangePage = (page) => {
    getAllListDichVuKho({
      dataSearch: {
        quyetDinhThauId: thongTinPhieuNhap?.quyetDinhThauId,
        nhaCungCapId: thongTinPhieuNhap?.nhaCungCapId,
        dsLoaiDichVu: khoHienTai?.dsLoaiDichVu,
        dichVuId: state.dichVuId,
      },
      page: page - 1,
      size: 10,
    });
  };
  const onSizeChange = (size) => {
    getAllListDichVuKho({
      dataSearch: {
        quyetDinhThauId: thongTinPhieuNhap?.quyetDinhThauId,
        nhaCungCapId: thongTinPhieuNhap?.nhaCungCapId,
        dsLoaiDichVu: khoHienTai?.dsLoaiDichVu,
        dichVuId: state.dichVuId,
      },
      page: 0,
      size: size,
    });
  };
  // useEffect(() => {
  //   if (state.open && state.dichVuId != undefined && state.dichVuId != null) {
  //     getAllListDichVuKho({
  //       dataSearch: {
  //         quyetDinhThauId: thongTinPhieuNhap?.quyetDinhThauId,
  //         nhaCungCapId: thongTinPhieuNhap?.nhaCungCapId,
  //         dsLoaiDichVu: khoHienTai?.dsLoaiDichVu,
  //         dichVuId: state.dichVuId,
  //       },
  //       page: 0,
  //       size: 10,
  //     });
  //   }
  // }, [state.open]);
  const data = useMemo(() => {
    let ds = (listAllDichVuKho || []).map((item, index) => ({
      ...item,
    }));
    return ds;
  }, [listAllDichVuKho]);
  return (
    <Modal
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
            rowKey={(record) =>
              record.dichVuId +
              "_" +
              record.quyetDinhThauId +
              "_" +
              record.quyetDinhThauChiTietId
            }
          //   rowClassName={setRowClassName}
          />
          <Pagination
            onChange={onChangePage}
            current={page + 1}
            pageSize={size}
            total={totalElements}
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
    thongTinPhieuNhap: state.phieuNhap.thongTinPhieuNhap,
    khoHienTai: state.kho.currentItem,
    listAllDichVuKho: state.quyetDinhThauChiTiet.listAllDichVuKho || [],
    page: state.quyetDinhThauChiTiet.page || 0,
    size: state.quyetDinhThauChiTiet.size || 10,
    totalElements: state.quyetDinhThauChiTiet.totalElements,
    dataSortColumn: state.quyetDinhThauChiTiet.dataSortColumn,
  }),
  ({
    thangSoBanLe: { getListThangSoBanLe },
    quyetDinhThauChiTiet: { getAllListDichVuKho, onSortChangeGetAll },
  }) => ({
    getListThangSoBanLe,
    getAllListDichVuKho,
    onSortChangeGetAll,
  }),
  null,
  { forwardRef: true }
)(forwardRef(DanhSachHangHoa));
