import React from "react";
import IcThongTinCoBan from "assets/images/khamBenh/icThongTinCoBan.svg";
import IcChiDinh from "assets/images/khamBenh/icChiDinh.svg";
import IcKetQua from "assets/images/khamBenh/icKetQua.svg";
import IcKetLuan from "assets/images/khamBenh/icKetLuan.svg";
import IcDonThuoc from "assets/images/khamBenh/icDonThuoc.svg";

export const listNav = [
  {
    title: "CHỈ ĐỊNH",
    icon: <IcChiDinh />,
    dataChild: ["Xét nghiệm", "CDHA - TDCN", "Cam kết nội soi"],
    color: "#4C0398",
    itemKey: "0",
  },
  {
    title: "Kết quả XN - CĐHA - TDCN",
    icon: <IcKetQua />,
    dataChild: ["Xét nghiệm", "CDHA - TDCN"],
    color: "#054AB9",
    itemKey: "3",
  },
  {
    title: "ĐƠN THUỐC",
    icon: <IcDonThuoc />,
    dataChild: ["Đơn thuốc thường"],
    color: "linear-gradient(0deg, #049254, #049254), #0762F7",
    itemKey: "1",
  },
  {
    title: "VẬT TƯ ",
    icon: <IcKetLuan />,
    dataChild: ["Kho tủ trực"],
    color: "linear-gradient(0deg, #069BA7, #069BA7), #0762F7",
    itemKey: "2",
  },
];
