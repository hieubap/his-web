import { Col, Input, Select, Row } from "antd";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import ChietKhauIcon from "assets/svg/kho/chiet-khau.svg";
import Breadcrumb from "components/Breadcrumb";
import dmNhaSanXuatProvider from "data-access/categories/dm-nha-san-xuat-provider";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import HangHoa from "./component/chiTiet/HangHoa";
import TieuDePhieu from "./component/chiTiet/TieuDePhieu";
import ChiTietTTPhieu from "./component/chiTiet/TTPhieu";
import ModalChietKhau from "./component/ThongTinHangHoa/ModalChietKhau";
import { Main } from "./styled";
import { formatNumber } from "utils";
import { connect } from "react-redux";
import Pagination from "components/Pagination";
const { Option } = Select;

const PhieuNhap = ({
  // state
  listPhieuNhapChiTiet,
  thongTinPhieuNhap,
  dsNhapXuatChiTiet,
  dataSortColumn,
  page,
  size,
  totalElements,
  // dispatch
  updateDataPhieuNhap,
  getPhieuNhapById,
  clearPhieuNhap,
  onSearchPhieuNhapChiTiet,
  onSortChange,
  ...props
}) => {
  const refTimeOut = useRef();
  const refSearchHangHoa = useRef();
  const refModalChietKhau = useRef(null);
  const [state, setState] = useState({ detachLine: true });
  const [data, setData] = useState([]);
  const [supplier, setSupplier] = useState({});
  const [listItems, setListITems] = useState([]);
  const [chietKhauHangHoa, setChietKhauHangHoa] = useState(0);

  const search = window.location.pathname.split("/");
  const id = search[search.length - 1];

  useEffect(() => {
    if (id && id != "them-moi") {
      getPhieuNhapById(id)
        .then((data) => {
          getSupplier(data.nhaCungCapId);
          setData(data);
        });
      onSearchPhieuNhapChiTiet({ page: 0, size: 20, phieuNhapXuatId: id })
        .then((data) => {
          let chietKhauHangHoa = getChietKhauHangHoa(data);
          setChietKhauHangHoa(chietKhauHangHoa || 0);
          setListITems(data);
          let soLuong = 0,
            tongTien = 0;
          data.forEach((item) => {
            soLuong += item.soLuong;
            tongTien += item.thanhTien;
          });
          setState({ ...state, soLuong, tongTien });
        });
    }
  }, [id]);

  const getChietKhauHangHoa = (data = []) => {
    let chietKhau = 0;
    chietKhau = data?.reduce((acc, item) => {
      const ck = item?.loNhap?.tienChietKhau != null ?
        parseFloat(item?.loNhap?.tienChietKhau || 0) :
        parseFloat(item?.loNhap?.giaNhapTruocVat || 0) * parseFloat(item?.soLuong || 0) * parseFloat((item?.loNhap?.tyLeChietKhau || 0) / 100);
      acc = parseFloat(acc || 0) + parseFloat(ck || 0);
      return acc;
    }, 0);
    return chietKhau;
  }

  const getSupplier = (id) => {
    dmNhaSanXuatProvider.detail(id).then((res) => {
      if (res && res.code === 0 && res.data) {
        setSupplier(res.data);
      }
    });
  };

  // const getItem = async ({ idPhieu, ...payload }) => {
  //   const data = await onSearchDetailPhieuNhap({ phieuNhapXuatId: idPhieu, ...payload, ...payload?.dataSearch })
  //   if (data) {
  //     let promises = [], dsNhapXuatChiTiet = [], dsDichVuKho = [];
  //     promises = (data || [])?.map(item => getDetailDichVuKho(item?.dichVu?.id));
  //     dsDichVuKho = await Promise.all(promises);
  //     dsDichVuKho = dsDichVuKho?.map((item) => item?.code == 0 && item?.data);
  //     dsNhapXuatChiTiet = data?.map((it) => {
  //       const dichVuKho = dsDichVuKho?.find(i => i?.id == it?.dichVu?.id);
  //       return ({
  //         ...it,
  //         dichVu: {
  //           ...it?.dichVu,
  //           maHoatChat: dichVuKho?.hoatChat?.ma,
  //         },
  //       });
  //     });
  //     updateDataNhapKho({ dsNhapXuatChiTiet });
  //     setListITems(dsNhapXuatChiTiet);
  //     if (!payload?.dataSearch?.timKiem) {
  //       let soLuong = 0,
  //         tongTien = 0;
  //       dsNhapXuatChiTiet.forEach((item) => {
  //         soLuong += item.soLuong;
  //         tongTien += item.thanhTien;
  //       });
  //       setState({ ...state, soLuong, tongTien });
  //     }
  //   }
  // };

  const onSearch = (type) => (e) => {
    if (refTimeOut.current) {
      clearTimeout(refTimeOut.current);
      refTimeOut.current = null;
    }
    refTimeOut.current = setTimeout(
      (value) => {
        onSearchPhieuNhapChiTiet({
          phieuNhapXuatId: id, page: 0, size: 99999, dataSearch: { [type]: value },
        })
      },
      300,
      (e?.target ? e.target?.value : e)?.trim()
    );
  };
  const filterOption = (input = "", option) => {
    input = input?.toLowerCase().createUniqueText() || "";
    return (
      option?.props.children?.toLowerCase().createUniqueText().indexOf(input) >=
      0
    );
  };

  const onClickSort = (key, value) => {
    if (!dsNhapXuatChiTiet || dsNhapXuatChiTiet?.length < 1) return;
    onSortChange({
      [key]: value,
    });
  };

  const onChangePage = (page) => {
    onSearchPhieuNhapChiTiet({ page: page - 1 });
  };

  const onSizeChange = (size) => {
    props.onSizeChange({ size: size });
  };

  return (
    <Main>
      <Breadcrumb
        chains={[
          { title: "Kho", link: "/kho" },
          { title: "Nhập kho", link: "/kho/nhap-kho" },
        ]}
      >
        <div className="screen">
          <TieuDePhieu supplier={supplier} ticket={data} />
          <div className="left-content">
            <Row>
              <Col span={17}>
                <div>
                  <div className="table-title">
                    <div className="d-flex pl-2">
                      <span className="pr-2" style={{ paddingTop: "3px" }}>
                        <b>Thông tin hàng hóa</b>
                      </span>
                      <span>
                        <div className="search-select">
                          <img
                            src={IconSearch}
                            alt="IconSearch"
                            className="icon-search"
                          />
                          <Select
                            ref={refSearchHangHoa}
                            style={{ width: "300px" }}
                            showSearch
                            allowClear
                            onClear={() => {
                              onSearchPhieuNhapChiTiet({ phieuNhapXuatId: id, page: 0, size: 20 });
                            }}
                            placeholder="Nhập hoặc quét mã hàng hóa, tên hàng hóa"
                            onSearch={onSearch("timKiem")}
                            onSelect={(e) => {
                              const name = e.target ? e.target?.value : e;
                              onSearchPhieuNhapChiTiet({ phieuNhapXuatId: id, page: 0, dataSearch: { timKiem: name } })
                            }}
                            filterOption={filterOption}
                          >
                            {listPhieuNhapChiTiet?.map((item, index) => (
                              <Option key={index} value={item?.dichVu?.ten}>
                                {`${item?.dichVu?.ma} - ${item?.dichVu?.ten}`}
                              </Option>
                            ))}
                          </Select>
                        </div>
                      </span>
                    </div>
                    <div className="checked">
                    </div>
                  </div>
                  <div style={{ marginRight: "-1px", height: "100%" }}>
                    <HangHoa
                      dataSortColumn={dataSortColumn}
                      onClickSort={onClickSort}
                      dataSource={dsNhapXuatChiTiet}
                      detachLine={state.detachLine}
                      detail={data}
                    ></HangHoa>
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
                            onClick={() => refModalChietKhau.current && refModalChietKhau.current.show({ isReadOnly: true })}
                          // onMouseOver={() => {
                          //   setState({ ...state, showModal: true })
                          // }}
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
                          <label>{formatNumber(state.soLuong || 0)}</label>
                          <label>{formatNumber(state.tongTien || 0)}</label>
                          <label>{formatNumber((data.tienChietKhau || 0) + chietKhauHangHoa)}</label>
                          <label>{formatNumber(data.thanhTien || 0)}</label>
                          <label>
                            {formatNumber(data.thanhTienSuaDoi || 0)}
                          </label>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </Col>
              <Col span={7}>
                <div className="right-content">
                  <ChiTietTTPhieu data={data} setData={(e) => setData(e)} />
                </div>
              </Col>
            </Row>
          </div>

          <ModalChietKhau ref={refModalChietKhau} />
        </div>
      </Breadcrumb>
    </Main>
  );
};

export default connect(
  (state) => ({
    listPhieuNhapChiTiet: state.nhapKhoChiTiet.listPhieuNhapChiTiet || [],
    thongTinPhieuNhap: state.phieuNhap.thongTinPhieuNhap,
    dsNhapXuatChiTiet: state.phieuNhapChiTiet.dsNhapXuatChiTiet || [],
    dataSortColumn: state.phieuNhapChiTiet.dataSortColumn,
    page: state.phieuNhapChiTiet.page || 0,
    size: state.phieuNhapChiTiet.size || 10,
    totalElements: state.phieuNhapChiTiet.totalElements || 0,
  }),
  ({
    phieuNhap: { updateData: updateDataPhieuNhap, getById: getPhieuNhapById, clearPhieuNhap },
    phieuNhapChiTiet: { onSortChange, onSizeChange, onSearch: onSearchPhieuNhapChiTiet },
  }) => ({
    updateDataPhieuNhap,
    getPhieuNhapById,
    clearPhieuNhap,
    onSearchPhieuNhapChiTiet,
    onSizeChange,
    onSortChange,
  }),
)(PhieuNhap);
