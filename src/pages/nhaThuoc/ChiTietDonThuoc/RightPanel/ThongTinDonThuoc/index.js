import React, { memo, useState, useRef, useEffect, useMemo } from "react";
import Table from "components/Table";
import { ROLES } from "constants";
import { Main } from "./styled";
import { connect, useSelector, useDispatch } from "react-redux";
import { compose } from "redux";
import { Checkbox, Row, Col, message, Select as SelectAntd } from "antd";
import Select from "components/Select";
import { ModalNotification2 } from "components/ModalConfirm";
import ModalPayment from "../ModalPayment";
import ModalDiscount from "../ModalDiscount";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { find } from "lodash"
const { Option } = SelectAntd;
const ThongTinDonThuoc = ({
  isThemMoi,
  layerId
}) => {
  const history = useHistory()
  //ref
  const refModalNotification = useRef(null);
  const refModalDiscount = useRef(null);
  // get
  const auth = useSelector(state => state.auth.auth)
  const themMoiThuoc = useSelector(state => state.themMoiThuoc)
  const listKhoUser = useSelector(state => state.kho.listKhoUser)
  const thuocChiTiet = useSelector(state => state.thuocChiTiet)
  const listTrangThaiHoan = useSelector(state => state.utils.listtrangThaiHoan)
  const listTrangThaiDonThuocNhaThuoc = useSelector(state => state.utils.listTrangThaiDonThuocNhaThuoc)
  // const listDataNhanVienKho = useSelector(state => state.nhanVienKho.listData)
  const { isAdvised, nguoiBenhId, dsThuocEdit, selectedDonThuoc, infoPatient } = thuocChiTiet
  // dispatch
  const createOrEdit = useDispatch().themMoiThuoc.createOrEdit
  const { updateData: updateDataThemMoiThuoc, resetModel: resetModelThemMoiThuoc } = useDispatch().themMoiThuoc
  const getTheoTaiKhoan = useDispatch().kho.getTheoTaiKhoan
  const { updateData, changesDonThuoc, postThanhToan, updateGhiChuDonThuocById } = useDispatch().thuocChiTiet
  const onSearchNhanVienKho = useDispatch().nhanVienKho.onSearch

  const { onRegisterHotkey } = useDispatch().phimTat;
  const refF4 = useRef();
  const refF12 = useRef();

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
    // if (auth?.nhanVienId) {
    //   onSearchNhanVienKho({ nhanVienId: auth?.nhanVienId , size : 9999999})
    // }
    getTheoTaiKhoan({ nhaThuoc: true })
    
    // ????ng k?? ph??m t???t
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 115, //F4
          onEvent: () => {
            refF4.current && refF4.current();
          },
        },
        {
          keyCode: 123, //F12
          onEvent: () => {
            if(refF12.current) refF12.current()
          },
        },
      ],
    });
  }, [])

  refF12.current = () => {
    if (
      !infoPatient?.phieuThu?.thanhToan &&
      (infoPatient?.phieuXuat?.trangThai === 10 ||
        infoPatient?.phieuXuat?.trangThai === 15 ||
        infoPatient?.phieuXuat?.trangThai === 20) &&
      refModalNotification.current
    )
      refModalNotification.current.show();
  }

  useEffect(() => {
    if(listKhoUser?.length === 1){ // default khoId , n???u kho ch??? c?? 1 gi?? tr???
      setState({khoId : listKhoUser[0].id})
      updateData({khoId : listKhoUser[0].id})
    }
  }, [listKhoUser])

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
          `Vui l??ng nh???p h??? t??n ng?????i b???o l??nh`
        );
      }
      if (!nbDotDieuTri?.nbNguoiBaoLanh?.soDienThoai) {
        return message.error(
          `Vui l??ng nh???p s??? ??i???n tho???i ng?????i b???o l??nh`
        );
      }
      if (!nbDotDieuTri?.nbNguoiBaoLanh?.soDienThoai.replaceAll(" ", "").isPhoneNumber()) {
        return message.error(
          `S??T ng?????i b???o l??nh sai ?????nh d???ng!`
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
      dsThuoc: dsThuocEdit,
      phieuXuat: {
        ghiChu: state?.ghiChu
      }
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
      history.push(`/nha-thuoc/chi-tiet/${res.phieuXuatId}`);
    } catch (e) {

    }
  }
  const saveHandler = async () => {
    let thanMoreSoLuongKhaDung = infoPatient?.dsThuoc?.some((item, index) => {
      return dsThuocEdit[index]?.nbDichVu?.soLuong > item?.nbDvKho?.soLuongKhaDung
    })
    if (thanMoreSoLuongKhaDung) {
      message.error("Kh??ng th??? th??m s??? l?????ng > s??? l?????ng kh??? d???ng")
      return null
    }

    if (isThemMoi) {
      await vangLaiSave()
    } else if (isAdvised) {
      let res = await changesDonThuoc({ id: nguoiBenhId, dsThuoc: dsThuocEdit })
      if (res) {
        message.success("C???p nh???t th??nh c??ng d??? li???u d???ch v???");
      }
    } else if (isVangLai) {
      let res = await changesDonThuoc({ id: nguoiBenhId, dsThuoc: dsThuocEdit })
      if (res) {
        message.success("C???p nh???t th??nh c??ng d??? li???u d???ch v???");
      }
    }
    updateData({ isAdvised: false })
  }
  refF4.current = saveHandler;
  const onChange = (key) => (e) => {
    const value = (e?.target && e.target.value) || e
    setState({ [key]: value })
    if (key === "khoId") {
      updateData({ khoId: value })
    }
  }
  const renderButton = () => {
    if (infoPatient?.phieuXuat?.trangThai <= 15 && infoPatient?.phieuThu?.thanhToan) {
      // TT ????n = T???o m???i & TT thanh to??n = ???? thanh to??n => Hi???n th??? button Ph??t
      return (
        <Row className="select-row-last">
          <div className="button" style={{ width: '100%' }} onClick={() => {
            let list = infoPatient?.phieuThu?.dsPhuongThucTt?.reduce((init, item) => {
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
            <span>Ph??t</span>
            <img style={{ marginLeft: 6 }} src={require("assets/images/kho/save.png")} alt=""></img>
          </div>
        </Row>
      )
    } else {// ----------------------------------------------------------------
      if (isThemMoi || isAdvised) { // th??m m???i ho???c nh???n button t?? v???n
        return (
          <Row className="select-row-last">
            <div className="button" style={{ width: '100%' }} onClick={saveHandler}>
              <span>L??u</span>
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
        // TT ????n = T???o m???i & TT thanh to??n = ch??a thanh to??n => Hi???n th??? button Thanh to??n , T?? v???n ????n

        return (
          <Row className="select-row-last">
            {isVangLai && <Col span={11}> {/* t???o m???i v?? trong chi ti???t */}
              <div className="button" onClick={saveHandler}>
                <span>L??u</span>
                <img style={{ marginLeft: 6 }} src={require("assets/images/kho/save.png")} alt=""></img>
              </div>
            </Col>}
            <Col span={isVangLai && isThemMoi ? 24 : 11} >
              <div className="button" onClick={paymentHandler}>
                <span style={{ fontSize: 14 }}>Thanh to??n</span>
                <img style={{ marginLeft: 5 }} src={require("assets/images/kho/pay.png")} alt=""></img>
              </div>
            </Col>
            {!isVangLai && ( // ng?????i b???nh n???i tr?? (kh??ng ph???i v??ng lai) m???i hi???n UI
              <Col span={11} >
                <div className="button" onClick={adviseHandler}>
                  <span style={{ fontSize: 14 }}>T?? v???n ????n</span>
                  <img style={{ marginLeft: 5 }} src={require("assets/images/kho/advise.png")} alt=""></img>
                </div>
              </Col>
            )}
          </Row>)
      }
    }
  }

  let khoOption = useMemo(() => {
    let options = listKhoUser?.map((item, index) => (
      <Option key={index} value={item?.id}>
        {item?.ten}
      </Option>
    ));
    return options;
  }, [listKhoUser]);
  return (
    <Main md={24} xl={24} xxl={24} className="container" isThemMoi={isThemMoi}>
      <div className="title">Th??ng tin ????n thu???c</div>
      <div className={infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"}>Kho b??n</div>
      <Row className="select-row-1">
        {isThemMoi ?
          (
            <SelectAntd
              onChange={onChange("khoId")}
              value={state.khoId}
              // value={state.loaiDichVu}
              placeholder={"Ch???n kho b??n thu???c"}
            // data={listDataNhanVienKhoCustom}
            // value={state.khoId || listKhoUser[0]?.id}
            >
              {khoOption}
            </SelectAntd>
          )
          : infoPatient && infoPatient?.phieuXuat?.kho?.ten}
      </Row>

      <Row className="select-row-2">
        <div className="title-item">T???ng ti???n</div>
        <div className="title-item">
          {infoPatient?.phieuThu?.tongTien && infoPatient?.phieuThu?.tongTien.formatPrice()}
        </div>
      </Row>

      <Row className="select-row-2">
        <div className="title-item" style={{ color: "#0762F7" }} onClick={() => {
          refModalDiscount.current.show()
        }}>
          <img src={require("assets/images/kho/discount.png")} alt=""></img>
          <span style={{ marginLeft: 6 }}>Chi???t kh???u</span>
        </div>
        <div className="title-item">{infoPatient?.phieuThu?.tienMienGiam?.formatPrice()}</div>
      </Row>

      <Row className="select-row-2">
        <div className="title-item">Th??nh ti???n</div>
        <div className="title-item">
          <b>
            {infoPatient?.phieuThu?.thanhTien && infoPatient?.phieuThu?.thanhTien?.formatPrice()}
          </b>
        </div>
      </Row>

      <Row>
        <div xxl={24} className={infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"}>Ghi ch??</div>
        <textarea
          className="textarea"
          // defaultValue={selectedDonThuoc?.nbDichVu?.ghiChu}
          onChange={onChange("ghiChu")}
          defaultValue={infoPatient?.phieuXuat?.ghiChu}
          onBlur={(e) => {
            if (isThemMoi) {

            } else {
              updateGhiChuDonThuocById({
                id: nguoiBenhId,
                phieuXuatId: nguoiBenhId,
                phieuXuat: { ghiChu: e.target.value }
              })
            }
          }}
        ></textarea>
      </Row>

      <Row>
        <div className={infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"}>Tr???ng th??i ????n:
          {` ${infoPatient?.phieuXuat?.trangThai ? listTrangThaiDonThuocNhaThuoc?.find(item => item.id === infoPatient?.phieuXuat?.trangThai)?.ten : ""}`}
        </div>
      </Row>
      {!infoPatient?.phieuThu?.thanhToan && (
        <Row>
          <div className={infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"}>Tr???ng th??i thanh to??n:
          <span style={{ color: !infoPatient?.phieuThu?.thanhToan ? "red" : "#049254" }}>
              {` ${!infoPatient?.phieuThu?.thanhToan ? "Ch??a thanh to??n" : "???? thanh to??n"}`}
            </span>
          </div>
        </Row>
      )}
      <Row>
        <div className={infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"}>
          Ng??y ph??t: {infoPatient?.phieuXuat?.thoiGianDuyet && moment(infoPatient?.phieuXuat?.thoiGianDuyet).format("DD/MM/YYYY")}
        </div>
      </Row>
      <Row>
        <div className={infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"}>
          Ng?????i ph??t: {infoPatient?.phieuXuat?.nguoiDuyet?.ten && infoPatient?.phieuXuat?.nguoiDuyet?.ten}
        </div>
      </Row>
      <Row>
        <div className={infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"}>
          S??? phi???u: {infoPatient?.phieuXuat?.soPhieu}
        </div>
      </Row>
      <Row>
        <div className={infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"}>
          Tr???ng th??i ho??n: {listTrangThaiHoan?.find(item => item.id === selectedDonThuoc?.nbDichVu?.trangThaiHoan)?.ten}
        </div>
      </Row>
      {infoPatient?.phieuThu?.thanhToan && (
        <div>
          <hr className="hr" />
          <Row className="row_paid">
            <div className={infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"}>
              Tr???ng th??i thanh to??n:
              <span style={{ color: !infoPatient?.phieuThu?.thanhToan ? "red" : "#049254" }}>
                {` ${!infoPatient?.phieuThu?.thanhToan ? "Ch??a thanh to??n" : "???? thanh to??n"}`}
              </span>
            </div>
          </Row>
          <Row className="row_paid">
            <div className={infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"}>
              T??n thu ng??n:
            </div>
            <span>{`${infoPatient?.phieuThu?.thuNgan?.ten}`}</span>
          </Row>
          <Row className="row_paid">
            <div className={infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"}>
              TG thanh to??n:
            </div>
            <span>
              {
                infoPatient?.phieuThu?.thoiGianThanhToan &&
                moment(infoPatient?.phieuThu?.thoiGianThanhToan).format("hh:mm")} - {moment(infoPatient?.phieuThu?.thoiGianThanhToan).format("DD/MM/YYYY")
              }
            </span>
          </Row>
          <Row className="row_paid">
            <div className={infoPatient?.phieuThu?.thanhToan ? "title-2" : "title-1"}>
              S??? phi???u thu:
            </div>
            <span>
              {infoPatient?.phieuThu?.soPhieu}
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
        </div>
      )}
      {renderButton()}
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
