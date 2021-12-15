import React, { useEffect } from "react";
import { Button, Select, Input, DatePicker, Radio } from "antd";
import { connect } from "react-redux";
import actionReport from "@actions/report";
import actionPost from "@actions/post";
import { AdminPage } from "@admin/components/admin";
import "./style.scss";
import moment from "moment";
import { withTranslate } from "react-redux-multilingual";
import ClientUtils from "@utils/client-utils";
import ViewQr from "./viewQr";
import Iframe from "react-iframe";
import TextArea from "antd/lib/input/TextArea";
import actionSetting from "@actions/setting";
import settingProvider from "@data-access/setting-provider";
const { Option } = Select;
function index(props) {
  const { translate } = props;
  const id = props.match.params.id;
  useEffect(() => {
    if (id) {
      props
        .loadReportDetail(id)
        .then((s) => {
          props.searchKhuVuc(s.data.donViId);
          props.getByIdDonVi(s.data.donViId);
          props.searchDoiTuong(s.data.donViId, props.khuVucCheckInId);
          props.onSearchSetting(s.data.donViId);
        })
        .catch((e) => {
          props.history.push(translate("baocaohref"));
        });
    }
    props.updateData({
      donViId: props.donViId,
      showQr: false,
      printInfo: false,
    });
  }, []);

  useEffect(() => {
    if (props.dataSetting && props.dataSetting.length) {
      let dataSetting = props.dataSetting.find((option) => {
        return option.maThietLap === "ten_phieu_khai_thac_thong_tin";
      });
      let inPhanLoai = props.dataSetting.find((option) => {
        return option.maThietLap === "in_phan_loai_khach";
      });
      let donViTrucThuoc = props.dataSetting.find((option) => {
        return option.maThietLap === "don_vi_truc_thuoc";
      });
      let footerToKhai = props.dataSetting.find((option) => {
        return option.maThietLap === "footer_to_khai";
      });
      footerToKhai.giaTri=encodeURI(footerToKhai.giaTri);
      let chanKyToKhai = props.dataSetting.find((option) => {
        return option.maThietLap === "chan_ky_to_khai";
      });
      props.updateData({
        dataSetting: dataSetting,
        inPhanLoai: inPhanLoai,
        donViTrucThuoc: donViTrucThuoc,
        footerToKhai,
        chanKyToKhai,
      });
    }
  }, [props.dataSetting]);

  const checkKhuvuc = (data) => {
    let status = props.dataKhuVuc
      ? props.dataKhuVuc.length &&
        props.dataKhuVuc.filter((item) => {
          return parseInt(item.id) === Number(data);
        })
      : [];
    if (status.length > 0) return status[0];
    return {};
  };
  const onClose = () => {
    props.history.push(translate("baocaohref"));
  };
  const onShowQr = () => {
    props.updateData({
      showQr: true,
      qr: props.ttHanhChinh.qr,
      name: props.ttHanhChinh.hoVaTen,
    });
  };
  const onPrint = () => {
    props.updateData({
      printInfo: true,
    });
    setTimeout(() => {
      props.updateData({
        printInfo: false,
      });
      window.close();
    }, 15000);
    // props.history.push("/print/" + id + "?tenPhieu=" + props.dataSetting.giaTri + "&donViTrucThuoc=" + props.donViTrucThuoc.giaTri);
  };
  return (
    <>
      <AdminPage
        className="mgr-report-detail"
        icon="subheader-icon fal fa-window"
        header={translate("chitietkhachdendonvi")}
        subheader={translate("thongtinkhachhang")}
      >
        <div className="row report-detail">
          <div className="col-lg-1"></div>
          <div className="col-lg-10 ui-sortable sortable-grid detail">
            <div className="button">
              <Button className="button-detail" onClick={() => onPrint()}>
                <i className="fal fa-check"></i>
                {translate("intokhai")}
              </Button>
              <Button className="button-detail" onClick={() => onShowQr()}>
                <i className="fal fa-check"></i>
                {translate("xemqr")}
              </Button>
              <Button
                className="button-detail close-button"
                onClick={() => onClose()}
              >
                {translate("quaylai")}
              </Button>
            </div>
            <div className="info">
              <div className="title">
                <img src={require("@images/user.png")} alt="" />
                <div className="name">{translate("thongtinkhachhang")}</div>
              </div>
              <div className="info-body">
                <div className="row">
                  <div className="col-md-10">
                    <div className="info-detail">
                      <div className="row">
                        <div className="col-md-7">
                          <div className="name-date">
                            <span>{props.ttHanhChinh.hoVaTen}</span>
                            <span>
                              {" "}
                              ({" "}
                              {props.ttHanhChinh.gioiTinh === 1
                                ? translate("nam")
                                : props.ttHanhChinh.gioiTinh === 2
                                ? translate("nu")
                                : null}
                              ,{" "}
                            </span>
                            <span>
                              {props.ttHanhChinh.ngaySinh &&
                                moment(props.ttHanhChinh.ngaySinh).format(
                                  "DD/MM/YYYY"
                                )}
                            </span>
                            <span>
                              {Number(moment(new Date()).format("YYYY")) -
                                Number(
                                  props.ttHanhChinh.ngaySinh &&
                                    moment(props.ttHanhChinh.ngaySinh).format(
                                      "YYYY"
                                    )
                                )}{" "}
                              tuổi )
                            </span>
                          </div>
                        </div>
                        <div className="col-md-5">
                          <div className="name-date">
                            <span>
                              {props.ngayCheckIn &&
                                moment(props.ngayCheckIn).format("DD/MM/YYYY")}
                            </span>{" "}
                            -
                            <span style={{ paddingLeft: 12 }}>
                              {checkKhuvuc(props.khuVucCheckInId) &&
                                checkKhuvuc(props.khuVucCheckInId).ten}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-2">
                          <div className="address">{translate("diachi")}: </div>
                        </div>
                        <div className="col-md-10">
                          <div className="address-detail">
                            {props.ttHanhChinh.soNha},{" "}
                            {props.ttHanhChinh.xaPhuong &&
                              props.ttHanhChinh.xaPhuong.ten}
                            ,{" "}
                            {props.ttHanhChinh.quanHuyen &&
                              props.ttHanhChinh.quanHuyen.ten}
                            ,{" "}
                            {props.ttHanhChinh.tinhThanhPho &&
                              props.ttHanhChinh.tinhThanhPho.ten}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-2" style={{ paddingRight: 0 }}>
                          <div className="address">{translate("sdt")}: </div>
                        </div>
                        <div className="col-md-4">
                          <div className="address-detail">
                            {props.ttHanhChinh.soDienThoai}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="address">
                            {translate("cccd")}:{" "}
                            <span className="address-detail">
                              {props.ttHanhChinh.soCanCuoc}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="address-detail">
                            {props.doiTuong.ten} -{" "}
                            {props.thongTinDoiTuongLienHe}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="avatar">
                      <img
                        src={
                          ClientUtils.serverApi +
                          "/api/visitor/v1/files/" +
                          props.anhDaiDien
                        }
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="info" style={{ marginTop: 20 }}>
              <div className="title">
                <img src={require("@images/user.png")} alt="" />
                <div className="name">{translate("cccd")}</div>
              </div>
              <div className="info-body">
                <div className="row">
                  {props.anhCanCuoc && props.anhCanCuoc.length ? (
                    props.anhCanCuoc.map((item, index) => {
                      return (
                        <div className="col-md-6" key={index}>
                          <div className="ID">
                            <img
                              className="image"
                              src={
                                item
                                  ? ClientUtils.serverApi +
                                    "/api/visitor/v1/files/" +
                                    item
                                  : null
                              }
                              alt=""
                            />
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <>
                      <div className="col-md-6">
                        <div className="ID">
                          <div className="image image-title">
                            {translate("mattruoc")}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="ID">
                          <div className="image image-title">
                            {translate("matsau")}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="body-post">
              <div className="title">
                {props.dataSetting && props.dataSetting
                  ? props.dataSetting.giaTri
                  : translate("khaibaoyte")}
              </div>
              {/* <div className="title">{translate("khaibaoyte")}</div> */}
            </div>
            <div className="info">
              {props.khaiBaoYTe &&
              props.khaiBaoYTe.traLoi &&
              props.khaiBaoYTe.traLoi.length
                ? props.khaiBaoYTe.traLoi.map((option, index2) => {
                    return (
                      <div key={index2} className="info-content">
                        {option.cauHoiId ? (
                          <>
                            {(option.cauHoi || {}).loaiCauHoi === 5 ? null : (
                              <div className="info-title">
                                {(option.cauHoi || {}).soThuTu}.{" "}
                                {(option.cauHoi || {}).noiDung}
                              </div>
                            )}
                            <div className="info-input">
                              {(option.cauHoi || {}).loaiCauHoi === 1 ? (
                                // <DatePicker
                                //     disabled
                                //     value={option.traLoi ? moment(new Date(option.traLoi)) : null}
                                //     format="DD/MM/YYYY"
                                // />
                                <Input disabled value={option.traLoi} />
                              ) : (option.cauHoi || {}).loaiCauHoi === 2 ? (
                                <Input disabled value={option.traLoi} />
                              ) : (option.cauHoi || {}).loaiCauHoi === 3 ? (
                                (option.cauHoi || {}).nhieuDong ? (
                                  <TextArea disabled value={option.traLoi} />
                                ) : (
                                  <Input disabled value={option.traLoi} />
                                )
                              ) : (option.cauHoi || {}).loaiCauHoi === 4 ? (
                                <Select
                                  disabled
                                  value={
                                    option.traLoi && JSON.parse(option.traLoi)
                                  }
                                  mode={
                                    option.cauHoi.chonNhieu ? "multiple" : ""
                                  }
                                >
                                  {option.cauHoi.cauTraLoi &&
                                    option.cauHoi.cauTraLoi.length &&
                                    option.cauHoi.cauTraLoi.map((a, b) => {
                                      return (
                                        <Option key={b} value={a.ma}>
                                          {a.noiDung}
                                        </Option>
                                      );
                                    })}
                                </Select>
                              ) : (option.cauHoi || {}).loaiCauHoi === 5 ? (
                                <table>
                                  <thead>
                                    <tr>
                                      <td style={{ width: "70%" }}>
                                        <div className="info-title">
                                          {(option.cauHoi || {}).soThuTu}.{" "}
                                          {(option.cauHoi || {}).noiDung}
                                        </div>
                                      </td>
                                      {(option.cauHoi || {}).cauTraLoi &&
                                        (option.cauHoi || {}).cauTraLoi
                                          .length &&
                                        (option.cauHoi || {}).cauTraLoi.map(
                                          (option2, index2) => {
                                            return (
                                              <td
                                                key={index2}
                                                style={{ textAlign: "center" }}
                                              >
                                                {option2.noiDung}
                                              </td>
                                            );
                                          }
                                        )}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {(option.cauHoi || {}).cauHoiChiTiet &&
                                      (option.cauHoi || {}).cauHoiChiTiet
                                        .length &&
                                      (option.cauHoi || {}).cauHoiChiTiet.map(
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
                                              {(option.cauHoi || {})
                                                .cauTraLoi &&
                                                (option.cauHoi || {}).cauTraLoi
                                                  .length &&
                                                (
                                                  option.cauHoi || {}
                                                ).cauTraLoi.map(
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
                                                          <Radio
                                                            checked={true}
                                                          />
                                                        ) : (
                                                          <Radio
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
                                    <tr></tr>
                                  </tbody>
                                </table>
                              ) : null}
                            </div>
                          </>
                        ) : null}
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </AdminPage>
      {props.showQr && <ViewQr />}
      {props.printInfo && (
        <Iframe
          url={
            window.location.origin +
            "/print/" +
            id +
            "?tenPhieu=" +
            (props.dataSetting.giaTri || "") +
            "&donViTrucThuoc=" +
            (props.donViTrucThuoc.giaTri || "") +
            "&footerToKhai=" +
            (props.footerToKhai.giaTri || "") +
            "&chanKyToKhai=" +
            (props.chanKyToKhai.giaTri || "")
          }
          width="0px"
          height="0px"
          id="import-ticket-store"
          className="import-ticket-store"
          display="block"
          position="relative"
        />
      )}
    </>
  );
}

export default connect(
  (state) => {
    return {
      auth: state.auth && state.auth.auth,
      data: state.report.data || [],
      size: state.report.size || 10,
      page: state.report.page || 1,
      total: state.report.total || 0,
      ttHanhChinh: state.report.ttHanhChinh || {},
      ngayCheckIn: state.report.ngayCheckIn,
      anhDaiDien: state.report.anhDaiDien,
      khuVucCheckInId: state.report.khuVucCheckInId,
      donViId: state.report.donViId,
      dataKhuVuc: state.report.dataKhuVuc || [],
      doiTuong: state.report.doiTuong || {},
      anhCanCuoc:
        state.report.anhCanCuoc && state.report.anhCanCuoc.length
          ? state.report.anhCanCuoc
          : [],
      showQr: state.report.showQr,
      printInfo: state.report.printInfo,
      khaiBaoYTe: state.report.khaiBaoYTe || {},
      boCauHoi: state.report.boCauHoi,
      thongTinDoiTuongLienHe: state.report.thongTinDoiTuongLienHe,
      dataSetting: state.report.dataSetting || {},
      donViTrucThuoc: state.report.donViTrucThuoc || {},
      footerToKhai: state.report.footerToKhai || {},
      chanKyToKhai: state.report.chanKyToKhai || {},
      dataSetting: state.setting.data || [],
    };
  },
  {
    updateData: actionReport.updateData,
    loadReportDetail: actionReport.loadReportDetail,
    searchKhuVuc: actionReport.searchKhuVuc,
    gotoPage: actionPost.gotoPage,
    updateDataPost: actionPost.updateData,
    onSearchSetting: actionSetting.onSearch,
    getByIdDonVi: actionReport.getByIdDonVi,
    searchDoiTuong: actionReport.searchDoiTuong,
  }
)(withTranslate(index));
