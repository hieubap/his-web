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
  listdoiTuong,
  listPhongThucHien,
  listAllNguoiGioiThieu,
  listAllNguonNguoiBenh,
  searchAllNguoiGioiThieu,
  searchAllNguonNguoiBenh,
  getDanhSachPhongThucHien,
  getBcDsNbKhamChiTiet,
  getUtils,
  getListNhanVien,
  listNhanVien,
  ...props
}) => {
  const [state, _setState] = useState({
    loaiThoiGian: 20,
    tuNgay: moment().set("hour", 0).set("minute", 0).set("second", 0),
    denNgay: moment().set("hour", 23).set("minute", 59).set("second", 59),
    isValidData: true,
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
      : e;
    setState({
      [type]: value,
    });
  };

  const onOk = (isOk) => () => {
    if (isOk) {
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
        bacSiKhamId: state.bacSiKhamId,
      };
      getBcDsNbKhamChiTiet(payload)
        .then((data) => {
          if (!data.dinhDang || data.dinhDang == 20) {
            // export pdf
            if (data.file.pdf) {
              setState({
                src: data.file?.pdf,
                type: 20,
              });
            }
          } else if (data.dinhDang == 10) {
            // export xlsx
            setState({
              src: data.file?.doc,
              type: 10,
            });
          }
        })
        .catch((e) => {});
    } else {
      setState({
        loaiThoiGian: 20,
        tuNgay: moment().set("hour", 0).set("minute", 0).set("second", 0),
        denNgay: moment().set("hour", 23).set("minute", 59).set("second", 59),
        nguonNbId: null,
        nguoiGioiThieuId: null,
        khoaThucHienId: null,
        phongThucHienId: null,
        doiTuong: null,
        listKhoaThucHienRender: state.listKhoaThucHien,
        isValidData: true,
      });
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
          link.click();
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
    if (state.phongThucHienId) {
      let dsKhoaThucHienRender = state.dsKhoaThucHienRender?.filter(
        (x) => x?.phongThucHienId == state.phongThucHienId
      );
      setState({ khoaThucHienId: null, dsKhoaThucHienRender });
    }
  }, [state.phongThucHienId]);

  useEffect(() => {
    getUtils({ name: "LoaiThoiGian" });
    getUtils({ name: "doiTuong" });
    getUtils({ name: "huongGiay" });
    getUtils({ name: "khoGiay" });
    getUtils({ name: "DinhDangBaoCao" });
    getDanhSachPhongThucHien({ page: 0, size: 9999 });
    searchAllNguoiGioiThieu({ page: 0, size: 9999, active: true });
    searchAllNguonNguoiBenh({ page: 0, size: 9999, active: true });
    getListNhanVien({ page: 0, size: 9999, active: true });
  }, []);

  return (
    <Main>
      <HomeWrapper title="Báo cáo">
        <Wrapper title="PK01. Danh sách người bệnh khám chi tiết">
          <div className="note">Chọn tiêu chí lọc cho báo cáo!</div>
          <Row>
            <Col md={8} xl={8} xxl={8}>
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
            <Col md={8} xl={8} xxl={8}>
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
            <Col md={8} xl={8} xxl={8}>
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
            <Col md={8} xl={8} xxl={8}>
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
            <Col md={8} xl={8} xxl={8}>
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
            <Col md={8} xl={8} xxl={8}>
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
            <Col md={8} xl={8} xxl={8}>
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
            <Col md={8} xl={8} xxl={8}>
              <div className="item-select">
                <label className="label">Bác sĩ khám</label>
                <Select
                  onChange={onChange("bacSiKhamId")}
                  value={state.bacSiKhamId}
                  className="select"
                  placeholder={"Chọn bác sĩ khám"}
                  data={listNhanVien}
                />
              </div>
            </Col>
            <Col md={8} xl={8} xxl={8}>
              <div className="item-select">
                <label className="label">Đối tượng NB</label>
                <Select
                  onChange={onChange("doiTuong")}
                  value={state.doiTuong}
                  className="select"
                  placeholder={"Chọn đối tượng NB"}
                  data={listdoiTuong}
                />
              </div>
            </Col>
          </Row>
          <div className="action">
            <div className="btn" onClick={onOk(false)}>
              <span>Reset</span>
            </div>
            <div className="btn btn-blue" onClick={onOk(true)}>
              <span>Xuất báo cáo</span>
              <img src={require("assets/images/bao-cao/export.png")} alt="" />
            </div>
          </div>
        </Wrapper>
      </HomeWrapper>
    </Main>
  );
};

export default connect(
  (state) => ({
    listLoaiThoiGian: state.utils.listLoaiThoiGian || [],
    listdoiTuong: state.utils.listdoiTuong || [],
    listhuongGiay: state.utils.listhuongGiay || [],
    listkhoGiay: state.utils.listkhoGiay || [],
    listDinhDangBaoCao: state.utils.listDinhDangBaoCao || [],
    listPhongThucHien: state.phongThucHien.listData || [],
    listAllNguonNguoiBenh: state.nguonNguoiBenh.listAllNguonNguoiBenh || [],
    listAllNguoiGioiThieu: state.nguoiGioiThieu.listAllNguoiGioiThieu || [],
    listNhanVien: state.nhanVien.listNhanVien,
  }),
  ({
    utils: { getUtils },
    phongThucHien: { getData: getDanhSachPhongThucHien },
    nguonNguoiBenh: { searchAll: searchAllNguonNguoiBenh },
    nguoiGioiThieu: { searchAll: searchAllNguoiGioiThieu },
    baoCaoDaIn: { getBcDsNbKhamChiTiet },
    nhanVien: { getListNhanVien },
  }) => ({
    getUtils,
    getDanhSachPhongThucHien,
    searchAllNguonNguoiBenh,
    searchAllNguoiGioiThieu,
    getBcDsNbKhamChiTiet,
    getListNhanVien,
  })
)(Index);
