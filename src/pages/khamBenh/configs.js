export const MAX_NUMBER_SICK = 20;

export const infoPatients = [
  {
    title: "Đợi khám",
    dataIndex: "doiKham",
    key: "doiKham",
    background: "#C1F3F7",
  },
  {
    title: "Đã khám",
    dataIndex: "daKham",
    key: "daKham",
    background: "#C1D8FD",
  },
  {
    title: "Đợi kết luận",
    dataIndex: "doiKetLuan",
    key: "doiKetLuan",
    background: "#D9C0F2",
  },
  {
    title: "Đã kết luận",
    dataIndex: "daKetLuan",
    key: "daKetLuan",
    background: "#C1F0DB",
  },
  {
    title: "Bỏ khám",
    dataIndex: "boKham",
    key: "boKham",
    background: "#FECECE",
  },
];

export const FRAME_TITLE = [
  "Khám nội",
  "Phiếu chỉ định",
  "Kết quả XN - CLS",
  "Kết luận khám",
  "Đơn thuốc",
];

export const HUONG_DIEU_TRI_KHAM = {
  CHO_VE: 10,
  HEN_KHAM: 20,
  NHAP_VIEN: 30,
  CHUYEN_VIEN: 40,
  KHONG_KHAM: 100,
};

export const KET_QUA_KHAM = {
  DO: 1,
  KHOI: 2,
  KHONG_THAY_DOI: 3,
  NANG_HON: 4,
  TU_VONG: 5,
  KHONG_DANH_GIA: 10,
};

export const TRANG_THAI_KHAM_BN = [
  { id: 20, ten: "Chờ khám" },
  { id: 60, ten: "Đang khám" },
  { id: 70, ten: "Đang thực hiện DV" },
  { id: 100, ten: "Chờ kết luận" },
  { id: 140, ten: "Đang kết luận" },
  { id: 150, ten: "Đã kết luận" },
  { id: 50, ten: "Bỏ qua" },
];

export const LOAI_DICH_VU = [
  {
    ten: "Khám",
    id: 10,
  },
  {
    ten: "Xét nghiệm",
    id: 20,
  },
  {
    ten: "Cận lâm sàng",
    id: 30,
  },
  {
    ten: "Gói DV",
    id: 150,
  },
  {
    ten: "Tất cả",
    id: "",
  },
];

export const LOAI_DICH_VU_CHI_DINH = [
  {
    ten: "Khám",
    id: 10,
  },
  {
    ten: "Xét nghiệm",
    id: 20,
  },
  {
    ten: "Cận lâm sàng",
    id: 30,
  },
  {
    ten: "Gói DV",
    id: 150,
  },
  {
    ten: "Tất cả loại phiếu chỉ định",
    id: "",
  },
];
export const LOAI_DICH_VU_DON_THUOC = [
  {
    ten: "Khám",
    id: 10,
  },
  {
    ten: "Xét nghiệm",
    id: 20,
  },
  {
    ten: "Cận lâm sàng",
    id: 30,
  },
  {
    ten: "Gói DV",
    id: 150,
  },
  {
    ten: "Tất cả các nhóm thuốc",
    id: "",
  },
];

export const TITLE_KET_LUAN_KHAM = {
  10: "",
  20: "GIẤY HẸN KHÁM LẠI",
  30: "PHIẾU KHÁM BỆNH VÀO VIỆN",
  40: "GIẤY CHUYỂN TUYẾN KHÁM BỆNH, CHỮA BỆNH BHYT",
  100: "",
};

export const ALL_DON_THUOC = [
  {
    ten: "Thuốc nhà thuốc",
    id: 10,
  },
  {
    ten: "Thuốc BHYT",
    id: 20,
  },
  {
    ten: "Thuốc tủ trực",
    id: 30,
  },
  {
    ten: "Thuốc kê ngoài",
    id: 150,
  },
  // {
  //   ten: "Tất cả loại thuốc",
  //   id: "",
  // },
];

export const LOAI_DON_THUOC = [
  {
    ten: "Thuốc nhà thuốc",
    id: 10,
  },
  {
    ten: "Thuốc tủ trực",
    id: 30,
  },
  {
    ten: "Thuốc kê ngoài",
    id: 150,
  },
  // {
  //   ten: "Tất cả loại thuốc",
  //   id: "",
  // },
];