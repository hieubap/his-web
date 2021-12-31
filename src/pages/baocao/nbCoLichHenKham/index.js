import React, { useEffect, useState } from "react";
import HomeWrapper from "components/HomeWrapper";
import Wrapper from "../components/Wrapper";
import Select from "components/Select";
import { connect } from "react-redux";
import { Row, Col, DatePicker } from "antd";
import moment from "moment";
import fileUtils from "utils/file-utils";
import { openInNewTab } from "utils";
import { Main } from "./styled";
import PdfView from "components/PdfView";

/**
 * Báo cáo tài chính: Báo cáo sử dụng hóa đơn
 *
 */

const Index = ({
  listLoaiThoiGian,
  listDoiTuong,
  listPhongThucHien,
  listNhanVien,
  searchAllNguoiGioiThieu,
  searchAllNguonNguoiBenh,
  getDanhSachPhongThucHien,
  getUtils,
  getListNhanVien,

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
        listKhoaThucHienRender: listKhoaThucHien,
      });
    }
  }, [listPhongThucHien]);

  useEffect(() => {
    getUtils({ name: "LoaiThoiGian" });
    getUtils({ name: "DoiTuong" });
    getDanhSachPhongThucHien({ page: 0, size: 9999 });
    getListNhanVien({ page: 0, size: 9999, active: true });
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
          title="PK02. Danh sách người bệnh có lịch hẹn khám"
          action={action}
        >
          {state.blobUrl ? (
            <PdfView src={state?.blobUrl} />
          ) : (
            <div>
              <div className="note">Chọn tiêu chí lọc cho báo cáo!</div>
              <Row>
                <Col md={8} xl={8} xxl={8}>
                  <div className="item-select">
                    <label
                      // onClick={() => openInNewTab("/danh-muc/quay-tiep-don")}
                      style={{ color: state.loaiThoiGian ? "" : "red" }}
                      className="label-filter"
                    >
                      Theo thời gian
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <Select
                      onChange={onChange("loaiThoiGian")}
                      value={state.loaiThoiGian}
                      className="input-filter"
                      placeholder={"Chọn loại thời gian"}
                      data={listLoaiThoiGian}
                    />
                    {!state.isValidData && !state.loaiThoiGian && (
                      <div className="error">Vui lòng chọn loại thời gian!</div>
                    )}
                  </div>
                </Col>
                <Col md={8} xl={8} xxl={8}>
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
                <Col md={8} xl={8} xxl={8}>
                  <div className="item-select">
                    <label
                      className="label-filter"
                      // onClick={() => openInNewTab("/danh-muc/khoa?active=1")}
                    >
                      Khoa người bệnh
                    </label>
                    <Select
                      onChange={onChange("khoaThucHienId")}
                      value={state.khoaThucHienId}
                      className="input-filter"
                      placeholder={"Chọn khoa người bệnh"}
                      data={state.listKhoaThucHienRender}
                    />
                  </div>
                </Col>
                <Col md={8} xl={8} xxl={8}>
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
                <Col md={8} xl={8} xxl={8}>
                  <div className="item-select">
                    <label className="label-filter">Bác sĩ khám</label>
                    <Select
                      onChange={onChange("bacSiId")}
                      value={state.bacSiId}
                      className="input-filter"
                      placeholder={"Chọn bác sĩ khám"}
                      data={listNhanVien || []}
                    />
                  </div>
                </Col>
                <Col md={8} xl={8} xxl={8}>
                  <div className="item-select">
                    <label
                      className="label-filter"
                      // onClick={() =>
                      //   openInNewTab(
                      //     `/danh-muc/phong?active=1&khoaId=${state.khoaThucHienId}`
                      //   )
                      // }
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
                <Col md={8} xl={8} xxl={8}>
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
    listLoaiThoiGian: state.utils.listLoaiThoiGian || [],
    listDoiTuong: state.utils.listDoiTuong || [],
    listPhongThucHien: state.phongThucHien.listData || [],
    listNhanVien: state.nhanVien.listNhanVien,
  }),
  ({
    utils: { getUtils },
    phongThucHien: { getData: getDanhSachPhongThucHien },
    nhanVien: { getListNhanVien },
  }) => ({
    getUtils,
    getDanhSachPhongThucHien,
    getListNhanVien,
  })
)(Index);
