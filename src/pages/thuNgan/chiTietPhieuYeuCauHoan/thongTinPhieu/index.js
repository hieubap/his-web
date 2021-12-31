import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Main } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
const ThongTinPhieu = (props) => {
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const dispatch = useDispatch();
  const { chiTietPhieuDoiTra } = useSelector(
    (state) => state.danhSachPhieuYeuCauHoan
  );
  const { listtrangThaiPhieuDoiTra, listLoaiDoiTra } = useSelector(
    (state) => state.utils
  );
  const { getUtils } = dispatch.utils;
  useEffect(() => {
    getUtils({ name: "trangThaiPhieuDoiTra" });
    getUtils({ name: "LoaiDoiTra" });
  }, []);
  const renderStatus = () => {
    if (listtrangThaiPhieuDoiTra?.length) {
      const data = listtrangThaiPhieuDoiTra.find(
        (item) => item?.id == chiTietPhieuDoiTra?.trangThai
      );
      setState({
        trangThaiPhieu: data?.ten || "",
      });
    }
  };
  const renderLoaiDoiTra = () => {
    if (listLoaiDoiTra?.length) {
      const data = listLoaiDoiTra.find(
        (item) => item?.id == chiTietPhieuDoiTra?.loai
      );
      setState({
        loaiDoiTra: data?.ten || "",
      });
    }
  };
  useEffect(() => {
    renderStatus();
    renderLoaiDoiTra();
  }, [chiTietPhieuDoiTra]);

  return (
    <Main>
      <div className="title">Thông tin phiếu</div>
      <div className="header-info-phieu">
        <p className="so-phieu">
          Số phiếu : <span>{chiTietPhieuDoiTra?.soPhieu}</span>
        </p>
        <p className="status">
          Trạng thái phiếu:{" "}
          <span style={{ color: "red" }}>{state?.trangThaiPhieu}</span>
        </p>
      </div>
      <div className="main">
        <p>
          Lí do hoàn: <span>{chiTietPhieuDoiTra?.lyDoDoiTra?.ten}</span>
        </p>
        <p>
          Hình thức hoàn: <span>{state.loaiDoiTra}</span>{" "}
        </p>
        <p>
          Người yêu cầu hoàn: <span>{state.nguoiYeuCau}</span>
        </p>
        <p>
          Thời gian yêu cầu:{" "}
          <span>
            {moment(chiTietPhieuDoiTra?.thoiGianYeuCau).format(
              "YYYY/MM/DD - hh:mm:ss"
            )}
          </span>
        </p>
      </div>
      {chiTietPhieuDoiTra?.trangThai == 40 && (
        <div className="footer">
          <p>
            Người hoàn:{" "}
            <span>
              {chiTietPhieuDoiTra?.nguoiXacNhan?.tenHocHamHocVi +
                " " +
                chiTietPhieuDoiTra?.nguoiXacNhan?.ten}
            </span>
          </p>
          <p>
            Thời gian hoàn:{" "}
            <span>
              {" "}
              {moment(chiTietPhieuDoiTra?.thoiGianYeuCau).format(
                "YYYY/MM/DD - hh:mm:ss"
              )}
            </span>
          </p>
        </div>
      )}
    </Main>
  );
};

export default ThongTinPhieu;
