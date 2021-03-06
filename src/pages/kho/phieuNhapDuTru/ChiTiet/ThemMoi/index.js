import React, { memo, useState, useMemo, useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Select, Col, Row, Input, Form } from "antd";
import { HINH_THUC_NHAP_XUAT } from "constants/index";
import { Main } from "./styled";
const { Option } = Select;

const ThemMoi = ({
  // state
  auth,
  listKhoDoiUng,
  listHinhThucNhapXuat,
  listthang,
  listKhoTheoNhanVien,
  listKhoUser,
  thongTinPhieuNhap,
  checkValidate,
  listAllKho,
  // dispatch
  updateData,
  getUtils,
  getAllKhoTongHop,
  getListHinhThucNhapXuat,
  searchNhanVienById,
  onSearchQuanTriKho,
  getTheoTaiKhoan,
  onSearchNhanVienKho,
  nhanVienId,
  listDataNhanVienKho,
  ...props
}) => {
  const [form] = Form.useForm();
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const onChange = (type) => (e) => {
    const value = e?.target ? e.target?.value : e;
    updateData({
      thongTinPhieuNhap: {
        ...thongTinPhieuNhap,
        [type]: value,
      },
    });
  };
  const filterOption = (input = "", option) => {
    input = input?.toLowerCase().createUniqueText() || "";
    return (
      option?.props.children?.toLowerCase().createUniqueText().indexOf(input) >=
      0
    );
  };
  const optionsKhoDoiUng = useMemo(() => {
    let dsKho = listAllKho?.filter((item) =>
      (listKhoDoiUng || []).map((i) => i.khoQuanLyId).includes(item?.id)
    );
    let options = dsKho?.map((item, index) => (
      <Option key={index} value={item?.id}>
        {item?.ten}
      </Option>
    ));
    return options;
  }, [listKhoDoiUng]);
  const optionsThangDuTru = useMemo(() => {
    let options = listthang?.map((item, index) => (
      <Option key={index} value={item?.id}>
        {`${item.ten}`}
      </Option>
    ));
    return options;
  }, [listthang]);
  const optionsHinhThucNhapXuat = useMemo(() => {
    let options = listHinhThucNhapXuat?.map((item, index) => (
      <Option key={index} value={item?.id}>
        {item?.ten}
      </Option>
    ));
    return options;
  }, [listHinhThucNhapXuat]);
  const optionsKho = useMemo(() => {
    let options = listDataNhanVienKho?.map((item, index) => (
      <Option key={index} value={item?.khoId}>
        {item?.kho?.ten}
      </Option>
    ));
    return options;
  }, [listDataNhanVienKho]);
  useEffect(() => {
    if (props.mode != "chinh-sua") {
      updateData({
        thongTinPhieuNhap: {
          ...thongTinPhieuNhap,
          khoDoiUngId: null,
        },
      });
    }
    getAllKhoTongHop({ active: true }).then((s) => {
      onSearchQuanTriKho({
        active: true,
        size: 99999,
        dataSearch: { khoTrucThuocId: thongTinPhieuNhap?.khoId, active: true },
      });
    });
  }, [thongTinPhieuNhap?.khoId]);
  useEffect(() => {
    onSearchNhanVienKho({ nhanVienId, size: 9999999 });
    getAllKhoTongHop({ active: true });
    getUtils({ name: "thang" });
    getListHinhThucNhapXuat({
      active: true,
      dsHinhThucNhapXuat: HINH_THUC_NHAP_XUAT.HINH_THUC_NHAP,
    });
    if (auth?.nhanVienId) {
      searchNhanVienById({ nhanVienId: auth?.nhanVienId });
    }
  }, []);
  
  return (
    <Main>
      <Form style={{ width: "100%" }} form={form} layout="vertical">
        <div className="title">Th??ng tin phi???u nh???p</div>
        <Row gutter={[10, 10]}>
          <Col span={6}>
            <div className="item-select">
              <label
                className={
                  !thongTinPhieuNhap?.khoDoiUngId
                    ? `label label-error`
                    : "label"
                }
              >
                Kho xu???t<span style={{ color: "red" }}> *</span>
              </label>
              <Select
                showSearch
                onChange={onChange("khoDoiUngId")}
                value={thongTinPhieuNhap?.khoDoiUngId}
                filterOption={filterOption}
                placeholder={"Ch???n kho xu???t"}
                disabled={props.mode != "them-moi"}
              >
                {optionsKhoDoiUng}
              </Select>
              {checkValidate && !thongTinPhieuNhap?.khoDoiUngId && (
                <div className="error">Vui l??ng ch???n kho xu???t!</div>
              )}
            </div>
          </Col>
          <Col span={6}>
            <div className="item-select">
              <label
                className={
                  !thongTinPhieuNhap?.thangDuTru ? `label label-error` : "label"
                }
              >
                Th??ng d??? tr??<span style={{ color: "red" }}> *</span>
              </label>
              <Select
                onChange={onChange("thangDuTru")}
                value={thongTinPhieuNhap?.thangDuTru}
                placeholder={"Ch???n th??ng d??? tr??"}
                showSearch
              >
                {optionsThangDuTru}
              </Select>
              {checkValidate && !thongTinPhieuNhap?.thangDuTru && (
                <div className="error">Vui l??ng ch???n th??ng d??? tr??!</div>
              )}
            </div>
          </Col>
          <Col span={6}>
            <div className="item-select">
              <label
                className={
                  !thongTinPhieuNhap?.hinhThucNhapXuatId
                    ? `label label-error`
                    : "label"
                }
              >
                H??nh th???c nh???p<span style={{ color: "red" }}> *</span>
              </label>
              <Select
                onChange={onChange("hinhThucNhapXuatId")}
                value={thongTinPhieuNhap?.hinhThucNhapXuatId}
                placeholder={"Ch???n h??nh th???c nh???p"}
                showSearch
              >
                {optionsHinhThucNhapXuat}
              </Select>
              {checkValidate && !thongTinPhieuNhap?.hinhThucNhapXuatId && (
                <div className="error">Vui l??ng ch???n h??nh th???c nh???p!</div>
              )}
            </div>
          </Col>
          <Col span={6}>
            <div className="item-select">
              <label
                className={
                  !thongTinPhieuNhap?.khoId ? `label label-error` : "label"
                }
              >
                Kho nh???p<span style={{ color: "red" }}> *</span>
              </label>
              <Select
                onChange={onChange("khoId")}
                value={thongTinPhieuNhap?.khoId}
                placeholder={"Ch???n kho nh???p"}
                showSearch
                disabled={props.mode != "them-moi"}
              >
                {optionsKho}
              </Select>
              {checkValidate && !thongTinPhieuNhap?.khoId && (
                <div className="error">Vui l??ng ch???n kho nh???p0!</div>
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className="item-input">
              <label className={"label"}>Ghi ch??</label>
              <Input
                onChange={onChange("ghiChu")}
                value={thongTinPhieuNhap?.ghiChu}
                placeholder={"Nh???p ghi ch??"}
              />
            </div>
          </Col>
        </Row>
      </Form>
    </Main>
  );
};
const mapStateToProps = (state) => ({
  // state
  checkValidate: state.phieuNhapDuTru.checkValidate || false,
  thongTinPhieuNhap: state.phieuNhapDuTru.thongTinPhieuNhap,
  auth: state.auth.auth,
  nhanVienHienTai: state.nhanVien.nhanVienHienTai,
  // listKhoDoiUng: state.kho.listAllKho || [],
  listthang: state.utils.listthang || [],
  listHinhThucNhapXuat: state.hinhThucNhapXuat.listHinhThucNhapXuat || [],
  listKhoTheoNhanVien: state.nhanVien.listKhoTheoNhanVien || [],
  listKhoUser: state.kho.listKhoUser || [],
  listKhoDoiUng: state.quanTriKho.listData || [],
  listAllKho: state.kho.listAllKho || [],
  nhanVienId: state.auth.auth.nhanVienId || [],
  listDataNhanVienKho: state.nhanVienKho.listData || [],
});
const mapDispatchToProps = ({
  kho: { getAllTongHop: getAllKhoTongHop, getTheoTaiKhoan },
  quanTriKho: { onSearch: onSearchQuanTriKho },
  utils: { getUtils },
  hinhThucNhapXuat: { getListHinhThucNhapXuat },
  nhanVien: { searchId: searchNhanVienById },
  phieuNhapDuTru: { updateData },
  nhanVienKho: { onSearch: onSearchNhanVienKho },
}) => ({
  updateData,
  getUtils,
  getAllKhoTongHop,
  onSearchQuanTriKho,
  getTheoTaiKhoan,
  searchNhanVienById,
  getListHinhThucNhapXuat,
  onSearchNhanVienKho,
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ThemMoi);
