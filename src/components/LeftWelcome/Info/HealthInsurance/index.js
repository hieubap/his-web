import React, { useState, useRef } from 'react';
import { Row, Col, Input, Select, DatePicker, Checkbox } from 'antd';
import Header from "components/Header";
import ScanQrCode from "components/ScanQrCode";
import { Main } from './styled';
const { TextArea } = Input;
const { Option } = Select;

const Index = props => {
    const refQRCodeScaner = useRef(null);
    const [state, _setState] = useState({
        checkFormBhyt: false,
        show: false
    });
    const setState = (_state) => {
        _setState((state) => ({
            ...state,
            ...(_state || {}),
        }));
    };
    const { checkFormBhyt } = state;
    const showItemBhyt = () => {
        if (checkFormBhyt) {
            let x = document.querySelector(".hidden-bhyt")
            x.style.display = "none";
        } else {
            let x = document.querySelector(".hidden-bhyt")
            x.style.display = "block";
        }
        setState({ checkFormBhyt: !checkFormBhyt });
    }
    const onScanQRcode = () => {
        setState({ show: true });
        let timer = setTimeout(() => {
            if (refQRCodeScaner.current) {
                refQRCodeScaner.current.show({
                    show: true
                }, () => {
                    setState({ show: false });
                });
            }
        }, timer);
    };
    return (
        <Main>
            <Row>
                <Header
                    title="Thông tin BHYT"
                    content={<div>Nhấn <span>[F2] </span>để thêm thông tin BHYT  </div>} />
            </Row>
            <Row className="flame-right-main">
                <Row className="first-row">
                    <Col md={16} xl={24} xxl={16} className="pr-3 percent-left">
                        <div className="item">
                            <label>Sổ bảo hiểm</label>
                            <Input className="input-first" placeholder="Nhập số bảo hiểm" />
                            <div className="qr-icon">
                                <span>Quét mã bảo hiểm</span>
                                <img onClick={() => onScanQRcode()} src={require("assets/images/welcome/iconqr.png")}></img>
                            </div>
                        </div>
                    </Col>
                    <Col md={8} xl={24} xxl={8} className="pl-3 percent-right">
                        <div className="item">
                            <label className="title" >% bảo hiểm chi trả</label>
                            <Input className="input-second" placeholder="Nhập số bảo hiểm" />
                        </div>
                    </Col>
                </Row>
                <Row className="second-row">
                    <Col md={12} xl={12} xxl={12} className=" pr-3 mt-3 item-first">
                        <label className="title" >Bảo hiểm từ ngày</label>
                        <DatePicker className="date" />
                    </Col>
                    <Col md={12} xl={12} xxl={12} className="pl-3 mt-3 item-second" >
                        <label className="title">Bảo hiểm đến ngày</label>
                        <DatePicker className=" date" />
                    </Col>
                </Row>
                <div className="hidden-bhyt">
                    <div className="third-row">
                        <div className="item-first">
                            <label>Chẩn đoán nơi giới thiệu</label>
                            <TextArea className="inputArea" placeholder="Nhập nội dung" />
                        </div>
                        <div className="item-second" >
                            <label>Nơi đăng ký</label>
                            <Input className="input" disabled />
                        </div>
                        <div className="item-third">
                            <label>Chẩn đoán nơi giới thiệu</label>
                            <Select className="select" defaultValue="BV 198">
                                <Option value="nam">nam</Option>
                            </Select>
                        </div>
                    </div>
                    <Row className="four-row">
                        <Col md={12} xl={12} xxl={12} className="pr-3 item-first">
                            <label className="title" >Thời gian đủ 5 năm liên tục</label>
                            <DatePicker className="date" disabled />
                        </Col>
                        <Col md={12} xl={12} xxl={12} className="pl-3 item-second" >
                            <label className="title">Thời gian miễn đồng chi trả</label>
                            <DatePicker className=" date" disabled />
                        </Col>
                    </Row>
                    <Row className="five-row">
                        <Col md={13} xxl={13} className="item">
                            <Checkbox className="view">Có giấy chuyển tuyến</Checkbox>
                            <Checkbox className="view" >Có lịch hẹn khám</Checkbox>
                        </Col>
                        <Col md={11} xxl={11} className="item" style={{ paddingLeft: 14 }}>
                            <Checkbox className="view">Miễn đồng chi trả</Checkbox>
                            <Checkbox className="view">Đang giữ thẻ</Checkbox>
                        </Col>
                    </Row>
                </div>
                <Row>
                    <div className="button-clear" onClick={() => showItemBhyt()} >
                        <span>{checkFormBhyt ? "Thu gọn" : "Xem thêm  "}</span>
                        {checkFormBhyt ?
                            <img className="icon" src={require("assets/images/welcome/arrow.png")} /> :
                            <img className="icon" src={require("assets/images/welcome/arrowDown.png")} />}
                    </div>
                </Row>
            </Row>
            {state.show &&
                <ScanQrCode
                    ref={refQRCodeScaner}
                    history={props.history}
                />}
        </Main>
    )
}
export default Index;