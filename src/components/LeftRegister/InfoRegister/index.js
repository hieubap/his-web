import React from 'react';
import { Col } from 'antd';
import { Main } from './styled';

function index(props) {
    return (
        <Main className="info">
            <Col md={12} xl={8} xxl={6} >
                <div className="avatar">
                    <img src={require("assets/images/welcome/avatar.jpg")}></img>
                    <div className="content">
                        <div className="content-text">Số thứ tự</div>
                        <div className="number">0004</div>
                    </div>
                </div>
            </Col>
            <Col md={12} xl={8} xxl={6} className="info-personal">
                <div className="person">
                    <div className="name"> Nguyễn Ngọc Lan</div>
                    <div className="title">
                        <div className="date">Ngày sinh: </div>
                        <span>20/02/1968 - 61 tuổi</span>
                    </div>
                    <div className="title">
                        <div className="male">Giới tính:  </div>
                        <span>Nữ</span>
                    </div>
                    <div className="title">
                        <div className="code">Mã hồ sơ </div>
                        <span>288222222</span>
                    </div>

                </div>
            </Col>
            <Col md={13} xl={8} xxl={7} className="info-city">
                <div className="person">
                    <div className="title" style={{ marginTop: 0 }}>
                        <div className="address" >Địa chỉ:</div>
                        <span>Ba Đình, Hà Nội, Việt Nam</span>
                    </div>
                    <div className="title">
                        <div className="phone">SĐT:</div>
                        <span>0123456789</span>
                    </div>
                    <div className="title">
                        <div className="bhyt">Số BHYT:</div>
                        <span>DN123456543</span>
                    </div>
                    <div className="title">
                        <div className="code-bn">Mã BN:</div>
                        <span>65434568</span>
                    </div>

                </div>
            </Col>
            <Col md={11} xl={24} xxl={5} className="check-info">
                <div className="button">
                    <span>Xem lại thông tin</span>
                    <img src={require("assets/images/welcome/eyes.png")}></img>
                </div>
            </Col>
        </Main>
    )
}
export default index;