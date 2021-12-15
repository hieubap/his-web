import { ROLES } from "../../../constants/index";
import { NHOM_DANH_MUC, NHOM_BAO_CAO } from "../../../constants/index";

export const ListContentLeftHome = [
  {
    title: "Danh mục",
    bg: require("assets/images/pagehome/bgDanhMuc.png"),
    icon: require("assets/images/pagehome/icDanhMuc.png"),
    link: "/danh-muc",
    accessRoles: [],
  },
  {
    title: "Tiếp đón",
    bg: require("assets/images/pagehome/bgTiepDon.png"),
    icon: require("assets/images/pagehome/icTiepDon.png"),
    link: "/tiep-don",
    accessRoles: [ROLES["TIEP_DON"].TIEP_DON],
  },
  {
    title: "Nhà thuốc",
    bg: require("assets/images/pagehome/bgNhaThuoc.png"),
    icon: require("assets/images/pagehome/icNhaThuoc.png"),
    link: "/nha-thuoc",
    accessRoles: [],
  },
  {
    title: "Xét nghiệm",
    bg: require("assets/images/pagehome/bgXetNghiem.png"),
    icon: require("assets/images/pagehome/icXetNghiem.png"),
    link: "/xet-nghiem",
    accessRoles: [],
  },
  {
    title: "Khám bệnh",
    bg: require("assets/images/pagehome/bgTheoDoiDieuTri.png"),
    icon: require("assets/images/pagehome/icKhamBenh.png"),
    link: "/kham-benh",
    accessRoles: [ROLES["KHAM_BENH"].XEM],
  },
  {
    title: "Thu ngân",
    bg: require("assets/images/pagehome/bgThuNgan.png"),
    icon: require("assets/images/pagehome/icThuNgan.png"),
    link: "/thu-ngan",
    accessRoles: [ROLES["THU_NGAN"].THU_NGAN],
  },
  {
    title: "Thiết lập",
    bg: require("assets/images/pagehome/bgThietLap.png"),
    icon: require("assets/images/pagehome/icThietLap.png"),
    link: "/thiet-lap",
    accessRoles: [],
  },
  {
    title: "Quản trị hệ thống",
    bg: require("assets/images/pagehome/bgQuanTriHeThong.png"),
    icon: require("assets/images/pagehome/icQuanTriHeThong.png"),
    link: "/quan-tri",
    accessRoles: [],
  },
  {
    title: "Quản lý thông báo",
    bg: require("assets/images/pagehome/bgQuanLyThongBao.png"),
    icon: require("assets/images/pagehome/icThongBao.png"),
    link: "/quan-ly-thong-bao",
    accessRoles: [],
  },
  {
    title: "CĐHA - TDCN",
    bg: require("assets/images/pagehome/bgChanDoanHinhAnh.png"),
    icon: require("assets/images/pagehome/icCDHA.png"),
    link: "/chan-doan-hinh-anh",
  },
  {
    title: "Kho",
    bg: require("assets/images/pagehome/bgKho.png"),
    icon: require("assets/images/pagehome/icKho.png"),
    link: "/kho",
    accessRoles: [],
  },
  {
    title: "Hồ sơ bệnh án",
    bg: require("assets/images/pagehome/bgHoSoBenhAn.png"),
    icon: require("assets/images/pagehome/icHoSoBenhAn.png"),
    link: "/ho-so-benh-an",
  },
  {
    title: "Theo dõi điều trị",
    bg: require("assets/images/pagehome/bgTheoDoiDieuTri.png"),
    icon: require("assets/images/pagehome/icTheoDoiDieuTri.png"),
    link: "/theo-doi-nguoi-benh",
  },
  {
    title: "Ký số",
    bg: require("assets/images/pagehome/bgKySo.png"),
    icon: require("assets/images/pagehome/icKySo.png"),
    link: "/ky-so",
  },
  {
    title: "Báo cáo",
    bg: require("assets/images/pagehome/bgBaoCao.png"),
    icon: require("assets/images/pagehome/icBaoCao.png"),
    link: "/bao-cao",
  },
];

export const ListContentLeftFunc = [
  {
    title: "Danh mục Loại cấp cứu",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/loai-cap-cuu",
    accessRoles: [ROLES["DANH_MUC"].LOAI_CC],
    group: NHOM_DANH_MUC.CAP_CUU,
  },
  {
    title: "Danh mục Thời gian cấp cứu",
    bg: require("assets/images/pagehome/icChucNang2.png"),
    link: "/danh-muc/thoi-gian-cap-cuu",
    accessRoles: [ROLES["DANH_MUC"].TG_CC],
    group: NHOM_DANH_MUC.CAP_CUU,
  },
  {
    title: "Danh mục nhãn áp",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/chuc-nang",
    group: NHOM_DANH_MUC.CHUYEN_KHOA_MAT,
  },
  {
    title: "Danh mục thị lực",
    bg: require("assets/images/pagehome/icChucNang2.png"),
    link: "/danh-muc/chuc-nang",
    group: NHOM_DANH_MUC.CHUYEN_KHOA_MAT,
  },
  {
    title: "Danh mục đơn vị Axis",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/chuc-nang",
    group: NHOM_DANH_MUC.CHUYEN_KHOA_MAT,
  },
  {
    title: "Danh mục đơn vị CYL",
    bg: require("assets/images/pagehome/icChucNang2.png"),
    link: "/danh-muc/chuc-nang",
    group: NHOM_DANH_MUC.CHUYEN_KHOA_MAT,
  },
  {
    title: "Danh mục đơn vị SPH",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/chuc-nang",
    group: NHOM_DANH_MUC.CHUYEN_KHOA_MAT,
  },
  {
    title: "Danh mục quầy tiếp đón",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/quay-tiep-don",
    accessRoles: [ROLES["DANH_MUC"].QUAY],
    group: NHOM_DANH_MUC.CHUNG,
  },
  {
    title: "Danh mục phương thức thanh toán",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/phuong-thuc-thanh-toan",
    accessRoles: [ROLES["DANH_MUC"].PTTT],
    group: NHOM_DANH_MUC.CHUNG,
  },
  {
    title: "Danh mục bệnh viện",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/benh-vien",
    accessRoles: [ROLES["DANH_MUC"].BENH_VIEN],
    group: NHOM_DANH_MUC.HANH_CHINH,
  },
  {
    title: "Danh mục nguyên nhân nhập viện",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/nguyen-nhan-nhap-vien",
    accessRoles: [ROLES["DANH_MUC"].NGUYEN_NHAN_NHAP_VIEN],
    group: NHOM_DANH_MUC.CAP_CUU,
  },
  {
    title: "Danh mục chức vụ",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/chuc-vu",
    accessRoles: [ROLES["DANH_MUC"].CHUC_VU],
    group: NHOM_DANH_MUC.HANH_CHINH,
  },
  {
    title: "Danh mục nghề nghiệp",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/nghe-nghiep",
    accessRoles: [ROLES["DANH_MUC"].NGHE_NGHIEP],
    group: NHOM_DANH_MUC.HANH_CHINH,
  },
  {
    title: "Danh mục mỗi quan hệ",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/moi-quan-he",
    accessRoles: [ROLES["DANH_MUC"].MOI_QUAN_HE],
    group: NHOM_DANH_MUC.HANH_CHINH,
  },
  {
    title: "Danh mục khoa",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/khoa",
    accessRoles: [ROLES["DANH_MUC"].KHOA],
    group: NHOM_DANH_MUC.CHUNG,
  },
  {
    title: "Danh mục phòng",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/phong",
    accessRoles: [ROLES["DANH_MUC"].PHONG],
    group: NHOM_DANH_MUC.CHUNG,
  },
  {
    title: "Danh mục dịch vụ khám bệnh",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/dich-vu-kham-benh",
    accessRoles: [ROLES["DANH_MUC"].DICH_VU_KHAM_BENH],
    group: NHOM_DANH_MUC.DICH_VU,
  },
  {
    title: "Danh mục chuyên khoa",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/chuyen-khoa",
    accessRoles: [ROLES["DANH_MUC"].CHUYEN_KHOA],
    group: NHOM_DANH_MUC.DICH_VU,
  },
  {
    title: "Danh mục vị trí chấn thương",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/vi-tri-chan-thuong",
    accessRoles: [ROLES["DANH_MUC"].VI_TRI_CHAN_THUONG],
    group: NHOM_DANH_MUC.CAP_CUU,
  },
  {
    title: "Danh mục Thẻ bảo hiểm",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/the-bao-hiem",
    accessRoles: [ROLES["DANH_MUC"].THE_BAO_HIEM],
    group: NHOM_DANH_MUC.CHUNG,
  },
  {
    title: "Danh mục Học hàm học vị",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/hoc-ham-hoc-vi",
    accessRoles: [ROLES["DANH_MUC"].HOC_HAM],
    group: NHOM_DANH_MUC.HANH_CHINH,
  },
  {
    title: "Danh mục Dân tộc",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/dan-toc",
    accessRoles: [ROLES["DANH_MUC"].DAN_TOC],
    group: NHOM_DANH_MUC.HANH_CHINH,
  },
  {
    title: "Danh mục Loa gọi số",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/loa-goi-so",
    accessRoles: [ROLES["DANH_MUC"].LOA_GOI_SO],
    group: NHOM_DANH_MUC.CHUNG,
  },
  {
    title: "Danh mục Tòa nhà",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/toa-nha",
    accessRoles: [ROLES["DANH_MUC"].NHA],
    group: NHOM_DANH_MUC.CHUNG,
  },
  {
    title: "Danh mục Văn bằng chuyên môn",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/van-bang-chuyen-mon",
    accessRoles: [ROLES["DANH_MUC"].VAN_BANG],
    group: NHOM_DANH_MUC.HANH_CHINH,
  },
  {
    title: "Danh mục Đường dùng",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/duong-dung",
    accessRoles: [ROLES["DANH_MUC"].DUONG_DUNG],
    group: NHOM_DANH_MUC.KHO,
  },
  {
    title: "Danh mục Liều dùng",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/lieu-dung",
    accessRoles: [ROLES["DANH_MUC"].LIEU_DUNG],
    group: NHOM_DANH_MUC.KHO,
  },
  {
    title: "Danh mục mã máy",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/ma-may",
    accessRoles: [ROLES["DANH_MUC"].MA_MAY],
    group: NHOM_DANH_MUC.CHUNG,
  },
  {
    title: "Danh mục hoạt chất",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/hoat-chat",
    accessRoles: [ROLES["DANH_MUC"].HOAT_CHAT],
    group: NHOM_DANH_MUC.KHO,
  },
  {
    title: "Danh mục người đại diện",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/nguoi-dai-dien",
    accessRoles: [ROLES["DANH_MUC"].NGUOI_DAI_DIEN],
    group: NHOM_DANH_MUC.HANH_CHINH,
  },
  {
    title: "Danh mục cơ quan đơn vị",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/co-quan-don-vi",
    accessRoles: [ROLES["DANH_MUC"].CO_QUAN],
    group: NHOM_DANH_MUC.HANH_CHINH,
  },
  {
    title: "Danh mục quân hàm",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/quan-ham",
    accessRoles: [ROLES["DANH_MUC"].QUAN_HAM],
    group: NHOM_DANH_MUC.HANH_CHINH,
  },
  {
    title: "Danh mục lời dặn",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/loi-dan",
    accessRoles: [ROLES["DANH_MUC"].LOI_DAN],
    group: NHOM_DANH_MUC.KHO,
  },
  {
    title: "Danh mục nhà sản xuất/cung cấp",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/nha-san-xuat",
    accessRoles: [ROLES["DANH_MUC"].NHA_SAN_XUAT],
    group: NHOM_DANH_MUC.KHO,
  },
  {
    title: "Danh mục Đối tác",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/doi-tac",
    accessRoles: [ROLES["DANH_MUC"].DOI_TAC],
    group: NHOM_DANH_MUC.HANH_CHINH,
  },
  {
    title: "Danh mục Lý do đổi trả dịch vụ",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/ly-do-tra-dv",
    accessRoles: [ROLES["DANH_MUC"].DOI_TRA_DICH_VU],
    group: NHOM_DANH_MUC.DICH_VU,
  },
  {
    title: "Danh mục Bệnh phẩm",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/benh-pham",
    accessRoles: [ROLES["DANH_MUC"].BENH_PHAM],
    group: NHOM_DANH_MUC.DICH_VU,
  },
  {
    title: "Danh mục Phương pháp gây mê",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/phuong-phap-gay-me",
    accessRoles: [ROLES["DANH_MUC"].PHUONG_PHAP_GAY_ME],
    group: NHOM_DANH_MUC.DICH_VU,
  },
  {
    title: "Danh mục Phương pháp nhuộm",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/phuong-phap-nhuom",
    accessRoles: [ROLES["DANH_MUC"].PHUONG_PHAP_NHUOM],
    group: NHOM_DANH_MUC.DICH_VU,
  },
  {
    title: "Danh mục Vị trí sinh thiết",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/vi-tri-sinh-thiet",
    accessRoles: [ROLES["DANH_MUC"].VI_TRI_SINH_THIET],
    group: NHOM_DANH_MUC.DICH_VU,
  },
  {
    title: "Danh mục Định mức thặng số bán lẻ",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/thang-so-ban-le",
    accessRoles: [ROLES["DANH_MUC"].DINH_MUC_THANG_SO],
    group: NHOM_DANH_MUC.KHO,
  },
  {
    title: "Danh mục Tài sản khác",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/chuc-nang",
    accessRoles: [ROLES["DANH_MUC"].TAI_SAN_KHAC],
    group: NHOM_DANH_MUC.CHUNG,
  },
  {
    title: "Danh mục Loại đối tượng",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/loai-doi-tuong",
    accessRoles: [ROLES["DANH_MUC"].LOAI_DOI_TUONG],
    group: NHOM_DANH_MUC.CHUNG,
  },
  {
    title: "Danh mục Loại Bệnh Án",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/loai-benh-an",
    accessRoles: [ROLES["DANH_MUC"].LOAI_BA],
    group: NHOM_DANH_MUC.CHUNG,
  },
  {
    title: "Danh mục Nhóm vật tư",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/nhom-vat-tu",
    accessRoles: [ROLES["DANH_MUC"].NHOM_VAT_TU],
    group: NHOM_DANH_MUC.KHO,
  },
  {
    title: "Danh mục Nhóm hóa chất",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/nhom-hoa-chat",
    accessRoles: [ROLES["DANH_MUC"].NHOM_HOA_CHAT],
    group: NHOM_DANH_MUC.KHO,
  },
  {
    title: "Danh mục Dịch vụ CĐHA-TDCN",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/dich-vu-cdha-tdcn",
    accessRoles: [ROLES["DANH_MUC"].CDHA_TDCN],
    group: NHOM_DANH_MUC.DICH_VU,
  },
  {
    title: "Danh mục Vật tư",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/vat-tu",
    accessRoles: [ROLES["DANH_MUC"].VAT_TU],
    group: NHOM_DANH_MUC.KHO,
  },
  {
    title: "Danh mục Dịch vụ xét nghiệm",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/dich-vu-xet-nghiem",
    accessRoles: [ROLES["DANH_MUC"].DICH_VU_XN],
    group: NHOM_DANH_MUC.DICH_VU,
  },
  {
    title: "Danh mục Hóa chất",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/hoa-chat",
    accessRoles: [ROLES["DANH_MUC"].HOA_CHAT],
    group: NHOM_DANH_MUC.KHO,
  },
  {
    title: "Danh mục Thuốc",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/thuoc",
    accessRoles: [ROLES["DANH_MUC"].THUOC],
    group: NHOM_DANH_MUC.KHO,
  },
  {
    title: "Danh mục Dịch vụ Phẫu thuật - Thủ thuật",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/dich-vu-phau-thuat",
    accessRoles: [ROLES["DANH_MUC"].DV_PHAU_THUAT_THU_THUAT],
    group: NHOM_DANH_MUC.DICH_VU,
  },
  {
    title: "Danh mục Chế phẩm máu",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/che-pham-mau",
    accessRoles: [ROLES["DANH_MUC"].CHE_PHAM_MAU],
    group: NHOM_DANH_MUC.KHO,
  },
  {
    title: "Danh mục Dịch vụ ngoài điều trị",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/chuc-nang",
    group: NHOM_DANH_MUC.DICH_VU,
  },

  {
    title: "Danh mục nhóm dịch vụ",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/nhom-dich-vu",
    accessRoles: [ROLES["DANH_MUC"].NHOM_DICH_VU],
    group: NHOM_DANH_MUC.DICH_VU,
  },
  {
    title: "Danh mục Đơn vị tính",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/don-vi-tinh",
    accessRoles: [ROLES["DANH_MUC"].DON_VI_TINH],
    group: NHOM_DANH_MUC.DICH_VU,
  },
  {
    title: "Danh mục Nhóm thuốc",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/nhom-thuoc",
    accessRoles: [ROLES["DANH_MUC"].NHOM_THUOC],
    group: NHOM_DANH_MUC.KHO,
  },
  {
    title: "Danh mục Phân loại thuốc",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/phan-loai-thuoc",
    accessRoles: [ROLES["DANH_MUC"].PHAN_LOAI_THUOC],
    group: NHOM_DANH_MUC.KHO,
  },
  {
    title: "Danh mục Phân nhóm thuốc",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/phan-nhom-thuoc",
    accessRoles: [ROLES["DANH_MUC"].PHAN_NHOM_THUOC],
    group: NHOM_DANH_MUC.KHO,
  },
  {
    title: "Danh mục Gói dịch vụ",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/goi-dich-vu",
    accessRoles: [ROLES["DANH_MUC"].GOI_DICH_VU],
    group: NHOM_DANH_MUC.DICH_VU,
  },
  {
    title: "Danh mục địa chỉ hành chính",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/dia-chi-hanh-chinh",
    accessRoles: [ROLES["DANH_MUC"].DIA_CHI_HANH_CHINH],
    group: NHOM_DANH_MUC.HANH_CHINH,
  },
  {
    title: "Danh mục nhóm bệnh tật",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/nhom-benh-tat",
    accessRoles: [ROLES["DANH_MUC"].BENH_TAT],
    group: NHOM_DANH_MUC.CHUNG,
  },
  {
    title: "Danh mục máy in",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/may-in",
    accessRoles: [ROLES["DANH_MUC"].MAY_IN],
    group: NHOM_DANH_MUC.KY_IN_PHIEU,
  },
  {
    title: "Danh mục báo cáo",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/bao-cao",
    accessRoles: [ROLES["DANH_MUC"].BAO_CAO],
    group: NHOM_DANH_MUC.KY_IN_PHIEU,
  },
  {
    title: "Danh mục mẫu kết quả XN",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/mau-ket-qua-xet-nghiem",
    accessRoles: [ROLES["DANH_MUC"].MAU_KET_QUA_XN],
    group: NHOM_DANH_MUC.DICH_VU,
  },
  {
    title: "Danh mục Nơi lấy mẫu bệnh phẩm",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/noi-lay-benh-pham",
    accessRoles: [ROLES["DANH_MUC"].NOI_LAY_BENH_PHAM],
    group: NHOM_DANH_MUC.DICH_VU,
  },
  {
    title: "Danh mục Hình thức nhập/Loại xuất",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/hinh-thuc-nhap-xuat",
    accessRoles: [ROLES["DANH_MUC"].HINH_THUC_NHAP_XUAT_LOAI_XUAT],
    group: NHOM_DANH_MUC.KHO,
  },

  {
    title: "Danh mục Nguồn nhập kho",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/nguon-nhap-kho",
    accessRoles: [ROLES["DANH_MUC"].NGUON_NHAP_KHO],
    group: NHOM_DANH_MUC.KHO,
  },
  {
    title: "Danh mục Bộ chỉ định",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/bo-chi-dinh",
    accessRoles: [ROLES["DANH_MUC"].BO_CHI_DINH],
    group: NHOM_DANH_MUC.DICH_VU,
  },

  {
    title: "Danh mục Chương trình giảm giá",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/chuong-trinh-giam-gia",
    accessRoles: [ROLES["DANH_MUC"].CHUONG_TRINH_GIAM_GIA],
    group: NHOM_DANH_MUC.KHACH_HANG,
  },
  {
    title: "Danh mục Nguồn người bệnh",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/nguon-nguoi-benh",
    accessRoles: [ROLES["DANH_MUC"].NGUON_NGUOI_BENH],
    group: NHOM_DANH_MUC.KHACH_HANG,
  },
  {
    title: "Danh mục Hạng Thẻ",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/hang-the",
    accessRoles: [ROLES["DANH_MUC"].HANG_THE],
    group: NHOM_DANH_MUC.KHACH_HANG,
  },
  {
    title: "Danh mục Xuất xứ",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/xuat-xu",
    accessRoles: [ROLES["DANH_MUC"].XUAT_XU],
    group: NHOM_DANH_MUC.KHO,
  },
  // thieu mo ta
  {
    title: "Danh mục Mẫu kết quả CLS",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/mau-ket-qua-cls",
    group: NHOM_DANH_MUC.DICH_VU,
  },
  {
    title: "Danh mục Nhóm chỉ số",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/nhom-chi-so",
    accessRoles: [ROLES["DANH_MUC"].NHOM_CHI_SO],
    group: NHOM_DANH_MUC.DICH_VU,
  },
  {
    title: "Danh mục Quyền ký",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/quyen-ky",
    accessRoles: [ROLES["DANH_MUC"].QUYEN_KY],
    group: NHOM_DANH_MUC.KY_IN_PHIEU,
  },
  {
    title: "Danh mục Loại phiếu",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/loai-phieu",
    group: NHOM_DANH_MUC.KY_IN_PHIEU,
    accessRoles: [ROLES["DANH_MUC"].LOAI_PHIEU],
  },
  {
    title: "Danh mục mẫu QMS",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/mau-qms",
    group: NHOM_DANH_MUC.CHUNG,
    accessRoles: [ROLES["DANH_MUC"].MAU_QMS],
  },
  {
    title: "Danh mục Thuốc kê ngoài",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/thuoc-ke-ngoai",
    group: NHOM_DANH_MUC.KHO,
    accessRoles: [ROLES["DANH_MUC"].THUOC_KE_NGOAI],
  },
  {
    title: "Danh mục Liều dùng - Bác sĩ",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/danh-muc/lieu-dung-bac-sy",
    group: NHOM_DANH_MUC.KHO,
    accessRoles: [ROLES["DANH_MUC"].LIEU_DUNG_BS],
  },
  {
    title: "Danh mục kiosk",
    bg: require("assets/images/pagehome/bgThietLap.png"),
    link: "/danh-muc/kiosk",
    group: NHOM_DANH_MUC.CHUNG,
    accessRoles: [ROLES["THIET_LAP"].KIOSK],
  },
];

export const ListDanhMucXN = [
  {
    title: "Lấy mẫu bệnh phẩm",
    bg: require("assets/images/pagehome/icLayMau.png"),
    link: "/xet-nghiem/lay-mau",
    accessRoles: [ROLES["XET_NGHIEM"].MH_LAY_MAU],
  },
  {
    title: "Thực hiện SH-HH",
    bg: require("assets/images/pagehome/bgXNSinhHoa.png"),
    link: "/xet-nghiem/huyet-hoc-sinh-hoa",
    accessRoles: [ROLES["XET_NGHIEM"].XET_NGHIEM_HH],
  },
  {
    title: "Thực hiện GPB-VS",
    bg: require("assets/images/pagehome/icGPBVS.png"),
    link: "/xet-nghiem/giai-phau-benh-vi-ky-sinh",
    accessRoles: [ROLES["XET_NGHIEM"].XET_NGHIEM_GPB],
  },
];

export const ListDanhMucTN = [
  {
    title: "Danh sách phiếu thu",
    bg: require("assets/images/thuNgan/dsPhieuThu.png"),
    link: "/thu-ngan/thu-ngan",
    // accessRoles: [ROLES["THU_NGAN"].THU_NGAN],
  },
  {
    title: "DS phiếu yêu cầu hoàn",
    bg: require("assets/images/thuNgan/dsPhieuHoan.png"),
    link: "/thu-ngan/ds-phieu-yeu-cau-hoan",
    // accessRoles: [ROLES["THU_NGAN"].DANH_SACH_PHIEU_THU],
  },
];

export const ListQuanTriHeThong = [
  {
    title: "Danh mục vai trò",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/quan-tri/danh-muc-vai-tro",
    accessRoles: [ROLES["QUAN_LY_TAI_KHOAN"].VAI_TRO_HE_THONG],
  },
  {
    title: "Quản lý tài khoản",
    bg: require("assets/images/pagehome/bgThietLap.png"),
    link: "/quan-tri/danh-muc-tai-khoan",
    accessRoles: [ROLES["QUAN_LY_TAI_KHOAN"].QUAN_LY_TAI_KHOAN],
  },
  {
    title: "Danh mục Nhân viên",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/quan-tri/nhan-vien",
    accessRoles: [ROLES["QUAN_LY_TAI_KHOAN"].NHAN_VIEN],
  },
  {
    title: "Danh mục quyền",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/quan-tri/quyen",
    accessRoles: [ROLES["QUAN_LY_TAI_KHOAN"].QUYEN],
  },
  {
    title: "Danh mục nhóm tính năng",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/quan-tri/nhom-tinh-nang",
    accessRoles: [ROLES["QUAN_LY_TAI_KHOAN"].NHOM_TINH_NANG],
  },
];

export const ListThietLap = [
  {
    title: "Thiết lập chung",
    bg: require("assets/images/pagehome/bgThietLap.png"),
    link: "/thiet-lap/thiet-lap-chung",
    accessRoles: [ROLES.THIET_LAP_CHUNG],
  },
  {
    title: "Tách gộp phiếu Xét nghiệm",
    bg: require("assets/images/pagehome/bgThietLap.png"),
    link: "/thiet-lap/tach-gop-phieu-xet-nghiem",
  },
  {
    title: "Tách gộp phiếu chỉ định DVKT",
    bg: require("assets/images/pagehome/bgThietLap.png"),
    link: "/thiet-lap/tach-gop-phieu-dvkt",
  },
  {
    title: "Thiết lập tích điểm",
    bg: require("assets/images/pagehome/bgThietLap.png"),
    link: "/thiet-lap/tich-diem",
  },
  {
    title: "Thiết lập thông số hàng đợi",
    bg: require("assets/images/pagehome/bgThietLap.png"),
    link: "/thiet-lap/thong-so-hang-doi",
  },
  {
    title: "Thiết lập phiếu tại các màn hình",
    bg: require("assets/images/pagehome/bgThietLap.png"),
    link: "/thiet-lap/thiet-lap-phieu-in",
  },
];

export const ListKho = [
  {
    title: "Thiết lập kho chỉ định",
    bg: require("assets/images/pagehome/bgThietLap.png"),
    link: "/kho/thiet-lap-kho-chi-dinh",
  },
  {
    title: "Quản trị kho",
    bg: require("assets/images/pagehome/icQuanTriKho.png"),
    link: "/kho/quan-tri-kho",
  },
  {
    title: "Quyết định thầu",
    bg: require("assets/images/pagehome/icQuyetDinhThau.png"),
    link: "/kho/quyet-dinh-thau",
  },
  {
    title: "Nhập kho",
    bg: require("assets/images/pagehome/icNhapKho.png"),
    link: "/kho/nhap-kho",
  },
  {
    title: "Xuất kho",
    bg: require("assets/images/pagehome/icXuatKho.png"),
    link: "/kho/xuat-kho",
  },
  {
    title: "Danh sách DV kho",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/kho/danh-sach-dich-vu-kho",
  },
];

export const ListChanDoanHinhAnh = [
  {
    title: "Chờ tiếp đón",
    bg: require("assets/images/pagehome/bgXNLayMau.png"),
    link: "/chan-doan-hinh-anh/cho-tiep-don",
    accessRoles: [ROLES["CHAN_DOAN_HINH_ANH"].CHO_TIEP_DON],
  },
  {
    title: "Tiếp nhận",
    bg: require("assets/images/pagehome/bgXNLayMau.png"),
    link: "/chan-doan-hinh-anh/tiep-nhan",
    accessRoles: [ROLES["CHAN_DOAN_HINH_ANH"].TIEP_NHAN],
  },
  {
    title: "Đọc kết quả",
    bg: require("assets/images/pagehome/bgXNLayMau.png"),
    link: "/chan-doan-hinh-anh/doc-ket-qua",
  },
];

export const ListHoSoBenhAn = [
  {
    title: "Danh sách người bệnh",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/ho-so-benh-an/danh-sach-nguoi-benh",
  },
];

export const ListPhieuTheoDoiDieuTri = [
  {
    title: "Danh sách người bệnh",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/theo-doi-nguoi-benh/danh-sach-nguoi-benh",
  },
];

export const ListKySo = [
  {
    title: "Thiết lập quyền ký",
    bg: require("assets/images/pagehome/bgThietLap.png"),
    link: "/ky-so/thiet-lap-quyen-ky",
  },
  {
    title: "Danh sách phiếu chờ ký",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/ky-so/danh-sach-phieu-cho-ky",
  },
  {
    title: "Lịch sử ký",
    bg: require("assets/images/pagehome/bgLichSuKy.png"),
    link: "/ky-so/lich-su-ky/danh-sach-nguoi-benh",
  },
];

export const ListNhomDanhMuc = [
  {
    title: "Danh mục chuyên khoa mắt",
    group: NHOM_DANH_MUC.CHUYEN_KHOA_MAT,
  },
  {
    title: "Danh mục về cấp cứu",
    group: NHOM_DANH_MUC.CAP_CUU,
  },
  {
    title: "Danh mục về kho",
    group: NHOM_DANH_MUC.KHO,
  },
  {
    title: "Danh mục về ký_in_phiếu",
    group: NHOM_DANH_MUC.KY_IN_PHIEU,
  },
  {
    title: "Danh mục về dịch vụ",
    group: NHOM_DANH_MUC.DICH_VU,
  },
  {
    title: "Danh mục về TT hành chính",
    group: NHOM_DANH_MUC.HANH_CHINH,
  },
  {
    title: "Danh mục chung",
    group: NHOM_DANH_MUC.CHUNG,
  },
  {
    title: "Danh mục chăm sóc khách hàng",
    group: NHOM_DANH_MUC.KHACH_HANG,
  },
];

export const ListNhomBaoCao = [
  {
    title: "Báo cáo tài chính",
    group: NHOM_BAO_CAO.BAO_CAO_TAI_CHINH,
  },
  {
    title: "Báo cáo dịch vụ",
    group: NHOM_BAO_CAO.BAO_CAO_DICH_VU,
  },
  {
    title: "Báo cáo phòng khám",
    group: NHOM_BAO_CAO.BAO_CAO_PHONG_KHAM,
  },
  {
    title: "Báo cáo kho",
    group: NHOM_BAO_CAO.BAO_CAO_KHO,
  },
];

export const ListBaoCao = [
  {
    title: "PK03.2. Danh sách người bệnh khám chi tiết",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/bao-cao/danh-sach-nguoi-benh-kham-chi-tiet",
    accessRoles: [],
    group: NHOM_BAO_CAO.BAO_CAO_PHONG_KHAM,
    capitalizeTitle: false,
  },
  {
    title: "BC01. Báo cáo chi tiết theo người bệnh",
    bg: require("assets/images/pagehome/icChucNang1.png"),
    link: "/bao-cao/chi-tiet-theo-nguoi-benh",
    accessRoles: [],
    group: NHOM_BAO_CAO.BAO_CAO_DICH_VU,
    capitalizeTitle: false,
  },
];