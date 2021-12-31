import { Row, Col } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Main, ButtonWrapper, TotalPrice } from "./styled";
import IconFile from "assets/images/thuNgan/icFile.png";
import ModalCheckout from "components/ModalCheckout";
import IconHDDT from "assets/images/thuNgan/icHDDT.png";
import NguoiNhanPhieuThu from "./nguoiNhanPhieuThu";
const listPhieuThu = [
  {
    tenNb: "HUONGNTT1",
    tongTien: 300000,
  },
  {
    tenNb: "HUONGNTT1",
    tongTien: 200000,
  },
  {
    tenNb: "HUONGNTT1",
    tongTien: 100000,
  },
];

const HDDT = ({ modalCheckoutRef, thongTinBenhNhan, listgioiTinh }) => {
  const [state, _setState] = useState({});
  const setState = (newState) => {
     _setState((state) => {
      return { ...state, ...newState };
    });
  };
  const handleClickBack = () => {
    if (modalCheckoutRef.current) {
      modalCheckoutRef.current.close();
    }
  };
  let gioiTinh =
    listgioiTinh.find((item) => item.id === thongTinBenhNhan?.gioiTinh) || {};
  return (
    <ModalCheckout
      titleHeader="Xuất HDDT"
      subTitleHeader="Nguyễn Đoàn Huyền Trang Nữ - 32 tuổi"
      titleBtnNext={
        <ButtonWrapper>
          Xuất HĐĐT <img src={IconHDDT} alt="IconHDDT" />
        </ButtonWrapper>
      }
      titleBtnBack="Không xuất HDDT"
      width={800}
      subTitleHeader={
        <>
          <span>{thongTinBenhNhan?.tenNb} </span>
          <span className="normal-weight">{gioiTinh?.ten}</span>
          {thongTinBenhNhan?.tuoi && (
            <>
              -
              <span className="normal-weight">
                {thongTinBenhNhan?.tuoi} tuổi
              </span>
            </>
          )}
        </>
      }
      ref={modalCheckoutRef}
      width={800}
      destroyOnClose
      onClickBack={handleClickBack}
      //   onClickNext={handleSubmit}
    >
      <Main>
        <div className="list-receipts">
          <div className="Check-all">
            <Checkbox className="textBold">Tất cả</Checkbox>
          </div>
          {listPhieuThu.map((item, index) => {
            return (
              <Row className="item" key={index}>
                <Col xs={1} className="item__checkbox">
                  <Checkbox></Checkbox>
                </Col>
                <Col xs={20} className="item__info">
                  <img src={IconFile} />
                  Phiếu thu: Thg TT: 08:00:00 01/02/2021 / Thu ngân:{" "}
                  {item.tenNb}
                </Col>
                <Col xs={3} className="item__price textAlign textBold">
                  {item.tongTien?.formatPrice()}
                </Col>
              </Row>
            );
          })}
        </div>
        <TotalPrice>
          Tổng tiền phiếu thu xuất hóa đơn:
          <span className="textBold">6.000.000</span>
        </TotalPrice>
        <NguoiNhanPhieuThu />
      </Main>
    </ModalCheckout>
  );
};
const mapStateToProps = (state) => {
  const {
    nbDotDieuTri: { thongTinBenhNhan },
    utils: { listgioiTinh = [] },
  } = state;
  return {
    thongTinBenhNhan,
    listgioiTinh,
  };
};
const mapDispatchToProps = ({}) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(HDDT);
