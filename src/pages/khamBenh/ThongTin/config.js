import React from "react";
import IcThongTinCoBan from "assets/images/khamBenh/icThongTinCoBan.svg";
import IcChiDinh from "assets/images/khamBenh/icChiDinh.svg";
import IcKetQua from "assets/images/khamBenh/icKetQua.svg";
import IcKetLuan from "assets/images/khamBenh/icKetLuan.svg";
import IcDonThuoc from "assets/images/khamBenh/icDonThuoc.svg";
import { TRANG_THAI_DICH_VU } from "constants/index";

export const listNav = [
  {
    title: "THÔNG TIN KHÁM CƠ BẢN",
    icon: <IcThongTinCoBan />,
    // dataChild: ["Khám chung", "Khám chuyên khoa", "Khám sức khỏe"],
    dataChild: ["Khám chung" , "Khám covid"], //yến confirm bỏ
    color: "#B3304C",
    itemKey: "0",
    trangThai: 0,
  },
  {
    title: "CHỈ ĐỊNH",
    icon: <IcChiDinh />,
    dataChild: ["Xét nghiệm", "CDHA - TDCN", "Cam kết nội soi"],
    color: "#4C0398",
    itemKey: "1",
    trangThai: TRANG_THAI_DICH_VU.DANG_KHAM,
  },
  {
    title: "KẾT QUẢ XN - CLS",
    icon: <IcKetQua />,
    dataChild: ["Xét nghiệm", "CDHA - TDCN"],
    color: "#054AB9",
    itemKey: "2",
    trangThai: TRANG_THAI_DICH_VU.DANG_THUC_HIEN_DICH_VU,
  },
  {
    title: "KẾT LUẬN KHÁM",
    icon: <IcKetLuan />,
    dataChild: ["Tổng hợp khám chữa bệnh", "Giấy hẹn khám"],
    color: "#069BA7",
    itemKey: "3",
    trangThai: TRANG_THAI_DICH_VU.DANG_KET_LUAN,
  },
  {
    title: "ĐƠN THUỐC",
    icon: <IcDonThuoc />,
    dataChild: ["Đơn nhà thuốc", "Đơn TPCN", "Đơn gây nghiện"],
    color: "#049254",
    itemKey: "4",
    trangThai: TRANG_THAI_DICH_VU.DA_KET_LUAN,
  },
];
