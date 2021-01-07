import React, { useRef, useImperativeHandle, useState, forwardRef } from "react";
import { Main } from "./styled";
import { Row, Col, Select, Input } from 'antd'
const { Option } = Select;
const ModalAccuracy = (props, ref) => {
    const refCallback = useRef(null);
    const [state, _setState] = useState({});
    const setState = (data = {}) => {
        _setState((state) => {
            return { ...state, ...data };
        });
    };
    useImperativeHandle(ref, () => ({
        show: (item = {}, callback) => {
            setState({
                show: item.show
            });
            refCallback.current = callback;
        },
    }));

    const onOK = (data) => {
        setState({ show: false });
        if (refCallback.current) refCallback.current(data);
    };
    const onBack = (data) => {
        setState({ show: false });
        if (refCallback.current) refCallback.current(data);
    }

    return (
        <Main
            visible={state.show}
            closable={false}
        >
            <Row>
                <div className="container">
                <h3>Thông tin thẻ chính xác!</h3>
                <h4> Thông tin đúng:</h4>
                <Row className="content">
                    <Col span={5}>
                        <h6>Họ và tên:</h6>
                        <h6>Địa chỉ:</h6>
                        <h6>Giới tính:</h6>
                        <h6 style={{marginTop:18}}>Nơi đăng ký:</h6>
                        <h6>Thời gian:</h6>
                        <h6>TĐ 5 năm LT:</h6>
                        <h6>Mã thẻ mới:</h6>
                        <h6>Từ ngày mới:</h6>
                        <h6>Đến ngày mới:</h6>
                    </Col>
                    <div className="line"></div>
                    <Col span={19}>
                        <p style={{fontWeight:"bold"}}>NGUYỄN VĂN LONG</p>
                        <p>Thị Trấn Lộc Bình, Huyện Lộc Bình, Tỉnh Lạng Sơn</p>
                        <p>Nam</p>
                        <p style={{marginTop:18}}>Thị Trấn Lộc Bình, Huyện Lộc Bình, Tỉnh Lạng Sơn</p>
                        <p>22/10/2020 - 22/10/2021</p>
                        <p>21/6/2023</p>
                        <p>DN4013423330660</p>
                        <p>01/01/2020</p>
                        <p>31/12/2020</p>
                    </Col>
                </Row>
                <div className="button-bottom">
                    <div className="btn-back" onClick={() => onBack()}>
                        <span>Quay lại</span>
                        <img src={require("assets/images/welcome/back.png")}></img>
                         </div>
                    <div className="btn-use">
                        <span>Sử dụng thông tin thẻ</span>
                        <img src={require("assets/images/welcome/correct.png")}></img>
                         </div>
                </div>
                </div>
            </Row>
        </Main>
    )
}

export default forwardRef(ModalAccuracy)