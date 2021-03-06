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
import { useSelector, useDispatch } from "react-redux";
import { ContentTable, Main, Modal } from "./styled";
import { Input } from "antd";
const DanhSachHangHoa = (
  {
    // utils
    focusSearchHangHoa,
    onClose = () => { },
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

  const {
    listQuyetDinhThauChiTiet,
    page = 0,
    size = 10,
    totalElements,
    dataSortColumn,
  } = useSelector((state) => state.quyetDinhThauChiTiet);
  const { thongTinPhieuNhap } = useSelector((state) => state.phieuNhap);
  const { currentItem: khoHienTai } = useSelector((state) => state.kho);
  const {
    quyetDinhThauChiTiet: { onSearch, onChangeSort, onChangeInputSearch },
  } = useDispatch();

  useImperativeHandle(ref, () => ({
    show: ({ dichVuId }) => {
      setState({
        open: true,
        index: -1,
        dichVuId,
      });
      onSearch({
        dataSearch: {
          quyetDinhThauId: thongTinPhieuNhap?.quyetDinhThauId,
          nhaCungCapId: thongTinPhieuNhap?.nhaCungCapId,
          dsLoaiDichVu: khoHienTai?.dsLoaiDichVu,
          dichVuId: dichVuId,
        },
        fromTongHop: true,
        page: 0,
        size: 10,
      });
    },
  }));
  const refTimeOut = useRef(null);
  const onSearchInput = (key) => (e) => {
    console.log('key: ', key);
    if (refTimeOut.current) {
      clearTimeout(refTimeOut.current);
      refTimeOut.current = null;
    }
    refTimeOut.current = setTimeout(
      (key, e) => {
        let value = "";
        if (e) {
          if (e?.hasOwnProperty("checked")) value = e?.checked;
          else value = e?.value;
        } else value = e;
        onChangeInputSearch({
          fromTongHop: true,
          [key]: value,
          dichVuId: state.dichVuId,
        });
      },
      500,
      key,
      e?.target || e
    );
  };
  useEffect(() => {
    return () => {
      if (refTimeOut.current) {
        clearTimeout(refTimeOut.current);
      }
    };
  }, []);

  const onClickSort = (key, value) => {
    onChangeSort({
      fromTongHop: true,
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
      key: "index",
      width: "7%",
      align: "center",
      ellipsis: {
        showTitle: false,
      },
      dataIndex: "index",
    },
    {
      title: (
        <HeaderSearch
          title="M?? h??ng h??a"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["ma"] || 0}
          search={
            <Input
              placeholder="T??m m?? h??ng h??a"
              onChange={onSearchInput("ma")}
            />
          }
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
          title="T??n h??ng h??a"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["ten"] || 0}
          search={
            <Input
              placeholder="T??m t??n h??ng h??a"
              onChange={onSearchInput("ten")}
            />
          }
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
          title="Quy???t ?????nh th???u"
          sort_key="quyetDinhThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["quyetDinhThau"] || 0}
          search={
            <Input
              placeholder="T??m quy???t ?????nh th???u"
              onChange={onSearchInput("quyetDinhThau")}
            />
          }
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
          title="SL th???u"
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
          title="S??? l?????ng c??n l???i"
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
    {
      title: (
        <HeaderSearch
          title="Nh?? cung c???p"
          sort_key="tenNhaCungCap"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["tenNhaCungCap"] || 0}
          search={
            <Input
              placeholder="T??m nh?? cung"
              onChange={onSearchInput("tenNhaCungCap")}
            />
          }
        />
      ),
      dataIndex: "tenNhaCungCap",
      key: "tenNhaCungCap",
      width: "15%",
      align: "left",
      //   sorter: (a, b) => a - b,
    },
  ];
  const onCancel = (index) => {
    const item = (listQuyetDinhThauChiTiet || [])[index];
    onClose(item);
    setState({ open: false });
  };
  const onChangePage = (page) => {
    onSearch({
      fromTongHop: true,
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
    onSearch({
      fromTongHop: true,
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
  return (
    <Modal
      visible={state.open}
      onCancel={() => setState({ open: false })}
      footer={null}
      title={
        <div className="title">
          <h2>
            <b>Danh s??ch h??ng h??a</b>
          </h2>
        </div>
      }
    >
      <Main>
        <ContentTable>
          <TableWrapper
            rowClassName={(record, index) => {
              return index % 2 === 0 ? `table-row-even ${index == state?.listServiceSelected?.length - 1 ? "add-border" : ""}` : `table-row-odd ${index == state?.listServiceSelected?.length - 1 ? "add-border" : ""}`
            }}
            columns={columns}
            dataSource={listQuyetDinhThauChiTiet}
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
            listData={listQuyetDinhThauChiTiet}
            total={totalElements}
            onShowSizeChange={onSizeChange}
            stylePagination={{ flex: 1, justifyContent: "flex-start" }}
          />
        </ContentTable>
      </Main>
    </Modal>
  );
};

export default forwardRef(DanhSachHangHoa);
