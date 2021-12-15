import React, { memo, useState, useEffect, useMemo, useRef } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  Row,
  Button,
  Select,
  Spin,
  Col,
  InputNumber,
  message,
  Input,
} from "antd";
import Table from "components/Table";
import { Main, Header, PopoverWrapper, GlobalStyle } from "./styled";
import useWindowSize from "hook/useWindowSize";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import IcDelete from "assets/images/kho/delete.png";
import empty from "assets/images/kho/empty.png";
import ModalLuaChonDichVu from "../ModalLuaChonDichVu";
import moment from "moment";
import { InputSearch } from "./styled";
import { formatterNumber, parserNumber, formatNumber } from "utils";
const { Option } = Select;

const DanhSach = ({
  // state
  isLoading,
  thongTinPhieuNhap,
  dsNhapXuatChiTiet,
  listAllDichVuTonKho,
  listAllKho,
  listKhoDoiUng,
  // dispatch
  updateDataTonKho,
  updateDataPhieuNhapDuTru,
  onSearchAllDichVuTonKho,
  ...props
}) => {
  const size = useWindowSize();
  const refSearchHangHoa = useRef(null);
  const refTimeOut = useRef(null);
  const refModalLuaChonDichVu = useRef(null);
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }));
  };
  const onChange = (type, item, index) => (e) => {
    if (
      props.mode == "chinh-sua" &&
      thongTinPhieuNhap?.trangThai != 10 &&
      thongTinPhieuNhap?.trangThai !== 15
    )
      return;
    const value = e?.target ? e?.target.value : e;
    let ds = dsNhapXuatChiTiet || [];
    ds[index] = {
      ...ds[index],
      [type]: value,
    };
    if (type == "soLuongYeuCau") {
      if (value == null) return;
      const check =
        parseInt(value) &&
        value > 0 &&
        value <= (item.soLuongKhaDung || item?.soLuong);
      if (!check) {
        message.error(
          `SL tồn trên kho xuất không đủ. SL dự trù: ${value}, SL tồn kho xuất ${
            item.soLuongKhaDung || item?.soLuong
          }`
        );
        return;
      }
      // ds[index].soLuong = value;
    }
    updateDataPhieuNhapDuTru({ dsNhapXuatChiTiet: [...ds] });
  };
  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        // onShowAndHandleUpdate(record);
      },
    };
  };
  const searchDichVu = (val, type) => () => {
    const value = val?.toLowerCase().createUniqueText();
    if (props.mode == "chi-tiet") {
      if (!value) {
        setState({ dataRender: [...dsNhapXuatChiTiet] });
        return;
      } else {
        let ds = dsNhapXuatChiTiet || [];
        ds = ds?.filter((it, idx) => {
          return (
            it?.ma?.toLowerCase()?.createUniqueText().indexOf(value) >= 0 ||
            it?.ten?.toLowerCase()?.createUniqueText().indexOf(value) >= 0
          );
        });
        setState({ dataRender: [...ds] });
      }
    } else if (props.mode == "them-moi" || props.mode == "chinh-sua") {
      if (!value) {
        updateDataTonKho({ listAllDichVuTonKho: [] });
        return;
      }
      let dataSearch = {
        [type]: value,
        khoId: thongTinPhieuNhap?.khoDoiUngId,
      };
      if (!thongTinPhieuNhap?.khoDoiUngId) {
        dataSearch.dsKhoId = (listKhoDoiUng || []).map((i) => i.khoQuanLyId);
      }
      onSearchAllDichVuTonKho({
        page: 0,
        size: 9999,
        dataSearch,
      }).then((dsDichVu) => {
        if (dsDichVu) {
          if (dsDichVu?.length < 1) return;
          if (dsDichVu?.length == 1)
            updateDataPhieuNhapDuTru({
              dsNhapXuatChiTiet: [...dsNhapXuatChiTiet, { ...dsDichVu[0] }],
            });
          else if (dsDichVu?.length > 1) {
            refModalLuaChonDichVu.current &&
              refModalLuaChonDichVu.current.show({ [type]: value });
          }
        }
      });
    }
  };
  const onSearch = (type) => (e) => {
    const value = e?.target ? e?.target?.value : e;
    // if (refTimeOut.current) {
    //   clearTimeout(refTimeOut.current);
    //   refTimeOut.current = null;
    // }
    // refTimeOut.current = setTimeout(searchDichVu(value, type)(), 300);
    searchDichVu(value, type)();
  };
  // const filterOption = (input = "", option) => {
  //   input = input?.toLowerCase().createUniqueText() || "";
  //   return (
  //     option?.props.children?.toLowerCase().createUniqueText().indexOf(input) >=
  //     0
  //   );
  // };
  const focusSearchHangHoa = () => {
    if (refSearchHangHoa.current) {
      refSearchHangHoa.current.focus();
    }
  };
  // const showModalDS = (e) => {
  //   const value = e?.target ? e?.target?.value : e;
  //   // let dsDichVu = listAllDichVuTonKho?.filter(item => item?.dichVuId == value);
  //   refModalLuaChonDichVu.current.show({ dichVuId: value });
  // }
  const onRemoveItem = (item, index) => (e) => {
    if (
      props.mode == "chinh-sua" &&
      thongTinPhieuNhap?.trangThai != 10 &&
      thongTinPhieuNhap?.trangThai !== 15
    )
      return;
    let ds = dsNhapXuatChiTiet || [];
    const removeItem = dsNhapXuatChiTiet[index];
    if (removeItem) {
      ds = ds?.filter((it) => it?.index != removeItem?.index);
      ds = ds?.map((it, idx) => ({ ...it, index: idx + 1 }));
      updateDataPhieuNhapDuTru({ dsNhapXuatChiTiet: [...ds] });
    }
  };
  const content = (item) => (
    <div className="content">
      <div
        className="title"
        style={{ fontWeight: 550 }}
      >{`${item?.ma} - ${item?.ten}`}</div>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <div className="">Số lượng khả dụng: {item?.soLuongKhaDung}</div>
          <div className="">Số lượng còn lại: {item?.soLuong}</div>
          <div className="">Hàm lượng: {item?.hamLuong}</div>
          <div className="">Tên hoạt chất: {item?.tenHoatChat}</div>
        </Col>
        <Col span={12}>
          <div className="">Đường dùng: {item?.duongDung}</div>
          <div className="">Nhà sản xuất: {item?.tenNhaSanXuat}</div>
          <div className="">Quy cách: {item?.quyCach}</div>
        </Col>
      </Row>
    </div>
  );
  useEffect(() => {
    if (props.mode == "chi-tiet") {
      setState({ dataRender: [...dsNhapXuatChiTiet] });
    }
  }, [dsNhapXuatChiTiet]);
  return (
    <Main className="main" mode={props.mode}>
      <Header>
        <div className="header">
          <Row className="header-row">
            <div className="content">Thông tin hàng hóa</div>
            <InputSearch focusInput={state.focusInput}>
              <img src={IconSearch} alt="IconSearch" className="icon-search" />
              <Input
                onFocus={() => setState({ focusInput: true })}
                onBlur={() => setState({ focusInput: false })}
                ref={refSearchHangHoa}
                placeholder="Nhập hoặc quét mã hàng hóa, tên hàng hóa"
                // onChange={}
                onKeyDown={(e) => {
                  if (e?.key == "Enter") {
                    onSearch("timKiem")(e);
                  }
                }}
              />
            </InputSearch>
          </Row>
        </div>
      </Header>
      <Table
        className="table"
        scroll={{ y: 453 }}
        rowKey={"key"}
        onRow={onRow}
        // rowClassName={(record) => (record?.checked ? "background-checked" : "")}
        columns={[
          {
            title: "STT",
            width: size.width <= 1400 ? 64 : 64,
            dataIndex: "index",
            key: "index",
            hideSearch: true,
            align: "center",
          },
          {
            title: "Tên hàng hóa",
            width: 230,
            dataIndex: "ten",
            key: "ten",
            type: true,
            hideSearch: true,
            render: (value, item, index) => {
              return (
                <>
                  <GlobalStyle />
                  <PopoverWrapper
                    placement="right"
                    content={content(item)}
                    trigger="hover"
                  >
                    <span
                      className=""
                      style={{
                        color: "#0762F7",
                        fontWeight: "bold",
                        display: "inline-block",
                      }}
                    >
                      {item?.ma} - {item?.ten}
                    </span>
                  </PopoverWrapper>
                  <Input
                    placeholder="Nhập ghi chú"
                    className="note-input"
                    value={item?.ghiChu}
                    onChange={onChange("ghiChu", item, index)}
                  />
                </>
              );
            },
          },
          // {
          //   title: "ĐVT",
          //   width: size.width <= 1400 ? 100 : 100,
          //   dataIndex: "donViTinh",
          //   key: "donViTinh",
          //   hideSearch: true,
          //   align: "right",
          //   hidden: props.mode != "chi-tiet" || thongTinPhieuNhap?.trangThai != 30,
          // },
          {
            title: "Hàm lượng",
            width: size.width <= 1400 ? 150 : 150,
            dataIndex: "hamLuong",
            key: "hamLuong",
            hideSearch: true,
            align: "right",
          },
          {
            title: "SL dự trù",
            key: "soLuongYeuCau",
            width: size.width <= 1400 ? 83 : 83,
            dataIndex: "soLuongYeuCau",
            hideSearch: true,
            align: "right",
            render: (value, item, index) => {
              return props.mode == "chi-tiet" ? (
                (value && formatNumber(value)) || ""
              ) : (
                <InputNumber
                  value={item?.soLuongYeuCau}
                  onChange={(e) => {
                    const value =
                      !isNaN(parseFloat(e)) && parseFloat(e) > 0
                        ? parseFloat(e) % 1.0 === 0.0
                          ? parseInt(e)
                          : parseFloat(e)
                        : 0;
                    onChange("soLuongYeuCau", item, index)(value);
                  }}
                  parser={(value) => parserNumber(value)}
                  formatter={(value) => formatterNumber(value)}
                />
              );
            },
          },
          {
            title: "SL duyệt",
            key: "soLuong",
            width: size.width <= 1400 ? 83 : 83,
            dataIndex: "soLuong",
            hideSearch: true,
            align: "right",
            render: (field, item, index) =>
              field == 0 ? field : formatNumber(field),
          },
          {
            title: "Số lô",
            width: size.width <= 1400 ? 150 : 150,
            dataIndex: "soLo",
            key: "soLo",
            hideSearch: true,
            align: "right",
            hidden:
              props.mode != "chi-tiet" || thongTinPhieuNhap?.trangThai != 30,
          },
          {
            title: "Hạn sử dụng",
            width: size.width <= 1400 ? 150 : 150,
            dataIndex: "hanSuDung",
            key: "hanSuDung",
            hideSearch: true,
            align: "right",
            hidden:
              props.mode != "chi-tiet" || thongTinPhieuNhap?.trangThai != 30,
            render: (value, _, __) => moment(value)?.format("DD/MM/YYYY"),
          },
          {
            title: "Tiện tích",
            key: "",
            width: size.width <= 1400 ? 83 : 83,
            dataIndex: "",
            hideSearch: true,
            hidden: props.mode == "chi-tiet",
            align: "right",
            render: (_, item, index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <img
                    style={{ cursor: "pointer" }}
                    src={IcDelete}
                    onClick={onRemoveItem(item, index)}
                  />
                </div>
              );
            },
          },
        ]}
        dataSource={
          props.mode == "chi-tiet" ? state.dataRender : dsNhapXuatChiTiet
        }
        locale={{
          emptyText: (
            <div style={{ padding: "100px 0" }}>
              <img src={empty} />
              <div style={{ padding: "10px 0" }}>Chưa có hàng hóa</div>
              <Button
                style={{
                  borderRadius: "15px",
                  borderColor: "#7a869a",
                }}
                onClick={() => {
                  focusSearchHangHoa();
                }}
              >
                Thêm mới ngay
              </Button>
            </div>
          ),
        }}
      />
      <ModalLuaChonDichVu ref={refModalLuaChonDichVu} />
    </Main>
  );
};
const mapStateToProps = (state) => ({
  isLoading: state.tonKho.isLoading || false,
  listAllDichVuTonKho: state.tonKho.listAllDichVuTonKho || [],
  thongTinPhieuNhap: state.phieuNhapDuTru.thongTinPhieuNhap,
  dsNhapXuatChiTiet: state.phieuNhapDuTru.dsNhapXuatChiTiet || [],
  listKhoDoiUng: state.quanTriKho.listData || [],
  listAllKho: state.kho.listAllKho || [],
});

const mapDispatchToProps = ({
  tonKho: { updateData: updateDataTonKho, onSearchAllDichVuTonKho },
  phieuNhapDuTru: { updateData: updateDataPhieuNhapDuTru },
}) => ({
  updateDataPhieuNhapDuTru,
  updateDataTonKho,
  onSearchAllDichVuTonKho,
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(DanhSach);
