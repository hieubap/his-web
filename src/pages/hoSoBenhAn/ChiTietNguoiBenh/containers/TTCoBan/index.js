import { Col, Row, Select, Tooltip, Popover } from "antd";
import Breadcrumb from "components/Breadcrumb";
import React, { useEffect, useRef } from "react";
import RankGoldIcon from "assets/svg/hoSoBenhAn/rankGold.svg";
import EditIcon from "assets/svg/hoSoBenhAn/edit.svg";
import { Main } from "./styled";
import { connect } from "react-redux";
import fileUtils from "utils/file-utils";
import ThongTinNB from "../../../ThongTinNB";

const { Option } = Select;

const TTCoBan = ({
  thongTinBenhNhan,
  listgioiTinh,
  getUtils,
  onClick = () => {},
}) => {
  const refModal = useRef(null);

  useEffect(() => {
    getUtils({ name: "gioiTinh" });
  }, []);
  return (
    <Main>
      <div className="left">
        <div>
          {thongTinBenhNhan.hangThe ? (
            <Popover
              placement="topRight"
              content={
                thongTinBenhNhan.hangThe?.ten +
                ": " +
                thongTinBenhNhan.hangThe?.diemToiThieu +
                " điểm"
              }
            >
              <img
                src={`${fileUtils.absoluteFileUrl(
                  thongTinBenhNhan.hangThe?.icon
                )}`}
                alt=""
              />
            </Popover>
          ) : (
            <RankGoldIcon style={{ width: "25px", height: "25px" }} />
          )}
        </div>
        <div className="ma-nb ml2">Mã NB: {thongTinBenhNhan.maNb}</div>

        <div className="tt-nb ml2" onClick={() => refModal.current.show(true)}>
          <b className="ten-nb">{thongTinBenhNhan.tenNb}</b> (
          {
            listgioiTinh.find((item) => item.id === thongTinBenhNhan?.gioiTinh)
              ?.ten
          }{" "}
          - {thongTinBenhNhan.tuoi} tuổi) - SĐT: {thongTinBenhNhan.soDienThoai}{" "}
          - Mã NB: {thongTinBenhNhan.maNb} - {thongTinBenhNhan.nbDiaChi?.diaChi}
        </div>
      </div>
      <div className="right">
        <Tooltip title="Cập nhật thông tin">
          <EditIcon
            onClick={() => refModal.current.show()}
            style={{ width: "18px", height: "18px", cursor: "pointer" }}
          />
        </Tooltip>
      </div>
      <ThongTinNB ref={refModal} />
    </Main>
  );
};

export default connect(
  ({ nbDotDieuTri: { thongTinBenhNhan }, utils: { listgioiTinh = [] } }) => ({
    thongTinBenhNhan,
    listgioiTinh,
  }),
  ({ utils: { getUtils } }) => ({ getUtils })
)(TTCoBan);
