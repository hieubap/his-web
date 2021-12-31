import { Col, Row, Select, Tooltip, Popover } from "antd";
import Breadcrumb from "components/Breadcrumb";
import React, { useEffect, useRef } from "react";
import RankGoldIcon from "assets/svg/hoSoBenhAn/rankGold.svg";
import EditIcon from "assets/svg/hoSoBenhAn/edit.svg";
import { Main } from "./styled";
import { connect } from "react-redux";
import fileUtils from "utils/file-utils";
// import ThongTinNB from "../../../ThongTinNB";

const { Option } = Select;

const TTCoBan = ({
  thongTinBenhNhan,
  listgioiTinh,
  getUtils,
  onClick = () => { },
  listData
}) => {
  useEffect(() => {
    getUtils({ name: "gioiTinh" });
  }, []);
  return (
    <Main>
      <div className="left">
        <div className="ma-nb ml2">Mã NB-{listData[0]?.maNb}</div>
        <div className="tt-nb ml2">
          <b>{listData[0]?.tenNb}</b> (
          {
            listgioiTinh.find((item) => item.id === listData[0]?.gioiTinh)
              ?.ten
          }{" "}
          - {listData[0]?.tuoi} tuổi) - SĐT: {listData[0]?.soDienThoai}{" "}
          - Mã hồ sơ: {listData[0]?.maHoSo} - {listData[0]?.diaChi}
        </div>
      </div>
    </Main>
  );
};

export default connect(
  ({ nbDotDieuTri: { thongTinBenhNhan },
    utils: { listgioiTinh = [] },
    lichSuKyLichSuPhieu: { listData },
  }) => ({
    thongTinBenhNhan,
    listgioiTinh,
    listData
  }),
  ({ utils: { getUtils } }) => ({ getUtils })
)(TTCoBan);
