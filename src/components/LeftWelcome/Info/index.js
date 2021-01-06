import React from 'react'
import { Col } from 'antd'
import { Main } from './styled';
import PersonalInformation from "./PersonalInformation";
import HealthInsurance from "./HealthInsurance";
import OtherInformation from "./OtherInformation";

function index(props) {
    const { onChange, selectAddress } = props;
    return (
        <Main>
            <PersonalInformation
                onChange={onChange}
                selectAddress={selectAddress}
            />
            <Col md={24} xl={12} xxl={12} className="info-right">
                <HealthInsurance history={props.history} />
                <OtherInformation />
            </Col>
        </Main>
    )
}
export default index;