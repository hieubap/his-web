import React, { memo } from "react";
import { ROLES } from "constants/index";
import AuthWrapper from "components/AuthWrapper";
import { Col } from "antd";
import { Main } from "./styled";
import PersonalInformation from "./PersonalInformation";
import HealthInsurance from "./HealthInsurance";
import OtherInformation from "./OtherInformation";

const Info = (props) => {
  const {
    onChange,
    selectAddress,
    onCheckTrungThongTin,
    checkTheBhyt,
    getListAllLoaiDoiTuong,
  } = props;
  return (
    <Main>
      <Col md={24} xl={8} xxl={8}>
        <AuthWrapper accessRoles={[ROLES["TIEP_DON"].THONG_TIN_CA_NHAN]}>
          <PersonalInformation
            onChange={onChange}
            selectAddress={selectAddress}
            onCheckTrungThongTin={onCheckTrungThongTin}
          />
        </AuthWrapper>
      </Col>
      {/* <Col md={24} xl={12} xxl={12} className="info-right"> */}
      <Col md={24} xl={8} xxl={8}>
        <AuthWrapper accessRoles={[ROLES["TIEP_DON"].BHYT]}>
          <HealthInsurance
            history={props.history}
            onChange={onChange}
            onCheckTrungThongTin={onCheckTrungThongTin}
            checkTheBhyt={checkTheBhyt}
            getListAllLoaiDoiTuong={getListAllLoaiDoiTuong}
          />
        </AuthWrapper>
      </Col>
      <Col md={24} xl={8} xxl={8}>
        <AuthWrapper accessRoles={[ROLES["TIEP_DON"].THONG_TIN_BO_SUNG]}>
          <OtherInformation
            onCheckTrungThongTin={onCheckTrungThongTin}
          />
        </AuthWrapper>
      </Col>
    </Main>
  );
};
export default memo(Info);
