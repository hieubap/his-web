import { Button, Select, message } from "antd";
import CancelIcon from "assets/images/kho/cancel.png";
import SaveIcon from "assets/images/kho/save.png";
import Breadcrumb from "components/Breadcrumb";
import React from "react";
import { connect } from "react-redux";
import ThongTinHangHoa from "./container/ThongTinHangHoa";
import ThongTinPhieuXuat from "./container/ThongTinPhieuXuat";
import { Main } from "./styled";
import phieuNXChiTietProvider from "data-access/kho/phieu-nhap-xuat-chi-tiet-provieder";
import phieuNhapProvider from "data-access/kho/phieu-nhap-xuat-provieder";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import phieuProvider from "data-access/kho/phieu-nhap-xuat-provieder";

const { Option } = Select;

const ChiTiet = ({
  //state
  isLoadingDichVuKho,
  listAllDichVuKho,
  thongTinPhieuNhap,
  pnNhaCungCap,
  //dispatch
  updateData,
  getAllListDichVuKho,
  ...props
}) => {
  const [data, setData] = useState({});
  const [edit, setEdit] = useState(false);
  const refItems = useRef(null);
  const search = window.location.pathname.split("/");
  const id = search[search.length - 1];

  useEffect(() => {
    getDetail();
    // getItem();
  }, []);

  const getDetail = () => {
    phieuNhapProvider
      .detail(id)
      .then((res) => {
        if (res && res.code === 0 && res.data) {
          setData(res.data);
          refItems.current.updateData(res.data?.dsNhapXuatChiTiet);
        }
      })
      .catch((e) => {});
  };

  // const getItem = () => {
  //   phieuNXChiTietProvider
  //     .search({ phieuNhapXuatId: id })
  //     .then((res) => {
  //       if (res && res.code === 0 && res.data) {
  //         refItems.current.updateData(res.data);
  //       }
  //     })
  //     .catch((e) => {});
  // };

  const handleApproved = () => {
    phieuNhapProvider
      .approved(data.id)
      .then((res) => {
        if (res && res.code === 0) {
          message.success("Duyệt thành công");
          setTimeout(() => window.location.reload(), 2000);
        }
      })
      .catch((res) => {
        message.error("Duyệt không thành công: " + res.message);
      });
  };

  const notApproved = () => {
    phieuNhapProvider
      .unApproved(data.id)
      .then((res) => {
        if (res && res.code === 0) {
          message.success("Hủy duyệt thành công");
          setTimeout(() => window.location.reload(), 2000);
        }
      })
      .catch((res) => {
        message.error("Hủy duyệt không thành công: " + res.message);
      });
  };

  const unSend = () => {
    phieuNhapProvider
      .unSendApproved(data.id)
      .then((res) => {
        if (res && res.code === 0) {
          message.success("Từ chối thành công");
          setTimeout(() => window.location.reload(), 2000);
        }
      })
      .catch((res) => {
        message.error("Từ chối không thành công: " + res.message);
      });
  };

  const changeData = (key) => (value) => {
    setData({ ...data, [key]: value });
  };

  const handleEdit = () => {
    const {
      id,
      bacSiChiDinhId,
      chietKhauTongHoaDon,
      dsNhapXuatChiTiet,
      ghiChu,
      hinhThucNhapXuatId,
      khoDoiUngId,
      khoId,
      khoaChiDinhId,
      kyHieuHoaDon,
      loaiNhapXuat,
      lyDo,
      ngayHoaDon,
      nguoiDuyetId,
      nguoiGuiDuyetId,
      nguoiTaoPhieuId,
      nguonNhapKhoId,
      nhaCungCapId,
      nhapKho,
      phanTramChietKhau,
      phatNgayKhiChiDinh,
      quyetDinhThauId,
      soHoaDon,
      soHopDong,
      soPhieu,
      thangDuTru,
      thanhTien,
      thanhTienSuaDoi,
      thoiGianDuyet,
      thoiGianGuiDuyet,
      thoiGianTaoPhieu,
      tienChietKhau,
      trangThai,
      vat,
    } = data;

    phieuProvider
      .put({
        id,
        bacSiChiDinhId,
        chietKhauTongHoaDon,
        dsNhapXuatChiTiet: dsNhapXuatChiTiet.map(
          ({
            active,
            dichVuId,
            id,
            loNhapId,
            phieuNhapXuatId,
            soLuong,
            soLuongYeuCau,
            thanhTien,
            thanhTienSuaDoi,
            ghiChu,
          }) => ({
            active,
            dichVuId,
            id,
            loNhapId,
            phieuNhapXuatId,
            soLuong,
            soLuongYeuCau,
            thanhTien,
            thanhTienSuaDoi,
            ghiChu,
          })
        ),
        ghiChu,
        hinhThucNhapXuatId,
        khoDoiUngId,
        khoId,
        khoaChiDinhId,
        kyHieuHoaDon,
        loaiNhapXuat,
        lyDo,
        ngayHoaDon,
        nguoiDuyetId,
        nguoiGuiDuyetId,
        nguoiTaoPhieuId,
        nguonNhapKhoId,
        nhaCungCapId,
        nhapKho,
        phanTramChietKhau,
        phatNgayKhiChiDinh,
        quyetDinhThauId,
        soHoaDon,
        soHopDong,
        soPhieu,
        thangDuTru,
        thanhTien,
        thanhTienSuaDoi,
        thoiGianDuyet,
        thoiGianGuiDuyet,
        thoiGianTaoPhieu,
        tienChietKhau,
        trangThai,
        vat,
      })
      .then((res) => {
        if (res && res.code === 0) {
          message.success("Cập nhật thành công");
          setEdit(false);
        } else {
          message.success(res.message);
        }

        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000);
      })
      .catch((e) => {
        message.error("Cập nhật không thành công");
      });
  };

  return (
    <Main>
      <Breadcrumb
        chains={[
          { title: "Kho", link: "/kho" },
          { title: "Xuất kho", link: "/kho/xuat-kho" },
        ]}
      >
        <div className="header">
          <h3>Chi tiết phiếu xuất</h3>
        </div>
        <div className="ticket">
          <div className="title">Thông tin phiếu xuất</div>
          <ThongTinPhieuXuat
            edit={edit}
            data={data}
            onChangeData={changeData}
          />
        </div>
        <div className="content">
          <ThongTinHangHoa
            edit={edit}
            ref={refItems}
            onChangeData={changeData}
            trangThai={data.trangThai}
          />
        </div>
        <div className="footer-btn">
          {data.trangThai === 20 && (
            <>
              <Button className="left-btn" onClick={() => unSend()}>
                Từ chối duyệt
                <img src={CancelIcon} />
              </Button>
              <Button className="right-btn" onClick={() => handleApproved()}>
                Duyệt phát
                <img src={SaveIcon} />
              </Button>
            </>
          )}
          {(data.trangThai === 10 || data.trangThai === 20) &&
            (!edit ? (
              <Button
                style={{ marginLeft: 10 }}
                className="left-btn"
                onClick={() => setEdit(true)}
              >
                Sửa phiếu
              </Button>
            ) : (
              <Button className="right-btn" onClick={() => handleEdit()}>
                Lưu
                <img src={SaveIcon} />
              </Button>
            ))}
          {data.trangThai === 30 && (
            <Button className="left-btn" onClick={() => notApproved()}>
              Hủy duyệt phát
              <img src={CancelIcon} />
            </Button>
          )}
        </div>
      </Breadcrumb>
    </Main>
  );
};

export default connect(
  (state) => ({
    listAllDichVuKho: state.quyetDinhThauChiTiet.listAllDichVuKho || [],
    thongTinPhieuNhap: state.nhapKho.thongTinPhieuNhap,
    isLoadingDichVuKho: state.dichVuKho.isLoading || false,
    pnNhaCungCap: state.nhapKho.pnNhaCungCap,
  }),
  ({
    quyetDinhThauChiTiet: { getAllListDichVuKho },
    nhapKho: { updateData },
  }) => ({
    updateData,
    getAllListDichVuKho,
  })
)(ChiTiet);
