import auth from "./auth";
import address from "./address";
import toaNha from "./toaNha";
import vanBang from "./categories/vanBang";
import tiepDon from "./tiepDon";
import quayTiepDon from "./categories/quayTiepDon";
import utils from "./utils";
import danToc from "./categories/danToc";
import ngheNghiep from "./ngheNghiep";
import moiQuanHe from "./categories/moiQuanHe";
import lyDoDoiTra from "./categories/lyDoDoiTra";
import benhPham from "./categories/benhPham";
import chuyenKhoa from "./categories/chuyenKhoa";
import goiSo from "./goiSo";
import tiepDonDichVu from "./tiepDonDichVu";
// cetegories
import mauKetQuaXN from "./categories/mauKetQuaXN";
import phuongThucTT from "./categories/phuongThucTT";
import dichVu from "./categories/dichVu";
import loaiCapCuu from "./categories/loaiCapCuu";
import nguyenNhanNhapVien from "./categories/nguyenNhanNhapVien";
import thoiGianCapCuu from "./categories/thoiGianCapCuu";
import nhomChiSo from "./categories/nhomChiSo";
import viTriChanThuong from "./categories/viTriChanThuong";
import nhomVatTu from "./categories/nhomVatTu";
import nhomHoatChat from "./categories/nhomVatTu/nhomHoatChat";
import phuongPhapGayMe from "./categories/phuongPhapGayMe";
import phuongPhapNhuom from "./categories/phuongPhapNhuom";
import viTriSinhThiet from "./categories/viTriSinhThiet";
import hocHamHocVi from "./categories/hocHamHocVi";
import loaiBenhAn from "./categories/loaiBenhAn";
import theBaoHiem from "./categories/theBaoHiem";
import goiDichVu from "./categories/goiDichVu";
import doiTac from "./categories/doiTac";
import goiDichVuChiTiet from "./categories/goiDichVuChiTiet";
import noiLayBenhPham from "./categories/noiLayBenhPham";

import danhMucThuoc from "./categories/danhMucThuoc";
import lieuDungThuoc from "./categories/danhMucThuoc/lieuDungThuoc";
import danhMucVatTu from "./categories/danhMucVatTu";
import khoaChiDinhDichVu from "./categories/goiDichVu/khoaChiDinhDichVu";
import baoCao from "./categories/baoCao";
import mayIn from "./categories/mayIn";
import dichVuKemTheo from "./categories/dichVuKemTheo";
import chiSoCon from "./categories/chiSoCon";
import mauKetQua from "./categories/goiDichVu/mauKetQua";
import nhanVien from "./categories/nhanVien";

import benhVien from "./categories/benhVien";
import loaGoiSo from "./categories/loaGoiSo";
import loiDan from "./categories/loiDan";
import khoa from "./categories/khoa";
import lieuDung from "./categories/lieuDung";
import duongDung from "./categories/duongDung";
import maMay from "./categories/maMay";
import hoatChat from "./categories/hoatChat";
import nhaSanXuat from "./categories/nhaSanXuat";
import dichVuTongHop from "./categories/nhomDichVu/All";
import nhomDichVuCap1 from "./categories/nhomDichVu/Level1";
import nhomDichVuCap2 from "./categories/nhomDichVu/Level2";
import nhomDichVuCap3 from "./categories/nhomDichVu/Level3";
import donVi from "./categories/donVi";
import chucVu from "./categories/chucVu";
import quanHam from "./categories/quanHam";
import nguoiDaiDien from "./categories/nguoiDaiDien";
import phong from "./categories/phong";
import donViTinh from "./categories/donViTinh";
import phanLoaiThuoc from "./categories/phanLoaiThuoc";
import phanNhomDichVuKho from "./categories/phanNhomDichVuKho";
import nhomDichVuKho from "./categories/nhomDichVuKho";
import dichVuKho from "./categories/dichVuKho";
import chuongBenh from "./categories/chuongBenh";
import nhomBenh from "./categories/nhomBenh";
import loaiBenh from "./categories/loaiBenh";
import maBenh from "./categories/maBenh";
import ttHanhChinh from "./categories/ttHanhChinh";
import phongThucHien from "./categories/phongThucHien";
import tuyChonGia from "./categories/tuyChonGia";
import loaiDoiTuong from "./categories/loaiDoiTuong";
import kho from "./kho";
import xaTongHop from "./xaTongHop";
import huyenTongHop from "./huyenTongHop";
import nhomTinhNang from "./categories/nhomTinhNang";
import quyen from "./categories/quyen";

import dichVuKyThuat from "./categories/dichVuKyThuat";
import hinhThucNhapXuat from "./categories/hinhThucNhapXuat";

import nguoiGioiThieu from "./categories/nguoiGioiThieu";
import nguonNguoiBenh from "./categories/nguonNguoiBenh";
import xuatXu from "./categories/xuatXu";
import thangSoBanLe from "./categories/thangSoBanLe";
import thietLapTichDiem from "./categories/thietLapTichDiem";
import template from "./categories/templateQms";

import thuocKeNgoai from "./categories/thuocKeNgoai";
import thuocKeNgoaiLieuDung from "./categories/thuocKeNgoaiLieuDung";

import kios from "./kios";
import thuNgan from "./thuNgan";
import danhSachPhieuThu from "./thuNgan/danhSachPhieuThu";
import danhSachDichVu from "./thuNgan/danhSachDichVu";
import nbDotDieuTri from "./thuNgan/nbDotDieuTri";
import danhSachPhieuYeuCauHoan from "./thuNgan/danhSachPhieuYeuCauHoan";

import layMauXN from "./xetNghiem/layMauXN";
import xetNghiem from "./xetNghiem";
import nbXetNghiem from "./xetNghiem/nbXetNghiem";
import xnHuyetHocSinhHoa from "./xetNghiem/xnHuyetHocSinhHoa";
import xnGiaiPhauBenhViSinh from "./xetNghiem/xnGiaiPhauBenhViSinh";
import boChiDinh from "./categories/boChiDinh";
import boChiDinhChiTiet from "./categories/boChiDinhChiTiet";
import chuongTrinhGiamGia from "./categories/chuongTrinhGiamGia";
import maGiamGia from "./categories/maGiamGia";
import hangThe from "./categories/hangThe";
import quyenKy from "./categories/quyenKy";
import loaiPhieu from "./categories/loaiPhieu";
import thietLapHangDoi from "./categories/thietLapHangDoi";
import kiosk from "./categories/kiosk";
import thietLapPhieuIn from "./categories/thietLapPhieuIn";

// khamBenh
import khamBenh from "./khamBenh";
import nbKhamBenh from "./khamBenh/nbKhamBenh";
import chiDinhKhamBenh from "./khamBenh/chiDinhKhamBenh";
import ketQuaKham from "./khamBenh/ketQuaKham";

import thietLap from "./categories/thietLap";
import adminVaiTroHeThong from "./admin/vaiTroHeThong";
import adminTaiKhoanHeThong from "./admin/taiKhoanHeThong";

// thongBao
import thongBao from "./thongBao";

import tachGopPhieuXN from "./categories/tachGopPhieuXN";

import tachGopPhieuDVKT from "./categories/tachGopPhieuDVKT";

import nguonNhapKho from "./categories/nguonNhapKho";

//kho
import thietLapChonKho from "./kho/thietLapChonKho";
import quanTriKho from "./kho/quanTriKho";
import quyetDinhThau from "./kho/quyetDinhThau";
import quyetDinhThauChiTiet from "./kho/quyetDinhThauChiTiet";
import tonKho from "./kho/tonKho";
import phieuNhapDuTru from "./kho/phieuNhapDuTru";

import dsBenhNhan from "./chanDoanHinhAnh/dsBenhNhan";
import choTiepDonDV from "./chanDoanHinhAnh/choTiepDonDV";
import chanDoanHinhAnh from "./chanDoanHinhAnh";
import nhapKho from "./kho/nhapKho";
import xuatKho from "./kho/xuatKho";
import nhapKhoChiTiet from "./kho/nhapKhoChiTiet";
import phieuNhap from "./kho/phieuNhap";
import phieuNhapChiTiet from "./kho/phieuNhapChiTiet";
import information from "./information";
import chiDinhDichVuCls from "./chanDoanHinhAnh/chiDinhDichVuCls";
import chiDinhDichVuKho from "./khamBenh/chiDinhDichVuKho";

import danhSachDichVuKho from "./kho/danhSachDichVuKho";
import danhSachDichVuKhoChiTiet from "./kho/danhSachDichVuKho/danhSachDichVuKhoChiTiet";
import themMoiThuoc from "./kho/themMoiThuoc";
import thuocChiTiet from "./kho/thuocChiTiet";
import thuocKho from "./kho/thuocKho";

import nhanVienKho from "./kho/nhanVienKho";

import hoSoBenhAn from "./hoSoBenhAn";

//theo dõi người bệnh
import chiTietTheoDoiNguoiBenh from "./theoDoiNguoiBenh/DanhSachNguoiBenh/ChiTietTheoDoiNguoiBenh";
import danhSachCovid from "./theoDoiNguoiBenh/DanhSachNguoiBenh/DanhSachNguoiBenh";
import nbDocThuocCovid from "./theoDoiNguoiBenh/DanhSachNguoiBenh/NbDonThuocCovid";

//ký số
import thietLapQuyenKy from "./kySo/thietLapQuyenKy";
import phanQuyenThietLapQuyenKy from "./kySo/thietLapQuyenKy/phanQuyenThietLapQuyenKy";
import lichSuKyDanhSachNguoiBenh from "./kySo/lichSuKy/lichSuKyDanhSachNguoiBenh";
import lichSuKyDanhSachPhieu from "./kySo/lichSuKy/lichSuKyDanhSachPhieu";
import lichSuKyLichSuPhieu from "./kySo/lichSuKy/lichSuKyLichSuPhieu";
import danhSachPhieuChoKy from "./kySo/danhSachPhieuChoKy";
import qms from "./qms";

// báo cáo đã in

import baoCaoDaIn from "./baoCaoDaIn";
import phimTat from "./phimTat";

import chiDinhDichVuTuTruc from "./chanDoanHinhAnh/chiDinhDichVuTuTruc";
import nbDvHoan from "./chanDoanHinhAnh/nbDvHoan";
import chiDinhDichVuVatTu from "./chanDoanHinhAnh/chiDinhDichVuVatTu";

export {
  dichVuKyThuat,
  dichVuTongHop,
  xaTongHop,
  huyenTongHop,
  kho,
  dichVuKemTheo,
  chiSoCon,
  dichVu,
  dichVuKho,
  phongThucHien,
  tuyChonGia,
  ttHanhChinh,
  nhomHoatChat,
  maBenh,
  loaiBenh,
  nhomBenh,
  chuongBenh,
  phanLoaiThuoc,
  nhomDichVuCap1,
  nhomDichVuCap2,
  nhomDichVuCap3,
  nhaSanXuat,
  hoatChat,
  maMay,
  duongDung,
  lieuDung,
  loiDan,
  toaNha,
  vanBang,
  auth,
  address,
  tiepDon,
  quayTiepDon,
  utils,
  loaiDoiTuong,
  danToc,
  ngheNghiep,
  moiQuanHe,
  phong,
  goiSo,
  tiepDonDichVu,
  // categries
  phuongThucTT,
  mauKetQuaXN,
  loaiCapCuu,
  thoiGianCapCuu,
  nguyenNhanNhapVien,
  benhVien,
  viTriChanThuong,
  nhomVatTu,
  loaGoiSo,
  khoa,
  donVi,
  chucVu,
  quanHam,
  phuongPhapGayMe,
  phuongPhapNhuom,
  viTriSinhThiet,
  hocHamHocVi,
  theBaoHiem,
  nguoiDaiDien,
  information,
  loaiBenhAn,
  lyDoDoiTra,
  benhPham,
  chuyenKhoa,
  donViTinh,
  phanNhomDichVuKho,
  nhomDichVuKho,
  goiDichVu,
  goiDichVuChiTiet,
  doiTac,
  nhomChiSo,
  noiLayBenhPham,
  boChiDinh,
  boChiDinhChiTiet,
  chuongTrinhGiamGia,
  maGiamGia,
  hangThe,
  quyenKy,
  loaiPhieu,
  // danh-muc/thuoc
  danhMucThuoc,
  lieuDungThuoc,
  // danh-muc/vat-tu
  danhMucVatTu,
  khoaChiDinhDichVu,
  baoCao,
  mayIn,
  mauKetQua,
  nhomTinhNang,
  quyen,
  thietLapHangDoi,
  // danh-muc/nguon-gioi-thieu
  nguoiGioiThieu,
  nguonNguoiBenh,
  xuatXu,
  thangSoBanLe,
  thietLapTichDiem,
  thuocKeNgoai,
  thuocKeNgoaiLieuDung,
  // Kios
  kios,
  thuNgan,
  danhSachPhieuThu,
  danhSachDichVu,
  nbDotDieuTri,
  danhSachPhieuYeuCauHoan,
  // Config
  thietLap,
  adminVaiTroHeThong,
  adminTaiKhoanHeThong,
  // XN
  layMauXN,
  xnHuyetHocSinhHoa,
  xnGiaiPhauBenhViSinh,
  xetNghiem,
  nbXetNghiem,
  // kham Benh
  khamBenh,
  nbKhamBenh,
  chiDinhKhamBenh,
  ketQuaKham,
  //Nhan vien
  nhanVien,
  thongBao,
  hinhThucNhapXuat,
  tachGopPhieuXN,
  tachGopPhieuDVKT,
  nguonNhapKho,
  //Kho
  thietLapChonKho,
  quanTriKho,
  quyetDinhThau,
  quyetDinhThauChiTiet,
  nhapKho,
  xuatKho,
  nhapKhoChiTiet,
  danhSachDichVuKho,
  danhSachDichVuKhoChiTiet,
  tonKho,
  phieuNhapDuTru,
  themMoiThuoc,
  thuocKho,
  phieuNhap,
  phieuNhapChiTiet,
  nhanVienKho,
  //CDHA
  dsBenhNhan,
  choTiepDonDV,
  chanDoanHinhAnh,
  chiDinhDichVuCls,
  chiDinhDichVuKho,
  thuocChiTiet,
  hoSoBenhAn,
  //chi tiết theo dõi người bệnh
  chiTietTheoDoiNguoiBenh,
  danhSachCovid,
  nbDocThuocCovid,
  //Ký số
  thietLapQuyenKy,
  phanQuyenThietLapQuyenKy,
  lichSuKyDanhSachNguoiBenh,
  danhSachPhieuChoKy,
  lichSuKyDanhSachPhieu,
  lichSuKyLichSuPhieu,
  kiosk,
  qms,
  template,
  thietLapPhieuIn,
  // báo cáo đã in
  baoCaoDaIn,
  phimTat,
  chiDinhDichVuTuTruc,
  nbDvHoan,
  chiDinhDichVuVatTu
};
