import React from 'react';
import { Col } from 'antd';
import LeftRegister from 'components/LeftRegister';
import RightRegister from 'components/RightRegister';
import { Main } from './styled';
function index() {
    return (
        <Main>
            <div className="line"></div>
            <Col md={24} xl={16} xxl={16} className="body">
                <div className="background">
                    <img src={require("assets/images/welcome/backgroundkiosk.png")}></img>
                </div>
                <LeftRegister />
            </Col>
            <Col md={24} xl={8} xxl={8} className="bg-color" >
                <RightRegister />
            </Col>
        </Main>
    )
}

export default index;
