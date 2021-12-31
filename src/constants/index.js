
export const A4 = {
  width: 804,
  height: 1178,
};

export const PAGE_SIZE = 10;
export const PAGE_DEFAULT = 0;
export const SIZE_DEFAULT = 10;
export const PAGE_SIZE_LOAD_MORE = 10;
export const FORMAT_DATE = "DD/MM/YYYY";
export const BIRTHDAY_FORMAT = "DD/MM/YYYY";
export const TABLE_LAYOUT = { xl: 14, xxl: 14 };
export const DICH_VU_CO_KET_QUA_LAU = [
  {
    id: "",
    ten: "Tất cả",
  },
  {
    id: "true",
    ten: "Có",
  },
  {
    id: "false",
    ten: "Không",
  },
];
export const ADD_LAYOUT = { xl: 10, xxl: 10 };
export const TABLE_LAYOUT_COLLAPSE = { xl: 8, xxl: 8 };
export const ADD_LAYOUT_COLLAPSE = { xl: 16, xxl: 16 };
export const HIEU_LUC = [
  {
    id: "",
    ten: "Tất cả",
  },
  {
    id: "true",
    ten: "Có hiệu lực",
  },
  {
    id: "false",
    ten: "Không hiệu lực",
  },
];
export const HAN_CHE_KHOA = [
  {
    id: "",
    ten: "Tất cả",
  },
  {
    id: "true",
    ten: "Có hạn chế",
  },
  {
    id: "false",
    ten: "Không hạn chế",
  },
];

export const KHONG_TINH_TIEN = [
  {
    id: "",
    ten: "Tất cả",
  },
  {
    id: "false",
    ten: "Có tính tiền",
  },
  {
    id: "true",
    ten: "Không tính tiền",
  },
];

export const CHI_PHI_VAN_CHUYEN = [
  {
    id: "",
    ten: "Tất cả",
  },
  {
    id: "true",
    ten: "Có",
  },
  {
    id: "false",
    ten: "Không",
  },
];
export const NCC_KHAC = [
  {
    id: "",
    ten: "Tất cả",
  },
  {
    id: "true",
    ten: "Có",
  },
  {
    id: "false",
    ten: "Không",
  },
];

export const TRANG_THAI_LAY_MAU_BN = [
  { label: "Chờ tiếp nhận", value: 25 },
  { label: "Chờ lấy mẫu", value: [46, 38, 62] },
  { label: "Bỏ qua", value: 50 },
  { label: "Hủy mẫu", value: 80 },
];
export const TRANG_THAI_HHSH_GPB = [
  { label: "Đã lấy mẫu", value: 66 },
  { label: "Đã tiếp nhận mẫu", value: 90 },
  { label: "Đã có KQ", value: 155 },
  { label: "Đã duyệt KQ", value: 160 },
];

export const TRANG_THAI_CDHA = [
  { label: "Chờ tiếp nhận", value: 25 },
  { label: "Đã tiếp nhận", value: 63 },
  { label: "Đã có KQ", value: 155 },
  { label: "Bỏ qua", value: 50 },
];

export const LOAI_THONG_BAO = [
  {
    value: 10,
    name: "Khẩn cấp",
  },

  {
    value: 20,
    name: "Hàng ngày",
  },
  {
    value: 30,
    name: "Theo thời gian",
  },
];

export const TRANG_THAI_KY = [
  {
    ten: "Tất cả",
    id: "all",
  },
  {
    id: 0,
    ten: "Chưa ký",
  },
  {
    id: 10,
    ten: "Trình ký",
  },
  {
    id: 20,
    ten: "Từ chối ký",
  },
  {
    id: 50,
    ten: "Đã ký",
  },
  {
    id: 60,
    ten: "Hoàn thành",
  },
];
export const YES_NO = [
  {
    id: "",
    ten: "Tất cả",
  },
  {
    id: "true",
    ten: "Có",
  },
  {
    id: "false",
    ten: "Không",
  },
];

export const DOI_TUONG = {
  KHONG_BAO_HIEM: 1,
  BAO_HIEM: 2,
};

export const LOAI_DICH_VU = {
  THUOC: 90,
  VAT_TU: 100,
};

export const LOAI_PHIEU_THU = {
  KHONG_BAO_HIEM: 1,
  BAO_HIEM: 2,
};

//=========== Giới Tính
export const GIOI_TINH = {
  NAM: 1,
  NU: 2,
};

export const GIOI_TINH_BY_VALUE = {
  1: "Nam",
  2: "Nu",
};
//===============================

export const ROLES = {
  SUPER_ADMIN: "ROLE_AdminISofH",
  KIOSK: {
    DANG_KY_UU_TIEN: "kiosk_dangKy_uuTien",
    DANG_KY_LOAI_KHAM: "kiosk_dangKy_loaiKham",
    PHUONG_THUC_TIM_HS: "kiosk_phuongThuc_timHS",
    KET_QUA_TIM_KIEM: "kiosk_ketQuaTimKiem",
    DANG_KY_KHAM_BHYT: "kiosk_dangKy_khamBHYT",
    TIM_HS_QR: "kiosk_timHS_qr",
    SUA_KET_QUA: "kiosk_sua_ketQua",
    DANG_KY_THONG_TIN_MOI: "kiosk_dangKy_thongTinMoi",
    KET_QUA_LAY_SO: "kiosk_ketQua_laySo",
    TIM_HS_SDT: "kiosk_timHS_sdt",
    TIM_HS_CMND: "kiosk_timHS_cmnd",
  },
  THU_NGAN: {
    THU_NGAN: "0400101",
    TIM_NB: "0400101",
    NB_TIEP_THEO: "0400102",
    QUAY_LAI: "0400101",
    DANH_SACH_PHIEU_THU: "0400101",
    PHIEU_THU: "0400101",
    XUAT_DS_PHIEU_THU: "0400103",
    CHI_TIET_PHIEU_THU: "0400101",
    THONG_TIN_CA_NHAN: "0400101",
    LICH_SU_TAM_UNG: "0400104",
    DS_KHOAN_TIEN: "0400105",
    DS_TONG_HOP_PHIEU_THU: "0400106",
    DS_DICH_VU: "0400101",
    CHIA_PHIEU_THU: "0400107",
    MIEN_GIAM: "0400108",
    THONG_TIN_PHIEU_THU: "0400101",
    THANH_TOAN: "0400101",
    XUAT_HDDT: "0400111",
    PHIEU_CHI: "0400115",
    IN_PHIEU_THU: "0400116",
  },
  TIEP_DON: {
    TIEP_DON: "tiepDon",
    THONG_TIN_CHUNG: "tiepDon_thongTinChung",
    THONG_TIN_CA_NHAN: "tiepDon_thongTinCaNhan",
    CHON_QUAY: "tiepDon_chonQuay",
    DS_NHO: "tiepDon_dsNho",
    TIEP_DON_LAI_NB_NHO: "tiepDon_tiepDonLai_nbNho",
    NB_TIEP_THEO: "tiepDon_nbTiepTheo",
    DS_DA_TIEP_DON: "tiepDon_dsDaTiepDon",
    CHI_TIET_NB_DA_TIEP_DON: "tiepDon_chiTiet_nbDaTiepDon",
    SL_THEO_PHONG: "tiepDon_slTheoPhong",
    HUY_TIEP_DON: "tiepDon_huyTiepDon",
    KE_DV_KHAM: "tiepDon_ke_dvKham",
    KE_DV_XN: "tiepDon_ke_dvXN",
    KE_DV_CLS: "tiepDon_ke_dvCLS",
    KE_GOI_DV: "tiepDon_ke_goiDV",
    BHYT: "tiepDon_BHYT",
    THONG_TIN_BO_SUNG: "tiepDon_thongTinBoSung",
    KE_DV: "tiepDon_keDV",
    XEM_LAI_TT: "tiepDon_xemLai_thongTin",
    SUA_THONG_TIN: "tiepDon_sua_thongTin",
    SUA_DV: "tiepDon_sua_dv",
  },
  DANH_MUC: {
    LOAI_CC: "0100101",
    LOAI_CC_SUA: "0100103",
    LOAI_CC_THEM: "0100102",
    TG_CC: "0100201",
    TG_CC_SUA: "0100203",
    TG_CC_THEM: "0100202",
    QUAY: "0100301",
    QUAY_SUA: "0100303",
    QUAY_THEM: "0100302",
    PTTT: "0100401",
    PTTT_SUA: "0100403",
    PTTT_THEM: "0100402",
    BENH_TAT: "0100501",
    BENH_TAT_SUA: "0100503",
    BENH_TAT_THEM: "0100502",
    BENH_VIEN: "0100601",
    BENH_VIEN_SUA: "0100603",
    BENH_VIEN_THEM: "0100602",
    NGUYEN_NHAN_NHAP_VIEN: "0100701",
    NGUYEN_NHAN_NHAP_VIEN_SUA: "0100703",
    NGUYEN_NHAN_NHAP_VIEN_THEM: "0100702",
    CHUC_VU: "0100801",
    CHUC_VU_SUA: "0100803",
    CHUC_VU_THEM: "0100802",
    NGHE_NGHIEP: "0100901",
    NGHE_NGHIEP_SUA: "0100903",
    NGHE_NGHIEP_THEM: "0100902",
    MOI_QUAN_HE: "0101001",
    MOI_QUAN_HE_SUA: "0101003",
    MOI_QUAN_HE_THEM: "0101002",
    KHOA: "0101101",
    KHOA_SUA: "0101103",
    KHOA_THEM: "0101102",
    PHONG: "0101201",
    PHONG_SUA: "0101203",
    PHONG_THEM: "0101202",
    CHUYEN_KHOA: "0101401",
    CHUYEN_KHOA_SUA: "0101403",
    CHUYEN_KHOA_THEM: "0101402",
    VI_TRI_CHAN_THUONG: "0101501",
    VI_TRI_CHAN_THUONG_SUA: "0101503",
    VI_TRI_CHAN_THUONG_THEM: "0101502",
    THE_BAO_HIEM: "0101601",
    THE_BAO_HIEM_SUA: "0101603",
    THE_BAO_HIEM_THEM: "0101602",
    HOC_HAM: "0101701",
    HOC_HAM_SUA: "0101703",
    HOC_HAM_THEM: "0101702",
    DAN_TOC: "0101801",
    DAN_TOC_SUA: "0101803",
    DAN_TOC_THEM: "0101802",
    LOA_GOI_SO: "0101901",
    LOA_GOI_SO_SUA: "0101903",
    LOA_GOI_SO_THEM: "0101902",
    NHA: "0102001",
    NHA_SUA: "0102003",
    NHA_THEM: "0102002",
    VAN_BANG: "0102101",
    VAN_BANG_SUA: "0102103",
    VAN_BANG_THEM: "0102102",
    DUONG_DUNG: "0102201",
    DUONG_DUNG_SUA: "0102203",
    DUONG_DUNG_THEM: "0102202",
    LIEU_DUNG: "0102301",
    LIEU_DUNG_SUA: "0102303",
    LIEU_DUNG_THEM: "0102302",
    MA_MAY: "0102401",
    MA_MAY_SUA: "0102403",
    MA_MAY_THEM: "0102402",
    HOAT_CHAT: "0102501",
    HOAT_CHAT_SUA: "0102503",
    HOAT_CHAT_THEM: "0102502",
    NGUOI_DAI_DIEN: "0102601",
    NGUOI_DAI_DIEN_SUA: "0102603",
    NGUOI_DAI_DIEN_THEM: "0102602",
    CO_QUAN: "0102701",
    CO_QUAN_SUA: "0102703",
    CO_QUAN_THEM: "0102702",
    QUAN_HAM: "0102801",
    QUAN_HAM_SUA: "0102803",
    QUAN_HAM_THEM: "0102802",
    LOI_DAN: "0102901",
    LOI_DAN_SUA: "0102903",
    LOI_DAN_THEM: "0102902",
    NHA_SAN_XUAT: "0103001",
    NHA_SAN_XUAT_SUA: "0103003",
    NHA_SAN_XUAT_THEM: "0103002",
    DOI_TAC: "0103101",
    DOI_TAC_SUA: "0103103",
    DOI_TAC_THEM: "0103102",
    DOI_TRA_DICH_VU: "0103201",
    DOI_TRA_DICH_VU_SUA: "0103203",
    DOI_TRA_DICH_VU_THEM: "0103202",
    BENH_PHAM: "0103301",
    BENH_PHAM_SUA: "0103303",
    BENH_PHAM_THEM: "0103302",
    PHUONG_PHAP_GAY_ME: "0103401",
    PHUONG_PHAP_GAY_ME_SUA: "0103403",
    PHUONG_PHAP_GAY_ME_THEM: "0103402",
    PHUONG_PHAP_NHUOM: "0103501",
    PHUONG_PHAP_NHUOM_SUA: "0103503",
    PHUONG_PHAP_NHUOM_THEM: "0103502",
    VI_TRI_SINH_THIET: "0103601",
    VI_TRI_SINH_THIET_SUA: "0103603",
    VI_TRI_SINH_THIET_THEM: "0103602",
    DINH_MUC_THANG_SO: "0103701",
    DINH_MUC_THANG_SO_SUA: "0103703",
    DINH_MUC_THANG_SO_THEM: "0103702",
    TAI_SAN_KHAC: "0103801",
    TAI_SAN_KHAC_SUA: "0103803",
    TAI_SAN_KHAC_THEM: "0103802",
    LOAI_DOI_TUONG: "0103901",
    LOAI_DOI_TUONG_SUA: "0103903",
    LOAI_DOI_TUONG_THEM: "0103902",
    LOAI_BA: "0104001",
    LOAI_BA_SUA: "0104003",
    LOAI_BA_THEM: "0104002",
    // view
    NHOM_VAT_TU: "0104101",
    NHOM_VAT_TU_THEM: "0104102",
    NHOM_VAT_TU_SUA: "0104103",
    NHOM_HOA_CHAT: "0104201",
    NHOM_HOA_CHAT_THEM: "0104202",
    NHOM_HOA_CHAT_SUA: "0104203",
    CDHA_TDCN: "0104301",
    CDHA_TDCN_THEM: "0104302",
    CDHA_TDCN_SUA: "0104303",
    VAT_TU: "0104401",
    VAT_TU_THEM: "0104402",
    VAT_TU_SUA: "0104403",
    DICH_VU_XN: "0104501",
    DICH_VU_XN_THEM: "0104502",
    DICH_VU_XN_SUA: "0104503",
    HOA_CHAT: "0104601",
    HOA_CHAT_THEM: "0104602",
    HOA_CHAT_SUA: "0104603",
    THUOC: "0104701",
    THUOC_THEM: "0104702",
    THUOC_SUA: "0104703",
    DV_PHAU_THUAT_THU_THUAT: "0104801",
    DV_PHAU_THUAT_THU_THUAT_THEM: "0104802",
    DV_PHAU_THUAT_THU_THUAT_SUA: "0104803",
    CHE_PHAM_MAU: "0104901",
    CHE_PHAM_MAU_THEM: "0104902",
    CHE_PHAM_MAU_SUA: "0104903",
    // DV_NGOAI_DIEU_TRI: "0105001",
    // DV_NGOAI_DIEU_TRI_THEM: "0105002",
    // DV_NGOAI_DIEU_TRI_SUA: "0105003",
    DIA_CHI_HANH_CHINH: "0105101",
    DIA_CHI_HANH_CHINH_THEM: "0105102",
    DIA_CHI_HANH_CHINH_SUA: "0105103",
    NHOM_DICH_VU: "0105201",
    NHOM_DICH_VU_THEM: "0105202",
    NHOM_DICH_VU_SUA: "0105203",
    DON_VI_TINH: "0105301",
    DON_VI_TINH_THEM: "0105302",
    DON_VI_TINH_SUA: "0105303",
    NHOM_THUOC: "0105401",
    NHOM_THUOC_THEM: "0105402",
    NHOM_THUOC_SUA: "0105403",
    PHAN_LOAI_THUOC: "0105501",
    PHAN_LOAI_THUOC_THEM: "0105502",
    PHAN_LOAI_THUOC_SUA: "0105503",
    PHAN_NHOM_THUOC: "0105601",
    PHAN_NHOM_THUOC_THEM: "0105602",
    PHAN_NHOM_THUOC_SUA: "0105603",
    // end view
    GOI_DICH_VU: "0105701",
    GOI_DICH_VU_SUA: "0105703",
    GOI_DICH_VU_THEM: "0105702",
    BAO_CAO: "0105801",
    BAO_CAO_SUA: "0105803",
    BAO_CAO_THEM: "0105802",
    MAY_IN: "0105901",
    MAY_IN_SUA: "0105903",
    NHOM_CHI_SO: "0106101",
    NHOM_CHI_SO_SUA: "0106103",
    NHOM_CHI_SO_THEM: "0106102",
    MAU_KET_QUA_XN: "0106201",
    MAU_KET_QUA_XN_SUA: "0106203",
    MAU_KET_QUA_XN_THEM: "0106202",
    NOI_LAY_BENH_PHAM: "0106301",
    NOI_LAY_BENH_PHAM_SUA: "0106303",
    NOI_LAY_BENH_PHAM_THEM: "0106302",
    // view
    NGUON_NHAP_KHO: "0106801",
    NGUON_NHAP_KHO_THEM: "0106802",
    NGUON_NHAP_KHO_SUA: "0106803",
    HINH_THUC_NHAP_XUAT_LOAI_XUAT: "0106901",
    HINH_THUC_NHAP_XUAT_LOAI_XUAT_THEM: "0106902",
    HINH_THUC_NHAP_XUAT_LOAI_XUAT_SUA: "0106903",
    BO_CHI_DINH: "0107001",
    BO_CHI_DINH_THEM: "0107002",
    BO_CHI_DINH_SUA: "0107003",
    CHUONG_TRINH_GIAM_GIA: "0107101",
    CHUONG_TRINH_GIAM_GIA_THEM: "0107102",
    CHUONG_TRINH_GIAM_GIA_SUA: "0107103",
    NGUON_NGUOI_BENH: "0107401",
    NGUON_NGUOI_BENH_THEM: "0107402",
    NGUON_NGUOI_BENH_SUA: "0107403",
    HANG_THE: "0108101",
    HANG_THE_THEM: "0108102",
    HANG_THE_SUA: "0108103",
    XUAT_XU: "0107501",
    XUAT_XU_THEM: "0107502",
    XUAT_XU_SUA: "0107503",
    QUYEN_KY: "0107601",
    QUYEN_KY_THEM: "0107602",
    QUYEN_KY_SUA: "0107603",
    QUYEN_KY_XOA: "0107604",
    DICH_VU_KHAM_BENH: "0101301",
    DICH_VU_KHAM_BENH_THEM: "0101302",
    DICH_VU_KHAM_BENH_SUA: "0101303",
    LOAI_PHIEU: "0107701",
    LOAI_PHIEU_THEM: "0107702",
    LOAI_PHIEU_SUA: "0107703",
    LOAI_PHIEU_XOA: "0107704",
    MAU_QMS: "0108001",
    MAU_QMS_THEM: "0108002",
    MAU_QMS_SUA: "0108003",
    MAU_QMS_XOA: "0108004",
    LIEU_DUNG_BS: "0108201",
    LIEU_DUNG_BS_THEM: "0108202",
    LIEU_DUNG_BS_SUA: "0108203",
    THUOC_KE_NGOAI: "0108301",
    THUOC_KE_NGOAI_THEM: "0108302",
    THUOC_KE_NGOAI_SUA: "0108303",
    HDSD: "0108401",
    HDSD_THEM: "0108402",
    HDSD_SUA: "0108403",
    HOI_DONG: "0108801",
    HOI_DONG_THEM: "0108802",
    HOI_DONG_SUA: "0108803",
    // end view
  },
  THIET_LAP_CHUNG: "0107201",
  THIET_LAP_CHUNG_SUA: "0107203",
  THIET_LAP_CHUNG_THEM: "0107202",
  THIET_LAP: {
    KIOSK: "0107901",
    KIOSK_THEM: "0107902",
    KIOSK_SUA: "0107903",
  },
  CDHA_TDCN: {
    CHO_TIEP_DON: "0107901",
    CHO_TIEP_DON_THEM: "0107902",
    CHO_TIEP_DON_SUA: "0107903",
  },
  QUAN_LY_TAI_KHOAN: {
    QUYEN: "0106001",
    QUYEN_SUA: "0106003",
    QUYEN_THEM: "0106002",
    VAI_TRO_HE_THONG: "0106401",
    VAI_TRO_HE_THONG_SUA: "0106403",
    VAI_TRO_HE_THONG_THEM: "0106402",
    NHOM_TINH_NANG: "0106501",
    NHOM_TINH_NANG_SUA: "0106503",
    NHOM_TINH_NANG_THEM: "0106502",
    NHAN_VIEN: "0106701",
    NHAN_VIEN_THEM: "0106702",
    NHAN_VIEN_SUA: "0106703",
    QUAN_LY_TAI_KHOAN: "0107301",
    QUAN_LY_TAI_KHOAN_THEM: "0107302",
    QUAN_LY_TAI_KHOAN_SUA: "0107303",
  },
  XET_NGHIEM: {
    MH_LAY_MAU: "0600102",
    XAC_NHAN_LAY_MAU: "0600104",
    DS_NB_TIEP_THEO: "0600101",
    TIEP_NHAN_MAU: "0600103",
    BO_QUA: "0600105",
    THONG_TIN_NB: "0300110",
    XET_NGHIEM_HH: "0600201",
    TIEP_NHAN_MAU_HH: "0600202",
    HUY_MAU_HH: "0600203",
    NHAP_KET_QUA_HH: "0600204",
    DUYET_KET_QUA_HH: "0600205",
    IN_KET_QUA_HH: "0600206",
    HUY_DUYET_KET_QUA_HH: "0600207",
    XET_NGHIEM_GPB: "0600301",
    TIEP_NHAN_MAU_GPB: "0600302",
    HUY_MAU_GPB: "0600303",
    NHAP_KET_QUA_GPB: "0600304",
    DUYET_KET_QUA_GPB: "0600305",
    IN_KET_QUA_GPB: "0600306",
    HUY_DUYET_KET_QUA_GPB: "0600307",
  },
  CHAN_DOAN_HINH_ANH: {
    CHO_TIEP_DON: "0700101",
    THONG_TIN_NGUOI_BENH: "0300110",
    PHAN_PHONG_CHO_TIEP_DON: "0700102",
    TIEP_NHAN: "0700202",
    NB_TIEP_THEO: "0700201",
    TIEP_NHAN_DICH_VU: "0700203",
    HUY_TIEP_NHAN_DICH_VU: "0700204",
    CO_KET_QUA: "0700205",
    HUY_CO_KET_QUA: "0700206",
    IN_KET_QUA: "0700207",
    CHI_DICH_DV: "0700208",
  },
  KHAM_BENH: {
    XEM: "0500101",
    GOI_NB_TIEP_THEO: "0500102",
    XEM_SO_TIEN: "0500103",
  },
  HE_THONG: {
    DANH_MUC: "000101",
    TIEP_DON: "000301",
    THU_NGAN: "000401",
    KIOSK: "000201",
    KHAM_BENH: "000501",
    XET_NGHIEM: "000601",
    CDHA_TDCN: "000701",
    KHO: "000801",
    KY_SO: "000901",
    HO_SO_BENH_AN: "001001",
    NHA_THUOC: "001101",
    THEO_DOI_DIEU_TRI: "001201",
    QUAN_TRI_HE_THONG: "001301",
    THIET_LAP: "001401",
    BAO_CAO: "001501",
    QUAN_LY_THONG_BAO: "001601",
  }
};

export const LOAI_PHONG = {
  LAM_SANG: 10,
  CAN_LAM_SANG: 20,
  PHONG_KHAM: 30,
  LAY_MAU_BENH_PHAM: 40,
  PHONG_GIUONG: 50,
  PHONG_GIUONG_TU_CHON: 60,
  KHAC: 70,
};

export const SORT_LOAD_MORE = "ten,asc";

export const TIEPDON_CLS = [
  {
    id: "",
    ten: "Tất cả",
  },
  {
    id: "true",
    ten: "Có",
  },
  {
    id: "false",
    ten: "Không",
  },
];
export const THANH_TOAN_SAU = [
  {
    id: "",
    ten: "Tất cả",
  },
  {
    id: "true",
    ten: "Thanh toán sau",
  },
  {
    id: "false",
    ten: "Không thanh toán sau",
  },
];

export const DANH_CHO_THUOC = [
  { id: "", ten: "Tất cả" },
  { id: "true", ten: "Dành cho thuốc" },
  { id: "false", ten: "Không dành cho thuốc" },
];

export const SORT_DEFAULT_DICH_VU = {
  active: 2,
  ["dichVu.ma"]: 1,
  updatedOn: 2,
};

export const TRANG_THAI_DICH_VU = {
  CHO_TIEP_DON_CLS: 15,
  CHO_KHAM: 20,
  CHO_TIEP_NHAN: 25,
  DA_CHECKIN_KHAM: 30,
  DA_CHECKIN: 35,
  CHUAN_BI_KHAM: 40,
  CHUAN_BI_THUC_HIEN: 43,
  CHUAN_BI_LAY_MAU: 46,
  BO_QUA: 50,
  DANG_KHAM: 60,
  DA_TIEP_NHAN: 63,
  DA_LAU_MAU: 66,
  DANG_THUC_HIEN_DICH_VU: 70,
  HUY_MAU: 80,
  TIEP_NHAN_MAU: 90,
  CHO_KET_LUAN: 100,
  DA_CHECKIN_KET_LUAN: 110,
  CHUAN_BI_KET_LUAN: 120,
  BO_QUA_KET_LUAN: 130,
  DANG_KET_LUAN: 140,
  DA_KET_LUAN: 150,
  DA_CO_KET_QUA: 155,
  DA_DUYET: 160,
};

//=================================== kho
export const TRANG_THAI_PHIEU = [
  { label: "Tạo mới", value: 10 },
  { label: "Tạo mới, đã giữ chỗ", value: 15 },
  { label: "Chờ duyệt", value: 20 },
  { label: "Hoàn thành", value: 30 },
];
export const LOAI_PHIEU_XUAT = [
  { ten: "Xem phiếu duyệt dự trù", id: 1 },
  { ten: "Xem phiếu xuất", id: 2 },
];

export const TK_TRANG_THAI_PHIEU_NHAP_DU_TRU = [
  { label: "Chờ duyệt", value: 20 },
  { label: "Hoàn thành", value: 30 },
];
export const TK_TRANG_THAI_PHIEU_NHAP_XUAT = [
  { label: "Tạo mới", value: 10 },
  { label: "Tạo mới, đã giữ chỗ", value: 15 },
  { label: "Chờ duyệt", value: 20 },
  { label: "Hoàn thành", value: 30 },
];

export const TRANG_THAI_DON_THUOC = [
  // { label: "Tất cả", value: 10 },
  { label: "Tạo mới", value: 15 }, // 10 , 15 , 20 = tạo mới
  { label: "Đã phát", value: 30 }, // 30 , 35  = đã phát => số liệu anh Minh đưa
  // { label: "Tất cả", value: 10 },
  // { label: "Chưa giữ chỗ", value: 20 },
  // { label: "Chờ phát", value: 30 },
  // { label: "Đã phát", value: 40 },
];

export const THANG_DU_TRU = [
  { id: "1", ten: 1 },
  { id: "2", ten: 2 },
  { id: "3", ten: 3 },
  { id: "4", ten: 4 },
  { id: "5", ten: 5 },
  { id: "6", ten: 6 },
  { id: "7", ten: 7 },
  { id: "8", ten: 8 },
  { id: "9", ten: 9 },
  { id: "10", ten: 10 },
  { id: "11", ten: 11 },
  { id: "12", ten: 12 },
];

export const HINH_THUC_NHAP_XUAT = {
  HINH_THUC_NHAP: 10,
  LOAI_XUAT: 20,
};

export const LOAI_CHIET_KHAU = {
  PHAN_TRAM: 1,
  TIEN: 2,
};

export const IN_NHANH_KYSO = [
  {
    id: "",
    ten: "Tất cả",
  },
  {
    id: true,
    ten: "Có",
  },
  {
    id: false,
    ten: "Không",
  },
];

export const DATA_TIME_QMS = [
  {
    title: "Sáng từ",
    value: "thoiGianSangTu",
  },
  {
    title: "đến",
    value: "thoiGianSangDen",
  },
  {
    title: "Chiều từ",
    value: "thoiGianChieuTu",
  },
  {
    title: "đến",
    value: "thoiGianChieuDen",
  },
];

export const LOAI_QMS = [
  {
    id: 20,
    ten: "QMS CĐHA - TDCN",
  },
  {
    id: 30,
    ten: "QMS khám bệnh",
  },
  {
    id: 40,
    ten: "QMS xét nghiệm",
  },
];

export const TRANG_THAI_DIEU_TRI = [
  {
    ten: "Tất cả",
    id: "",
  },
  {
    ten: "Đang theo dõi",
    id: false,
  },
  {
    ten: "Đã kết thúc theo dõi",
    id: true,
  },
];

export const NHOM_DANH_MUC = {
  CHUYEN_KHOA_MAT: 0,
  CAP_CUU: 1,
  KHO: 2,
  KY_IN_PHIEU: 3,
  DICH_VU: 4,
  HANH_CHINH: 5,
  CHUNG: 6,
  KHACH_HANG: 7,
};


export const NHOM_BAO_CAO = {
  BAO_CAO_TAI_CHINH: 0,
  BAO_CAO_DICH_VU: 1,
  BAO_CAO_PHONG_KHAM: 2,
  BAO_CAO_KHO: 3,
};

export const MUC_DO_UU_TIEN = [
  {
    id: 10,
    ten: "4",
  },

  {
    id: 20,
    ten: "3",
  },
  {
    id: 30,
    ten: "2",
  },
  {
    id: 40,
    ten: "1",
  },
];
export const TRANG_THAI_PHIEU_HOAN = [
  { label: "Chờ Hoàn", value: 15 }, // 10 , 15 , 20 = tạo mới
  { label: "Hoàn Thành", value: 30 }, // 30 , 35  = đã phát => số liệu anh Minh đưa
];
