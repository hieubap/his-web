import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Main } from "./styled";
import { useDispatch, useSelector } from "react-redux";
const ThongTinSoTien = (props) => {
  const [state, _setState] = useState({
    tienDvMoi: 0,
    tienDvTraLai: 0,
    tienNbTraThem: 0,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { nbDotDieuTriId } = props;
  const dispatch = useDispatch();
  const { thongTinTongTienNB } = dispatch.nbDotDieuTri;
  const { chiTietPhieuDoiTra } = useSelector(
    (state) => state.danhSachPhieuYeuCauHoan
  );

  const { data } = useSelector((state) => state.nbDotDieuTri);
  useEffect(() => {
    setState({
      tienDvMoi: chiTietPhieuDoiTra?.thanhTienMoi || 0,
      tienDvTraLai: chiTietPhieuDoiTra?.thanhTienCu || 0,
      tienNbTraThem:
        chiTietPhieuDoiTra?.thanhTienMoi - chiTietPhieuDoiTra?.thanhTienCu || 0,
    });
  }, [chiTietPhieuDoiTra]);

  return (
    <Main>
      <div className="title">Thông tin số tiền</div>
      <div className="row-money">
        <span className="label">Tổng tiền DV mới</span>{" "}
        <span className="money">{state?.tienDvMoi.formatPrice()} đ</span>
      </div>
      <div className="row-money">
        <span className="label">Tổng tiền DV trả lại</span>{" "}
        <span className="money">{state?.tienDvTraLai.formatPrice()} đ</span>
      </div>
      <div className="row-money">
        <span className="label">Tổng tiền DV thêm</span>{" "}
        <span className="money">{state?.tienNbTraThem.formatPrice()} đ</span>
      </div>
    </Main>
  );
};

export default ThongTinSoTien;
