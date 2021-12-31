import React, { Suspense } from "react";
import { ROLES } from "../constants/index";
import AuthWrapper from "components/AuthWrapper";

const Page =
  (Component, roles = []) =>
  (props) => {
    return (
      <Suspense fallback={<div></div>}>
        <AuthWrapper accessRoles={roles} isCheckRoute>
          <Component {...props} />
        </AuthWrapper>
      </Suspense>
    );
  };

// Page home
const SubPageHome = React.lazy(() => import("./home/subPage/Home"));
const SubPageDanhMuc = React.lazy(() => import("./home/subPage/DanhMuc"));
const SubPageXetNghiem = React.lazy(() => import("./home/subPage/XetNghiem"));
const SubPageThuNgan = React.lazy(() => import("./home/subPage/ThuNgan"));
const SubPageQuanTri = React.lazy(() => import("./home/subPage/QuanTri"));
const SubPageThietLap = React.lazy(() => import("./home/subPage/ThietLap"));
const SubPageKho = React.lazy(() => import("./home/subPage/Kho"));
const SubPageCDHA = React.lazy(() => import("./home/subPage/CDHA"));
const SubPageHSBA = React.lazy(() => import("./home/subPage/HSBA"));
const SubPageTDDT = React.lazy(() => import("./home/subPage/TheoDoiDieuTri"));
const SubPageKySo = React.lazy(() => import("./home/subPage/KySo"));
const SubPageBaoCao = React.lazy(() => import("./home/subPage/BaoCao"));

// Login
const Login = React.lazy(() => import("./login"));

//tiếp đón
const TiepDon = React.lazy(() => import("./tiepDon"));
const KeDichVu = React.lazy(() => import("./tiepDon/KeDichVuKham"));
//
const Guide = React.lazy(() => import("./guide"));
// kham benh
const KhamBenh = React.lazy(() => import("./khamBenh"));

// danh muc
const DanhMuc = React.lazy(() => import("./danhMuc"));
const LoaiCapCuu = React.lazy(() => import("./danhMuc/loaiCapCuu"));
const HangThe = React.lazy(() => import("./danhMuc/hangThe"));
const NguyenNhanNhapVien = React.lazy(() =>
  import("./danhMuc/nguyenNhanNhapVien")
);
const NhomHoaChat = React.lazy(() => import("./danhMuc/nhomHoaChat"));
const ViTriChanThuong = React.lazy(() => import("./danhMuc/viTriChanThuong"));
const ThoiGianCapCuu = React.lazy(() => import("./danhMuc/thoiGianCapCuu"));
const QuanHam = React.lazy(() => import("./danhMuc/quanHam"));
const Unit = React.lazy(() => import("./danhMuc/donVi"));
const LoaiBenhAn = React.lazy(() => import("./danhMuc/loaiBenhAn"));
const PhuongPhapGayMe = React.lazy(() => import("./danhMuc/phuongPhapGayMe"));
const NhomVatTu = React.lazy(() => import("./danhMuc/nhomVatTu"));
const PhuongPhapNhuom = React.lazy(() => import("./danhMuc/phuongPhapNhuom"));
const ViTriSinhThiet = React.lazy(() => import("./danhMuc/viTriSinhThiet"));
const LoaiDoiTuong = React.lazy(() => import("./danhMuc/loaiDoiTuong"));
const NhomChiSo = React.lazy(() => import("./danhMuc/nhomChiSo"));
const HocHamHocVi = React.lazy(() => import("./danhMuc/hocHamHocVi"));
const TheBaoHiem = React.lazy(() => import("./danhMuc/theBaoHiem"));
const NguoiDaiDien = React.lazy(() => import("./danhMuc/nguoiDaiDien"));
const BenhVien = React.lazy(() => import("./danhMuc/benhVien"));
const DonViTinh = React.lazy(() => import("./danhMuc/donViTinh"));
const ThietLap = React.lazy(() => import("./danhMuc/thietLap"));
const PhanNhomDichVuKho = React.lazy(() =>
  import("./danhMuc/phanNhomDichVuKho")
);
const GroupMedicineByLevel = React.lazy(() =>
  import("./danhMuc/nhomDichVuKho")
);
// const ServicesPack = React.lazy(() => import("./danhMuc/goiDichVu"));
const canLamSang = React.lazy(() => import("./danhMuc/canLamSang"));
const MauKetQuaXN = React.lazy(() => import("./danhMuc/mauKetQuaXN"));
const dichVuXetNghiem = React.lazy(() => import("./danhMuc/dichVuXetNghiem"));
// const DrugCategories = React.lazy(() => import("./danhMuc/drugCategories"));
const GoiDichVu = React.lazy(() => import("./danhMuc/goiDichVu"));
const DoiTac = React.lazy(() => import("./danhMuc/doiTac"));
const DanhMucThuoc = React.lazy(() => import("./danhMuc/danhMucThuoc"));
const DanhMucVatTu = React.lazy(() => import("./danhMuc/danhMucVatTu"));
const DanhMucKhamBenh = React.lazy(() => import("./danhMuc/khamBenh"));
const PhauThuat = React.lazy(() => import("./danhMuc/phauThuat"));
const DMBaoCao = React.lazy(() => import("./danhMuc/baoCao"));
const MayIn = React.lazy(() => import("./danhMuc/mayIn"));
const Quyen = React.lazy(() => import("./danhMuc/quyen"));
const NhomTinhNang = React.lazy(() => import("./danhMuc/nhomTinhNang"));
const NguonGioiThieu = React.lazy(() => import("./danhMuc/nguonGioiThieu"));
const TichDiem = React.lazy(() => import("./danhMuc/thietLapTichDiem"));
const QuyenKy = React.lazy(() => import("./danhMuc/quyenKy"));
const LoaiPhieu = React.lazy(() => import("./danhMuc/loaiPhieu"));
const MauQms = React.lazy(() => import("./danhMuc/templateQms"));
const PhuongThucTT = React.lazy(() => import("./danhMuc/phuongThucTT"));
const ChePhamMau = React.lazy(() => import("./danhMuc/chePhamMau"));
const DiaChiHanhChinh = React.lazy(() => import("./danhMuc/diaChiHanhChinh"));
const NhomBenh = React.lazy(() => import("./danhMuc/nhomBenh"));
const HoaChat = React.lazy(() => import("./danhMuc/hoaChat"));
const NhomDichVu = React.lazy(() => import("./danhMuc/nhomDichVu"));
const Phong = React.lazy(() => import("./danhMuc2/phong"));
const PhanLoaiThuoc = React.lazy(() => import("./danhMuc/phanLoaiThuoc"));
const Faculty = React.lazy(() => import("./danhMuc/khoa"));
const NhaSanXuat = React.lazy(() => import("./danhMuc/nhaSanXuat"));
const MaMay = React.lazy(() => import("./danhMuc/maMay"));
const HoatChat = React.lazy(() => import("./danhMuc/hoatChat"));
const DuongDung = React.lazy(() => import("./danhMuc/duongDung"));
const LieuDung = React.lazy(() => import("./danhMuc/lieuDung"));
const ToaNha = React.lazy(() => import("./danhMuc/toaNha"));
const LoiDan = React.lazy(() => import("./danhMuc/loiDan"));
const DanToc = React.lazy(() => import("./danhMuc/danToc"));
const VanBang = React.lazy(() => import("./danhMuc/vanBang"));
const LoaGoiSo = React.lazy(() => import("./danhMuc/loaGoiSo"));
const NgheNghiep = React.lazy(() => import("./danhMuc/ngheNghiep"));
const ChucVu = React.lazy(() => import("./danhMuc/chucVu"));
const MoiQuanHe = React.lazy(() => import("./danhMuc/moiQuanHe"));
const LyDoDoiTra = React.lazy(() => import("./danhMuc/lyDoDoiTra"));
const BenhPham = React.lazy(() => import("./danhMuc/benhPham"));
const Specialist = React.lazy(() => import("./danhMuc/chuyenKhoa"));
const QuayTiepDon = React.lazy(() => import("./danhMuc/quayTiepDon"));
const NoiLayBenhPham = React.lazy(() => import("./danhMuc/noiLayBenhPham"));
const NhanVien = React.lazy(() => import("./danhMuc/nhanVien"));
const HinhThucNhapXuat = React.lazy(() => import("./danhMuc/hinhThucNhapXuat"));
const BoChiDinh = React.lazy(() => import("./danhMuc/boChiDinh"));
const ThuocKeNgoai = React.lazy(() => import("./danhMuc/thuocKeNgoai"));
const ChuongTrinhGiamGia = React.lazy(() =>
  import("./danhMuc/chuongTrinhGiamGia")
);
const XuatXu = React.lazy(() => import("./danhMuc/xuatXu"));
const ThangSoBanLe = React.lazy(() => import("./danhMuc/thangSoBanLe"));
const MauKetQuaCLS = React.lazy(() => import("./danhMuc/mauKetQuaCLS"));
const LieuDungBacSy = React.lazy(() => import("./danhMuc/lieuDungBacSy"));
const TachGopPhieuXN = React.lazy(() => import("./danhMuc/tachGopPhieuXN"));
const TachGopPhieuDVKT = React.lazy(() => import("./danhMuc/tachGopPhieuDVKT"));
const NguonNhapKho = React.lazy(() => import("./danhMuc/nguonNhapKho"));
const Kiosk = React.lazy(() => import("./danhMuc/kiosk"));
const ThongSoHangDoi = React.lazy(() => import("./danhMuc/thongSoHangDoi"));
const ThietLapPhieuIn = React.lazy(() => import("./danhMuc/thietLapPhieuIn"));
const HuongDanSuDung = React.lazy(() => import("./danhMuc2/huongDanSuDung"));
const HoiDong = React.lazy(() => import("./danhMuc2/hoiDong"));
const DichVuNgoaiDieuTri = React.lazy(() =>
  import("./danhMuc2/dichVuNgoaiDieuTri")
);

// Kios
const Kios = React.lazy(() => import("./kiosk"));
const SelectExaminationForm = React.lazy(() =>
  import("./kiosk/selectExaminationForm")
);
const GetNumber = React.lazy(() => import("./kiosk/getNumber"));
const RegisterPersonalInfo = React.lazy(() =>
  import("./kiosk/registerPersonalInfo")
);
const LaySoTheoDienThoai = React.lazy(() =>
  import("./kiosk/LaySoTheoDienThoai")
);
const UpdateInformation = React.lazy(() => import("./kiosk/updateInformation"));
const Register = React.lazy(() => import("./kiosk/register"));
const LaySoTheoQRCode = React.lazy(() => import("./kiosk/LaySoTheoQRCode"));
const SelectPriorityPerson = React.lazy(() =>
  import("./kiosk/selectPriorityPerson")
);
const KiosKHome = React.lazy(() => import("./kiosk/home"));
const LaySoBaoHiem = React.lazy(() => import("./kiosk/LaySoBaoHiem"));

// Thu ngân
const ThuNgan = React.lazy(() => import("./thuNgan"));
const TimKiemBenhNhan = React.lazy(() => import("./thuNgan/timKiemBenhNhan"));
const ChiTietPhieuThu = React.lazy(() => import("./thuNgan/chiTietPhieuThu"));
const DanhSachPhieuThu = React.lazy(() => import("./thuNgan/danhSachPhieuThu"));
const DsPhieuYeuCauHoan = React.lazy(() =>
  import("./thuNgan/dsPhieuYeuCauHoan")
);
// xet nghiem
const XetNghiem = React.lazy(() => import("./xetNghiem"));
const LayMauXetNghiem = React.lazy(() => import("./xetNghiem/LayMauXetNghiem"));
const ThucHienHHSH = React.lazy(() => import("./xetNghiem/ThucHienHHSH"));
const ThucHienGBPVS = React.lazy(() => import("./xetNghiem/ThucHienGBPVS"));

// admin
const VaiTroHeThong = React.lazy(() => import("./admin/vaiTroHeThong"));
const TaiKhoanHeThong = React.lazy(() => import("./admin/taiKhoanHeThong"));

// Quan ly thong bao
const QuanLyThongBao = React.lazy(() => import("./thongBao/index"));

// page
const ThietLapPage = React.lazy(() => import("./thietLap"));
const QuanTriPage = React.lazy(() => import("./quanTri"));

// kho
const KhoPage = React.lazy(() => import("./kho"));
const ThietLapChonKho = React.lazy(() =>
  import("./kho/thietLapChonKho/index2")
);
const QuanTriKho = React.lazy(() => import("./kho/quanTriKho"));
const QuyetDinhThau = React.lazy(() => import("./kho/quyetDinhThau"));
const NhapKho = React.lazy(() => import("./kho/nhapKho"));
const XuatKho = React.lazy(() => import("./kho/xuatKho"));
const ChiTietPhieuXuat = React.lazy(() => import("./kho/phieuXuat/ChiTiet"));
const PhieuNhap = React.lazy(() => import("./kho/phieuNhap"));
const ChiTietPhieuNhap = React.lazy(() =>
  import("./kho/phieuNhap/ChiTietPhieuNhap")
);
const ChiTietPhieuNhapDuTru = React.lazy(() =>
  import("./kho/phieuNhapDuTru/ChiTiet")
);
const DanhSachDichVuKho = React.lazy(() => import("./kho/DanhSachDichVuKho"));
const ChiTietDanhSachDichVuKho = React.lazy(() =>
  import("./kho/DanhSachDichVuKho/ChiTietDanhSachDichVuKho")
);
const PhatThuocNgoaiTru = React.lazy(() => import("./kho/phatThuocNgoaiTru"));

// ho so benh an
const DanhSachNguoiBenh = React.lazy(() =>
  import("./hoSoBenhAn/DanhSachNguoiBenh")
);
const ChiTietNguoiBenh = React.lazy(() =>
  import("./hoSoBenhAn/ChiTietNguoiBenh")
);
const HoSoBenhAn = React.lazy(() => import("./hoSoBenhAn"));

// Nhà thuốc
const NhaThuoc = React.lazy(() => import("./nhaThuoc"));
const ChiTietDonThuoc = React.lazy(() => import("./nhaThuoc/ChiTietDonThuoc"));

//Chan doan hinh anh
const ChanDoanHinhAnh = React.lazy(() => import("./chanDoanHinhAnh"));
const ChoTiepDon = React.lazy(() => import("./chanDoanHinhAnh/choTiepDon"));
const TiepNhan = React.lazy(() => import("./chanDoanHinhAnh/tiepNhan"));
const DocKetQua = React.lazy(() => import("./chanDoanHinhAnh/docKetQua"));
const DocKetQua2 = React.lazy(() => import("./chanDoanHinhAnh/docKetQua2"));

//theo doi dieu tri
const TheoDoiDieuTri = React.lazy(() => import("./theoDoiDieuTri"));
const DanhSachNguoiBenhTheoDoi = React.lazy(() =>
  import("./theoDoiDieuTri/DanhSachNguoiBenh")
);
const ChiTietTheoDoiDieuTri = React.lazy(() =>
  import("./theoDoiDieuTri/DanhSachNguoiBenh/ChiTietTheoDoiDieuTri")
);

//qms
const Qms = React.lazy(() => import("./qms"));
const QmsDoc = React.lazy(() => import("./qms/qmsDoc/thietLap"));
const QmsNgang = React.lazy(() => import("./qms/qmsNgang/thietLap"));
const QmsDocKhamBenh = React.lazy(() => import("./qms/qmsDoc/khamBenh"));
const QmsNgangKhamBenh = React.lazy(() => import("./qms/qmsNgang/khamBenh"));
const QmsDocChanDoanHinhAnh = React.lazy(() =>
  import("./qms/qmsDoc/chanDoanHinhAnh")
);
const QmsNgangChanDoanHinhAnh = React.lazy(() =>
  import("./qms/qmsNgang/chanDoanHinhAnh")
);
const QmsDocXetNghiem = React.lazy(() => import("./qms/qmsDoc/xetNghiem"));
const QmsNgangXetNghiem = React.lazy(() => import("./qms/qmsNgang/xetNghiem"));

// Ký số
const KySo = React.lazy(() => import("./kySo"));
const ThietLapQuyenKy = React.lazy(() => import("./kySo/ThietLapQuyenKy"));
const DanhSachPhieuChoKy = React.lazy(() =>
  import("./kySo/DanhSachPhieuChoKy")
);
const ChiTietDanhSachPhieuChoKy = React.lazy(() =>
  import("./kySo/DanhSachPhieuChoKy/ChiTiet")
);
const LichSuKyDanhSachNguoiBenh = React.lazy(() =>
  import("./kySo/LichSuKy/DanhSachNguoiBenh")
);
const LichSuKyDanhSachPhieu = React.lazy(() =>
  import("./kySo/LichSuKy/DanhSachPhieu")
);
const LichSuKyLichSuPhieu = React.lazy(() =>
  import("./kySo/LichSuKy/LichSuPhieu")
);

// Bao cao
const BaoCaoPages = React.lazy(() => import("./baocao"));
const DSNBKhamChiTiet = React.lazy(() =>
  import("./baocao/baoCaoPhongKham/danhSachNbKhamChiTiet")
);
const ChiTietTheoNB = React.lazy(() =>
  import("./baocao/baoCaoDichVu/chiTietTheoNb")
);

const pageThuNgan = {
  subPageThuNgan: {
    component: Page(SubPageThuNgan, []),
    accessRoles: [],
    path: "/thu-ngan",
    exact: true,
  },
  timKiemBenhNhan: {
    component: Page(TimKiemBenhNhan, [ROLES["THU_NGAN"].THU_NGAN]),
    accessRoles: [],
    path: "/thu-ngan/thu-ngan",
    exact: true,
  },
  danhSachPhieuThu: {
    component: Page(DanhSachPhieuThu, [ROLES["THU_NGAN"].DANH_SACH_PHIEU_THU]),
    accessRoles: [],
    path: "/thu-ngan/danh-sach-phieu-thu",
    exact: true,
  },
  chiTietPhieuThu: {
    component: Page(ChiTietPhieuThu, [ROLES["THU_NGAN"].PHIEU_THU]),
    accessRoles: [],
    path: "/thu-ngan/chi-tiet-phieu-thu/:maHoSo/:phieuThuId/:nbDotDieuTriId",
    exact: true,
  },
  dsPhieuYeuCauHoan: {
    // component: Page(DsPhieuYeuCauHoan, [ROLES["THU_NGAN"].DANH_SACH_PHIEU_THU]),
    component: Page(DsPhieuYeuCauHoan, []),
    accessRoles: [],
    path: "/thu-ngan/ds-phieu-yeu-cau-hoan",
    exact: true,
  },
};

const pageXetNghiem = {
  subPageXetNghiem: {
    component: Page(SubPageXetNghiem, []),
    accessRoles: [],
    path: "/xet-nghiem",
    exact: true,
  },
  layMauXetNghiem: {
    component: Page(LayMauXetNghiem, [ROLES["XET_NGHIEM"].MH_LAY_MAU]),
    accessRoles: [],
    path: "/xet-nghiem/lay-mau",
    exact: true,
  },
  thucHienHHSH: {
    component: Page(ThucHienHHSH, [ROLES["XET_NGHIEM"].XET_NGHIEM_HH]),
    accessRoles: [],
    path: "/xet-nghiem/huyet-hoc-sinh-hoa",
    exact: true,
  },
  thucHienGBPVS: {
    component: Page(ThucHienGBPVS, [ROLES["XET_NGHIEM"].XET_NGHIEM_GPB]),
    accessRoles: [],
    path: "/xet-nghiem/giai-phau-benh-vi-ky-sinh",
    exact: true,
  },
};

const pageKiosk = {
  kioskHome: {
    component: Page(KiosKHome, []),
    accessRoles: [],
    path: "/kiosk",
    exact: true,
  },
  selectPriorityPerson: {
    component: Page(SelectPriorityPerson, [ROLES["KIOSK"].DANG_KY_UU_TIEN]),
    accessRoles: [],
    path: "/kiosk/doi-tuong-uu-tien",
    exact: true,
  },
  selectExaminationForm: {
    component: Page(SelectExaminationForm, [ROLES["KIOSK"].DANG_KY_LOAI_KHAM]),
    accessRoles: [],
    path: "/kiosk/lua-chon-hinh-thuc-kham",
    exact: true,
  },
  registerPersonalInfo: {
    component: Page(RegisterPersonalInfo, [ROLES["KIOSK"].PHUONG_THUC_TIM_HS]),
    accessRoles: [],
    path: "/kiosk/dang-ky-thong-tin-ca-nhan",
    exact: true,
  },
  laySoTheoDienThoai: {
    component: Page(LaySoTheoDienThoai, [ROLES["KIOSK"].KET_QUA_TIM_KIEM]),
    accessRoles: [],
    path: "/kiosk/dang-ky-qua-so/:type",
  },
  laySoTheoQrCode: {
    component: Page(LaySoTheoQRCode, [ROLES["KIOSK"].TIM_HS_QR]),
    accessRoles: [],
    path: "/kiosk/dang-ky-qua-qr",
    exact: true,
  },
  updateInformation: {
    component: Page(UpdateInformation, [ROLES["KIOSK"].SUA_KET_QUA]),
    accessRoles: [],
    path: "/kiosk/cap-nhat-thong-tin",
    exact: true,
  },
  register: {
    component: Page(Register, [ROLES["KIOSK"].DANG_KY_THONG_TIN_MOI]),
    accessRoles: [],
    path: "/kiosk/dang-ky-kham-benh",
    exact: true,
  },
  getNumber: {
    component: Page(GetNumber, []),
    accessRoles: [ROLES["KIOSK"].KET_QUA_LAY_SO],
    path: "/kiosk/lay-so",
    exact: true,
  },
  laySoBaoHiem: {
    component: Page(LaySoBaoHiem, [ROLES["KIOSK"].DANG_KY_KHAM_BHYT]),
    accessRoles: [],
    path: "/kiosk/dang-ky-kham-bhyt",
    exact: true,
  },
};

const pageKho = {
  subPageKho: {
    component: Page(SubPageKho, []),
    accessRoles: [],
    path: "/kho",
    exact: true,
  },
  thietLapChonKho: {
    component: Page(ThietLapChonKho, []),
    accessRoles: [],
    path: "/kho/thiet-lap-kho-chi-dinh",
    exact: true,
  },
  danhMucKho: {
    component: Page(QuanTriKho, []),
    accessRoles: [],
    path: "/kho/quan-tri-kho",
  },
  quanLyThau: {
    component: Page(QuyetDinhThau, []),
    accessRoles: [],
    path: "/kho/quyet-dinh-thau",
    exact: true,
  },
  nhapKho: {
    component: Page(NhapKho, []),
    accessRoles: [],
    path: "/kho/nhap-kho",
    exact: true,
  },
  xuatKho: {
    component: Page(XuatKho, []),
    accessRoles: [],
    path: "/kho/xuat-kho",
    exact: true,
  },
  chiTietXuatKho: {
    component: Page(ChiTietPhieuXuat, []),
    accessRoles: [],
    path: "/kho/xuat-kho/chi-tiet/:id",
    exact: true,
  },
  themMoiPhieu: {
    component: Page(PhieuNhap, []),
    accessRoles: [],
    path: "/kho/nhap-kho/phieu-nhap/them-moi",
    exact: true,
  },
  suaPhieuNhap: {
    component: Page(PhieuNhap, []),
    accessRoles: [],
    path: "/kho/nhap-kho/phieu-nhap/chinh-sua/:id",
    exact: true,
  },
  chiTietPhieu: {
    component: Page(ChiTietPhieuNhap, []),
    accessRoles: [],
    path: "/kho/nhap-kho/chi-tiet/:id",
    exact: true,
  },
  danhSachDichVuKho: {
    component: Page(DanhSachDichVuKho, []),
    accessRoles: [],
    path: ["", "/kho/danh-sach-dich-vu-kho"],
    exact: true,
  },
  ChiTietDanhSachDichVuKho: {
    component: Page(ChiTietDanhSachDichVuKho, []),
    accessRoles: [],
    path: ["", "/kho/danh-sach-dich-vu-kho/chi-tiet/:khoId/:dichVuId"],
    exact: true,
  },
  phieuNhapDuTru: {
    component: Page(ChiTietPhieuNhapDuTru, []),
    accessRoles: [],
    path: [
      "/kho/phieu-nhap-du-tru/them-moi",
      "/kho/phieu-nhap-du-tru/chi-tiet/:id",
      "/kho/phieu-nhap-du-tru/chinh-sua/:id",
    ],
    exact: true,
  },
  phatThuocNgoaiTru: {
    component: Page(PhatThuocNgoaiTru, []),
    accessRoles: [],
    path: "/kho/phat-thuoc-ngoai-tru",
    exact: true,
  },
};

const pageThietLap = {
  subPageThietLap: {
    component: Page(SubPageThietLap, []),
    accessRoles: [],
    path: "/thiet-lap",
    exact: true,
  },
  thietLapChung: {
    component: Page(ThietLap, [ROLES.THIET_LAP_CHUNG]),
    accessRoles: [],
    path: "/thiet-lap/thiet-lap-chung",
    exact: true,
  },
  thietLapPhieuIn: {
    component: Page(ThietLapPhieuIn, []),
    accessRoles: [],
    path: "/thiet-lap/thiet-lap-phieu-in",
    exact: true,
  },
  tachGopPhieuXN: {
    component: Page(TachGopPhieuXN, []),
    accessRoles: [],
    path: "/thiet-lap/tach-gop-phieu-xet-nghiem",
    exact: true,
  },
  tachGopPhieuDVKT: {
    component: Page(TachGopPhieuDVKT, []),
    accessRoles: [],
    path: "/thiet-lap/tach-gop-phieu-dvkt",
    exact: true,
  },
  thietLapTichDiem: {
    component: Page(TichDiem, []),
    accessRoles: [],
    path: "/thiet-lap/tich-diem",
    exact: true,
  },
  thongSoHangDoi: {
    component: Page(ThongSoHangDoi, []),
    accessRoles: [],
    path: "/thiet-lap/thong-so-hang-doi",
    exact: true,
  },
};

const pageQuanTri = {
  subPageQuanTri: {
    component: Page(SubPageQuanTri, []),
    accessRoles: [],
    path: "/quan-tri",
    exact: true,
  },
  nhomTinhNang: {
    component: Page(NhomTinhNang, [ROLES["QUAN_LY_TAI_KHOAN"].NHOM_TINH_NANG]),
    accessRoles: [],
    path: "/quan-tri/nhom-tinh-nang",
    exact: true,
  },
  quyen: {
    component: Page(Quyen, [ROLES["QUAN_LY_TAI_KHOAN"].QUYEN]),
    accessRoles: [],
    path: "/quan-tri/quyen",
    exact: true,
  },
  danhMucNhanVien: {
    component: Page(NhanVien, [ROLES["QUAN_LY_TAI_KHOAN"].NHAN_VIEN]),
    accessRoles: [],
    path: "/quan-tri/nhan-vien",
    exact: true,
  },
  adminVaiTroHeThong: {
    component: Page(VaiTroHeThong, [
      ROLES["QUAN_LY_TAI_KHOAN"].VAI_TRO_HE_THONG,
    ]),
    accessRoles: [],
    path: "/quan-tri/danh-muc-vai-tro",
    exact: true,
  },
  adminTaiKhoanHeThong: {
    component: Page(TaiKhoanHeThong, [
      ROLES["QUAN_LY_TAI_KHOAN"].QUAN_LY_TAI_KHOAN,
    ]),
    accessRoles: [],
    path: "/quan-tri/danh-muc-tai-khoan",
    exact: true,
  },
};

const pageCDHA = {
  subPageCDHA: {
    component: Page(SubPageCDHA, []),
    accessRoles: [],
    path: "/chan-doan-hinh-anh",
    exact: true,
  },
  choTiepDon: {
    component: Page(ChoTiepDon, [ROLES["CHAN_DOAN_HINH_ANH"].CHO_TIEP_DON]),
    accessRoles: [],
    path: "/chan-doan-hinh-anh/cho-tiep-don",
    exact: true,
  },
  tiepNhan: {
    component: Page(TiepNhan, [ROLES["CHAN_DOAN_HINH_ANH"].TIEP_NHAN]),
    accessRoles: [],
    path: "/chan-doan-hinh-anh/tiep-nhan",
    exact: true,
  },
  docKetQua: {
    component: Page(DocKetQua, []),
    accessRoles: [],
    path: "/chan-doan-hinh-anh/doc-ket-qua",
    exact: true,
  },
  docKetQua2: {
    component: Page(DocKetQua2, []),
    accessRoles: [],
    path: "/chan-doan-hinh-anh/doc-ket-qua-2",
    exact: true,
  },
};

const pageHSBA = {
  subPageHoSoBenhAn: {
    component: Page(SubPageHSBA, []),
    accessRoles: [],
    path: "/ho-so-benh-an",
    exact: true,
  },
  danhSachNguoiBenh: {
    component: Page(DanhSachNguoiBenh, []),
    accessRoles: [],
    path: ["/ho-so-benh-an/danh-sach-nguoi-benh"],
    exact: true,
  },
  chiTietNguoiBenh: {
    component: Page(ChiTietNguoiBenh, []),
    accessRoles: [],
    path: ["/ho-so-benh-an/chi-tiet-nguoi-benh/:id"],
    exact: true,
  },
};

const pageKySo = {
  subPageKySo: {
    component: Page(SubPageKySo, []),
    accessRoles: [],
    path: "/ky-so",
    exact: true,
  },
  // thietLapQuyenKy
  thietLapQuyenKy: {
    component: Page(ThietLapQuyenKy, []),
    accessRoles: [],
    path: "/ky-so/thiet-lap-quyen-ky/",
    exact: true,
  },
  // danhSachPhieuChoKy
  danhSachPhieuChoKy: {
    component: Page(DanhSachPhieuChoKy, []),
    accessRoles: [],
    path: "/ky-so/danh-sach-phieu-cho-ky/",
    exact: true,
  },
  chiTietDanhSachPhieuChoKy: {
    component: Page(ChiTietDanhSachPhieuChoKy, []),
    accessRoles: [],
    path: "/ky-so/danh-sach-phieu-cho-ky/chi-tiet/:id",
    exact: true,
  },
  //
  lichSuKyDanhSachNguoiBenh: {
    component: Page(LichSuKyDanhSachNguoiBenh, []),
    accessRoles: [],
    path: "/ky-so/lich-su-ky/danh-sach-nguoi-benh",
    exact: true,
  },
  lichSuKyDanhSachPhieu: {
    component: Page(LichSuKyDanhSachPhieu, []),
    accessRoles: [],
    path: "/ky-so/lich-su-ky/danh-sach-nguoi-benh/danh-sach-phieu/:id",
    exact: true,
  },
  lichSuKyLichSuPhieu: {
    component: Page(LichSuKyLichSuPhieu, []),
    accessRoles: [],
    path: "/ky-so/lich-su-ky/danh-sach-nguoi-benh/danh-sach-phieu/:id/lich-su-phieu/:lichSuPhieuId",
    exact: true,
  },
};

const pageDanhMuc = {
  subPageDanhMuc: {
    component: Page(SubPageDanhMuc, []),
    accessRoles: [],
    path: "/danh-muc",
    exact: true,
  },
  phuongThucTT: {
    component: Page(PhuongThucTT, [ROLES["DANH_MUC"].PTTT]),
    accessRoles: [],
    path: "/danh-muc/phuong-thuc-thanh-toan",
    exact: true,
  },
  chePhamMau: {
    component: Page(ChePhamMau, [ROLES["DANH_MUC"].CHE_PHAM_MAU]),
    accessRoles: [],
    path: "/danh-muc/che-pham-mau",
    exact: true,
  },
  diaChiHanhChinh: {
    component: Page(DiaChiHanhChinh, [ROLES["DANH_MUC"].DIA_CHI_HANH_CHINH]),
    accessRoles: [],
    path: "/danh-muc/dia-chi-hanh-chinh",
    exact: true,
  },
  nhomHoaChat: {
    component: Page(NhomHoaChat, [ROLES["DANH_MUC"].NHOM_HOA_CHAT]),
    accessRoles: [],
    path: "/danh-muc/nhom-hoa-chat",
    exact: true,
  },
  nhomBenh: {
    component: Page(NhomBenh, [ROLES["DANH_MUC"].BENH_TAT]),
    accessRoles: [],
    path: "/danh-muc/nhom-benh-tat",
    exact: true,
  },
  hoaChat: {
    component: Page(HoaChat, [ROLES["DANH_MUC"].HOA_CHAT]),
    accessRoles: [],
    path: "/danh-muc/hoa-chat",
    exact: true,
  },
  nhomDichVu: {
    component: Page(NhomDichVu, [ROLES["DANH_MUC"].NHOM_DICH_VU]),
    accessRoles: [],
    path: "/danh-muc/nhom-dich-vu",
    exact: true,
  },
  phong: {
    component: Page(Phong, [ROLES["DANH_MUC"].PHONG]),
    accessRoles: [],
    path: "/danh-muc/phong",
    exact: true,
  },
  phanLoaiThuoc: {
    component: Page(PhanLoaiThuoc, [ROLES["DANH_MUC"].PHAN_LOAI_THUOC]),
    accessRoles: [],
    path: "/danh-muc/phan-loai-thuoc",
    exact: true,
  },
  khoa: {
    component: Page(Faculty, [ROLES["DANH_MUC"].KHOA]),
    accessRoles: [],
    path: "/danh-muc/khoa",
    exact: true,
  },

  nhaSanXuat: {
    component: Page(NhaSanXuat, [ROLES["DANH_MUC"].NHA_SAN_XUAT]),
    accessRoles: [],
    path: "/danh-muc/nha-san-xuat",
    exact: true,
  },
  hoatChat: {
    component: Page(HoatChat, [ROLES["DANH_MUC"].HOAT_CHAT]),
    accessRoles: [],
    path: "/danh-muc/hoat-chat",
    exact: true,
  },
  maMay: {
    component: Page(MaMay, [ROLES["DANH_MUC"].MA_MAY]),
    accessRoles: [],
    path: "/danh-muc/ma-may",
    exact: true,
  },
  duongDung: {
    component: Page(DuongDung, [ROLES["DANH_MUC"].DUONG_DUNG]),
    accessRoles: [],
    path: "/danh-muc/duong-dung",
    exact: true,
  },
  lieuDung: {
    component: Page(LieuDung, [ROLES["DANH_MUC"].LIEU_DUNG]),
    accessRoles: [],
    path: "/danh-muc/lieu-dung",
    exact: true,
  },
  loiDan: {
    component: Page(LoiDan, [ROLES["DANH_MUC"].LOI_DAN]),
    accessRoles: [],
    path: "/danh-muc/loi-dan",
    exact: true,
  },
  toaNha: {
    component: Page(ToaNha, [ROLES["DANH_MUC"].NHA]),
    accessRoles: [],
    path: "/danh-muc/toa-nha",
    exact: true,
  },
  vanBang: {
    component: Page(VanBang, [ROLES["DANH_MUC"].VAN_BANG]),
    accessRoles: [],
    path: "/danh-muc/van-bang-chuyen-mon",
    exact: true,
  },
  loaGoiSo: {
    component: Page(LoaGoiSo, [ROLES["DANH_MUC"].LOA_GOI_SO]),
    accessRoles: [],
    path: "/danh-muc/loa-goi-so",
    exact: true,
  },
  quayTiepDon: {
    component: Page(QuayTiepDon, [ROLES["DANH_MUC"].QUAY]),
    accessRoles: [],
    path: "/danh-muc/quay-tiep-don",
    exact: true,
  },
  danToc: {
    component: Page(DanToc, [ROLES["DANH_MUC"].DAN_TOC]),
    accessRoles: [],
    path: "/danh-muc/dan-toc",
    exact: true,
  },
  ngheNghiep: {
    component: Page(NgheNghiep, [ROLES["DANH_MUC"].NGHE_NGHIEP]),
    accessRoles: [],
    path: "/danh-muc/nghe-nghiep",
    exact: true,
  },
  chucVu: {
    component: Page(ChucVu, [ROLES["DANH_MUC"].CHUC_VU]),
    accessRoles: [],
    path: "/danh-muc/chuc-vu",
    exact: true,
  },
  loaiCapCuu: {
    component: Page(LoaiCapCuu, [ROLES["DANH_MUC"].LOAI_CC]),
    accessRoles: [],
    path: "/danh-muc/loai-cap-cuu",
    exact: true,
  },
  nhomChiSo: {
    component: Page(NhomChiSo, [ROLES["DANH_MUC"].NHOM_CHI_SO]),
    accessRoles: [],
    path: "/danh-muc/nhom-chi-so",
    exact: true,
  },
  nguyenNhanNhapVien: {
    component: Page(NguyenNhanNhapVien, [
      ROLES["DANH_MUC"].NGUYEN_NHAN_NHAP_VIEN,
    ]),
    accessRoles: [],
    path: "/danh-muc/nguyen-nhan-nhap-vien",
    exact: true,
  },
  viTriChanThuong: {
    component: Page(ViTriChanThuong, [ROLES["DANH_MUC"].VI_TRI_CHAN_THUONG]),
    accessRoles: [],
    path: "/danh-muc/vi-tri-chan-thuong",
    exact: true,
  },
  nhomVatTu: {
    component: Page(NhomVatTu, [ROLES["DANH_MUC"].NHOM_VAT_TU]),
    accessRoles: [],
    path: "/danh-muc/nhom-vat-tu",
    exact: true,
  },
  thoiGianCapCuu: {
    component: Page(ThoiGianCapCuu, [ROLES["DANH_MUC"].TG_CC]),
    accessRoles: [],
    path: "/danh-muc/thoi-gian-cap-cuu",
    exact: true,
  },
  quanHam: {
    component: Page(QuanHam, [ROLES["DANH_MUC"].QUAN_HAM]),
    accessRoles: [],
    path: "/danh-muc/quan-ham",
    exact: true,
  },
  donVi: {
    component: Page(Unit, [ROLES["DANH_MUC"].CO_QUAN]),
    accessRoles: [],
    path: "/danh-muc/co-quan-don-vi",
    xact: true,
  },
  moiQuanHe: {
    component: Page(MoiQuanHe, [ROLES["DANH_MUC"].MOI_QUAN_HE]),
    accessRoles: [],
    path: "/danh-muc/moi-quan-he",
    exact: true,
  },
  lyDoDoiTra: {
    component: Page(LyDoDoiTra, [ROLES["DANH_MUC"].DOI_TRA_DICH_VU]),
    accessRoles: [],
    path: "/danh-muc/ly-do-tra-dv",
    exact: true,
  },
  specimens: {
    component: Page(BenhPham, [ROLES["DANH_MUC"].BENH_PHAM]),
    accessRoles: [],
    path: "/danh-muc/benh-pham",
    exact: true,
  },
  chuyenKhoa: {
    component: Page(Specialist, [ROLES["DANH_MUC"].CHUYEN_KHOA]),
    accessRoles: [],
    path: "/danh-muc/chuyen-khoa",
    exact: true,
  },
  loaiBenhAn: {
    component: Page(LoaiBenhAn, [ROLES["DANH_MUC"].LOAI_BA]),
    accessRoles: [],
    path: "/danh-muc/loai-benh-an",
    exact: true,
  },
  phuongPhapGayMe: {
    component: Page(PhuongPhapGayMe, [ROLES["DANH_MUC"].PHUONG_PHAP_GAY_ME]),
    accessRoles: [],
    path: "/danh-muc/phuong-phap-gay-me",
    exact: true,
  },
  phuongPhapNhuom: {
    component: Page(PhuongPhapNhuom, [ROLES["DANH_MUC"].PHUONG_PHAP_NHUOM]),
    accessRoles: [],
    path: "/danh-muc/phuong-phap-nhuom",
    exact: true,
  },
  viTriSinhThiet: {
    component: Page(ViTriSinhThiet, [ROLES["DANH_MUC"].VI_TRI_SINH_THIET]),
    accessRoles: [],
    path: "/danh-muc/vi-tri-sinh-thiet",
    exact: true,
  },
  loaiDoiTuong: {
    component: Page(LoaiDoiTuong, [ROLES["DANH_MUC"].LOAI_DOI_TUONG]),
    accessRoles: [],
    path: "/danh-muc/loai-doi-tuong",
    exact: true,
  },
  hocHamHocVi: {
    component: Page(HocHamHocVi, [ROLES["DANH_MUC"].HOC_HAM]),
    accessRoles: [],
    path: "/danh-muc/hoc-ham-hoc-vi",
    exact: true,
  },
  theBaoHiem: {
    component: Page(TheBaoHiem, [ROLES["DANH_MUC"].THE_BAO_HIEM]),
    accessRoles: [],
    path: "/danh-muc/the-bao-hiem",
    exact: true,
  },
  nguoiDaiDien: {
    component: Page(NguoiDaiDien, [ROLES["DANH_MUC"].NGUOI_DAI_DIEN]),
    accessRoles: [],
    path: "/danh-muc/nguoi-dai-dien",
    exact: true,
  },
  benhVien: {
    component: Page(BenhVien, [ROLES["DANH_MUC"].BENH_VIEN]),
    accessRoles: [],
    path: "/danh-muc/benh-vien",
    exact: true,
  },
  donViTinh: {
    component: Page(DonViTinh, [ROLES["DANH_MUC"].DON_VI_TINH]),
    accessRoles: [],
    path: "/danh-muc/don-vi-tinh",
    exact: true,
  },
  phanNhomDichVuKho: {
    component: Page(PhanNhomDichVuKho, [ROLES["DANH_MUC"].PHAN_NHOM_THUOC]),
    accessRoles: [],
    path: "/danh-muc/phan-nhom-thuoc",
    exact: true,
  },
  nhomDichVuKho: {
    component: Page(GroupMedicineByLevel, [ROLES["DANH_MUC"].NHOM_THUOC]),
    accessRoles: [],
    path: "/danh-muc/nhom-thuoc",
    exact: true,
  },
  goiDichVu: {
    component: Page(GoiDichVu, [ROLES["DANH_MUC"].GOI_DICH_VU]),
    accessRoles: [],
    path: "/danh-muc/goi-dich-vu",
    exact: true,
  },
  doiTac: {
    component: Page(DoiTac, [ROLES["DANH_MUC"].DOI_TAC]),
    accessRoles: [],
    path: "/danh-muc/doi-tac",
    exact: true,
  },
  dichVuXetNghiem: {
    component: Page(dichVuXetNghiem, [ROLES["DANH_MUC"].DICH_VU_XN]),
    accessRoles: [],
    path: "/danh-muc/dich-vu-xet-nghiem",
    exact: true,
  },
  canLamSang: {
    component: Page(canLamSang, [ROLES["DANH_MUC"].CDHA_TDCN]),
    accessRoles: [],
    path: "/danh-muc/dich-vu-cdha-tdcn",
    exact: true,
  },
  danhMucThuoc: {
    component: Page(DanhMucThuoc, [ROLES["DANH_MUC"].THUOC]),
    accessRoles: [],
    path: "/danh-muc/thuoc",
    exact: true,
  },
  danhMucVatTu: {
    component: Page(DanhMucVatTu, [ROLES["DANH_MUC"].VAT_TU]),
    accessRoles: [],
    path: "/danh-muc/vat-tu",
    exact: true,
  },
  danhMucKhamBenh: {
    component: Page(DanhMucKhamBenh, [ROLES["DANH_MUC"].DICH_VU_KHAM_BENH]),
    accessRoles: [],
    path: "/danh-muc/dich-vu-kham-benh",
    exact: true,
  },
  phauThuat: {
    component: Page(PhauThuat, [ROLES["DANH_MUC"].DV_PHAU_THUAT_THU_THUAT]),
    accessRoles: [],
    path: "/danh-muc/dich-vu-phau-thuat",
    exact: true,
  },
  baoCao: {
    component: Page(DMBaoCao, [ROLES["DANH_MUC"].BAO_CAO]),
    accessRoles: [],
    path: "/danh-muc/bao-cao",
    exact: true,
  },
  mayIn: {
    component: Page(MayIn, [ROLES["DANH_MUC"].MAY_IN]),
    accessRoles: [],
    path: "/danh-muc/may-in",
    exact: true,
  },
  MauKetQuaXN: {
    component: Page(MauKetQuaXN, [ROLES["DANH_MUC"].MAU_KET_QUA_XN]),
    accessRoles: [],
    path: "/danh-muc/mau-ket-qua-xet-nghiem",
  },
  nNoiLayBenhPham: {
    component: Page(NoiLayBenhPham, [ROLES["DANH_MUC"].NOI_LAY_BENH_PHAM]),
    accessRoles: [],
    path: "/danh-muc/noi-lay-benh-pham",
    exact: true,
  },

  hinhThucNhapXuat: {
    component: Page(HinhThucNhapXuat, [
      ROLES["DANH_MUC"].HINH_THUC_NHAP_XUAT_LOAI_XUAT,
    ]),
    accessRoles: [],
    path: "/danh-muc/hinh-thuc-nhap-xuat",
    exact: true,
  },

  nguonNhapKho: {
    component: Page(NguonNhapKho, [ROLES["DANH_MUC"].NGUON_NHAP_KHO]),
    accessRoles: [],
    path: "/danh-muc/nguon-nhap-kho",
    exact: true,
  },
  boChiDinh: {
    component: Page(BoChiDinh, [ROLES["DANH_MUC"].BO_CHI_DINH]),
    accessRoles: [],
    path: "/danh-muc/bo-chi-dinh",
    exact: true,
  },
  voucher: {
    component: Page(ChuongTrinhGiamGia, [
      ROLES["DANH_MUC"].CHUONG_TRINH_GIAM_GIA,
    ]),
    accessRoles: [],
    path: "/danh-muc/chuong-trinh-giam-gia",
    exact: true,
  },
  nguonGioiThieu: {
    component: Page(NguonGioiThieu, [ROLES["DANH_MUC"].NGUON_NGUOI_BENH]),
    accessRoles: [],
    path: "/danh-muc/nguon-nguoi-benh",
    exact: true,
  },
  hangThe: {
    component: Page(HangThe, [ROLES["DANH_MUC"].HANG_THE]),
    accessRoles: [],
    path: "/danh-muc/hang-the",
    exact: true,
  },
  xuatXu: {
    component: Page(XuatXu, [ROLES["DANH_MUC"].XUAT_XU]),
    accessRoles: [],
    path: "/danh-muc/xuat-xu",
    exact: true,
  },
  thangSoBanLe: {
    component: Page(ThangSoBanLe, [ROLES["DANH_MUC"].DINH_MUC_THANG_SO]),
    accessRoles: [],
    path: "/danh-muc/thang-so-ban-le",
    exact: true,
  },
  mauKetQuaCLS: {
    component: Page(MauKetQuaCLS, [ROLES["DANH_MUC"].LOAI_CC]),
    accessRoles: [],
    path: "/danh-muc/mau-ket-qua-cls",
    exact: true,
  },
  quyenKy: {
    component: Page(QuyenKy, [ROLES["DANH_MUC"].QUYEN_KY]),
    accessRoles: [],
    path: "/danh-muc/quyen-ky",
    exact: true,
  },
  loaiPhieu: {
    component: Page(LoaiPhieu, [ROLES["DANH_MUC"].LOAI_PHIEU]),
    accessRoles: [],
    path: "/danh-muc/loai-phieu",
    exact: true,
  },

  mauQms: {
    component: Page(MauQms, [ROLES["DANH_MUC"].MAU_QMS]),
    accessRoles: [],
    path: "/danh-muc/mau-qms",
    exact: true,
  },
  thuocKeNgoai: {
    component: Page(ThuocKeNgoai, [ROLES["DANH_MUC"].THUOC_KE_NGOAI]),
    accessRoles: [],
    path: "/danh-muc/thuoc-ke-ngoai",
    exact: true,
  },
  lieuDungBacSy: {
    component: Page(LieuDungBacSy, [ROLES["DANH_MUC"].LIEU_DUNG_BS]),
    accessRoles: [],
    path: "/danh-muc/lieu-dung-bac-sy",
    exact: true,
  },

  kiosk: {
    component: Page(Kiosk, [ROLES["THIET_LAP"].KIOSK]),
    accessRoles: [],
    path: "/danh-muc/kiosk",
    exact: true,
  },
  hdsd: {
    component: Page(HuongDanSuDung, [ROLES["DANH_MUC"].HDSD]),
    accessRoles: [],
    path: "/danh-muc/huong-dan-su-dung",
    exact: true,
  },
  hoiDong: {
    component: Page(HoiDong, [ROLES["DANH_MUC"].HOI_DONG]),
    accessRoles: [],
    path: "/danh-muc/hoi-dong",
    exact: true,
  },
  dichVuNgoaiDieuTri: {
    component: Page(DichVuNgoaiDieuTri, [ROLES["DANH_MUC"].HDSD]),
    accessRoles: [],
    path: "/danh-muc/dich-vu-ngoai-dieu-tri",
    exact: true,
  },
};

const pageTDDT = {
  subPageTheoDoiDieuTri: {
    component: Page(SubPageTDDT, []),
    accessRoles: [],
    path: "/theo-doi-nguoi-benh",
    exact: true,
  },
  danhSachNguoiBenh: {
    component: Page(DanhSachNguoiBenhTheoDoi, []),
    accessRoles: [],
    path: ["/theo-doi-nguoi-benh/danh-sach-nguoi-benh"],
    exact: true,
  },
  chiTietTheoDoiDieuTri: {
    component: Page(ChiTietTheoDoiDieuTri, []),
    accessRoles: [],
    path: ["/theo-doi-nguoi-benh/danh-sach-nguoi-benh/chi-tiet/:id"],
    exact: true,
  },
};

const pageQMS = {
  qmsDoc: {
    component: Page(QmsDoc, []),
    accessRoles: [],
    path: "/qms/thiet-lap-doc",
    exact: true,
  },
  qmsNgang: {
    component: Page(QmsNgang, []),
    accessRoles: [],
    path: "/qms/thiet-lap-ngang",
    exact: true,
  },
  qmsDocKhamBenh: {
    component: Page(QmsDocKhamBenh, []),
    accessRoles: [],
    path: ["/qms/qms-doc/kham-benh"],
    exact: true,
  },
  qmsNgangKhamBenh: {
    component: Page(QmsNgangKhamBenh, []),
    accessRoles: [],
    path: ["/qms/qms-ngang/kham-benh"],
    exact: true,
  },
  qmsDocChanDoanHinhAnh: {
    component: Page(QmsDocChanDoanHinhAnh, []),
    accessRoles: [],
    path: ["/qms/qms-doc/chan-doan-hinh-anh"],
    exact: true,
  },
  qmsNgangChanDoanHinhAnh: {
    component: Page(QmsNgangChanDoanHinhAnh, []),
    accessRoles: [],
    path: ["/qms/qms-ngang/chan-doan-hinh-anh"],
    exact: true,
  },
  qmsNgangXetNghiem: {
    component: Page(QmsNgangXetNghiem, []),
    accessRoles: [],
    path: ["/qms/qms-ngang/xet-nghiem"],
    exact: true,
  },
  qmsDocXetNghiem: {
    component: Page(QmsDocXetNghiem, []),
    accessRoles: [],
    path: ["/qms/qms-doc/xet-nghiem"],
    exact: true,
  },
};

const pageBaoCao = {
  subPageBaoCao: {
    component: Page(SubPageBaoCao, []),
    accessRoles: [],
    path: "/bao-cao",
    exact: true,
  },
  dsNbKhamChiTiet: {
    component: Page(DSNBKhamChiTiet, []),
    accessRoles: [],
    path: "/bao-cao/danh-sach-nguoi-benh-kham-chi-tiet",
    exact: true,
  },
  chiTietTheoNguoiBenh: {
    component: Page(ChiTietTheoNB, []),
    accessRoles: [],
    path: "/bao-cao/chi-tiet-theo-nguoi-benh",
    exact: true,
  },
};

const pages = {
  home: {
    component: Page(SubPageHome, ["home_trangChu"]),
    accessRoles: [],
    path: ["/trang-chu", "/"],
    exact: true,
  },
  login: {
    component: Page(Login, []),
    accessRoles: [],
    path: "/login",
    exact: true,
  },
  guide: {
    component: Page(Guide, []),
    accessRoles: [],
    path: "/tiep-don/huong-dan-thuc-hien-dich-vu/:id",
    exact: true,
  },
  keDichVu: {
    component: Page(KeDichVu, [ROLES["TIEP_DON"].KE_DV]),
    accessRoles: [],
    path: "/tiep-don/dich-vu/:id",
    exact: true,
  },
  tiepDonId: {
    component: Page(TiepDon, [ROLES["TIEP_DON"].XEM_LAI_TT]),
    accessRoles: [],
    path: "/tiep-don/:id",
    exact: true,
  },
  tiepDon: {
    component: Page(TiepDon, [ROLES["TIEP_DON"].TIEP_DON]),
    accessRoles: [],
    path: "/tiep-don",
    exact: true,
  },
  kios: {
    component: Page(Kios, []),
    accessRoles: [],
    path: "/kiosk",
    exact: false,
  },
  thuNgan: {
    component: Page(ThuNgan, []),
    accessRoles: [],
    path: "/thu-ngan",
  },
  xetNghiem: {
    component: Page(XetNghiem, []),
    accessRoles: [],
    path: "/xet-nghiem",
  },
  khamBenh: {
    component: Page(KhamBenh, [ROLES["KHAM_BENH"].XEM]),
    accessRoles: [],
    path: [
      "/kham-benh/:phongThucHienId/:maHoSo/:dichVu",
      "/kham-benh/:maHoSo",
      "/kham-benh",
    ],
  },
  thongBao: {
    component: Page(QuanLyThongBao, []),
    accessRoles: [],
    path: "/quan-ly-thong-bao",
    exact: true,
  },
  kho: {
    component: Page(KhoPage, []),
    accessRoles: [],
    path: "/kho",
    exact: false,
  },
  thietLap: {
    component: Page(ThietLapPage, []),
    accessRoles: [],
    path: "/thiet-lap",
    exact: false,
  },
  quanTri: {
    component: Page(QuanTriPage, []),
    accessRoles: [],
    path: "/quan-tri",
    exact: false,
  },
  chanDoanHinhAnh: {
    component: Page(ChanDoanHinhAnh, []),
    accessRoles: [],
    path: "/chan-doan-hinh-anh",
    exact: false,
  },
  kySo: {
    component: Page(KySo, []),
    accessRoles: [],
    path: "/ky-so",
  },
  hoSoBenhAn: {
    component: Page(HoSoBenhAn, []),
    accessRoles: [],
    path: "/ho-so-benh-an",
    exact: false,
  },
  theoDoiDieuTri: {
    component: Page(TheoDoiDieuTri, []),
    accessRoles: [],
    path: "/theo-doi-nguoi-benh",
  },
  qms: {
    component: Page(Qms, []),
    accessRoles: [],
    path: "/qms",
    exact: false,
  },
  nhaThuoc: {
    component: Page(NhaThuoc, []),
    accessRoles: [],
    path: "/nha-thuoc",
    exact: true,
  },
  chiTietDonThuoc: {
    component: Page(ChiTietDonThuoc, []),
    accessRoles: [],
    path: ["/nha-thuoc/them-moi", "/nha-thuoc/chi-tiet/:id"],
    exact: true,
  },
  baoCao: {
    component: Page(BaoCaoPages, []),
    accessRoles: [],
    path: ["/bao-cao"],
  },
  danhMuc: {
    component: Page(DanhMuc, []),
    accessRoles: [],
    path: "/danh-muc",
    exact: false,
  },
};

export {
  pages,
  pageDanhMuc,
  pageKiosk,
  pageThuNgan,
  pageXetNghiem,
  pageKho,
  pageThietLap,
  pageQuanTri,
  pageCDHA,
  pageHSBA,
  pageTDDT,
  pageQMS,
  pageKySo,
  pageBaoCao,
};
