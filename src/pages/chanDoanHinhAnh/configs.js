export const isNumber = (value) => {
  const regex = /^[0-9\b]+$/;
  return regex.test(value);
};

// utils/enums?name=trangThaiDichVu
export const TRANG_THAI = {
  TIEP_NHAN: [25, 50],
  DA_TIEP_NHAN: [63],
  DA_CO_KET_QUA: [155],
  CHO_TIEP_NHAN: [25, 35, 43],
};
export const TRANG_THAI_FILTER = [66, 90, 155, 160];

export const SERVICE_STATUS = {
  DA_LAY_MAU: 66,
  DA_TIEP_NHAN_MAU: 90,
};

export const dataInfoCommon = [
  {
    title: "Thành tiền:",
    dataIndex: "thanhTien",
    type:"price",
    className: "space-bottom",
  },
  {
    title: "BS chỉ định:",
    dataIndex: "tenBacSiChiDinh",
    className: "",
  },
  {
    title: "Thời gian chỉ định:",
    dataIndex: "thoiGianThucHien",
    type: "datetime",
    className: "",
  },
  {
    title: "Khoa chỉ định:",
    dataIndex: "tenKhoaChiDinh",
    className: "space-bottom",
  },
  {
    title: "Phòng thực hiện:",
    dataIndex: "tenPhongThucHien",
    className: "",
  },
  {
    title: "Thời gian thực hiện:",
    dataIndex: "thoiGianThucHien",
    type: "datetime",
    className: "space-bottom",
  },
  {
    title: "Thời gian tiếp nhận:",
    dataIndex: "thoiGianTiepNhan",
    type: "datetime",
    className: "",
  },
  {
    title: "Người TH chính:",
    dataIndex: "tenNguoiThucHien",
    className: "space-bottom",
  },
  {
    title: "Thời gian có kết quả:",
    dataIndex: "thoiGianCoKetQua",
    type: "datetime",
    className: "",
  },
  {
    title: "BS đọc kết quả:",
    dataIndex: "tenNguoiDocKetQua",
    className: "space-bottom",
  },
  {
    title: "Trạng thái:",
    dataIndex: "trangThai",
    type: "status",
    className: "space-bottom",
  },

  {
    title: "Đã gửi PACS:",
    dataIndex: "guiPacs",
    type: "checkbox",
    className: "",
  },
];

export const FORMAT_DATE = "HH:mm:ss DD/MM/YYYY";

export const LOAI_KET_QUA = {
  SO: 10,
  CHU: 20,
  CHON_GIA_TRI: 30,
};

export const BAT_THUONG = [
  { id: null, ten: "Tất cả" },
  { id: true, ten: "Bất thường" },
  { id: false, ten: "Không bất thường" },
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
    id: 200,
  },
  {
    ten: "Tất cả",
    id: "",
  },
];

export const FRAME_TITLE = [
  "Phiếu chỉ định",
  "Đơn thuốc",
  "Vật tư",
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
    ten: "Tất cả loại thuốc",
    id: "",
  },
];