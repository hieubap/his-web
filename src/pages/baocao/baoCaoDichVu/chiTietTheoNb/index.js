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
    { id: null, ten: "T???t c???" },
    { id: true, ten: "???? thanh to??n" },
    { id: false, ten: "Ch??a thanh to??n" },
  ];

  const action = (
    <>
      <div className="action">
        <div className="btn" onClick={onOk(false)}>
          <span>Xem b??o c??o</span>
        </div>
        <div className="btn btn-blue" onClick={onOk(true)}>
          <span>Xu???t b??o c??o</span>
          <img src={require("assets/images/bao-cao/export.png")} alt="" />
        </div>
      </div>
    </>
  );
  return (
    <Main>
      <HomeWrapper title="B??o c??o">
        <Wrapper title="BC01. B??o c??o chi ti???t theo ng?????i b???nh" action={action}>
          <div className="note">Ch???n ti??u ch?? l???c cho b??o c??o!</div>
          <Row>
            <Col md={6} xl={6} xxl={6}>
              <div className="item-select">
                <label
                  // onClick={() => openInNewTab("/danh-muc/quay-tiep-don")}
                  style={{ color: state.loaiThoiGian ? "" : "red" }}
                  className="label pointer"
                >
                  Theo th???i gian
                  <span style={{ color: "red" }}>*</span>
                </label>
                <Select
                  onChange={onChange("loaiThoiGian")}
                  value={state.loaiThoiGian}
                  className="select"
                  placeholder={"Ch???n lo???i th???i gian"}
                  data={listLoaiThoiGian}
                />
                {!state.isValidData && !state.loaiThoiGian && (
                  <div className="error">Vui l??ng ch???n lo???i th???i gian!</div>
                )}
              </div>
            </Col>
            <Col md={6} xl={6} xxl={6}>
              <div className="item-select">
                <label className="label">?????i t?????ng ng?????i b???nh</label>
                <Select
                  className="select"
                  placeholder={"Ch???n ?????i t?????ng ng?????i b???nh"}
                  data={[{ id: "", ten: "T???t c???" }, ...(listDoiTuong || [])]}
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
                  Ph??ng th???c hi???n
                </label>
                <Select
                  onChange={onChange("phongThucHienId")}
                  value={state.phongThucHienId}
                  className="select"
                  placeholder={"Ch???n ph??ng th???c hi???n"}
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
                  Ngu???n gi???i thi???u
                </label>
                <Select
                  onChange={onChange("nguonNbId")}
                  value={state.nguonNbId}
                  className="select"
                  placeholder={"Ch???n ngu???n gi???i thi???u"}
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
                  T??? ng??y
                  <span style={{ color: "red" }}>*</span>
                </label>
                <DatePicker
                  showTime
                  value={state.tuNgay}
                  onChange={onChange("tuNgay")}
                  placeholder="Ch???n ng??y"
                  format="DD/MM/YYYY HH:mm:ss"
                />
                {!state.isValidData && !state.tuNgay && (
                  <div className="error">Vui l??ng ch???n th???i gian t??? ng??y!</div>
                )}
              </div>
            </Col>
            <Col md={6} xl={6} xxl={6}>
              <div className="item-select">
                <label className="label">?????i t?????ng kh??m ch???a b???nh</label>
                <Select
                  onChange={onChange("doiTuongKcb")}
                  value={state.doiTuongKcb}
                  className="select"
                  placeholder={"?????i t?????ng kh??m ch???a b???nh"}
                  data={[{ id: "", ten: "T???t c???" }, ...(listDoiTuongKcb || [])]}
                />
              </div>
            </Col>
            <Col md={6} xl={6} xxl={6}>
              <div className="item-select">
                <label
                  className="label pointer"
                  onClick={() => openInNewTab("/danh-muc/khoa?active=1")}
                >
                  Khoa th???c hi???n
                </label>
                <Select
                  onChange={onChange("khoaThucHienId")}
                  value={state.khoaThucHienId}
                  className="select"
                  placeholder={"Ch???n khoa th???c hi???n"}
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
                  Ng?????i gi???i thi???u
                </label>
                <Select
                  onChange={onChange("nguoiGioiThieuId")}
                  value={state.nguoiGioiThieuId}
                  className="select"
                  placeholder={"Ch???n ng?????i gi???i thi???u"}
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
                  ?????n ng??y
                  <span style={{ color: "red" }}>*</span>
                </label>
                <DatePicker
                  showTime
                  value={state.denNgay}
                  onChange={onChange("denNgay")}
                  placeholder="Ch???n ng??y"
                  format="DD/MM/YYYY HH:mm:ss"
                />
                {!state.isValidData && !state.denNgay && (
                  <div className="error">Vui l??ng ch???n th???i gian ?????n ng??y!</div>
                )}
              </div>
            </Col>
            <Col md={6} xl={6} xxl={6} offset={12}>
              <div className="item-select">
                <label className="label">Tr???ng th??i thanh to??n</label>
                <Select
                  onChange={onChange("thanhToan")}
                  defaultValue={null}
                  className="select"
                  // placeholder={"Ch???n tr???ng th??i thanh to??n"}
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
