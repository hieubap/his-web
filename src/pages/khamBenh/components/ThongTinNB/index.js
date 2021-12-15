import React, { useEffect } from "react";
import moment from "moment";
import { connect, useDispatch, useSelector } from "react-redux";
import { Main, MainStep, MainInfo } from "./styled";
import IconChuaThucHien from "assets/images/khamBenh/iconChuaThucHien.png";
import IconDangThucHien from "assets/images/khamBenh/iconDangThucHien.png";
import IconHoanThanh from "assets/images/khamBenh/iconHoanThanh.png";
import { Col, Row } from "antd";
import HanhTrinhKham from "./HanhTrinhKham";
import { checkRole } from "app/Sidebar/constant";
import { ROLES } from "constants/index";

export const ThongTinBN = (props) => {
  const {
    thongTinKhamBN: {
      tienChuaThanhToan,
      gioiTinh,
      ngaySinh,
      tenNb,
      tienVienPhi,
      tienBhThanhToan,
      tienThuoc,
      dsKham = [],
    },
    infoNb,
  } = useSelector((state) => state.khamBenh);
  const { listgioiTinh = [] } = useSelector((state) => state.utils);

  const trangThaiKham = useSelector(
    (state) => state.khamBenh.thongTinChiTiet?.nbDvKyThuat?.trangThai
  );
  const { getHanhTrinhKham } = useDispatch().khamBenh;
  const { getUtils } = useDispatch().utils;
  useEffect(() => {
    getUtils({ name: "gioiTinh" });
    getUtils({ name: "loaiMau" });
    getUtils({ name: "trangThaiDichVu" });
  }, []);
  useEffect(() => {
    if (infoNb?.nbDotDieuTriId) {
      getHanhTrinhKham({ nbDotDieuTriId: infoNb?.nbDotDieuTriId });
    }
  }, [infoNb, trangThaiKham]);
  const gt = listgioiTinh.find((item) => item.id === gioiTinh) || {};
  const age = `${
    new Date().getFullYear() - moment(ngaySinh).format("YYYY")
  }tuổi`;
  return (
    <Main className="marginTop">
      <MainStep>
        <Col xs={8}>
          <img src={IconChuaThucHien} alt="IconChuaThucHien" /> Chưa thực hiện
        </Col>
        <Col xs={8}>
          <img src={IconDangThucHien} alt="IconDangThucHien" /> Đang thực hiện
        </Col>
        <Col xs={8}>
          <img src={IconHoanThanh} alt="IconHoanThanh" /> Hoàn thành
        </Col>
      </MainStep>
      <MainInfo>
        <div className="info-partient">
          <div className="info-partient__index">
            {dsKham?.length ? dsKham[0].stt : ""}
          </div>
          <div className="info-partient__name">
            <span>{tenNb}</span>
            {gt.ten && age && ` (${gt.ten && `${gt.ten} - `} ${age})`}
            <div className="info-partient__mhs">
              Mã hồ sơ: {infoNb?.maHoSo} - Mã NB: {infoNb?.maNb}
            </div>
          </div>
        </div>
        {checkRole([ROLES["KHAM_BENH"].XEM_SO_TIEN]) && <Row className="info-price">
          <Col xs={12} style={{ color: "#FC3B3A" }}>
            Chưa thanh toán:
            {(tienChuaThanhToan && ` ${tienChuaThanhToan.formatPrice()}đ`) ||
              ` ${0}đ`}
          </Col>
          <Col xs={12} style={{ color: "#049254" }}>
            Tổng viện phí:
            {(tienVienPhi && ` ${tienVienPhi.formatPrice()}đ`) || ` ${0}đ`}
          </Col>
          <Col xs={12} style={{ color: "#BF9806" }}>
            BHYT thanh toán:
            {(tienBhThanhToan && ` ${tienBhThanhToan.formatPrice()}đ`) ||
              ` ${0}đ`}
          </Col>
          <Col xs={12} style={{ color: "#0762F7" }}>
            Tổng đơn thuốc:
            {(tienThuoc && ` ${tienThuoc.formatPrice()}đ`) || ` ${0}đ`}
          </Col>
        </Row>}
      </MainInfo>
      <HanhTrinhKham dsKham={dsKham} />
    </Main>
  );
};

export default ThongTinBN;
