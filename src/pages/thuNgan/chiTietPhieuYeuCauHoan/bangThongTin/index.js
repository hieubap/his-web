import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Main } from "./styled";
import { Row, div, Checkbox } from "antd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const BangThongTin = (props) => {
  const dispatch = useDispatch();
  const { soPhieu } = props;
  const [state, _setState] = useState({
    dsDichVuHoan: [],
    dsDichVuMoi: [],
    tongThanhTienDvHoan: 0,
    slDsDichVuHoan: 0,
    tongThanhTienDvMoi: 0,
    slDsDichVuMoi: 0,
    showDsDichVuHoan: true,
    showDsDichVuMoi: true,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { chiTietPhieuDoiTra } = useSelector(
    (state) => state.danhSachPhieuYeuCauHoan
  );

  const { listtrangThaiHoan } = useSelector((state) => state.utils);
  const { getUtils } = dispatch.utils;
  useEffect(() => {
    getUtils({ name: "trangThaiHoan" });
  }, []);
  const changeShowDvHoan = () => {
    setState({
      showDsDichVuHoan: !state.showDsDichVuHoan,
    });
  };
  const changeShowDvMoi = () => {
    setState({
      showDsDichVuMoi: !state.showDsDichVuMoi,
    });
  };
  const renderTrangThai = (maTrangThai) => {
    if (listtrangThaiHoan?.length) {
      const trangThai = listtrangThaiHoan.find(
        (trangThai) => trangThai.id == maTrangThai
      );
      return trangThai ? trangThai.ten : "";
    }
  };
  return (
    <Main>
      <div className="thead">
        <div className="notborderL center w60">STT</div>
        <div className="w120">Mã DV</div>
        <div className="w250">Tên DV</div>
        <div className="w120">SL</div>
        <div className="w150">Thành tiền</div>
        <div className="w150">Đơn giá KBH</div>
        <div className="w150">Đơn giá BH</div>
        <div className="w150">Phụ thu</div>
        <div className="w150">Tổng tiền miễn giảm</div>
        <div className="w150">Trạng thái hoàn</div>
        <div className="w150">Tự trả</div>
        <div className="notborderR w150">Không tính tiền</div>
      </div>
      <div className="tbody">
        <div style={{ display: "flex" }}>
          <div
            className="notborderL notborderR bgTitle w60"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            span={1}
          >
            {state.showDsDichVuHoan ? (
              <span className="triangle-up" onClick={changeShowDvHoan}></span>
            ) : (
              <span className="triangle-down" onClick={changeShowDvHoan}></span>
            )}
          </div>
          <div className="title-dich-vu bold bgTitle w370">
            Danh sách dịch vụ hoàn
          </div>
          <div className="bold bgTitle right w120">
            {chiTietPhieuDoiTra?.slDsDichVuHoan.formatPrice()}
          </div>
          <div className="bold bgTitle right w150">
            {chiTietPhieuDoiTra?.tongThanhTienDvHoan.formatPrice()}
          </div>
          <div className="bgTitle w150"></div>
          <div className="bgTitle w150"></div>
          <div className="bgTitle w150"></div>
          <div className="bgTitle w150"></div>
          <div className="bgTitle w150"></div>
          <div className="bgTitle w150"></div>
          <div className="notborderL bgTitle w150"></div>
        </div>
        {state.showDsDichVuHoan &&
          chiTietPhieuDoiTra &&
          chiTietPhieuDoiTra.dsDichVuHoan.map((item, index) => (
            <div key={index} style={{ display: "flex" }}>
              <div
                className="notborderL w60"
                style={{ textAlign: "center" }}
                span={1}
              >
                {index + 1}
              </div>
              <div className="w120">{item.maDichVu}</div>
              <div className="w250">{item.tenDichVu}</div>
              <div className="right w120">{item.soLuong}</div>
              <div className="right w150">{item.thanhTien.formatPrice()}</div>
              <div className="right w150">
                {item.giaKhongBaoHiem.formatPrice()}
              </div>
              <div className="right w150">{item.giaBaoHiem.formatPrice()}</div>
              <div className="right w150">
                {item.giaKhongBaoHiem.formatPrice()}
              </div>
              <div className="right w150">
                {item.tienMienGiam.formatPrice()}
              </div>
              <div className="left w150">
                {renderTrangThai(item.trangThaiHoan)}
              </div>
              <div className="w150 center">
                <Checkbox disabled={true} checked={item.tuTra} />
              </div>
              <div className="notborderR center w150">
                <Checkbox checked={item.khongTinhTien} disabled={true} />
              </div>
            </div>
          ))}
        <div style={{ display: "flex" }}>
          <div
            className="notborderL notborderR bgTitle w60"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            span={1}
          >
            {state.showDsDichVuMoi ? (
              <span className="triangle-up" onClick={changeShowDvMoi}></span>
            ) : (
              <span className="triangle-down" onClick={changeShowDvMoi}></span>
            )}
          </div>
          <div className="bgTitle title-dich-vu bold w370">
            Danh sách dịch vụ mới
          </div>
          <div className="bold bgTitle right w120" span={1}>
            {chiTietPhieuDoiTra?.slDsDichVuMoi.formatPrice()}
          </div>
          <div className="bold bgTitle right w150">
            {chiTietPhieuDoiTra?.tongThanhTienDvMoi.formatPrice()}
          </div>
          <div className="bgTitle w150"></div>
          <div className="bgTitle w150"></div>
          <div className="bgTitle w150"></div>
          <div className="bgTitle w150"></div>
          <div className="bgTitle w150"></div>
          <div className="bgTitle w150"></div>
          <div className="bgTitle w150"></div>
        </div>
        {state.showDsDichVuMoi &&
          chiTietPhieuDoiTra &&
          chiTietPhieuDoiTra.dsDichVuMoi.map((item, index) => (
            <div key={index} style={{ display: "flex" }}>
              <div
                className="notborderL center w60"
                style={{ textAlign: "center" }}
                span={1}
              >
                {index + 1}
              </div>
              <div className="w120">{item.maDichVu}</div>
              <div className="w250">{item.tenDichVu}</div>
              <div className="right w120">{item.soLuong.formatPrice()}</div>
              <div className="right w150">{item.thanhTien.formatPrice()}</div>
              <div className="right w150">
                {item.giaKhongBaoHiem.formatPrice()}
              </div>
              <div className="right w150">{item.giaBaoHiem.formatPrice()}</div>
              <div className="right w150">
                {item.giaKhongBaoHiem.formatPrice()}
              </div>
              <div className="right w150">
                {item.tienMienGiam.formatPrice()}
              </div>
              <div className="left w150">
                {renderTrangThai(item.trangThaiHoan)}
              </div>
              <div className="w150 center">
                <Checkbox disabled={true} checked={item.tuTra} />
              </div>
              <div className="notborderR center w150">
                <Checkbox checked={item.khongTinhTien} disabled={true} />
              </div>
            </div>
          ))}
      </div>
    </Main>
  );
};

export default BangThongTin;
