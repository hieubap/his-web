import { Col, DatePicker, Row } from "antd";
import HomeWrapper from "components/HomeWrapper";
import PdfView from "components/PdfView";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { openInNewTab } from "utils";
import Wrapper from "../components/Wrapper";
import { Main } from "./styled";

/**
 * Báo cáo tài chính: Báo cáo tổng hợp thu tiền người bệnh
 *
 */

const Index = ({
  listDoiTuong,
  listDoiTuongKcb,
  listPhongThucHien,
  listAllNguoiGioiThieu,
  listAllNguonNguoiBenh,

  searchAllNguoiGioiThieu,
  searchAllNguonNguoiBenh,
  getDanhSachPhongThucHien,
  getUtils,

  ...props
}) => {
  const [state, _setState] = useState({
    loaiThoiGian: 20,
    tuNgay: moment().set("hour", 0).set("minute", 0).set("second", 0),
    denNgay: moment().set("hour", 23).set("minute", 59).set("second", 59),
    isValidData: true,
    priviewPdf: false,
  });
  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }));
  };
  const onChange = (type) => (e) => {
    const value = e?.hasOwnProperty("target")
      ? e?.target?.value
      : e?.hasOwnProperty("_d")
      ? moment(e._d)
      : e?.target?.checked
      ? e?.target?.checked
      : e;
    setState({
      [type]: value,
    });
  };

  useEffect(() => {
    if (listPhongThucHien) {
      let listKhoaThucHien = listPhongThucHien
        ?.filter((x1) => x1.khoaChiDinh)
        ?.map((x) => ({ ...x?.khoaChiDinh, phongThucHienId: x?.phong?.id }))
        ?.filter(
          (x2, index, parent) =>
            parent.findIndex((x3) => x3?.id == x2?.id) == index
        );
      let dsPhong = listPhongThucHien
        ?.map((x) => ({ ...x?.phong }))
        ?.filter(
          (x1, index, parent) =>
            parent?.findIndex((x2) => x2?.id == x1?.id) == index
        );
      setState({
        listPhongThucHien: dsPhong,
        listKhoaThucHien,
      });
    }
  }, [listPhongThucHien]);

  useEffect(() => {
    getUtils({ name: "DoiTuong" });
    getUtils({ name: "DoiTuongKcb" });
    getDanhSachPhongThucHien({ page: 0, size: 9999 });
    searchAllNguoiGioiThieu({ page: 0, size: 9999, active: true });
    searchAllNguonNguoiBenh({ page: 0, size: 9999, active: true });
  }, []);

  const onOk = () => {};
  const action = (
    <div className="action">
      <div className="btn" onClick={onOk(false)}>
        <span>Xem báo cáo</span>
      </div>
      <div className="btn btn-blue" onClick={onOk(true)}>
        <span>Xuất báo cáo</span>
        <img src={require("assets/images/bao-cao/export.png")} alt="" />
      </div>
    </div>
  );
  return (
    <Main>
      <HomeWrapper title="Báo cáo">
        <Wrapper
          title="TC01. Báo cáo tổng hợp thu tiền người bệnh"
          action={action}
        >
          {state.blobUrl ? (
            <PdfView src={state?.blobUrl} />
          ) : (
            <div>
              <div className="note">Chọn tiêu chí lọc cho báo cáo!</div>
              <Row>
                <Col md={6} xl={6} xxl={6}>
                  <div className="item-date">
                    <label
                      // onClick={() => openInNewTab("/danh-muc/quay-tiep-don")}
                      style={{ color: state.tuNgay ? "" : "red" }}
                      className="label-filter"
                    >
                      Từ ngày
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <DatePicker
                      showTime
                      value={state.tuNgay}
                      onChange={onChange("tuNgay")}
                      placeholder="Chọn ngày"
                      format="DD/MM/YYYY HH:mm:ss"
                      className="input-filter"
                    />
                    {!state.isValidData && !state.tuNgay && (
                      <div className="error">
                        Vui lòng chọn thời gian từ ngày!
                      </div>
                    )}
                  </div>
                </Col>
                <Col md={6} xl={6} xxl={6}>
                  <div className="item-select">
                    <label className="label-filter">Đối tượng người bệnh</label>
                    <Select
                      className="input-filter"
                      placeholder={"Chọn đối tượng người bệnh"}
                      data={[
                        { id: "", ten: "Tất cả" },
                        ...(listDoiTuong || []),
                      ]}
                      onChange={onChange("doiTuong")}
                    />
                  </div>
                </Col>
                <Col md={6} xl={6} xxl={6}>
                  <div className="item-select">
                    <label
                      className="label-filter"
                      // onClick={() => openInNewTab("/danh-muc/khoa?active=1")}
                    >
                      Khoa thực hiện
                    </label>
                    <Select
                      onChange={onChange("khoaThucHienId")}
                      value={state.khoaThucHienId}
                      className="input-filter"
                      placeholder={"Chọn khoa thực hiện"}
                      data={state.listKhoaThucHien}
                    />
                  </div>
                </Col>
                <Col md={6} xl={6} xxl={6}>
                  <div className="item-select">
                    <label
                      className="label-filter"
                      onClick={() =>
                        openInNewTab(
                          "/danh-muc/nguon-nguoi-benh?active=1&tab=2"
                        )
                      }
                    >
                      Nguồn giới thiệu
                    </label>
                    <Select
                      onChange={onChange("nguonNbId")}
                      value={state.nguonNbId}
                      className="input-filter"
                      placeholder={"Chọn nguồn giới thiệu"}
                      data={listAllNguonNguoiBenh}
                    />
                  </div>
                </Col>
                <Col md={6} xl={6} xxl={6}>
                  <div className="item-date">
                    <label
                      style={{ color: state.denNgay ? "" : "red" }}
                      className="label-filter"
                    >
                      Đến ngày
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <DatePicker
                      showTime
                      value={state.denNgay}
                      onChange={onChange("denNgay")}
                      placeholder="Chọn ngày"
                      format="DD/MM/YYYY HH:mm:ss"
                      className="input-filter"
                    />
                    {!state.isValidData && !state.denNgay && (
                      <div className="error">
                        Vui lòng chọn thời gian đến ngày!
                      </div>
                    )}
                  </div>
                </Col>

                <Col md={6} xl={6} xxl={6}>
                  <div className="item-select">
                    <label className="label-filter">
                      Đối tượng khám chữa bệnh
                    </label>
                    <Select
                      onChange={onChange("doiTuongKcb")}
                      value={state.doiTuongKcb}
                      className="input-filter"
                      placeholder={"Đối tượng khám chữa bệnh"}
                      data={[
                        { id: "", ten: "Tất cả" },
                        ...(listDoiTuongKcb || []),
                      ]}
                    />
                  </div>
                </Col>
                <Col md={6} xl={6} xxl={6}>
                  <div className="item-select">
                    <label
                      className="label-filter"
                      onClick={() =>
                        openInNewTab(
                          `/danh-muc/phong?active=1&khoaId=${state.khoaThucHienId}`
                        )
                      }
                    >
                      Phòng thực hiện
                    </label>
                    <Select
                      onChange={onChange("phongThucHienId")}
                      value={state.phongThucHienId}
                      className="input-filter"
                      placeholder={"Chọn phòng thực hiện"}
                      data={state.listPhongThucHien}
                    />
                  </div>
                </Col>
                <Col md={6} xl={6} xxl={6}>
                  <div className="item-select">
                    <label
                      className="label-filter"
                      onClick={() =>
                        openInNewTab(
                          `/danh-muc/nguon-nguoi-benh?active=1&tab=1&nguonNbId=${state.nguonNbId}`
                        )
                      }
                    >
                      Người giới thiệu
                    </label>
                    <Select
                      onChange={onChange("nguoiGioiThieuId")}
                      value={state.nguoiGioiThieuId}
                      className="input-filter"
                      placeholder={"Chọn người giới thiệu"}
                      data={listAllNguoiGioiThieu}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </Wrapper>
      </HomeWrapper>
    </Main>
  );
};

export default connect(
  (state) => ({
    listPhongThucHien: state.phongThucHien.listData || [],
    listDoiTuong: state.utils.listDoiTuong || [],
    listAllNguonNguoiBenh: state.nguonNguoiBenh.listAllNguonNguoiBenh || [],
    listAllNguoiGioiThieu: state.nguoiGioiThieu.listAllNguoiGioiThieu || [],
    listDoiTuongKcb: state.utils.listDoiTuongKcb || [],
  }),
  ({
    utils: { getUtils },
    phongThucHien: { getData: getDanhSachPhongThucHien },
    nguonNguoiBenh: { searchAll: searchAllNguonNguoiBenh },
    nguoiGioiThieu: { searchAll: searchAllNguoiGioiThieu },
  }) => ({
    getUtils,
    getDanhSachPhongThucHien,
    searchAllNguonNguoiBenh,
    searchAllNguoiGioiThieu,
  })
)(Index);
