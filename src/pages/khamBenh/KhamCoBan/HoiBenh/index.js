import React, { useState } from "react";
import { Col, Row } from "antd";
import TextField from "components/TextField";
import { Title } from "../styled";
import { useSelector } from "react-redux";

function HoiBenh(props) {
  const { nbHoiBenh, nbKhamXet } = useSelector(
    (state) => state.khamBenh.thongTinChiTiet || {}
  );
  const trangThaiKham = useSelector(
    (state) => state.khamBenh.thongTinChiTiet?.nbDvKyThuat?.trangThai
  );
  const [state, _setState] = useState({
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { handleSetData } = props;
  const { toanThan, cacBoPhan, ghiChu } = nbKhamXet || {};
  const { quaTrinhBenhLy, tienSuBanThan, tienSuGiaDinh } = nbHoiBenh || {};

  return (
    <Row>
      <Col xs={24} md={12} className="paddingRight">
        <Title>III. HỎI BỆNH</Title>
        <TextField
          label="1. Quá trình bệnh lý"
          html={quaTrinhBenhLy}
          onChange={handleSetData(["nbHoiBenh", "quaTrinhBenhLy"])}
          maxLength={2000}
        />
        <div>2. Tiền sử bệnh:</div>
        <TextField
          label="- Bản thân"
          maxLength={2000}
          html={tienSuBanThan}
          onChange={handleSetData(["nbHoiBenh", "tienSuBanThan"])}
        />
        <TextField
          label="- Gia đình"
          maxLength={2000}
          html={tienSuGiaDinh}
          onChange={handleSetData(["nbHoiBenh", "tienSuGiaDinh"])}
        />
      </Col>
      <Col xs={24} md={12} className="paddingLeft">
        <Title>IV. KHÁM XÉT</Title>
        <TextField
          label="1. Toàn thân"
          maxLength={2000}
          html={toanThan}
          disabled={trangThaiKham === 150}
          onChange={handleSetData(["nbKhamXet", "toanThan"])}
        />
        <TextField
          label="2. Các bộ phận"
          // maxLine={2}
          disabled={trangThaiKham === 150}
          maxLength={2000}
          html={cacBoPhan}
          onChange={handleSetData(["nbKhamXet", "cacBoPhan"])}
        />
        <TextField
          label="3. Lưu ý"
          // maxLine={2}
          disabled={trangThaiKham === 150}
          maxLength={2000}
          html={ghiChu}
          onChange={handleSetData(["nbKhamXet", "ghiChu"])}
        />
      </Col>
    </Row>
  );
}

export default HoiBenh;
