import { Input, Button, DatePicker, message, Popover, Select, InputNumber } from "antd";
import { Table, GlobalStyles, PopoverWrapper, Main } from "./styled";
import IcDelete from "assets/images/kho/delete.png";
import empty from "assets/images/kho/empty.png";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  useMemo,
} from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Input2, InputNumber2 } from "./Input";
import ChietKhauIcon from "assets/svg/kho/chiet-khau.svg";
import ModalChietKhau from "./ModalChietKhau";
import InputTimeout from "components/InputTimeout";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { LOAI_CHIET_KHAU } from "constants/index";
import { formatterNumber, parserNumber, formatNumber } from "utils";
import Pagination from "components/Pagination";

const ThongTinHangHoa = ({
  id,
  khoId,
  dsNhapXuatChiTiet,
  thongTinPhieuNhap,
  listAllXuatXu,
  showHangHoa,
  focusSearchHangHoa,
  getListThangSoBanLe,
  updateDataNhapKho,
  getAllListXuatXu,
  onSortChange,
  page,
  size,
  totalElements,
  dataSortColumn,
  onSearchPhieuNhapChiTiet,
  updateDataPhieuNhapChiTiet,
  ...props
}, ref) => {
  const styleInput = {
    border: "none",
    textAlign: "right",
  };
  const refModalChietKhau = useRef(null);
  const [state, setState] = useState({
    data: [],
    soLuong: 0,
    tongTien: 0,
    thanhTienSuaDoi: 0,
    tongTienChietKhauHangHoa: 0,
  });
  const history = useHistory();

  const getDetachId = (item) =>
    (item.ma || "?????") +
    "_" +
    (item.giaNhapSauVat || "?????") +
    "_" +
    (item.soLo || "?????") +
    "_" +
    (item.xuatXuId || "?????");

  useImperativeHandle(ref, () => ({
    setData: (data) => {
      setState({
        ...state,
        data: [
          ...dsNhapXuatChiTiet,
          {
            ...Object.assign({}, data),
            giaNhapTruocVat: data?.giaNhapSauVat
              ? (data.giaNhapSauVat / (1 + 5 / 100)).toFixed(2)
              : 0,
            detachId: getDetachId(data),
          },
        ],
      });
    },
    getTong: () => ({
      thanhTien:
        state.tongTien +
        (thongTinPhieuNhap.tienChietKhau ||
          (state.tongTien * (thongTinPhieuNhap.phanTramChietKhau || 0)) / 100 ||
          0),
      thanhTienSuaDoi: state.thanhTienSuaDoi,
      phanTramChietKhau: thongTinPhieuNhap.phanTramChietKhau,
      tienChietKhau:
        thongTinPhieuNhap.tienChietKhau ||
        (state.tongTien * (thongTinPhieuNhap.phanTramChietKhau || 0)) / 100,
      chietKhauTongHoaDon: ((
        parseFloat(thongTinPhieuNhap?.tienChietKhau) ||
        parseFloat((state.tongTien * (thongTinPhieuNhap.phanTramChietKhau || 0)) / 100 || 0))
        + parseFloat(state.tongTienChietKhauHangHoa)
      ),
    }),

  }));

  const isReadOnly = useMemo(() => {
    if (history.location.pathname.includes("chi-tiet")) {
      return true
    } else {
      return false
    }
  }, [history.location.pathname]);

  const changeLo = (key, data) => (value) => {
    const newData = Object.assign([], dsNhapXuatChiTiet);
    newData[data.index][key] = value;
    newData[data.index].detachId = getDetachId(newData[data.index]);
    updateDataPhieuNhapChiTiet({
      dsNhapXuatChiTiet: [...newData],
    });
  };

  const changeDSLo = (key, data) => (value) => {
    //TODO: onchange giaNhapSauVat => change thangSoBanLe
    let newData = { [key]: value };
    if (key == "vat") {
      const giaNhapSauVat = ((data?.giaNhapTruocVat || 0) * (1 + value / 100)).toFixed(2);
      newData = {
        ...newData,
        giaNhapSauVat,
        giaBaoHiem: (giaNhapSauVat * (1 + (data?.thangSoBanLe || 0) / 100)),
        giaKhongBaoHiem: (giaNhapSauVat * (1 + (data?.thangSoBanLe || 0) / 100)),
      }
    } else if (key == "giaNhapSauVat") {
      newData = {
        ...newData,
        giaNhapSauVat: value.toFixed(2),
        giaBaoHiem: (value * (1 + (data?.thangSoBanLe || 0) / 100)),
        giaKhongBaoHiem: (value * (1 + (data?.thangSoBanLe || 0) / 100)),
      }
    } else if (key == "giaNhapTruocVat") {
      const giaNhapSauVat = ((value || 0) * (1 + (data?.vat || 0) / 100)).toFixed(2);
      newData = {
        ...newData,
        giaNhapSauVat,
        giaBaoHiem: (giaNhapSauVat * (1 + (data?.thangSoBanLe || 0) / 100)),
        giaKhongBaoHiem: (giaNhapSauVat * (1 + (data?.thangSoBanLe || 0) / 100)),
      }
    } else if (key == "tyLeChietKhau") {
      newData = {
        ...newData,
        tienChietKhau: null,
      }
    } else if (key == "tienChietKhau") {
      newData = {
        ...newData,
        tyLeChietKhau: null,
      }
    } else if (key == "soLuong") {
      if (data?.quyetDinhThauId && value > (data?.chiTietThau?.soLuongConLai || 0)) {
        message.error("Số lượng nhập vào lớn hơn Số lượng còn lại của thầu");
      }
    }
    let ds = Object.assign([], dsNhapXuatChiTiet);
    ds = ds.map((element) => {
      if (element?.detachId == data?.detachId) {
        let e = {
          ...element,
          ...newData,
        };
        return ({
          ...e,
          detachId: getDetachId(e),
        });
      }
      return element;
    });
    updateDataPhieuNhapChiTiet({
      dsNhapXuatChiTiet: [...ds],
    });
  };

  const onChangeLoaiChietKhau = (data, index) => (e) => {
    let i = Math.max(0, index - 1);
    let item = dsNhapXuatChiTiet[i] || {};
    let newData = {};
    if (item.loaiChietKhau == LOAI_CHIET_KHAU.PHAN_TRAM) {
      newData = {
        ...newData,
        loaiChietKhau: LOAI_CHIET_KHAU.TIEN,
        tienChietKhau: item.tyLeChietKhau || 0,
        tyLeChietKhau: null,
      }
    }
    else if (item.loaiChietKhau == LOAI_CHIET_KHAU.TIEN) {
      newData = {
        ...newData,
        loaiChietKhau: LOAI_CHIET_KHAU.PHAN_TRAM,
        tyLeChietKhau: (item.tienChietKhau > 100 ? 100 : item.tienChietKhau) || 0,
        tienChietKhau: null,
      }
    }
    let ds = dsNhapXuatChiTiet || [];
    ds[i] = {
      ...item,
      ...newData,
    };
    updateDataPhieuNhapChiTiet({ dsNhapXuatChiTiet: [...ds] });
  }

  const onClickSort = (key, value) => {
    if (!dsNhapXuatChiTiet || dsNhapXuatChiTiet?.length < 1) return;
    onSortChange({
      [key]: value,
    });
  };

  const contentPopover = (item) => () => (
    <div className="dd-flex fd-col">
      <div className="text text-bold">{`${item?.ma} - ${item?.ten}`}</div>
      <div className="info dd-flex fd-row space-between">
        <div className="_col">
          {item?.xuatXu?.ten && <div className="_row"><span>Xuất xứ: </span>{item?.xuatXu?.ten}</div>}
          {(item?.loNhap?.nhaSanXuat || item?.nhaSanXuat?.ten) && <div className="_row"><span>Nhà sản xuất: </span>{item?.loNhap?.nhaSanXuat || item?.nhaSanXuat?.ten}</div>}
          {(item?.loNhap?.nhaSanXuat || item?.nhaSanXuat?.ten) && <div className="_row"><span>Hãng sãn xuất: </span>{item?.loNhap?.nhaSanXuat || item?.nhaSanXuat?.ten}</div>}
          {item?.soVisa && <div className="_row"><span>Số visa: </span>{item?.soVisa}</div>}
          {item?.quyCach && <div className="_row"><span>Quy cách: </span>{item?.quyCach}</div>}
          {item?.tenDuongDung && <div className="_row"><span>Đường dùng: </span>{item?.tenDuongDung}</div>}
        </div>
        <div className="_col">
          {item?.chiTietThau?.quyetDinhThau?.goiThau && <div className="_row"><span>Gói thầu: </span>{item?.chiTietThau?.quyetDinhThau?.goiThau}</div>}
          {item?.chiTietThau?.soLuongThau && <div className="_row"><span>Số lượng thầu: </span>{item?.chiTietThau?.soLuongThau}</div>}
          {item?.chiTietThau?.soLuongConLai && <div className="_row"><span>Số lượng còn lại: </span>{item?.chiTietThau?.soLuongConLai}</div>}
          {(item?.dichVu?.maHoatChat || item?.maHoatChat) && <div className="_row"><span>Mã hoạt chất: </span>{item?.dichVu?.maHoatChat || item?.maHoatChat}</div>}
          {(item?.dichVu?.tenHoatChat || item?.tenHoatChat) && <div className="_row"><span>Tên hoạt chất: </span>{item?.dichVu?.tenHoatChat || item?.tenHoatChat}</div>}
          {item?.hamLuong && <div className="_row"><span>Hàm lượng: </span>{item?.hamLuong}</div>}
        </div>
      </div >
    </div >
  );

  const columns = [
    {
      title: "STT",
      key: "stt",
      width: "5%",
      align: "center",
      ellipsis: {
        showTitle: false,
      },
      render: (_, data, index) => {
        return index % 2 === 1 ? (
          {
            children: (
              <div className="">
                <div className="">
                  <div className="d-flex">
                    <div style={{ width: "5%" }}>Xuất xứ</div>
                    <div style={{ width: "15%" }}>
                      <Select
                        style={{ width: "90%" }}
                        placeholder="Chọn xuất xứ"
                        value={data.xuatXuId}
                        options={(listAllXuatXu || []).map((item) => ({
                          label: item.ten,
                          value: item.id,
                        }))}
                        onChange={changeDSLo("xuatXuId", data)}
                      />
                    </div>
                    <div style={{ width: "80%" }}>
                      <ul>
                        {(data.dsLo || []).map((item, idx) => (
                          <li key={idx} className="d-flex">
                            <span
                              style={{ paddingRight: "10px", width: "20%" }}
                            >
                              Số lô - NSX - HSD
                            </span>
                            <Input2
                              onChange={changeLo("soLo", item)}
                              placeholder="Nhập số lô"
                              data={item.soLo}
                              style={{ width: "15.5%", marginRight: "2%" }}
                            />
                            <DatePicker
                              placeholder="Chọn ngày"
                              value={item.ngaySanXuat}
                              onChange={changeLo("ngaySanXuat", item)}
                              format={"DD/MM/YYYY"}
                              style={{
                                width: "16.75%",
                                marginRight: "1%",
                                marginLeft: "1%",
                              }}
                            />
                            <DatePicker
                              placeholder="Chọn ngày"
                              format={"DD/MM/YYYY"}
                              value={item.ngayHanSuDung}
                              onChange={changeLo("ngayHanSuDung", item)}
                              style={{
                                width: "16.75%",
                                marginRight: "1%",
                                marginLeft: "1.5%",
                              }}
                            />
                            {/* <InputNumber
                              min={0}
                              formatter={(value) => formatterNumber(value)}
                              parser={(value) => parserNumber(value)}
                              onChange={(e) => {
                                const value =
                                  !isNaN(parseFloat(e)) && parseFloat(e) > 0
                                    ? parseFloat(e) % 1.0 === 0.0
                                      ? parseInt(e)
                                      : parseFloat(e)
                                    : 0;
                                changeLo("soLuong", item)(value);
                              }}
                              placeholder="Nhập số lượng"
                              value={item.soLuong}
                              style={{
                                width: "16.75%",
                                marginRight: "1%",
                                marginLeft: "1%",
                              }}
                            /> */}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="" style={{ width: "20%" }}>
                      <span style={{ width: "30%", paddingRight: "12%" }}>
                        Đơn giá BH
                      </span>
                      <InputNumber
                        min={0}
                        // onChange={changeDSLo("giaBaoHiem", data)}
                        placeholder="Nhập đơn giá bảo hiểm"
                        value={data.giaBaoHiem}
                        formatter={(value) => formatterNumber(value)}
                        parser={(value) => parserNumber(value)}
                        style={{
                          width: "50%",
                          marginRight: "2%",
                        }}
                      />
                    </div>
                    <div style={{ width: "30%" }}>
                      <span>Đơn giá không BH</span>
                      <InputNumber
                        min={0}
                        // onChange={changeDSLo("giaKhongBaoHiem", data)}
                        formatter={(value) => formatterNumber(value)}
                        parser={(value) => parserNumber(value)}
                        placeholder="Nhập đơn giá không bảo hiểm"
                        value={data.giaKhongBaoHiem}
                        style={{
                          width: "42%",
                          marginRight: "1%",
                          marginLeft: "15%",
                        }}
                      />
                    </div>
                    <div style={{ width: "15%" }}>
                      <span style={{ paddingRight: "10px" }}>Phụ thu</span>
                      <InputNumber
                        min={0}
                        onChange={(e) => {
                          const value =
                            !isNaN(parseFloat(e)) && parseFloat(e) > 0
                              ? parseFloat(e) % 1.0 === 0.0
                                ? parseInt(e)
                                : parseFloat(e)
                              : 0;
                          changeDSLo("phuThu", data)(value);
                        }}
                        formatter={(value) => formatterNumber(value)}
                        parser={(value) => parserNumber(value)}
                        placeholder="Nhập phụ thu"
                        value={data.phuThu}
                        style={{
                          width: "65%",
                          marginRight: "2%",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ),
            props: {
              colSpan: 7,
            },
          }
        ) : (
          <div style={{ marginTop: "-25px" }}> {parseInt(index / 2) + 1}</div>
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Mã hàng hóa"
          sort_key="dichVu.dichVu.ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["dichVu.dichVu.ma"] || 0}
        />
      ),
      dataIndex: "ma",
      key: "ma",
      width: "15%",
      render: (item, data, index) =>
        index % 2 === 1 ? (
          {
            children: index + 1,
            props: {
              colSpan: 0,
            },
          }
        ) : (
          <>
            <GlobalStyles />
            <PopoverWrapper
              trigger="hover"
              overlayClassName="wide"
              overlayInnerStyle={{ width: "650px" }}
              content={contentPopover(data)}
              placement="rightTop"
            >
              <div
                style={{
                  marginTop: "-25px",
                  width: "fit-content",
                }}
              >
                {item}
              </div>
            </PopoverWrapper>
          </>
        ),
    },
    {
      title: (
        <HeaderSearch
          title="Tên hàng hóa"
          sort_key="dichVu.dichVu.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["dichVu.dichVu.ten"] || 0}
        />
      ),
      dataIndex: "ten",
      key: "ten",
      width: "30%",
      render: (item, data, index) =>
        index % 2 === 1 ? (
          {
            children: index + 1,
            props: {
              colSpan: 0,
            },
          }
        ) : (
          <div>
            <GlobalStyles />
            <PopoverWrapper
              trigger="hover"
              overlayClassName="wide"
              overlayInnerStyle={{ width: "650px" }}
              content={contentPopover(data)}
              placement="rightTop"
            >
              <div
                style={{
                  width: "fit-content",
                }}
              >
                {item}
              </div>
            </PopoverWrapper>
            <div>
              <InputTimeout
                style={{ width: "80%", padding: 0, color: "#777" }}
                onChange={changeDSLo("ghiChu", data)}
                data={data?.ghiChu}
              />
            </div>
          </div>
        ),
    },
    {
      title: (
        <HeaderSearch
          title="SL"
          sort_key="soLuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.soLuong || 0}
        />
      ),
      dataIndex: "soLuong",
      key: "soLuong",
      width: "15%",
      render: (item, data, index) =>
        index % 2 === 1 ? (
          {
            children: index + 1 + data.tenDonViTinh,
            props: {
              colSpan: 0,
            },
          }
        ) : (
          <div>
            <InputNumber
              min={0}
              placeholder="Nhập số lượng"
              style={{ width: "80%", textAlign: "center" }}
              value={item}
              parser={(value) => parserNumber(value)}
              formatter={(value) => formatterNumber(value)}
              onChange={(e) => {
                const value =
                  !isNaN(parseFloat(e)) && parseFloat(e) > 0
                    ? parseFloat(e) % 1.0 === 0.0
                      ? parseInt(e)
                      : parseFloat(e)
                    : 0;
                changeDSLo("soLuong", data)(value);
              }}
            />
            <span>{data.tenDonViTinh}</span>
          </div>
        ),
    },
    {
      title: (
        <HeaderSearch
          title="Giá sau VAT"
          sort_key="loNhap.giaNhapSauVat"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.["loNhap.giaNhapSauVat"] || 0}
        />
      ),
      dataIndex: "giaNhapSauVat",
      key: "giaNhapSauVat",
      width: "15%",
      render: (item, data, index) =>
        index % 2 === 1 ? (
          {
            children: index + 1,
            props: {
              colSpan: 0,
            },
          }
        ) : (
          <Popover
            trigger="click"
            placement="right"
            overlayInnerStyle={{ borderRadius: "5px", borderColor: "" }}
            content={
              <div>
                <label>Giá nhập trước VAT</label>
                <InputNumber
                  min={0}
                  formatter={(value) => formatterNumber(value)}
                  parser={(value) => parserNumber(value)}
                  onChange={(e) => {
                    const value =
                      !isNaN(parseFloat(e)) && parseFloat(e) > 0
                        ? parseFloat(e) % 1.0 === 0.0
                          ? parseInt(e)
                          : parseFloat(e)
                        : 0;
                    changeDSLo("giaNhapTruocVat", data)(value);
                  }}
                  placeholder="Nhập giá trước VAT"
                  value={data?.giaNhapTruocVat}
                  style={styleInput}
                />
                <hr
                  style={{
                    borderTop: "1px solid #c5cad3",
                    marginLeft: "-12px",
                    marginRight: "-12px",
                  }}
                />
                <label>VAT</label>
                <InputNumber
                  min={0}
                  parser={(value) => parserNumber(value)}
                  formatter={(value) => formatterNumber(value)}
                  onChange={(e) => {
                    const value =
                      !isNaN(parseFloat(e)) && parseFloat(e) > 0
                        ? parseFloat(e) % 1.0 === 0.0
                          ? parseInt(e)
                          : parseFloat(e)
                        : 0;
                    changeDSLo("vat", data)(value);
                  }}
                  placeholder="Nhập vat"
                  value={data?.vat}
                  style={styleInput}
                />
                <hr
                  style={{
                    borderTop: "1px solid #c5cad3",
                    marginLeft: "-12px",
                    marginRight: "-12px",
                  }}
                />
                <label>Giá nhập sau VAT</label>
                <InputNumber
                  min={0}
                  formatter={(value) => formatterNumber(value)}
                  parser={(value) => parserNumber(value)}
                  onChange={(e) => {
                    const value =
                      !isNaN(parseFloat(e)) && parseFloat(e) > 0
                        ? parseFloat(e) % 1.0 === 0.0
                          ? parseInt(e)
                          : parseFloat(e)
                        : 0;
                    changeDSLo("giaNhapSauVat", data)(value);
                  }}
                  placeholder="Nhập giá sau VAT"
                  value={data?.giaNhapSauVat}
                  style={styleInput}
                />
                <hr
                  style={{
                    borderTop: "1px solid #c5cad3",
                    marginLeft: "-12px",
                    marginRight: "-12px",
                  }}
                />
                <label>Thặng số bán lẻ</label>
                <InputNumber
                  min={0}
                  formatter={(value) => formatterNumber(value)}
                  parser={(value) => parserNumber(value)}
                  onChange={(e) => {
                    const value =
                      !isNaN(parseFloat(e)) && parseFloat(e) > 0
                        ? parseFloat(e) % 1.0 === 0.0
                          ? parseInt(e)
                          : parseFloat(e)
                        : 0;
                    changeDSLo("thangSoBanLe", data)(value);
                  }}
                  placeholder="Nhập giá"
                  value={data?.thangSoBanLe}
                  style={styleInput}
                />
              </div>
            }
          >
            <InputNumber
              formatter={(value) => formatterNumber(value)}
              parser={(value) => parserNumber(value)}
              style={{ width: "100%", textAlign: "right" }}
              value={(item || 0)}
            ></InputNumber>
          </Popover>
        ),
    },
    {
      title: (
        <HeaderSearch
          title="Thành tiền"
          sort_key="thanhTien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.thanhTien || 0}
        />
      ),
      dataIndex: "thanhTien",
      key: "thanhTien",
      width: "15%",
      render: (item, data, index) =>
        index % 2 === 1 ? (
          {
            children: index + 1,
            props: {
              colSpan: 0,
            },
          }
        ) : (
          <Popover
            trigger="click"
            placement="right"
            overlayInnerStyle={{ borderRadius: "5px", borderColor: "" }}
            content={
              <div>
                <label>Tổng tiền</label>
                <InputNumber
                  formatter={(value) => formatterNumber(value)}
                  parser={(value) => parserNumber(value)}
                  value={(data?.giaNhapSauVat || 0) * (data?.soLuong || 0)}
                  style={styleInput}
                />
                <hr
                  style={{
                    borderTop: "1px solid #c5cad3",
                    marginLeft: "-12px",
                    marginRight: "-12px",
                  }}
                />
                <label>Chiết khấu</label>
                <div
                  className="box"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <InputNumber
                    style={styleInput}
                    formatter={(value) => formatterNumber(value)}
                    parser={(value) => parserNumber(value)}
                    value={
                      data?.loaiChietKhau == LOAI_CHIET_KHAU.PHAN_TRAM ?
                        data?.tyLeChietKhau :
                        data?.tienChietKhau
                    }
                    min={0}
                    max={
                      data.loaiChietKhau == LOAI_CHIET_KHAU.PHAN_TRAM ?
                        100 :
                        data.loaiChietKhau == LOAI_CHIET_KHAU.TIEN ?
                          ((data?.giaNhapTruocVat || 0) * (data?.soLuong || 0)).toFixed(2) :
                          100
                    }
                    onChange={(e) => {
                      const type =
                        data?.loaiChietKhau == LOAI_CHIET_KHAU.PHAN_TRAM ?
                          "tyLeChietKhau" :
                          "tienChietKhau";
                      const value =
                        !isNaN(parseFloat(e)) && parseFloat(e) > 0
                          ? parseFloat(e) % 1.0 === 0.0
                            ? parseInt(e)
                            : parseFloat(e)
                          : 0;
                      changeDSLo(type, data)(value);
                    }}
                  />
                  <div
                    className=""
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: data?.loaiChietKhau == LOAI_CHIET_KHAU.PHAN_TRAM ?
                          "blue" :
                          "#ffffff",
                        flex: 1,
                        width: "fit-content",
                        padding: "0px 5px",
                        borderRadius: "3px",
                        marginRight: "5px",
                        cursor: "pointer",
                        color: data?.loaiChietKhau == LOAI_CHIET_KHAU.PHAN_TRAM ? "#ffffff" : "black",
                        fontWeight: "bold",
                      }}
                      onClick={onChangeLoaiChietKhau(data, index)}
                    >
                      %
                    </div>
                    <div
                      style={{
                        backgroundColor: data?.loaiChietKhau == LOAI_CHIET_KHAU.TIEN ?
                          "blue" :
                          "#ffffff",
                        flex: 1,
                        width: "fit-content",
                        padding: "0px 5px",
                        borderRadius: "3px",
                        marginRight: "5px",
                        cursor: "pointer",
                        color: data?.loaiChietKhau == LOAI_CHIET_KHAU.TIEN ? "#ffffff" : "black",
                        fontWeight: "bold",
                      }}
                      onClick={onChangeLoaiChietKhau(data, index)}
                    >
                      VNĐ
                    </div>
                  </div>
                </div>
                <hr
                  style={{
                    borderTop: "1px solid #c5cad3",
                    marginLeft: "-12px",
                    marginRight: "-12px",
                  }}
                />
                <label>Thành tiền</label>
                <InputNumber
                  formatter={(value) => formatterNumber(value)}
                  parser={(value) => parserNumber(value)}
                  value={data?.thanhTien}
                  style={styleInput}
                />
                <hr
                  style={{
                    borderTop: "1px solid #c5cad3",
                    marginLeft: "-12px",
                    marginRight: "-12px",
                  }}
                />
                <label>Thành tiền sửa đổi</label>
                <InputNumber
                  min={0}
                  formatter={(value) => formatterNumber(value)}
                  parser={(value) => parserNumber(value)}
                  value={data?.thanhTienSuaDoi}
                  style={styleInput}
                  onChange={(e) => {
                    const value =
                      !isNaN(parseFloat(e)) && parseFloat(e) > 0
                        ? parseFloat(e) % 1.0 === 0.0
                          ? parseInt(e)
                          : parseFloat(e)
                        : 0;
                    changeDSLo("thanhTienSuaDoi", data, index)(value);
                  }}
                />
              </div>
            }
          >
            <InputNumber
              formatter={(value) => formatterNumber(value)}
              parser={(value) => parserNumber(value)}
              style={{ width: "100%", textAlign: "right" }}
              value={item}
            />
          </Popover>
        ),
    },
    {
      title: "",
      key: "delete",
      width: "5%",
      render: (_, data, index) =>
        index % 2 === 1 ? (
          {
            children: index + 1,
            props: {
              colSpan: 0,
            },
          }
        ) : (
          <img
            onClick={() => {
              updateDataPhieuNhapChiTiet({
                dsNhapXuatChiTiet: dsNhapXuatChiTiet.filter(
                  (item) => item.detachId !== data.detachId
                ),
              });
            }}
            style={{ cursor: "pointer" }}
            src={IcDelete}
          />
        ),
    },
  ];
  const handleData = () => {
    let soLuong = 0,
      tongTien = 0,
      thanhTienSuaDoi = 0,
      tongTienChietKhauHangHoa = 0;
    const maps = {};
    (dsNhapXuatChiTiet || []).forEach((item, index) => {
      let chietKhau = 0;
      if (item?.loaiChietKhau == LOAI_CHIET_KHAU.PHAN_TRAM) {
        chietKhau = parseFloat(item?.giaNhapTruocVat) * parseFloat(item?.soLuong) * (parseFloat(item?.tyLeChietKhau / 100) || 0);
      }
      else if (item?.loaiChietKhau == LOAI_CHIET_KHAU.TIEN) {
        chietKhau = parseFloat(item?.tienChietKhau);
      }
      tongTienChietKhauHangHoa = (tongTienChietKhauHangHoa || 0) + chietKhau;

      if (maps[item.detachId]) {
        soLuong += parseFloat(item.soLuong) || 0;
        tongTien +=
          (parseFloat(item.soLuong) || 0) *
          (parseFloat(item.giaNhapSauVat) || 0);
        maps[item.detachId] = {
          ...maps[item.detachId],
          soLuong:
            (parseFloat(maps[item.detachId].soLuong) || 0) +
            (parseFloat(item.soLuong) || 0),
          dsLo: [...maps[item.detachId].dsLo, { ...item, index }],
        };
      } else {
        soLuong += parseFloat(item.soLuong) || 0;
        tongTien +=
          (parseFloat(item.soLuong) || 0) *
          (parseFloat(item.giaNhapSauVat) || 0);
        maps[item.detachId] = item;
        maps[item.detachId].dsLo = [{ ...item, index }];
      }
    });

    let ds = Object.keys(maps).reduce((a, b, index) => {
      const item = maps[b];
      item.thanhTien = item?.loaiChietKhau == LOAI_CHIET_KHAU.PHAN_TRAM ?
        ((item?.giaNhapSauVat || 0) * (item?.soLuong || 0) -
          (item?.giaNhapTruocVat || 0) *
          (item?.soLuong || 0) *
          (item?.tyLeChietKhau / 100 || 0))
          .toFixed(2) :
        !item?.soLuong ? item?.tienChietKhau :
          ((item?.giaNhapSauVat || 0) *
            (item?.soLuong || 0) -
            (item?.tienChietKhau || 0))
            .toFixed(2);
      if (!item.thanhTienSuaDoi || item.thanhTienSuaDoi == 0.0) {
        item.thanhTienSuaDoi = item.thanhTien;
      }
      item.giaBaoHiem = (item?.loNhap?.giaBaoHiem != null && item?.loNhap?.giaBaoHiem != undefined) ?
        item?.loNhap?.giaBaoHiem :
        (item.giaNhapSauVat || 0) * (1 + (item.thangSoBanLe || 0) / 100);
      item.giaKhongBaoHiem = (item?.loNhap?.giaKhongBaoHiem != null && item?.loNhap?.giaKhongBaoHiem != undefined) ?
        item?.loNhap?.giaKhongBaoHiem :
        (item.giaNhapSauVat || 0) * (1 + (item.thangSoBanLe || 0) / 100);
      item.phuThu = item.phuThu || 0;
      thanhTienSuaDoi += parseFloat(item.thanhTienSuaDoi) || 0;
      return [
        ...a,
        {
          ...item,
          rowId: index,
        },
        {
          ...item,
          rowId: index + "_",
        },
      ];
    }, []);
    setState({
      ...state,
      soLuong,
      tongTien,
      thanhTienSuaDoi,
      tongTienChietKhauHangHoa,
    });
    return ds;
  };

  const showModalChietKhau = () => (e) => {
    if (refModalChietKhau.current) {
      refModalChietKhau.current.show({ isReadOnly });
    }
  }

  const dsHangHoa = useMemo(() => handleData(), [dsNhapXuatChiTiet]);

  useEffect(() => {
    getAllListXuatXu();
  }, []);

  const onChangePage = (page) => {
    onSearchPhieuNhapChiTiet({ page: page - 1 });
  };

  const onSizeChange = (size) => {
    props.onSizeChange({ size: size });
  };

  return (
    <Main>
      <div
        style={{
          marginRight: "-1px",
          height: "600px",
          overflowY: "auto",
        }}
      >
        <Table
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
          showSorterTooltip={false}
          rowClassName={(record, index) =>
            index % 2 === 0 ? "level-1" : "level-2"
          }
          columns={columns}
          dataSource={dsHangHoa}
          pagination={false}
          rowKey={(record) => record.rowId}
        />
      </div>
      <div className="">
        {id && id != "them-moi" && totalElements ? (
          <Pagination
            onChange={onChangePage}
            current={page + 1}
            pageSize={size}
            total={totalElements}
            onShowSizeChange={onSizeChange}
            style={{ flex: 1, justifyContent: "flex-end" }}
          />
        ) : null}
        <div className="d-flex flex-end pt-2 border-top">
          <div className="text-right pr-4">
            <label>Tổng số lượng</label>
            <label>Tổng tiền</label>
            <label
              className="text-blue pointer"
              onClick={showModalChietKhau()}
            >
              <span>
                <ChietKhauIcon />
              </span>
              <span style={{ marginLeft: "5px" }}>Chiết khấu</span>
            </label>
            <label>Thành tiền</label>
            <label>Thành tiền sửa đổi</label>
          </div>
          <div className="text-right pr-2">
            <label>{formatNumber(state.soLuong)}</label>
            <label>{formatNumber(state.tongTien)}</label>
            <label>
              {formatNumber(((
                parseFloat(thongTinPhieuNhap?.tienChietKhau) ||
                parseFloat((state.tongTien * (thongTinPhieuNhap.phanTramChietKhau || 0)) / 100 || 0))
                + parseFloat(state.tongTienChietKhauHangHoa)
              ))}
            </label>
            <label>
              {formatNumber((state.tongTien +
                (thongTinPhieuNhap?.tienChietKhau ||
                  (state.tongTien * (thongTinPhieuNhap?.phanTramChietKhau || 0)) / 100)))}
            </label>
            <label>{formatNumber(state.thanhTienSuaDoi)}</label>
          </div>
        </div>
      </div>
      <ModalChietKhau ref={refModalChietKhau} />
    </Main>
  );
};

export default connect(
  (state) => ({
    khoId: state.tonKho.khoId,
    dsNhapXuatChiTiet: state.phieuNhapChiTiet.dsNhapXuatChiTiet || [],
    listAllXuatXu: state.xuatXu.listAllXuatXu || [],
    dataSortColumn: state.phieuNhapChiTiet.dataSortColumn,
    thongTinPhieuNhap: state.phieuNhap.thongTinPhieuNhap,
    page: state.phieuNhapChiTiet.page || 0,
    size: state.phieuNhapChiTiet.size || 10,
    totalElements: state.phieuNhapChiTiet.totalElements || 0,
  }),
  ({
    thangSoBanLe: { getListThangSoBanLe },
    phieuNhap: { updateData: updateDataNhapKho },
    phieuNhapChiTiet: { onSortChange, onSizeChange, onSearch: onSearchPhieuNhapChiTiet, updateData: updateDataPhieuNhapChiTiet },
    xuatXu: { getAllListXuatXu },
  }) => ({
    onSortChange,
    getListThangSoBanLe,
    updateDataNhapKho,
    getAllListXuatXu,
    onSizeChange,
    onSearchPhieuNhapChiTiet,
    updateDataPhieuNhapChiTiet,
  }),
  null,
  { forwardRef: true }
)(forwardRef(ThongTinHangHoa));
