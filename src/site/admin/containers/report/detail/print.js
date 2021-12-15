import React, { useEffect } from "react";
import { connect } from "react-redux";
import actionReport from "@actions/report";
import "./stylePrint.scss";
import moment from "moment";
import { withTranslate } from "react-redux-multilingual";
import { Select } from "antd";
const { Option } = Select;
const index = (props) => {
  const id = props.match.params.id;
  const tenPhieu = window.location.search.getQueryStringHref("tenPhieu");
  const donViTrucThuoc = window.location.search.getQueryStringHref(
    "donViTrucThuoc"
  );
  const footerToKhai = decodeURI(window.location.search.getQueryStringHref(
    "footerToKhai")
  );
  const chanKyToKhai =
    window.location.search.getQueryStringHref("chanKyToKhai") || "";
  useEffect(() => {
    props.loadReportDetail(id).then((s) => {
      props.searchDoiTuong(s.data.donViId, props.khuVucCheckInId);
    });

    setTimeout(() => {
      window.print();
    }, 500);
  }, []);
  return (
    <div className="container-form-kbyt">
      <div className="header-form">
        <div className="header-form-left">
          <div className="header-title">
            <div className="unit">{donViTrucThuoc}</div>
            <div>{props.donVi && props.donVi.ten}</div>
          </div>
          <span className="border-header"></span>
        </div>
        <div className="header-form-code">
          <div>
            <span>Mã:</span> {props.ttHanhChinh && props.ttHanhChinh.ma}
          </div>
          <div>
            <span>Ngày ĐK:</span>{" "}
            {props.ngayCheckIn &&
              moment(props.ngayCheckIn).format("DD/MM/YYYY")}
          </div>
        </div>
      </div>
      <div className="header-form-right">
        {tenPhieu ? tenPhieu : "Tờ khai y tế tự nguyện"}
      </div>
      <div className="content-form">
        <table className="table-info">
          <tbody>
            <tr>
              <td colSpan={6}>
                <div className="info-patient">
                  <div className="info-item">
                    <div className="title-info-patient">Quý vị là ai?</div>
                    {props.inPhanLoai && props.inPhanLoai.giaTri === "true" ? (
                      <div className="item-type">
                        Phân loại:
                        {props.phanLoai === 10 ? (
                          <span
                            style={{
                              textTransform: "uppercase",
                              padding: "0 8px",
                            }}
                          >
                            Bất thường
                          </span>
                        ) : // <> <span style={{ fontWeight: 400 }}>Bình thường/</span><span style={{ textTransform: "uppercase", padding: "0 8px" }}>Bất thường</span></> :
                        props.phanLoai === 0 ? (
                          <span style={{ fontWeight: 400, padding: "0 8px" }}>
                            Bình thường
                          </span>
                        ) : null}
                        {/* <><span style={{ textTransform: "uppercase", padding: "0 8px" }}>Bình thường/</span><span style={{ fontWeight: 400 }}>Bất thường</span></> : null} */}
                      </div>
                    ) : null}
                  </div>
                  {props.dataDoiTuong && props.dataDoiTuong.length
                    ? props.dataDoiTuong.map((item, index) => {
                        return (
                          <div key={index} className="checkbox-detail">
                            <input
                              readOnly
                              type="checkbox"
                              defaultChecked={
                                props.doiTuong.id === item.id ? true : false
                              }
                            />
                            <span
                              className="title-info-patient"
                              style={{ marginLeft: 6 }}
                            >
                              {item.ten}
                            </span>
                            :{" "}
                            {props.doiTuong.id === item.id ? (
                              <span>{props.thongTinDoiTuongLienHe}</span>
                            ) : null}
                          </div>
                        );
                      })
                    : null}
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3} style={{ width: "60%" }}>
                Họ và tên: {props.ttHanhChinh.hoVaTen}
              </td>
              <td colSpan={3}>
                Số điện thoại: {props.ttHanhChinh.soDienThoai}
              </td>
            </tr>
            <tr>
              <td colSpan={6}>
                Số CMT/ Giấy tờ tùy thân (Bằng lái xe, thẻ BHYT):{" "}
                {props.ttHanhChinh.soCanCuoc}
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ width: "33.33%" }}>
                Ngày sinh:{" "}
                {moment(props.ttHanhChinh.ngaySinh).format("DD/MM/YYYY")}
              </td>
              <td colSpan={2} style={{ width: "33.33%" }}>
                <span style={{ paddingRight: "15px" }}>Giới tính:</span>
                <span style={{ paddingRight: "15px" }}>
                  <input
                    readOnly
                    type="radio"
                    name="gender"
                    checked={props.ttHanhChinh.gioiTinh === 1 ? true : false}
                    style={{ marginRight: 5 }}
                  />
                  Nam{" "}
                </span>
                <input
                  readOnly
                  type="radio"
                  name="gender"
                  checked={props.ttHanhChinh.gioiTinh === 2 ? true : false}
                  style={{ marginRight: 5 }}
                />
                Nữ
              </td>
              <td colSpan={2}>
                {" "}
                Quốc tịch:{" "}
                {props.ttHanhChinh.quocTich && props.ttHanhChinh.quocTich.ten}
              </td>
            </tr>
            <tr>
              <td style={{ width: "10%" }}>Địa chỉ:</td>
              <td colSpan={5}>
                {props.ttHanhChinh.soNha},{" "}
                {props.ttHanhChinh.xaPhuong && props.ttHanhChinh.xaPhuong.ten},{" "}
                {props.ttHanhChinh.quanHuyen && props.ttHanhChinh.quanHuyen.ten}
                ,{" "}
                {props.ttHanhChinh.tinhThanhPho &&
                  props.ttHanhChinh.tinhThanhPho.ten}
              </td>
            </tr>
            <tr>
              <td colSpan={3}>Người bảo hộ: {props.ttHanhChinh.nguoiBaoHo}</td>
              <td colSpan={3}>
                SĐT Người bảo hộ: {props.ttHanhChinh.sdtNguoiBaoHo}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="detail-post-print">
          {props.khaiBaoYTe.traLoi && props.khaiBaoYTe.traLoi.length
            ? props.khaiBaoYTe.traLoi.map((option, index2) => {
                return (
                  <span key={index2}>
                    {option.cauHoiId ? (
                      <>
                        {option.cauHoi.loaiCauHoi === 1 ||
                        option.cauHoi.loaiCauHoi === 2 ? (
                          <div className="detail-print">
                            <div className="detail-print">
                              <table className="table-post">
                                <thead>
                                  <tr>
                                    <td style={{ width: "70%" }}>
                                      {option.cauHoi.soThuTu}.{" "}
                                      {option.cauHoi.noiDung}
                                    </td>
                                    <td style={{ fontWeight: 400 }}>
                                      {option.traLoi}
                                    </td>
                                  </tr>
                                </thead>
                              </table>
                            </div>
                          </div>
                        ) : option.cauHoi.loaiCauHoi === 3 ? (
                          <div className="detail-print text">
                            <div className="content-print">
                              {option.cauHoi.soThuTu}. {option.cauHoi.noiDung}
                            </div>
                            <div className="context-full">{option.traLoi}</div>
                          </div>
                        ) : option.cauHoi.loaiCauHoi === 4 ? (
                          <div className="detail-print">
                            <div className="detail-print">
                              <table className="table-post">
                                <thead>
                                  <tr>
                                    <td style={{ width: "70%" }}>
                                      {option.cauHoi.soThuTu}.{" "}
                                      {option.cauHoi.noiDung}
                                    </td>
                                    <td
                                      style={{
                                        fontWeight: 400,
                                        fontFamily:
                                          "'Times New Roman', Times, serif",
                                      }}
                                    >
                                      <Select
                                        className="print-detail-post"
                                        disabled
                                        value={
                                          option.traLoi &&
                                          JSON.parse(option.traLoi)
                                        }
                                        mode={
                                          option.cauHoi.chonNhieu
                                            ? "multiple"
                                            : ""
                                        }
                                      >
                                        {option.cauHoi.cauTraLoi &&
                                          option.cauHoi.cauTraLoi.length &&
                                          option.cauHoi.cauTraLoi.map(
                                            (a, b) => {
                                              return (
                                                <Option key={b} value={a.ma}>
                                                  {a.noiDung}
                                                </Option>
                                              );
                                            }
                                          )}
                                      </Select>
                                    </td>
                                  </tr>
                                </thead>
                              </table>
                            </div>
                          </div>
                        ) : option.cauHoi.loaiCauHoi === 5 ? (
                          <div className="detail-print">
                            <table className="table-post">
                              <thead>
                                <tr>
                                  <td>
                                    {option.cauHoi.soThuTu}.{" "}
                                    {option.cauHoi.noiDung}
                                  </td>
                                  {option.cauHoi.cauTraLoi &&
                                    option.cauHoi.cauTraLoi.length &&
                                    option.cauHoi.cauTraLoi.map(
                                      (option2, index2) => {
                                        return (
                                          <td
                                            key={index2}
                                            style={{
                                              textAlign: "center",
                                              fontFamily:
                                                "'Times New Roman', Times, serif",
                                            }}
                                          >
                                            {option2.noiDung}
                                          </td>
                                        );
                                      }
                                    )}
                                </tr>
                              </thead>
                              <tbody>
                                {option.cauHoi.cauHoiChiTiet &&
                                  option.cauHoi.cauHoiChiTiet.length &&
                                  option.cauHoi.cauHoiChiTiet.map(
                                    (option3, index3) => {
                                      let data =
                                        option.traLoi &&
                                        JSON.parse(option.traLoi);
                                      let noiDungIndex = data[index3];
                                      return (
                                        <tr key={index3}>
                                          <td style={{ width: "70%" }}>
                                            {option3.noiDung}
                                          </td>
                                          {option.cauHoi.cauTraLoi &&
                                            option.cauHoi.cauTraLoi.length &&
                                            option.cauHoi.cauTraLoi.map(
                                              (option4, index4) => {
                                                return (
                                                  <td
                                                    key={index4}
                                                    style={{
                                                      textAlign: "center",
                                                    }}
                                                  >
                                                    {noiDungIndex ===
                                                    option4.ma ? (
                                                      <input
                                                        readOnly
                                                        type="radio"
                                                        checked={true}
                                                      />
                                                    ) : (
                                                      <input
                                                        readOnly
                                                        type="radio"
                                                        checked={false}
                                                      />
                                                    )}
                                                  </td>
                                                );
                                              }
                                            )}
                                        </tr>
                                      );
                                    }
                                  )}
                              </tbody>
                            </table>
                          </div>
                        ) : null}
                      </>
                    ) : null}
                  </span>
                );
              })
            : null}
        </div>
      </div>
      <div className="signature-form">{chanKyToKhai}</div>
      {/* <div className="footer-form">{footerToKhai}</div> */}
      <pre className="footer-form">{footerToKhai}</pre>
    </div>
  );
};
export default connect(
  (state) => {
    return {
      auth: state.auth && state.auth.auth,
      donViId: state.report.donViId,
      donVi: state.report.donVi,
      dataDoiTuong: state.report.dataDoiTuong || [],
      ttHanhChinh: state.report.ttHanhChinh || {},
      doiTuong: state.report.doiTuong || {},
      khaiBaoYTe: state.report.khaiBaoYTe || {},
      boCauHoi: state.report.boCauHoi,
      thongTinDoiTuongLienHe: state.report.thongTinDoiTuongLienHe,
      phanLoai: state.report.phanLoai,
      ngayCheckIn: state.report.ngayCheckIn,
      dataSetting: state.report.dataSetting || {},
      inPhanLoai: state.report.inPhanLoai || {},
    };
  },
  {
    updateData: actionReport.updateData,
    loadReportDetail: actionReport.loadReportDetail,
    searchDoiTuong: actionReport.searchDoiTuong,
    searchDonVi: actionReport.searchDonVi,
  }
)(withTranslate(index));
