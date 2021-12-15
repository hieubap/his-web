import React, { forwardRef, useState, useImperativeHandle } from "react";
import { ModalStyled, Main } from "./styled";
import { Col, Row } from "antd";
import Navigation from "pages/chanDoanHinhAnh/tiepNhan/ThongTin/navigationPage";
import StepWrapper from "../StepWrapper";
import { Element } from "react-scroll";
import { listNav } from "pages/chanDoanHinhAnh/tiepNhan/ThongTin/config.js";
import ChiDinhDichVu from "pages/chanDoanHinhAnh/tiepNhan/ChiDinhDichVu";
import DonThuoc from "pages/chanDoanHinhAnh/tiepNhan/DonThuoc";
import useWindowSize from "hook/useWindowSize";
import IcClose from "assets/images/kho/icClose.png";
import VatTu from "pages/chanDoanHinhAnh/tiepNhan/VatTu";
const ModalChiDinhDichVuThem = (props, ref) => {
  const [elementKey, setElementKey] = useState(0);
  const [state, _setState] = useState({
    show: false,
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  const windowSize = useWindowSize();

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      setState({ show: true, data });
    },
  }));

  const onCancel = () => {
    setState({ show: false });
  }

  const handleScroll = (key) => {
    const keyNum = +key;
    setElementKey(keyNum);
  };


  return (
    <ModalStyled
      width={1272}
      height={809}
      visible={state.show}
      closable={false}
      footer={null}
      onCancel={onCancel}
    >
      <Main>
        <Row className="header">
          <div className="header__left">
            <div className="dichvu">
            <span>Chi tiết dịch vụ: </span>
            <span style={{ fontWeight: "bold" }}>{state?.data?.tenDichVu}</span>
            </div>
            <div className="chandoan">
              <span>Chẩn đoán sơ bộ: </span>
              <span style={{ fontWeight: "bold" }}>{state?.data?.cdSoBo} </span>
            </div>
          </div>
          <div className="header__right">
            <img src={IcClose} onClick={onCancel} />
          </div>
        </Row>
        <Row>
          <Col span={18}>
            <StepWrapper>
              <Element name={"0"} className="element element-page">
                <ChiDinhDichVu dataNbChiDinh={state?.data} elementKey={elementKey}/>
              </Element>
              <Element name={"1"} className="element element-page">
                <DonThuoc elementKey={elementKey} dataNbChiDinh={state?.data}/>
              </Element>
              <Element name={"2"} className="element element-page">
                <VatTu elementKey={elementKey} dataNbChiDinh={state?.data}/>
              </Element>
            </StepWrapper>
          </Col>
          <Col span={6} style={{ paddingTop: 43 }}>
            {listNav.map((item) => {
              return (
                <Navigation
                  {...item}
                  key={item.title}
                  handleScroll={handleScroll}
                  padding={(windowSize.height - 700) / 10}
                />
              );
            })}
          </Col>
        </Row>
      </Main>
    </ModalStyled>
  );
};

export default forwardRef(ModalChiDinhDichVuThem);
