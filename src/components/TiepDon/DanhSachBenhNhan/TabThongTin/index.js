import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Main } from "./styled";
import { Row, Col } from "antd";
import TheoPhongKham from "../TheoPhongKham";
import DanhSachGoiNho from "../DanhSachGoiNho";
import DaTiepDon from "../DaTiepDon";
import { ROLES } from "constants/index";
import AuthWrapper from "components/AuthWrapper";
import CustomButton from "../../CustomeButton";
import Icon from "@ant-design/icons";
import extendTable from "assets/svg/extendTable.svg";
const TabThongTin = ({ ...props }, ref) => {
  const [state, _setState] = useState({ isVisible: false });

  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }));
  };

  useImperativeHandle(ref, () => ({
    show: ({ isVisible, ...props }) => {
      setState({ isVisible });
    },
  }));

  return (
    <Main visible={!!state.isVisible}>
      {state.isVisible && (
        <>
          <div className="btn-header">
            <div className="title">THỐNG KÊ NGƯỜI BỆNH</div>
            <div
              className="content-thu-gon"
              onClick={() => setState({ isVisible: false })}
            >
              {/* <CustomButton
                className="btn-thu-gon"
                onClick={() => setState({ isVisible: false })}
                iconDuplicate
                title="Thu gọn"
                icon={require("assets/images/welcome/code1.png")}
              /> */}
              <span> Thu gọn</span>
              <Icon component={extendTable} />
            </div>
          </div>
          <Row style={{ width: "100%" }}>
            <Col md={24} xl={24} xxl={24}>
              <AuthWrapper accessRoles={[ROLES["TIEP_DON"].DS_NHO]}>
                <DanhSachGoiNho getListGoiNho={props.getListGoiNho} />
              </AuthWrapper>
            </Col>
            <Col md={24} xl={24} xxl={24}>
              <AuthWrapper accessRoles={[ROLES["TIEP_DON"].SL_THEO_PHONG]}>
                <TheoPhongKham />
              </AuthWrapper>
            </Col>
            <Col md={24} xl={24} xxl={24}>
              <AuthWrapper accessRoles={[ROLES["TIEP_DON"].DS_DA_TIEP_DON]}>
                <DaTiepDon />
              </AuthWrapper>
            </Col>
          </Row>
        </>
      )}
    </Main>
  );
};

export default forwardRef(TabThongTin);
