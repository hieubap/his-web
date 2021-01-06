import React from 'react';
import { Col } from 'antd';
import { Main } from './styled';

const index = (props) => {
    return (
        <Main>
            <Col md={5} lg={7} xl={7}>
                <div className="logo"><img src={require("assets/images/welcome/logokiosk.png")}></img></div>
            </Col>
            <Col md={10} lg={8} xl={8}>
                <div className="text">{props.title}</div>
            </Col>
            <Col md={9} lg={9} xl={9}>
                <div className="user">
                    <div className="name">Phùng Thanh Tùng</div>
                    <div className="avatarIcon">
                        <img src={require("assets/images/welcome/avatar.jpg")}></img>
                    </div>
                </div>
            </Col>
        </Main>
    )
}
export default index;