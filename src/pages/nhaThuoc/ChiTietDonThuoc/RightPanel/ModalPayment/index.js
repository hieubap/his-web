import React, { useCallback, useEffect, useState, useMemo, useRef } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import ModalCheckout from "components/ModalCheckout";
import IconSave from "assets/images/thuNgan/icSave.png";
import { firstLetterWordUpperCase, formatDecimal } from "utils";
import { Main, ButtonWrapper } from "./styled";
import { Col, Row, Input, message } from "antd";
import NumberFormat from 'react-number-format';
import { GIOI_TINH_BY_VALUE } from "../../../../../constants";
import moment from "moment";
import stringUtils from "mainam-react-native-string-utils";

const ModalPayment = ({ modalCheckoutRef }) => {
  const { dsPhuongThucTt, infoPatient, nguoiBenhId } = useSelector(state => state.thuocChiTiet)
  const {
    phieuThu
  } = infoPatient
  const { thanhTien } = phieuThu || {}
  const { postThanhToan } = useDispatch().thuocChiTiet

  const refLayerHotKey = useRef(stringUtils.guid());
  const refF4 = useRef();
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;

  useEffect(() => {
    onAddLayer({ layerId: refLayerHotKey.current });
    // đăng ký phím tắt
    onRegisterHotkey({
      layerId: refLayerHotKey.current,
      hotKeys: [
        {
          keyCode: 115, //F4
          onEvent: () => {
            refF4.current && refF4.current();
          },
        },
        {
          keyCode: 27, //ESC
          onEvent: () => {
            if(modalCheckoutRef.current) 
              modalCheckoutRef.current.close()
          },
        },
      ],
    });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);
    
  const [state, _setState] = useState({ infoPrice: {} });

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const tienMatObj = useMemo(() => {
    if (dsPhuongThucTt && thanhTien) {
      let item = dsPhuongThucTt?.find(item => item?.tienMat)
      setState({
        infoPrice: {
          ...state.infoPrice,
          [item.id]: thanhTien
        }
      })
      return item
    }
    return null
  }, [dsPhuongThucTt, thanhTien]);
  //handle
  const cancelHandler = () => {
    modalCheckoutRef.current.close();
  }
  const submitHandler = () => {
    let tongTienPTTT = totalPatientPayment(); // Tổng tiền các PTTT
    // if (isReturn) {
    //   tongTienPTTT += tienTamUng;
    // }
    // modalPayMethodRef.current.close();

    if (tongTienPTTT >= thanhTien) {
      const payload = Object.keys(state.infoPrice).map((key) => {
        let tienPhuongThucTT = 0;
        if (key == tienMatObj?.id) {
          let tongTienPTTKhac = tongTienPTTT - state.infoPrice[key];
          tienPhuongThucTT = thanhTien < tongTienPTTKhac ? 0 : thanhTien - tongTienPTTKhac;
        } else {
          tienPhuongThucTT = state.infoPrice[key];
        }
        return {
          phuongThucTtId: key,
          tongTien: tienPhuongThucTT,
        };
      });
      const filterPayload = payload.filter(itemO => {
        return itemO.tongTien || itemO.tongTien === 0;
      })
      postThanhToan(
        { id: nguoiBenhId, dsPhuongThucTt: filterPayload },
        state.infoPrice
      ).then((res) => {
        // if (res) props.printPhieuThu(phieuThuId);
        modalCheckoutRef.current.close();
      });
    } else {
      message.error("Số tiền NB đưa nhỏ hơn Tiền phải trả.")
      // updateData({
      //   tienThanhToanDv: tongTien,
      //   tienDaNhan: tongTienPTTT,
      //   infoPrice,
      // });
      // modalPayServiceRef.current.show();
    }


  }
  refF4.current = submitHandler;

  const totalPatientPayment = () => {
    let total = 0;
    Object.keys(state.infoPrice).forEach((ifp) => {
      total += state.infoPrice[ifp] || 0;
    });
    return Math.round(total * 100) / 100;
  };

  const calcalatorPriceOfPatient = () => {
    return totalPatientPayment();
  };
  const handleChange = (ds) => (value) => {
    setState({
      infoPrice: {
        ...state.infoPrice,
        [ds.id]: value.floatValue
      }
    });
  };

  const calculatorPatientPay = () => {
    // return (tongTien - tienTamUng);
    return thanhTien
  };

  const calculatorPriceReturn = () => {
    let amountReturn = 0;
    let tongTienPhuongThucTT = totalPatientPayment();
    // if (isReturn) {
    //   if (tienTamUng >= tongTien) {
    //     return tienTamUng - tongTien;
    //   } else {
    //     amountReturn = tongTienPhuongThucTT - tongTien + tienTamUng >= 0
    //       ? tongTienPhuongThucTT - tongTien + tienTamUng
    //       : 0;
    //   }
    // } else {
    amountReturn = thanhTien < tongTienPhuongThucTT
      ? tongTienPhuongThucTT - thanhTien
      : 0;
    // }
    return Math.round(amountReturn * 100) / 100;
  };

  return (
    <ModalCheckout
      titleHeader="Phương thức thanh toán"
      subTitleHeader={
        <>
          <span style={{ fontSize: 14, fontWeight: "normal" }}>
            {infoPatient?.nbDotDieuTri?.tenNb}{` (${moment(infoPatient?.nbDotDieuTri?.ngaySinh).format("DD/MM/YYYY")} - ${infoPatient?.nbDotDieuTri?.tuoi ? `${infoPatient?.nbDotDieuTri?.tuoi} tuổi` : ""} - ${infoPatient?.nbDotDieuTri?.gioiTinh ? GIOI_TINH_BY_VALUE[infoPatient?.nbDotDieuTri?.gioiTinh] : ""})`}
          </span>
        </>
      }
      ref={modalCheckoutRef}
      // disabledBtnNext={thongTinPhieuThu.thanhToan || state.disabledBtnNext}
      borderButtonBack={"1px solid gray"}
      titleBtnNext={
        <ButtonWrapper>
          Xác nhận thanh toán <img style={{ marginLeft: 6 }} src={require("assets/images/kho/pay.png")} alt=""></img>
        </ButtonWrapper>
      }
      width={768}
      className={"main_custom"}
      // destroyOnClose
      onClickBack={cancelHandler}
      onClickNext={submitHandler}
    >
      <Main>
        <Row gutter={[24, 0]}>
          <Col span={12}>
            {dsPhuongThucTt?.sort((a, b) => (a.uuTien || 0) - (b.uuTien || 0)).map((ds, index) => {
              return (
                <Row justify="space-between" className={`row-item ${index === 0 ? "first" : ""}`} key={index}>
                  <div>
                    {ds.ten}
                  </div>
                  <NumberFormat
                    defaultValue={ds?.tienMat ? calculatorPatientPay() : null}
                    customInput={Input}
                    thousandSeparator="."
                    decimalSeparator=","
                    decimalScale={2}
                    className="input-option"
                    onValueChange={handleChange(ds)}
                    value={state.infoPrice[ds.id]}
                    placeholder="Nhập số tiền"
                  />
                </Row>
              )
            })}
          </Col>
          <Col span={12} className="container-right">
            <Row justify="space-between" className="row-item first right">
              <div>
                Tiền NB phải trả
              </div>
              <div>{formatDecimal(calculatorPatientPay())} đ</div>
            </Row>
            <Row justify="space-between" className="row-item right">
              <div>
                Tiền NB đưa
              </div>
              <div>{formatDecimal(calcalatorPriceOfPatient())} đ</div>

            </Row>
            <Row justify="space-between" className="row-item right">
              <div>
                Tiền mặt trả lại
              </div>
              <div>{calculatorPriceReturn() &&
                formatDecimal(calculatorPriceReturn())}{" "}
                    đ</div>
            </Row>
          </Col>
        </Row>
        {/* <div className="type-discount">{renderTypeDiscount()}</div> */}
      </Main>
    </ModalCheckout>
  );
};

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = ({
}) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalPayment);
