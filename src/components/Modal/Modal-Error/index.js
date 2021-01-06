import React, { useRef, useImperativeHandle, useState, forwardRef } from "react";
import { Main } from "./styled";
import { Row, Col, Select, Input } from 'antd'
const { Option } = Select;
const ModalError = (props, ref) => {
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
                show: item.show,
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
            <Row className="container">
                <Col>
                <Row className="header">
                    <h3>Mã lỗi 123: <br /> Thẻ đã báo giảm. Ngừng tham gia</h3>
                </Row>
                <Row className="note">
                    <h5>Ghi chú</h5>
                    <p>Thẻ đã được đơn vị: BHYT Hộ gia đình Trạm y tế Phường Phúc Tân (BI0077B)
                    báo giảm cho cơ quan Bảo hiểm Xã hội quận Hoàn Kiếm và hết giá trị sử dụng từ ngày: 10/12/2020.
                    Trong trường hợp người tham gia có thắc mắc đề nghị CSYT liên hệ với giám định viên chuyên quản hoặc
                    liên hệ với Trung tâm hỗ trợ khách hàng của BHXH Việt Nam theo số điện thoại: 1900969668 để được hỗ trợ,
                  Xin cảm ơn!</p>
                </Row>
                <Row>
                 <div className="info">
                    <h5>Thông tin đúng:</h5>
                </div>
                </Row>
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

                <Row className="button-bottom">
                    <div className="btn-left">
                        <span>Bỏ kiểm tra thẻ</span>
                        <img src={require("assets/images/welcome/delete.png")}></img>
                    </div>
                    <div className="btn-right" onClick={() => onBack()}>
                        <span>Quay lại</span>
                        <img src={require("assets/images/welcome/back.png")}></img>
                    </div>
                </Row>
                <Row className="footer">
                    <Col span={12}>
                        Bỏ qua kiểm tra thẻ với cổng giám định có thể dẫn đến các dịch vụ của người bệnh không được cơ quan BHYT quyết toán!
            </Col>
                </Row>
                </Col>
            </Row>
        </Main>
    )
}

export default forwardRef(ModalError)