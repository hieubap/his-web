import React, { useEffect, useState, useMemo, useRef } from "react";
import { connect } from "react-redux";
import Breadcrumb from "components/Breadcrumb";
import { Main } from "./styled";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import { Row, Col, Select, Popover, Checkbox, Spin, message } from "antd";
import FormPhieuNhap from "./component/FormPhieuNhap";
import ThongTinHangHoa from "./component/ThongTinHangHoa";
import TieuDePhieu from "./TieuDePhieu";
import DanhSachHangHoa from "./component/DanhSachHangHoa";
import phieuProvider from "data-access/kho/phieu-nhap-xuat-provieder";
import { useHistory } from "react-router-dom";
import { LOAI_CHIET_KHAU } from "constants/index";
import moment from "moment";
const { Option } = Select;

export const redirectToDetailPage = ({ id, history }) => {
  history.push(`/kho/nhap-kho/chi-tiet/${id}`);
}

const getDetachId = (item) =>
  (item.ma || "?????") +
  "_" +
  (item.giaNhapSauVat || "?????") +
  "_" +
  (item.soLo || "?????") +
  "_" +
  (item.xuatXuId || "?????");

const PhieuNhap = ({
  //state
  listAllDichVuKho,
  listQuyetDinhThau,
  thongTinPhieuNhap,
  dsNhapXuatChiTiet,
  // pnNhaCungCap,
  khoHienTai,
  //dispatch
  updateDataPhieuNhap,
  updateDataPhieuNhapChiTiet,
  updateDataQDTCT,
  updateDataQDT,
  getPhieuNhapById,
  onSearchPhieuNhapChiTiet,
  getAllListDichVuKho,
  getListThangSoBanLe,
  clearPhieuNhap,
  searchQDTById,
  getQDTChiTiet,
  getNhaSanXuatById,
  getXuatXuById,
  ...props
}) => {
  const refSearchHangHoa = useRef();
  const refTimeOut = useRef(null);
  const refDSHangHoa = useRef(null);
  const refTTHangHoa = useRef(null);
  const refTTPhieu = useRef(null);
  const refTieuDe = useRef(null);
  const [state, _setState] = useState({
    focusSearch: false,
  });
  const history = useHistory();
  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }));
  };
  const arr = window.location.pathname.split("/");
  const id = arr[arr.length - 1];

  const onChange = (type) => (e) => {
    const value = e.target ? e?.target?.value : e;
    setState({ [type]: value });
  };
  const onSearch = (type) => (e) => {
    const value = e?.target ? e?.target?.value : e;
    if (!value) {
      updateDataQDTCT({ listAllDichVuKho: [] });
    }
    if (refTimeOut.current) {
      clearTimeout(refTimeOut.current);
      refTimeOut.current = null;
    }
    refTimeOut.current = setTimeout(() => {
      setState({ [type]: value });
      getAllListDichVuKho({
        page: 0,
        size: 99999,
        dataSearch: {
          [type]: value,
          quyetDinhThauId: thongTinPhieuNhap?.quyetDinhThauId,
          nhaCungCapId: thongTinPhieuNhap?.nhaCungCapId,
          dsLoaiDichVu: khoHienTai?.dsLoaiDichVu,
        }
      });
    }, 300);
  };
  const filterOption = (input = "", option) => {
    input = input?.toLowerCase().createUniqueText() || "";
    return (
      option?.props.children?.toLowerCase().createUniqueText().indexOf(input) >=
      0
    );
  };
  const focusSearchHangHoa = () => {
    if (refSearchHangHoa.current) {
      getAllListDichVuKho({
        dataSearch: {
          quyetDinhThauId: thongTinPhieuNhap?.quyetDinhThauId,
          nhaCungCapId: thongTinPhieuNhap?.nhaCungCapId,
          dsLoaiDichVu: khoHienTai?.dsLoaiDichVu,
        },
        page: 0,
        size: 10,
      });
      refSearchHangHoa.current.focus();
      setState({ focusSearch: true });
    }
  };
  const addItemToList = async (data) => {
    try {
      let chiTietThau, nhaSanXuat, xuatXu;
      const res = await getListThangSoBanLe({
        dataSearch: {
          giaNhap: data?.giaNhapSauVat || 0,
          khoId: khoHienTai?.id,
        }
      });
      if (data?.quyetDinhThauChiTietId) {
        chiTietThau = await getQDTChiTiet(data?.quyetDinhThauChiTietId);
      }
      if (chiTietThau?.nhaSanXuatId) {
        nhaSanXuat = await getNhaSanXuatById(chiTietThau?.nhaSanXuatId);
      }
      if (chiTietThau?.xuatXuId) {
        xuatXu = await getXuatXuById(chiTietThau?.xuatXuId);
      }
      let item = {
        ...data,
        thangSoBanLe: !res ? 0 : res[0]?.thangSoBanLe,
        chiTietThau,
        dichVu: chiTietThau?.dichVu || {},
        soVisa: chiTietThau?.soVisa,
        quyCach: chiTietThau?.quyCach,
        tenDuongDung: chiTietThau?.dichVu?.tenDuongDung,
        goiThau: chiTietThau?.goiThau,
        soLuongConLai: chiTietThau?.soLuongConLai,
        hamLuong: chiTietThau?.dichVu?.hamLuong,
        xuatXu,
        nhaSanXuat,
      };
      item = {
        ...item,
        giaNhapTruocVat: data?.giaNhapSauVat
          ? (data.giaNhapSauVat / (1 + 5 / 100)).toFixed(2)
          : 0,
        detachId: getDetachId(data),
        loaiChietKhau: LOAI_CHIET_KHAU.PHAN_TRAM,
        giaBaoHiem: data?.giaNhapSauVat * (1 + (item?.thangSoBanLe || 0) / 100),
        giaKhongBaoHiem: data?.giaNhapSauVat * (1 + (item?.thangSoBanLe || 0) / 100),
        vat: 5,
      }
      updateDataPhieuNhap({
        thongTinPhieuNhap: {
          ...thongTinPhieuNhap,
          quyetDinhThauId: item?.quyetDinhThauId,
          nhaCungCapId: item?.nhaCungCapId,
        },
      });
      updateDataPhieuNhapChiTiet({
        dsNhapXuatChiTiet: [
          ...dsNhapXuatChiTiet,
          item,
        ],
      })
    } catch (error) {
      console.log(error);
    }
  }
  const onClose = async (data) => {
    if (data) {
      if (data.quyetDinhThauId) {
        let existQDT, ds = listQuyetDinhThau;
        if (!thongTinPhieuNhap.quyetDinhThauId) {
          existQDT = ds?.find(item => item?.id == data?.quyetDinhThauId);
        }
        if (!existQDT) {
          const res = await searchQDTById({ id: data.quyetDinhThauId });
          ds = [
            ...ds,
            { ...res },
          ];
          updateDataQDT({ listQuyetDinhThau: ds });
        }
      }
      await addItemToList(data);
    }
  }

  const showModalDS = async (e) => {
    const value = e?.target ? e?.target?.value : e;
    let dsDichVu = listAllDichVuKho?.filter(item => item?.dichVuId == value);
    if (dsDichVu?.length < 1) return;
    if (dsDichVu?.length == 1) {
      onClose(dsDichVu[0]);
      return;
    }
    refDSHangHoa.current.show({ dichVuId: value });
  }

  useEffect(() => {
    if (id && id != "them-moi") {
      getPhieuNhapById(id);
      onSearchPhieuNhapChiTiet({ page: 0, size: 20, phieuNhapXuatId: id });
    }
    else {
      updateDataPhieuNhap({
        thongTinPhieuNhap: {
          ...thongTinPhieuNhap,
          ngayHoaDon: moment(new Date, "YYYY-MM-DD")
        }
      })
    }
  }, [id]);
  const create = (value, id, approve) => {
    const tong = refTTHangHoa.current.getTong();
    const body = {
      ...value,
      ...thongTinPhieuNhap,
      ngayHoaDon: value.ngayHoaDon.format("YYYY-MM-DD"),
      thanhTien: tong.thanhTien,
      thanhTienSuaDoi: tong.thanhTienSuaDoi,
      tienChietKhau: tong.tienChietKhau,
      phanTramChietKhau: tong.phanTramChietKhau,
      // chietKhauTongHoaDon: tong?.chietKhauTongHoaDon,
      dsNhapXuatChiTiet: (dsNhapXuatChiTiet || []).map((item) => {
        return ({
          ...item,
          dsLo: undefined,
          dichVu: item.dichVu,
          dichVuId: item.dichVuId,
          soLuong: item.soLuong,
          thanhTien: item.thanhTien,
          thanhTienSuaDoi: item.thanhTienSuaDoi,
          xuatXuId: item.xuatXuId,
          // ngayHanSuDung: item.ngayHanSuDung,
          loNhap: {
            ...item.loNhap,
            quyetDinhThauChiTietId: item?.quyetDinhThauChiTietId,
            ghiChu: item.ghiChu,
            giaNhapSauVat: item.giaNhapSauVat,
            giaNhapTruocVat: item.giaNhapTruocVat,
            ngaySanXuat: item.ngaySanXuat?.format("YYYY-MM-DD"),
            ngayHanSuDung: item.ngayHanSuDung?.format("YYYY-MM-DD"),
            soLo: item.soLo,
            thangSoBanLe: item.thangSoBanLe,
            vat: item.vat,
            xuatXuId: item.xuatXuId,
            tienChietKhau: item?.tienChietKhau,
            tyLeChietKhau: item?.tyLeChietKhau,
          },
        })
      }),
    };
    if (!id) {
      if (!approve) {
        phieuProvider
          .post(body)
          .then((res) => {
            const { data } = res;
            if (res && res.code === 0) {
              message.success("Tạo mới thành công");
              redirectToDetailPage({ id: data?.id, history });
            }
            else message.error("Tạo mới thất bại: " + res.message);
          })
          .catch((e) => {
            message.error(e?.message?.toString());
          });
      }
      else {
        phieuProvider
          .post(body)
          .then(({ data }) => phieuProvider.sendApproved(data?.id))
          .then(s1 => {
            if (s1 && s1.code === 0) {
              const { data } = s1;
              message.success("Tạo mới và gửi duyệt phiếu nhập thành công");
              redirectToDetailPage({ id: data?.id, history });
            } else message.error("Tạo mới và gửi duyệt phiếu thất bại: " + s1?.message);
          })
          .catch((e) => {
            message.error(e?.message?.toString());
          });
      }
    }
    else {
      phieuProvider
        .put({ id, ...body })
        .then((res) => {
          if (res && res.code === 0) {
            const { data } = res;
            message.success("Cập nhật thành công");
            redirectToDetailPage({ id: data?.id, history });
          } else message.error("Cập nhật thất bại: " + res?.message);
        })
        .catch((e) => {
          message.error(e?.message?.toString());
        });
    }
  };
  return (
    <Main>
      <Breadcrumb
        chains={[
          { title: "Kho", link: "/kho", onClick: () => clearPhieuNhap() },
          { title: "Nhập kho", link: "/kho/nhap-kho", onClick: () => clearPhieuNhap() },
        ]}
      >
        <div className="screen">
          <TieuDePhieu
            ref={refTieuDe}
          // ticket={state.data}
          />
          <div className="left-content">
            <Row>
              <Col span={17}>
                <div>
                  <div className="table-title">
                    <div className="d-flex pl-1">
                      <span style={{ paddingTop: "3px" }}>
                        <b>Thông tin hàng hóa</b>
                      </span>
                      <span style={{ marginLeft: "15px" }}>
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
                            onBlur={() => {
                              setState({ focusSearch: false });
                            }}
                            onFocus={() => {
                              setState({ focusSearch: true });
                            }}
                            open={state.focusSearch}
                            onClear={() => { }}
                            placeholder="Nhập hoặc quét mã hàng hóa, tên hàng hóa"
                            onSearch={onSearch("timKiem")}
                            onSelect={(e) => {
                              showModalDS(e);
                            }}
                            filterOption={filterOption}
                          >
                            {listAllDichVuKho?.filter((item, index, parent) => {
                              let idx = parent?.findIndex(d => d.ten == item?.ten);
                              return idx == index;
                            })?.map((item, index) => (
                              <Option key={index} value={item?.dichVuId}>
                                {item?.ten}
                              </Option>
                            ))}
                          </Select>
                        </div>
                      </span>
                    </div>
                  </div>
                  <ThongTinHangHoa
                    ref={refTTHangHoa}
                    showHangHoa={() => refDSHangHoa.current && refDSHangHoa.current.show()}
                    focusSearchHangHoa={focusSearchHangHoa}
                    id={id}
                  />
                </div>
              </Col>
              <Col span={7}>
                <div className="right-content">
                  <FormPhieuNhap
                    ref={refTTPhieu}
                    onCreate={({ approve, ...value }) => create(value, null, approve)}
                    onUpdate={({ id, payload }) => create(payload, id, null)}
                  />
                </div>
              </Col>
            </Row>
          </div>
          <DanhSachHangHoa
            ref={refDSHangHoa}
            onClose={(data) => onClose(data)}
          />
        </div>
      </Breadcrumb>
    </Main>
  );
};

export default connect(
  (state) => ({
    thongTinPhieuNhap: state.phieuNhap.thongTinPhieuNhap,
    listAllDichVuKho: state.quyetDinhThauChiTiet.listAllDichVuKho || [],
    dsNhapXuatChiTiet: state.phieuNhapChiTiet.dsNhapXuatChiTiet || [],
    khoHienTai: state.kho.currentItem,
    listQuyetDinhThau: state.quyetDinhThau.listQuyetDinhThau || [],
  }),
  ({
    quyetDinhThauChiTiet: { getAllListDichVuKho, updateData: updateDataQDTCT, getDetail: getQDTChiTiet },
    phieuNhap: { updateData: updateDataPhieuNhap, getById: getPhieuNhapById, clearPhieuNhap },
    phieuNhapChiTiet: { onSearch: onSearchPhieuNhapChiTiet, updateData: updateDataPhieuNhapChiTiet },
    thangSoBanLe: { getListThangSoBanLe },
    quyetDinhThau: { updateData: updateDataQDT, searchById: searchQDTById },
    nhaSanXuat: { getDetail: getNhaSanXuatById },
    xuatXu: { getDetail: getXuatXuById },
  }) => ({
    updateDataPhieuNhap,
    updateDataPhieuNhapChiTiet,
    updateDataQDTCT,
    updateDataQDT,
    searchQDTById,
    getPhieuNhapById,
    onSearchPhieuNhapChiTiet,
    getAllListDichVuKho,
    getListThangSoBanLe,
    clearPhieuNhap,
    getQDTChiTiet,
    getNhaSanXuatById,
    getXuatXuById,
  })
)(PhieuNhap);
