import React, { useState, useEffect, useMemo, useRef } from "react";
import { Row, Col, Checkbox, InputNumber, Input, Form } from "antd";
import { Main } from "./styled";
import { connect } from "react-redux";
import ModalCheckout from "components/ModalCheckout";
import IconMoney from "assets/images/thuNgan/icMoney.svg";
import { firstLetterWordUpperCase } from "utils";
import printProvider from "data-access/print-provider";
import NumberFormat from 'react-number-format';
import { formatDecimal } from "utils";

function ModalContentMethod(props) {
  const [form] = Form.useForm();
  const {
    phieuThuId,
    nbDotDieuTriId,
    tongTien,
    thongTinTien: { tienTamUng },
    thongTinBenhNhan,
    listgioiTinh,
    dsPhuongThucTt,
    getPhuongThucTTTongHop,
    postPhieuThuThanhToan,
    updateData,
    modalPayMethodRef,
    modalPayServiceRef,
  } = props;

  const [isReturn, setIsReturn] = useState(false);
  const [infoPrice, setInfoPrice] = useState({});
  const tienMatObj = useMemo(() => dsPhuongThucTt.find(item => item?.tienMat), [dsPhuongThucTt]);
  const gioiTinh =
    listgioiTinh.find((item) => item.id === thongTinBenhNhan?.gioiTinh) || {};
  useEffect(() => {
    getPhuongThucTTTongHop({ page: 0, active: true, size: 1000 });
  }, []);

  const handleClickBack = () => {
    setInfoPrice({})
    form.resetFields()
    setTimeout(() =>modalPayMethodRef.current.close(),50)
  };

  const handleClickNext = () => {
    let tongTienPTTT = totalPatientPayment(); // Tổng tiền các PTTT
    if (isReturn) {
      tongTienPTTT += tienTamUng;
    }
    setInfoPrice({})
    form.resetFields()
    setTimeout(() =>modalPayMethodRef.current.close(),50)

    if (tongTienPTTT >= tongTien) {
      const payload = Object.keys(infoPrice).map((key) => {
        let tienPhuongThucTT = 0;
        if (key == tienMatObj?.id) {
          let tongTienPTTKhac = tongTienPTTT - infoPrice[key];
          tienPhuongThucTT = tongTien < tongTienPTTKhac ? 0 : tongTien - tongTienPTTKhac;
        } else {
          tienPhuongThucTT = infoPrice[key];
        }
        return {
          phuongThucTtId: key,
          tongTien: tienPhuongThucTT,
        };
      });
      postPhieuThuThanhToan(
        { id: phieuThuId, dsPhuongThucTt: payload, nbDotDieuTriId },
        infoPrice
      ).then((res) => {
        if (res) props.printPhieuThu(phieuThuId);
      });
    } else {
      updateData({
        tienThanhToanDv: tongTien,
        tienDaNhan: tongTienPTTT,
        infoPrice,
      });
      modalPayServiceRef.current.show();
    }
  };

  const handleChangeCheckbox = () => {
    setIsReturn(!isReturn);
  };

  // const onPrintPhieuThu = () => {
  //   props.getFormPhieuThu(phieuThuId)
  //     .then((res) => {
  //       printProvider
  //         .printPdf(res)
  //         .then(() => {
  //           console.info("Print success");
  //         })
  //         .catch((err) => {
  //           console.error("Print fail", err);
  //         });
  //     }).catch((e) => {})
  // }

  const handleChange = (ds) => (value) => {
    // setinfoReceipts();
    setInfoPrice({ ...infoPrice, [ds.id]: value.floatValue });
  };

  const totalPatientPayment = () => {
    let total = 0;
    Object.keys(infoPrice).forEach((ifp) => {
      total += infoPrice[ifp] || 0;
    });
    return Math.round(total * 100) / 100;
  };

  const calcalatorPriceOfPatient = () => {
    return totalPatientPayment();
  };

  const calculatorPriceReturn = () => {
    let amountReturn = 0;
    let tongTienPhuongThucTT = totalPatientPayment();
    if (isReturn) {
      if (tienTamUng >= tongTien) {
        return tienTamUng - tongTien;
      } else {
        amountReturn = tongTienPhuongThucTT - tongTien + tienTamUng >= 0
          ? tongTienPhuongThucTT - tongTien + tienTamUng
          : 0;
      }
    } else {
      amountReturn = tongTien < tongTienPhuongThucTT
        ? tongTienPhuongThucTT - tongTien
        : 0;
    }
    return Math.round(amountReturn * 100) / 100;
  };

  const calculatorPatientPay = () => {
    return (tongTien - tienTamUng);
  };

  return (
    <ModalCheckout
      width={800}
      ref={modalPayMethodRef}
      titleHeader="Phương thức thanh toán"
      subTitleHeader={
        <>
          <span className="font-color">
            {firstLetterWordUpperCase(thongTinBenhNhan?.tenNb)}
          </span>
          {gioiTinh.ten && (
            <span className="normal-weight"> - {gioiTinh.ten} </span>
          )}

          {thongTinBenhNhan.tuoi && (
            <span className="normal-weight">
              - {thongTinBenhNhan?.tuoi} tuổi
            </span>
          )}
        </>
      }
      titleBtnBack="Quay lại [ESC]"
      titleBtnNext={
        <span className="btn-checkout">
          <span className="btn-checkout__text">Xác nhận [F4]</span>
          <IconMoney className="btn-checkout__icon" />
        </span>
      }
      onClickBack={handleClickBack}
      onClickNext={handleClickNext}
    >
      <Main>
        <Row>
          <Col xs={9}>
            <div className="box-left">
              <div className="info-price">
                <div className="info-price__title">Số tiền phiếu thu</div>
                <div className="info-price__detail">
                  {(tongTien || 0).formatPrice()} đ
                </div>
              </div>
              <div className="info-price">
                <div className="info-price__title">Tiền tạm ứng</div>
                <div className="info-price__detail">
                  {!isReturn && tienTamUng ? tienTamUng.formatPrice() : 0} đ
                </div>
              </div>
            </div>
          </Col>
          <Col xs={{ span: 14, offset: 1 }}>
            <div className="box-right">
              <div className="pay-title">Phương thức thanh toán</div>
              {tienTamUng > 0 && (
                <Checkbox value={isReturn} onChange={handleChangeCheckbox}>
                  Có hoàn ứng
                </Checkbox>
              )}
              <div className="price-box">
                {isReturn && (
                  <div className="info-price">
                    <div className="info-price__title">Tiền hoàn ứng</div>
                    <div className="info-price__detail">
                      {isReturn && tienTamUng ? tienTamUng.formatPrice() : 0} đ
                    </div>
                  </div>
                )}
                {isReturn && tongTien >= tienTamUng && (
                  <div className="info-price">
                    <div className="info-price__title">Tiền NB phải trả</div>
                    <div className="info-price__detail">
                      {formatDecimal(calculatorPatientPay())} đ
                    </div>
                  </div>
                )}

                <div className="info-price">
                  <div className="info-price__title">Tiền NB đưa</div>
                  <div className="info-price__detail">
                    {formatDecimal(calcalatorPriceOfPatient())} đ
                  </div>
                </div>
                <div className="info-price">
                  <div className="info-price__title">Tiền mặt trả lại</div>
                  <div className="info-price__detail">
                    {calculatorPriceReturn() &&
                      formatDecimal(calculatorPriceReturn())}{" "}
                    đ
                  </div>
                </div>
              </div>
              <div className="text-note">
                Lưu ý: QRPay, MoMo không thể thanh toán chung với phương thức
                thanh toán khác!
              </div>
              <Form
                form={form}
                layout="vertical"
                autoComplete="off"
              >
                {dsPhuongThucTt.sort((a, b) => (a.uuTien || 0) - (b.uuTien || 0)).map((ds) => {
                  return (
                    <Form.Item name="use-reset-field" >
                      <div className="input-box" key={ds.id}>
                        <div className="input-box__label">{ds.ten}</div>
                        <div className="input-box__wrap">
                          <NumberFormat
                            customInput={Input}
                            thousandSeparator="."
                            decimalSeparator=","
                            decimalScale={2}
                            onValueChange={handleChange(ds)}
                            value={infoPrice[ds.id]}
                            placeholder="Nhập số tiền"
                          />
                        </div>
                      </div>
                    </Form.Item>
                  );
                })}
              </Form>
            </div>
          </Col>
        </Row>
      </Main>
    </ModalCheckout>
  );
}

const mapStateToProps = (state) => {
  const {
    nbDotDieuTri: { data: thongTinTien = {} },
    thuNgan: { dsPhuongThucTt },
    nbDotDieuTri: { thongTinBenhNhan },
    utils: { listgioiTinh = [] },
  } = state;
  return { thongTinTien, dsPhuongThucTt, thongTinBenhNhan, listgioiTinh };
};

const mapDispatchToProps = ({
  thuNgan: {
    getPhuongThucTTTongHop,
    postPhieuThuThanhToan,
    updateData,
    printPhieuThu,
  },
}) => ({
  getPhuongThucTTTongHop,
  postPhieuThuThanhToan,
  updateData,
  printPhieuThu,
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalContentMethod);
