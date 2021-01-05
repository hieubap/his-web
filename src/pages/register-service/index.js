import React from 'react';
import './style.scss';
import { Col } from 'antd';
import LeftRegister from '../component-reception/left-register';
import RightRegister from '../component-reception/right-register';
import { Main } from './styled';
function index() {
    return (
        <Main>
            <div className="line"></div>
            <Col md={24} xl={16} xxl={16} className="body">
                <div className="background">
                    <img src={require("resources/images/welcome/backgroundkiosk.png")}></img>
                </div>
                <LeftRegister />
            </Col>
            <Col md={24} xl={8} xxl={8}>
                <RightRegister />
            </Col>
        </Main>
    )
}

export default index;