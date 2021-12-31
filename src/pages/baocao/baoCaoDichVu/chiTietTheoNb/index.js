import React, { useEffect, useState } from "react";
import HomeWrapper from "components/HomeWrapper";
import Wrapper from "../../components/Wrapper";
import Select from "components/Select";
import { connect } from "react-redux";
import { Row, Col, DatePicker } from "antd";
import moment from "moment";
import fileUtils from "utils/file-utils";
import { openInNewTab } from "utils";
import { Main } from "./styled";

const Index = ({
  listLoaiThoiGian,
  listhuongGiay,
  listkhoGiay,
  listDinhDangBaoCao,
  listDoiTuong,
  listPhongThucHien,
  listAllNguoiGioiThieu,
  listAllNguonNguoiBenh,
  searchAllNguoiGioiThieu,
  searchAllNguonNguoiBenh,
  getDanhSachPhongThucHien,
  getBc01,
  getUtils,
  listDoiTuongKcb,
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

  const onOk = (isOk) => () => {
    if (!state.loaiThoiGian || !state.denNgay || !state.tuNgay) {
      setState({ isValidData: false });
      return;
    }
    const payload = {
      loaiThoiGian: state.loaiThoiGian,
      tuNgay: moment(state.tuNgay).format("DD-MM-YYYY HH:mm:ss"),
      denNgay: moment(state.denNgay).format("DD-MM-YYYY HH:mm:ss"),
      nguonNbId: state.nguonNbId,
      nguoiGioiThieuId: state.nguoiGioiThieuId,
      khoaThucHienId: state.khoaThucHienId,
      phongThucHienId: state.phongThucHienId,
      doiTuong: state.doiTuong,
      doiTuongKcb: state.doiTuongKcb,
      thanhToan: state.thanhToan,
    };
    if (isOk) {
      getBc01(payload)
        .then((data) => {
          if (!data.dinhDang || data.dinhDang === 20) {
            // export pdf
            if (data.file.pdf) {
              setState({
                src: data.file?.pdf,
                type: 20,
              });
            }
          } else if (data.dinhDang === 10) {
            // export xlsx
            setState({
              src: data.file?.doc,
              type: 10,
            });
          }
        })
        .catch((e) => {});
    } else {
      getBc01(payload)
        .then((data) => {
          if (!data.dinhDang || data.dinhDang === 20) {
            // export pdf
            if (data.file.pdf) {
              setState({
                src: data.file?.pdf,
                type: 20,
                priviewPdf: true,
              });
            }
          } else if (data.dinhDang === 10) {
            // export xlsx
            setState({
              src: data.file?.doc,
              type: 10,
              priviewPdf: true,
            });
          }
        })
        .catch((e) => {});
    }
  };

  useEffect(() => {
    if (state.src) {
      fileUtils
        .getFromUrl({ url: fileUtils.absoluteFileUrl(state.src) })
        .then((s) => {
          const blob = new Blob([new Uint8Array(s)], {
            type: state.type
              ? state.type == 20
                ? "application/pdf"
                : state.type == 10
                ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                : "application/pdf"
              : "application/ pdf",
          });
          const blobUrl = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = blobUrl;
          link.setAttribute("download", `${state.src}`); //or any other extension
          document.body.appendChild(link);
          if (state.priviewPdf) {
            openInNewTab(blobUrl);
          } else {
            link.click();
          }
        });
    }
  }, [state.src]);

  useEffect(() => {
    if (listPhongThucHien) {
      let listKhoaThucHien = listPhongThucHien
        ?.filter((x1) => x1.khoaChiDinh)
        ?.map((x) => ({ ...x?.khoaChiDinh, phongThucHienId: x?.phong?.id }))
        ?.filter(
          (x2, index, parent) =>
            parent.findIndex((x3) => x3?.id === x2?.id) === index
        );
      let dsPhong = listPhongThucHien
        ?.map((x) => ({ ...x?.phong }))
        ?.filter(
          (x1, index, parent) =>
            parent?.findIndex((x2) => x2?.id === x1?.id) === index
        );
      setState({
        listPhongThucHien: dsPhong,
        listKhoaThucHien,
        listKhoaThucHienRender: listKhoaThucHien,
      });
    }
  }, [listPhongThucHien]);

  useEffect(() => {
    if (state.phongThucHienId) {
      let dsKhoaThucHienRender = state.dsKhoaThucHienRender?.filter(
        (x) => x?.phongThucHienId === state.phongThucHienId
      );
      setState({ khoaThucHienId: null, dsKhoaThucHienRender });
    }
  }, [state.phongThucHienId]);

  useEffect(() => {
    getUtils({ name: "LoaiThoiGian" });
    getUtils({ name: "DoiTuong" });
    getUtils({ name: "huongGiay" });
    getUtils({ name: "khoGiay" });
    getUtils({ name: "DinhDangBaoCao" });
    getUtils({ name: "DoiTuongKcb" });
    getDanhSachPhongThucHien({ page: 0, size: 9999 });
    searchAllNguoiGioiThieu({ page: 0, size: 9999, active: true });
    searchAllNguonNguoiBenh({ page: 0, size: 9999, active: true });
  }, []);

  const YES_NO = [
    { id: null, ten: "Tất cả" },
    { id: true, ten: "Đã thanh toán" },
    { id: false, ten: "Chưa thanh toán" },
  ];

  const action = (
    <>
      <div className="action">
        <div className="btn" onClick={onOk(false)}>
          <span>Xem báo cáo</span>
        </div>
        <div className="btn btn-blue" onClick={onOk(true)}>
          <span>Xuất báo cáo</span>
          <img src={require("assets/images/bao-cao/export.png")} alt="" />
        </div>
      </div>
    </>
  );
  return (
    <Main>
      <HomeWrapper title="Báo cáo">
        <Wrapper title="BC01. Báo cáo chi tiết theo người bệnh" action={action}>
          <div className="note">Chọn tiêu chí lọc cho báo cáo!</div>
          <Row>
            <Col md={6} xl={6} xxl={6}>
              <div className="item-select">
                <label
                  // onClick={() => openInNewTab("/danh-muc/quay-tiep-don")}
                  style={{ color: state.loaiThoiGian ? "" : "red" }}
                  className="label pointer"
                >
                  Theo thời gian
                  <span style={{ color: "red" }}>*</span>
                </label>
                <Select
                  onChange={onChange("loaiThoiGian")}
                  value={state.loaiThoiGian}
                  className="select"
                  placeholder={"Chọn loại thời gian"}
                  data={listLoaiThoiGian}
                />
                {!state.isValidData && !state.loaiThoiGian && (
                  <div className="error">Vui lòng chọn loại thời gian!</div>
                )}
              </div>
            </Col>
            <Col md={6} xl={6} xxl={6}>
              <div className="item-select">
                <label className="label">Đối tượng người bệnh</label>
                <Select
                  className="select"
                  placeholder={"Chọn đối tượng người bệnh"}
                  data={[{ id: "", ten: "Tất cả" }, ...(listDoiTuong || [])]}
                  onChange={onChange("doiTuong")}
                />
              </div>
            </Col>
            <Col md={6} xl={6} xxl={6}>
              <div className="item-select">
                <label
                  className="label pointer"
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
                  className="select"
                  placeholder={"Chọn phòng thực hiện"}
                  data={state.listPhongThucHien}
                />
              </div>
            </Col>
            <Col md={6} xl={6} xxl={6}>
              <div className="item-select">
                <label
                  className="label pointer"
                  onClick={() =>
                    openInNewTab("/danh-muc/nguon-nguoi-benh?active=1&tab=2")
                  }
                >
                  Nguồn giới thiệu
                </label>
                <Select
                  onChange={onChange("nguonNbId")}
                  value={state.nguonNbId}
                  className="select"
                  placeholder={"Chọn nguồn giới thiệu"}
                  data={listAllNguonNguoiBenh}
                />
              </div>
            </Col>
            <Col md={6} xl={6} xxl={6}>
              <div className="item-date">
                <label
                  // onClick={() => openInNewTab("/danh-muc/quay-tiep-don")}
                  style={{ color: state.tuNgay ? "" : "red" }}
                  className="label pointer"
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
                />
                {!state.isValidData && !state.tuNgay && (
                  <div className="error">Vui lòng chọn thời gian từ ngày!</div>
                )}
              </div>
            </Col>
            <Col md={6} xl={6} xxl={6}>
              <div className="item-select">
                <label className="label">Đối tượng khám chữa bệnh</label>
                <Select
                  onChange={onChange("doiTuongKcb")}
                  value={state.doiTuongKcb}
                  className="select"
                  placeholder={"Đối tượng khám chữa bệnh"}
                  data={[{ id: "", ten: "Tất cả" }, ...(listDoiTuongKcb || [])]}
                />
              </div>
            </Col>
            <Col md={6} xl={6} xxl={6}>
              <div className="item-select">
                <label
                  className="label pointer"
                  onClick={() => openInNewTab("/danh-muc/khoa?active=1")}
                >
                  Khoa thực hiện
                </label>
                <Select
                  onChange={onChange("khoaThucHienId")}
                  value={state.khoaThucHienId}
                  className="select"
                  placeholder={"Chọn khoa thực hiện"}
                  data={state.listKhoaThucHienRender}
                />
              </div>
            </Col>
            <Col md={6} xl={6} xxl={6}>
              <div className="item-select">
                <label
                  className="label pointer"
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
                  className="select"
                  placeholder={"Chọn người giới thiệu"}
                  data={listAllNguoiGioiThieu}
                />
              </div>
            </Col>
            <Col md={6} xl={6} xxl={6}>
              <div className="item-date">
                <label
                  style={{ color: state.denNgay ? "" : "red" }}
                  className="label"
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
                />
                {!state.isValidData && !state.denNgay && (
                  <div className="error">Vui lòng chọn thời gian đến ngày!</div>
                )}
              </div>
            </Col>
            <Col md={6} xl={6} xxl={6} offset={12}>
              <div className="item-select">
                <label className="label">Trạng thái thanh toán</label>
                <Select
                  onChange={onChange("thanhToan")}
                  defaultValue={null}
                  className="select"
                  // placeholder={"Chọn trạng thái thanh toán"}
                  data={YES_NO}
                />
              </div>
            </Col>
          </Row>
        </Wrapper>
      </HomeWrapper>
    </Main>
  );
};

export default connect(
  (state) => ({
    listLoaiThoiGian: state.utils.listLoaiThoiGian || [],
    listDoiTuong: state.utils.listDoiTuong || [],
    listhuongGiay: state.utils.listhuongGiay || [],
    listkhoGiay: state.utils.listkhoGiay || [],
    listDinhDangBaoCao: state.utils.listDinhDangBaoCao || [],
    listPhongThucHien: state.phongThucHien.listData || [],
    listAllNguonNguoiBenh: state.nguonNguoiBenh.listAllNguonNguoiBenh || [],
    listAllNguoiGioiThieu: state.nguoiGioiThieu.listAllNguoiGioiThieu || [],
    listDoiTuongKcb: state.utils.listDoiTuongKcb || [],
  }),
  ({
    utils: { getUtils },
    phongThucHien: { getData: getDanhSachPhongThucHien },
    nguonNguoiBenh: { searchAll: searchAllNguonNguoiBenh },
    nguoiGioiThieu: { searchAll: searchAllNguoiGioiThieu },
    baoCaoDaIn: { getBc01 },
  }) => ({
    getUtils,
    getDanhSachPhongThucHien,
    searchAllNguonNguoiBenh,
    searchAllNguoiGioiThieu,
    getBc01,
  })
)(Index);
