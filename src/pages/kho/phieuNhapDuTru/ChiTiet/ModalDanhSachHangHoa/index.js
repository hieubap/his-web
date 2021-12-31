import Pagination from "components/Pagination";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Radio } from "antd";
import { Input } from "antd";
import ModalTemplate from "../../../components/ModalTemplate";

const ModalDanhSachHangHoa = (props, ref) => {
  const refModal = useRef(null);
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }));
  };

  const {
    listData,
    page = 0,
    size = 10,
    totalElements,
    dataSortColumn,
  } = useSelector((state) => state.tonKho);
  const { thongTinPhieuNhap, dsNhapXuatChiTiet } = useSelector(
    (state) => state.phieuNhapDuTru
  );
  const { listData: listKhoDoiUng } = useSelector((state) => state.quanTriKho);
  const {
    phieuNhapDuTru: { updateData },
    tonKho: { onSearch, onSortChange, onChangeInputSearch },
  } = useDispatch();

  useImperativeHandle(ref, () => ({
    show: ({ timKiem }) => {
      setState({
        timKiem,
        show: true,
      });
      refModal.current && refModal.current.show();
    },
    hide: () => {
      setState({
        show: false,
      });
      refModal.current && refModal.current.hide();
    },
  }));
  useEffect(() => {
    if (state.show) onSizeChange(10);
  }, [state.timKiem, state.show]);

  const onClickSort = (key, value) => {
    onSortChange({
      fromTongHop: true,
      [key]: value,
    });
  };

  const refTimeOut = useRef(null);

  useEffect(() => {
    return () => {
      if (refTimeOut.current) {
        clearTimeout(refTimeOut.current);
      }
    };
  }, []);
  const onSearchInput = (key) => (e) => {
    if (refTimeOut.current) {
      clearTimeout(refTimeOut.current);
      refTimeOut.current = null;
    }
    refTimeOut.current = setTimeout(
      (key, e) => {
        let value = "";
        if (e) {
          if (e?.hasOwnProperty("checked")) value = e?.checked;
          else value = e?.value || e;
        } else value = e;
        onChangeInputSearch({
          fromTongHop: true,
          ...dataSearch,
          [key]: value,
        });
      },
      500,
      key,
      e?.target || e
    );
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
          search={
            <Input
              placeholder="Tìm mã hàng hóa"
              onChange={onSearchInput("ma")}
            />
          }
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
          search={
            <Input
              placeholder="Tìm tên hàng hóa"
              onChange={onSearchInput("ten")}
            />
          }
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
          search={
            <Input
              placeholder="Tìm tên hoạt chất"
              onChange={onSearchInput("tenHoatChat")}
            />
          }
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
          search={
            <Input
              placeholder="Tìm hàm lượng"
              onChange={onSearchInput("hamLuong")}
            />
          }
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
          search={
            <Input
              placeholder="Tìm đơn vị tính"
              onChange={onSearchInput("tenDonViTinh")}
            />
          }
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
          search={
            <Input
              placeholder="Tìm nhà cung cấp"
              onChange={onSearchInput("tenNhaCungCap")}
            />
          }
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
    const item = (listData || [])[index];
    let ds = dsNhapXuatChiTiet || [];
    ds = [
      ...ds,
      { ...item, soLuong: item.soLuongKhaDung, index: (ds || []).length + 1 },
    ];
    updateData({ dsNhapXuatChiTiet: ds });
    setState({ index: null, show: false });
    refModal.current && refModal.current.hide();
  };

  const dataSearch = useMemo(() => {
    let dataSearch = {
      timKiem: state.timKiem,
      khoId: thongTinPhieuNhap?.khoDoiUngId,
    };
    if (!thongTinPhieuNhap?.khoDoiUngId) {
      dataSearch.dsKhoId = (listKhoDoiUng || []).map((i) => i.khoQuanLyId);
    }
    return dataSearch;
  }, [state.timKiem, thongTinPhieuNhap, listKhoDoiUng]);

  const onChangePage = (page) => {
    onSearch({
      fromTongHop: true,
      dataSearch,
      page: page - 1,
      size: 10,
    });
  };
  const onSizeChange = (size) => {
    onSearch({
      fromTongHop: true,
      dataSearch,
      page: 0,
      size: size,
    });
  };
  return (
    <ModalTemplate ref={refModal} title="Danh sách hàng hóa">
      <TableWrapper
        columns={columns}
        dataSource={listData}
        //   onRow={onRow}
        rowKey={(record) => {}}
        // rowClassName={setRowClassName}
      />
      <Pagination
        onChange={onChangePage}
        current={page + 1}
        pageSize={size}
        total={totalElements}
        listData={listData}
        onShowSizeChange={onSizeChange}
        stylePagination={{ flex: 1, justifyContent: "flex-start" }}
      />
    </ModalTemplate>
  );
};

export default forwardRef(ModalDanhSachHangHoa);
