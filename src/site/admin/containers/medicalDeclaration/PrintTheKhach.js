import React, { useEffect, useState } from "react";
import { MainPrint } from "./styledModal";
import { connect } from "react-redux";
import moment from "moment";
import Barcode from "react-barcode";
import QRCode from "qrcode.react";
import settingProvider from "@data-access/setting-provider";
import "./style.scss";
function index(props) {
  const {
    donViId,
    dataDonVi,
    hoVaTen,
    soCanCuoc,
    ma,
    ngaySinh,
    ngayCheckIn,
    phanLoai,
  } = props;
  const [state, _setState] = useState({});
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };

  const maLink = window.location.search.getQueryStringHref("ma");
  const qrcodeBarcodeLink = window.location.search.getQueryStringHref(
    "qrcodeBarcode"
  );
  const donViTenLink = window.location.search.getQueryStringHref("donViTen");
  const hoVaTenLink = window.location.search.getQueryStringHref("hoVaTen");
  const soCanCuocLink = window.location.search.getQueryStringHref("soCanCuoc");
  const ngaySinhLink = window.location.search.getQueryStringHref("ngaySinh");
  const ngayCheckInLink = window.location.search.getQueryStringHref(
    "ngayCheckIn"
  );
  const phanLoaiLink = window.location.search.getQueryStringHref("phanLoai");

  useEffect(() => {
    if (!props.hidePrintGuestCard) {
      setTimeout(() => {
        window.print();
      }, 500);
    }
  }, []);
  useEffect(() => {
    try {
      let qrcodeBarcode = settingProvider.getValue(
        props.dataSetting,
        "qrcode_barcode",
        10
      );
      setState({
        qrcodeBarcode,
      });
    } catch (error) {}
  }, [props.dataSetting]);
  return (
    <MainPrint>
      <div className="warp-card">
        <div className="title">
          <span>
            {dataDonVi && dataDonVi.length
              ? (dataDonVi.find((item) => item.id === donViId) || {}).ten
              : donViTenLink}
          </span>
        </div>
        <div className="title title-card">
          <span>thẻ khách</span>
        </div>
        <div className="barcode">
          {state.qrcodeBarcode == 10 || qrcodeBarcodeLink == 10 ? (
            <QRCode size={80} value={ma ? ma : maLink ? maLink : ""} />
          ) : (
            <Barcode
              height={50}
              value={ma ? ma : maLink ? maLink : ""}
              format="CODE128"
            />
          )}
        </div>
        <div className="form-infor">
          <div className="criteria">
            <div className="criteria-name">Họ và tên</div>
            <div className="criteria-value">
              : {hoVaTen ? hoVaTen : hoVaTenLink}
            </div>
          </div>
          <div className="criteria">
            <div className="criteria-name">Ngày sinh</div>
            <div className="criteria-value">
              : {ngaySinh ? ngaySinh : ngaySinhLink}
            </div>
          </div>
          <div className="criteria">
            <div className="criteria-name">Mã khách</div>
            <div className="criteria-value">
              : {ma ? ma : maLink} -{" "}
              {phanLoai == "10" || phanLoaiLink == "10" ? (
                <span style={{ fontWeight: "bold" }}>BẤT THƯỜNG</span>
              ) : (
                "Bình thường"
              )}
            </div>
          </div>
          <div className="criteria">
            <div className="criteria-name">CMT/CCCD</div>
            <div className="criteria-value">
              : {soCanCuoc ? soCanCuoc : soCanCuocLink} - Đã khai báo y tế
            </div>
          </div>
          <div className="criteria">
            <div className="crđaiteria-name" style={{ width: "28%" }}>
              Ngày đăng ký
            </div>
            <div className="criteria-value">
              :{" "}
              {ngayCheckIn
                ? moment(ngayCheckIn).format("DD/MM/YYYY HH:mm")
                : ngayCheckInLink}
            </div>
          </div>
        </div>
      </div>
    </MainPrint>
  );
}

const mapStateToProps = (state) => {
  return {
    dataDonVi: state.report.dataDonVi || [],
    donViId: state.ttHanhChinh.donViId,
    hoVaTen: state.ttHanhChinh.hoVaTen || "",
    soCanCuoc: state.ttHanhChinh.soCanCuoc || "",
    ngaySinh: state.ttHanhChinh.ngaySinh || null,
    ma: state.ttHanhChinh.ma || "",
    ngayCheckIn: state.ttHanhChinh.ngayCheckIn || "",
    phanLoai: state.ttHanhChinh.phanLoai,
    dataSetting: state.setting.data || [],
  };
};
export default connect(mapStateToProps, null)(index);
