import React, { memo, useState, useRef, useEffect, useMemo } from "react";
import Table from "components/Table";
import { ROLES } from "constants";
import { Main } from "./styled";
import { connect, useSelector, useDispatch } from "react-redux";
import { compose } from "redux";
import { Checkbox, Row, Col, message } from "antd";
import Select from "components/Select";
import { ModalNotification2 } from "components/ModalConfirm";
import ModalPayment from "../ModalPayment";
import ModalDiscount from "../ModalDiscount";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { find } from "lodash"
const ThongTinDonThuoc = ({
  isThemMoi
}) => {
  const history = useHistory()
  //ref
  const refModalNotification = useRef(null);
  const refModalDiscount = useRef(null);
  // get
  const themMoiThuoc = useSelector(state => state.themMoiThuoc)
  const listKhoUser = useSelector(state => state.kho.listKhoUser)
  const thuocChiTiet = useSelector(state => state.thuocChiTiet)
  const listTrangThaiHoan = useSelector(state => state.utils.listtrangThaiHoan)
  const listTrangThaiPhieuNhapXuat = useSelector(state => state.utils.listTrangThaiPhieuNhapXuat)
  const { isAdvised, nguoiBenhId, dsThuocEdit, selectedDonThuoc, infoPatient } = thuocChiTiet
  // dispatch
  const createOrEdit = useDispatch().themMoiThuoc.createOrEdit
  const { updateData: updateDataThemMoiThuoc , resetModel : resetModelThemMoiThuoc} = useDispatch().themMoiThuoc
  const getTheoTaiKhoan = useDispatch().kho.getTheoTaiKhoan
  const { updateData, changesDonThuoc, postThanhToan } = useDispatch().thuocChiTiet

  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  let {
    gioiTinh,
    nbDotDieuTri,
    quanHuyenId,
    quocGiaId,
    soNha,
    tinhThanhPhoId,
    xaPhuongId,
    ngaySinh,
    soDienThoai,
    tenNb,
    thangTuoi,
    tuoi
  } = themMoiThuoc

  const isVangLai = useMemo(() => {
    return infoPatient.nbDotDieuTri?.ngoaiVien
  }, [infoPatient.nbDotDieuTri])

  useEffect(() => {
    getTheoTaiKhoan()
  }, [])

  const paymentHandler = () => {
    refModalNotification.current.show();
  }
  const adviseHandler = () => {
    updateData({ isAdvised: true })
  }
  const vangLaiSave = async () => {
    if (tuoi < 6) {
      if (!nbDotDieuTri?.nbNguoiBaoLanh?.hoTen) {
        return message.error(
          `Vui lòng nhập họ tên người bảo lãnh`
        );
      }
      if (!nbDotDieuTri?.nbNguoiBaoLanh?.soDienThoai ) {
        return message.error(
          `Vui lòng nhập số điện thoại người bảo lãnh`
        );
      }
      if(!nbDotDieuTri?.nbNguoiBaoLanh?.soDienThoai.replaceAll(" ", "").isPhoneNumber()){
        return message.error(
          `SĐT người bảo lãnh sai định dạng!`
        );
      }
    }
    let objCustom = {
      nbDotDieuTri: {
        ...nbDotDieuTri,
        tuoi: tuoi,
        ngaySinh: ngaySinh?.date ? moment(ngaySinh?.date).toISOString() : null
      },
      // nbDotDieuTri,
      // ngaySinh: ngaySinh?.date ? moment(ngaySinh?.date).toISOString() : null,
      // soDienThoai,
      // tenNb,
      thangTuoi,
      // tuoi,
      khoId: state.khoId,
      dsThuoc: dsThuocEdit
    }
    try {
      let res = await createOrEdit(objCustom)
      if (res.phieuXuatId) {
        resetModelThemMoiThuoc()
        updateDataThemMoiThuoc({
          nbDotDieuTri: {
            "nbDiaChi": {
              "quocGiaId": 1,
              "quocTichId": 1
            }
          },
        })
      }
      history.push(`/kho/nha-thuoc/chi-tiet/${res.phieuXuatId}`);
    } catch (e) {

    }
  }
  const saveHandler = async () => {
    if (isThemMoi) {
      await vangLaiSave()
    } else if (isAdvised) {
      changesDonThuoc({ id: nguoiBenhId, dsThuoc: dsThuocEdit })
    }
    updateData({ isAdvised: false })
  }
  const onChange = (key) => (e) => {
    const value = (e?.target && e.target.value) || e
    setState({ [key]: value })
    if (key === "khoId") {
      updateData({ khoId: value })
    }
  }
  const renderButton = () => {
    if (infoPatient?.phieuXuat?.trangThai === 10 && infoPatient?.phieuThu?.thanhToan) {
      // TT đơn = Tạo mới & TT thanh toán = Đã thanh toán => Hiển thị button Phát
      return (
        <Row className="select-row-last">
          <div className="button" style={{ width: '100%' }} onClick={() => {
            let list = infoPatient.phieuThu.dsPhuongThucTt.reduce((init, item) => {
              return Object.assign(init, {
                phuongThucTtId: item.phuongThucTtId,
                tongTien: item.tongTien
              })
            }, [])
            postThanhToan(
              { id: nguoiBenhId, dsPhuongThucTt: list },
              state.infoPrice
            ).then((res) => {

            });
          }}>
            <span>Phát</span>
            <img style={{ marginLeft: 6 }} src={require("assets/images/kho/save.png")} alt=""></img>
          </div>
        </Row>
      )
    } else {// ----------------------------------------------------------------
      if (isThemMoi || isAdvised) { // thêm mới hoặc nhấn button tư vấn
        return (
          <Row className="select-row-last">
            <div className="button" style={{ width: '100%' }} onClick={saveHandler}>
              <span>Lưu</span>
              <img style={{ marginLeft: 6 }} src={require("assets/images/kho/save.png")} alt=""></img>
            </div>
          </Row>
        )
      } else if (
        !infoPatient?.phieuThu?.thanhToan &&
        (
          infoPatient?.phieuXuat?.trangThai === 10 ||
          infoPatient?.phieuXuat?.trangThai === 15 ||
          infoPatient?.phieuXuat?.trangThai === 20
        )
      ) {
        // TT đơn = Tạo mới & TT thanh toán = chưa thanh toán => Hiển thị button Thanh toán , Tư vấn đơn
        return (
          <Row className="select-row-last">
            <Col span={isVangLai ? 24 : 11} >
              <div className="button" onClick={paymentHandler}>
                <span style={{ fontSize: 14 }}>Thanh toán</span>
                <img style={{ marginLeft: 5 }} src={require("assets/images/kho/pay.png")} alt=""></img>
              </div>
            </Col>
            {!isVangLai && ( // người bệnh nội trú (không phải vãng lai) mới hiện UI
              <Col span={11} >
                <div className="button" onClick={adviseHandler}>
                  <span style={{ fontSize: 14 }}>Tư vấn đơn</span>
                  <img style={{ marginLeft: 5 }} src={require("assets/images/kho/advise.png")} alt=""></img>
                </div>
              </Col>
            )}
          </Row>)
      }
    }
  }
  return (
    <Main md={24} xl={24} xxl={24} className="container" isThemMoi={isThemMoi}>
      <div className="title">Thông tin đơn thuốc</div>
      <div className={infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"}>Kho bán</div>
      <Row className="select-row-1">
        {isThemMoi ?
          (
            <Select
              onChange={onChange("khoId")}
              // value={state.loaiDichVu}
              placeholder={"Kho tổng"}
              data={listKhoUser}
            // value={state.khoId || listKhoUser[0]?.id}
            />
          )
          : listKhoUser && find(listKhoUser, { 'id': infoPatient?.khoId, })?.ten}
      </Row>

      <Row className="select-row-2">
        <div className="title-item">Tổng tiền</div>
        <div className="title-item">
          {infoPatient?.phieuThu?.tongTien && infoPatient?.phieuThu?.tongTien.formatPrice()}
        </div>
      </Row>

      <Row className="select-row-2">
        <div className="title-item" style={{ color: "#0762F7" }} onClick={() => {
          refModalDiscount.current.show()
          // refModalDiscount.current &&
          //   refModalDiscount.current.show(
          //     {
          //       title: "Trùng dịch vụ",
          //       content: `Dịch vụ đã tồn tại. <br> Chắc chắn muốn chỉ định trùng dịch vụ?`,
          //       cancelText: "Quay lại",
          //       okText: "Đồng ý",
          //       classNameOkText: "button-error",
          //       showImg: true,
          //       showBtnOk: true,
          //       showBtnOk: true,
          //     },
          //     () => {
          //       // onService(value, item);
          //     },
          //     () => { }
          //   );
        }}>
          <img src={require("assets/images/kho/discount.png")} alt=""></img>
          <span style={{ marginLeft: 6 }}>Chiết khấu</span>
        </div>
        <div className="title-item">{infoPatient?.phieuThu?.tienMienGiam?.formatPrice()}</div>
      </Row>

      <Row className="select-row-2">
        <div className="title-item">Thành tiền</div>
        <div className="title-item">
          <b>
            {infoPatient?.phieuThu?.thanhTien && infoPatient?.phieuThu?.thanhTien?.formatPrice()}
          </b>
        </div>
      </Row>

      <Row>
        <div xxl={24} className={infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"}>Ghi chú</div>
        <textarea className="textarea" defaultValue={selectedDonThuoc?.nbDichVu?.ghiChu}></textarea>
      </Row>

      <Row>
        <div className={infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"}>Trạng thái đơn:
          {` ${infoPatient?.phieuXuat?.trangThai ? listTrangThaiPhieuNhapXuat?.find(item => item.id === infoPatient?.phieuXuat?.trangThai)?.ten : ""}`}
        </div>
      </Row>
      {!infoPatient?.phieuThu?.thanhToan && (
        <Row>
          <div className={infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"}>Trạng thái thanh toán:
          <span style={{ color: !infoPatient?.phieuThu?.thanhToan ? "red" : "#049254" }}>
              {` ${!infoPatient?.phieuThu?.thanhToan ? "Chưa thanh toán" : "Đã thanh toán"}`}
            </span>
          </div>
        </Row>
      )}
      <Row>
        <div className={infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"}>
          Ngày phát: {infoPatient?.phieuXuat?.thoiGianDuyet && moment(infoPatient?.phieuXuat?.thoiGianDuyet).format("DD/MM/YYYY")}
        </div>
      </Row>
      <Row>
        <div className={infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"}>
          Người phát: {infoPatient?.phieuXuat?.nguoiDuyet?.ten && infoPatient?.phieuXuat?.nguoiDuyet?.ten}
        </div>
      </Row>
      <Row>
        <div className={infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"}>
          Trạng thái hoàn: {listTrangThaiHoan?.find(item => item.id === selectedDonThuoc?.nbDichVu?.trangThaiHoan)?.ten}
        </div>
      </Row>
      {infoPatient?.phieuThu?.thanhToan && (
        <div>
          <hr className="hr" />
          <Row className="row_paid">
            <div className={infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"}>
              Trạng thái thanh toán:
              <span style={{ color: !infoPatient?.phieuThu?.thanhToan ? "red" : "#049254" }}>
                {` ${!infoPatient?.phieuThu?.thanhToan ? "Chưa thanh toán" : "Đã thanh toán"}`}
              </span>
            </div>
          </Row>
          <Row className="row_paid">
            <div className={infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"}>
              Tên thu ngân:
            </div>
            <span>{`${infoPatient?.phieuThu?.thuNgan?.ten}`}</span>
          </Row>
          <Row className="row_paid">
            <div className={infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"}>
              TG thanh toán:
            </div>
            <span>
              {
                infoPatient?.phieuThu?.thoiGianThanhToan &&
                moment(infoPatient?.phieuThu?.thoiGianThanhToan).format("HH:MM")} - {moment(infoPatient?.phieuThu?.thoiGianThanhToan).format("DD/MM/YYYY")
              }
            </span>
          </Row>
          {infoPatient?.phieuThu?.dsPhuongThucTt?.map(item => {
            return (
              <Row className="row_paid">
                <div className={infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"}>
                  {item?.phuongThucTt?.ten}:
                </div>
                <span>
                  {item?.tongTien?.formatPrice()}
                </span>
              </Row>
            )
          })}
          {/* <Row>
            <div className={infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"}>
              QR Pay:
              </div>
          </Row>
          <Row>
            <div className={infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"}>
              Tiền mặt:
              </div>
          </Row>
          <Row>
            <div className={infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"}>
              CK Techcombank:
              </div>
          </Row> */}
        </div>
      )}
      {renderButton()}

      {/* {infoPatient?.phieuXuat?.trangThai != 30 && infoPatient?.phieuThu?.thanhToan && (
        <Row className="select-row-last">
          <div className="button" style={{ width: '100%' }} onClick={saveHandler}>
            <span>Phát</span>
            <img style={{ marginLeft: 6 }} src={require("assets/images/kho/save.png")} alt=""></img>
          </div>
        </Row>
      )} */}
      {/* {isThemMoi || isAdvised ? (
        <Row className="select-row-last">
          <div className="button" style={{ width: '100%' }} onClick={saveHandler}>
            <span>Lưu</span>
            <img style={{ marginLeft: 6 }} src={require("assets/images/kho/save.png")} alt=""></img>
          </div>
        </Row>
      ) : (
          <Row className="select-row-last">
            <Col span={11} >
              <div className="button" onClick={paymentHandler}>
                <span style={{ fontSize: 14 }}>Thanh toán</span>
                <img style={{ marginLeft: 5 }} src={require("assets/images/kho/pay.png")} alt=""></img>
              </div>
            </Col>
            <Col span={11} >
              <div className="button" onClick={adviseHandler}>
                <span style={{ fontSize: 14 }}>Tư vấn đơn</span>
                <img style={{ marginLeft: 5 }} src={require("assets/images/kho/advise.png")} alt=""></img>
              </div>
            </Col>
          </Row>
        )} */}
      <ModalDiscount ref={refModalDiscount} />
      <ModalPayment modalCheckoutRef={refModalNotification} />
    </Main>
  );
};
const mapStateToProps = (state) => {
  return {
  };
};
const mapDispatchToProps = () => ({
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ThongTinDonThuoc);
