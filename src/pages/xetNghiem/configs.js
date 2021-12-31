export const isNumber = (value) => {
  const regex = /^[0-9\b]+$/;
  return regex.test(value);
};

// utils/enums?name=trangThaiDichVu
export const TRANG_THAI = {
  CHO_TIEP_NHAN: [15],
  CHUAN_BI_LAY_MAU: [46, 38, 62],
  BO_QUA: [50],
  HUY_MAU: [80],
  XAC_NHAN_LAY_MAU: [25],
  XAC_NHAN_TIEP_NHAN_MAU: [66],
  XAC_NHAN_KET_QUA: [90],
  CO_KET_QUA: [155],
  DUYET_KET_QUA: [160],
  IN: [160, 90, 155],
  SAVE: [15, 46, 50, 25, 90]
};

export const TRANG_THAI_FILTER = [66, 90, 155, 160];
export const TRANG_THAI_FILTER_LAY_MAU = [25, 46, 50, 80];

export const SERVICE_STATUS = {
  DA_LAY_MAU: 66,
  DA_TIEP_NHAN_MAU: 90,
};

export const dataInfoCommon = [
  {
    title: "BS chỉ định:",
    dataIndex: "tenBacSiChiDinh",
    className: "space-bottom",
  },
  {
    title: "Phòng thực hiện:",
    dataIndex: "tenPhongThucHien",
    className: "space-bottom",
  },
  {
    title: "TG lấy mẫu:",
    dataIndex: "thoiGianLayMau",
    type: "datetime",
    className: "",
  },
  {
    title: "Người lấy mẫu:",
    dataIndex: "tenNguoiLayMau",
    className: "space-bottom",
  },
  {
    title: "TG tiếp nhận mẫu:",
    dataIndex: "thoiGianTiepNhanMau",
    type: "datetime",
    className: "",
  },
  {
    title: "Người tiếp nhận:",
    dataIndex: "tenNguoiTiepNhanMau",
    className: "space-bottom",
  },
  {
    title: "TG có kết quả:",
    dataIndex: "thoiGianCoKetQua",
    type: "datetime",
    className: "",
  },
  {
    title: "Người thực hiện:",
    dataIndex: "tenNguoiThucHien",
    className: "space-bottom",
  },
  {
    title: "TG duyệt kết quả:",
    dataIndex: "thoiGianDuyetKetQua",
    type: "datetime",
    className: "",
  },
  {
    title: "Người duyệt:",
    dataIndex: "tenNguoiDuyetKetQua",
    className: "space-bottom",
  },
  { title: "Chỉ số thấp:", dataIndex: "chiSoThap", className: "" },
  { title: "Chỉ số cao:", dataIndex: "chiSoCao", className: "space-bottom" },
  {
    title: "Trạng thái:",
    dataIndex: "trangThai",
    type: "status",
    className: "",
  },
  { title: "Đã gửi LIS:", dataIndex: "guiLis", className: "" },
];

export const FORMAT_DATE = "HH:mm:ss DD/MM/YYYY";

export const LOAI_KET_QUA = {
  SO: 10,
  CHU: 20,
  CHON_GIA_TRI: 30,
};

export const CHON_KET_QUA = [
  { id: "1", ten: "Dương tính" },
  { id: "-1", ten: "Âm tính" },
];

export const BAT_THUONG = [
  { id: null, ten: "Tất cả" },
  { id: true, ten: "Bất thường" },
  { id: false, ten: "Không bất thường" },
];
