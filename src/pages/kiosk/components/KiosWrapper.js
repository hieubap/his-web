import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Row, Col } from "antd";
import { useHistory } from "react-router-dom";
import { HOST } from "client/request";
import { Main, HeaderWrapper, ContentWrapper, FooterWrapper } from "./styled";
import StepWrapper from "./StepWrapper";
import backImg from "assets/images/kiosk/back.png";
import timeImg from "assets/images/kiosk/time.png";
import logoIsofh from "assets/images/kiosk/logo-isofh.png";
import "moment/locale/vi";

const KiosWrapper = ({
  children,
  showBtnBack,
  step = 5,
  updateData,
  benhVien,
}) => {
  const history = useHistory();
  const onBack = () => {
    updateData({
      step: step - 1,
    });
    history.goBack();
  };

  const formatDateTime = () => {
    const today = moment().format("LLLL");

    return today.charAt(0).toUpperCase() + today.slice(1);
  };

  return (
    <Main>
      <HeaderWrapper>
        <Row align="middle">
          <Col span={4}>
            <img
              className="logo-customer"
              src={`${HOST}/api/his/v1/dm-thiet-lap/logo-benh-vien`}
              alt="logocustomer"
            />
          </Col>
          <Col span={20}>
            <div className="customer-name">{benhVien.ten}</div>
          </Col>
        </Row>
      </HeaderWrapper>
      <ContentWrapper>{children}</ContentWrapper>
      <FooterWrapper>
        <Row>
          <Col span={18}>
            {step === 5 ? (
              <div className="info-msg">
                Nếu không thấy phiếu STT in ra, vui lòng liên hệ nhân viên bệnh
                viện!
              </div>
            ) : (
              <div className="timer">
                <img src={timeImg} alt="timer" />
                <span>{formatDateTime()}</span>
              </div>
            )}
          </Col>
          <Col span={6}>
            <img src={logoIsofh} alt="logoIsofh" />
          </Col>
        </Row>
        {showBtnBack && (
          <div className="back" onClick={onBack}>
            <img src={backImg} alt="back" /> Quay lại
          </div>
        )}
      </FooterWrapper>
      <StepWrapper step={step} />
    </Main>
  );
};

const mapStateToProps = (state) => {
  return {
    step: state.kios.step,
    benhVien: state.auth?.auth?.benhVien,
  };
};

const mapDispatchToProps = ({ kios: { updateData } }) => ({
  updateData,
});

export default connect(mapStateToProps, mapDispatchToProps)(KiosWrapper);
