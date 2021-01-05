import React, { useState } from 'react';
import { Row, Col, Input, Select } from 'antd';
import Header from "components/Header";
import { Main } from './styled';
const { Option } = Select;

const Index = props => {
    const [state, _setState] = useState({
        checkFormttbosung: false,
    });
    const setState = (_state) => {
        _setState((state) => ({
            ...state,
            ...(_state || {}),
        }));
    };
    const { checkFormttbosung } = state;
    const showItemBosung = () => {
        if (checkFormttbosung) {
            let element = document.querySelectorAll(".hidden-ttbs");
            element[0].style.display = "none";
            element[1].style.display = "none";
        }
        else {
            let element = document.querySelectorAll(".hidden-ttbs");
            element[0].style.display = "block";
            element[1].style.display = "block";
        }
        setState({ checkFormttbosung: !checkFormttbosung });
    }
    return (
        <Main>
            <div className="flame">
                <Row>
                    <Header
                        title="Thông tin bổ sung"
                        content={<div>Nhấn <span>[F3] </span>để thêm thông tin khác </div>} />
                </Row>
                <Row className="info-main-bottom-mini" >
                    <Col md={24} xl={24} xxl={12} className="first-col">
                        <div className="item">
                            <label className="title" >Họ tên người bảo lãnh</label>
                            <Input className="input" placeholder="Nhập họ tên người bảo lãnh" />
                        </div>
                        <div className="item " >
                            <label className="title" >SĐT người bảo lãnh</label>
                            <Input className="input" placeholder="Nhập SĐT người bảo lãnh" />
                        </div>
                        <div className="item hidden-ttbs ">
                            <label className="title" >Loại miễn phí</label>
                            <Input className="input-grey"  disabled/>
                        </div>
                    </Col>
                    <Col md={24} xl={24} xxl={12} className="second-col">
                        <div className="item">
                            <label>Mối qh với NB</label>
                            <Select className="select" defaultValue="Cha">
                                <Option value="nam">nam</Option>
                            </Select>
                        </div>
                        <div className="item">
                            <label className="title" >CMND người bảo lãnh</label>
                            <Input className="input" placeholder="Nhập CMND người bảo lãnh" />
                        </div>
                        <div className="item hidden-ttbs">
                            <label>Người diện miễn phí</label>
                            <Select className="select" defaultValue="Nguyễn Phương Thảo">
                                <Option value="nam">nam</Option>
                            </Select>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <div className="button-clear" onClick={() => showItemBosung()} >
                        <span>{checkFormttbosung ? "Thu gọn" : "Xem thêm  "}</span>
                        {checkFormttbosung ?
                            <img className="icon" src={require("resources/images/welcome/arrow.png")} /> :
                            <img className="icon" src={require("resources/images/welcome/arrowDown.png")} />}
                    </div>
                </Row>
            </div>
        </Main>
    )
}
export default Index;