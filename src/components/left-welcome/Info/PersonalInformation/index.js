import React, { useRef, useState } from 'react';
import { Row, Col, Input, Select, DatePicker, Checkbox, TimePicker } from 'antd';
import AddressFull from 'components/AddressFull';
import Header from "components/Header";
// import actionHISReception from "@actions/HISReception";
import { connect } from 'react-redux';
import { Main } from './styled';
import Camera from "components/Camera";
const { Option } = Select;

const Index = props => {
    const { onChange, selectAddress, diaChi } = props;
    const refMatTruoc = useRef();
    const refMatSau = useRef();
    const [state, _setState] = useState({
        checkFormInfo: false,
    });
    const setState = (_state) => {
        _setState((state) => ({
            ...state,
            ...(_state || {}),
        }));
    };
    const { checkFormInfo } = state;

    const showItemInfo = () => {
        if (checkFormInfo) {
            let x = document.querySelectorAll(".hidden-form")
            x[0].style.display = "none";
            x[1].style.display = "none";
            x[2].style.display = "none";
            let elementButtonClear = document.querySelectorAll(".button-clear")
            elementButtonClear[0].style.marginTop = "59px"
        } else {
            let x = document.querySelectorAll(".hidden-form");
            x[0].style.display = "block";
            x[1].style.display = "block";
            x[2].style.display = "flex";
            let elementButtonClear = document.querySelectorAll(".button-clear")
            elementButtonClear[0].style.marginTop = "248px"
        }
        setState({ checkFormInfo: !checkFormInfo });
    }
    const showModalCamera = (type) => {
        if (type === "matTruoc") {
            if (refMatTruoc.current) refMatTruoc.current.show({ type: type });
        } else {
            if (refMatSau.current) refMatSau.current.show({ type: type });
        }

    }
    return (
        <Main md={24} xl={12} xxl={12} >
            <div className="frames">
                <Row className="left">
                    <Header title="Thông tin cá nhân" content={<div>Nhấn <span> [F1] </span>  để thêm thông tin cá nhân </div>} />
                </Row>
                <Row className="row-name" >
                    <Col md={12} xl={24} xxl={12} className="pr-3 pr-option">
                        <div className="item">
                            <label> Họ và tên</label>
                            <Input className="item-input" placeholder="Nhập họ và tên" />
                        </div>
                    </Col>
                    <Col md={12} xl={24} xxl={12} className="pl-3 pl-option">
                        <div className="checkbox">
                            <Checkbox > Đã xác thực thông tin</Checkbox>
                        </div>
                    </Col>
                </Row>
                <Row className="row-date">
                    <Col md={7} xl={16} xxl={7} className="pr-3">
                        <div className="item">
                            <label> Ngày tháng năm sinh</label>
                            <DatePicker className="item-born" />
                        </div>
                    </Col>
                    <Col md={5} xl={8} xxl={5} className="pl-3 pr-3 pr-option">
                        <div className="item">
                            <label> Thời gian</label>
                            <TimePicker className="item-time" />
                        </div>
                    </Col>
                    <Col md={6} xl={12} xxl={6} className="pr-3 pl-3 pl-option">
                        <div className="item">
                            <label> Tuổi</label>
                            <Input className="item-age" disabled />
                        </div>
                    </Col>
                    <Col md={6} xl={12} xxl={6} className="pl-3">
                        <div className="item">
                            <label> Giới tính</label>
                            <Select className="item-male" defaultValue="Giới tính">
                                <Option value="Nam">Nam</Option>
                            </Select>
                        </div>
                    </Col>
                </Row>
                <Row className="row-number">
                    <Col md={12} xl={24} xxl={12} className="pr-3 pr-option">
                        <div className="item">
                            <div className="item-select">
                                <label> Quốc tịch</label>
                                <Select className="select" defaultValue="Bảo hiểm y tế">
                                    <Option value="nam">nam</Option>
                                </Select>
                            </div>
                        </div>
                    </Col>
                    <Col md={12} xl={24} xxl={12} className="pl-3 pl-option ">
                        <div className="item">
                            <label style={{ marginTop: 15 }}> Nhập số điện thoại</label>
                            <Input className="item-input " placeholder="Nhập số điện thoại" />
                        </div>
                    </Col>
                </Row>
                <div className="left-content">
                    <Row className="second-row">
                        <Col md={24} xl={24} xxl={24}>
                            <div className="item">
                                <label> Địa chỉ</label>
                                <h5 style={{ fontStyle: "italic", marginTop: 3,marginBottom:0 }}> Ví dụ: Số 313 Trường Chinh, Khương Mai, Thanh Xuân, Hà Nội</h5>
                                <AddressFull
                                    onChange={(e) => onChange(e, "diaChi")}
                                    placeholder="Nhập địa chỉ"
                                    value={diaChi}
                                    selectAddress={selectAddress}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row className="third-row">
                        <Col md={12} xl={24} xxl={12} className="pr-3 third-row-left">
                            <div className="item">
                                <label>Nghề nghiệp</label>
                                <Select className="select" defaultValue="Giáo viên">
                                    <Option value="nam">nam</Option>
                                </Select>
                            </div>
                            <div className="hidden-form">
                                <div className="item ">
                                    <label>Loại giấy tờ tùy thân</label>
                                    <Select className="select" defaultValue="Chứng minh thư nhân dân">
                                        <Option value="nam">nam</Option>
                                    </Select>
                                </div>
                                <div className="item">
                                    <label>Email</label>
                                    <Input className="input" placeholder="Nhập email" />
                                </div>
                            </div>
                        </Col>
                        <Col md={12} xl={24} xxl={12} className="third-row-right pl-3">
                            <div className="item">
                                <label>Mã số bảo hiểm xã hội</label>
                                <Input className="input" placeholder="Nhập mã số BHXH" />
                            </div>
                            <div className="hidden-form" >
                                <div className="item">
                                    <label>Mã số giấy tờ tùy thân</label>
                                    <Input className="input" placeholder="Nhập mã số giấy tờ tùy thân" />
                                </div>
                                <div className="item">
                                    <label>Dân tộc</label>
                                    <Select className="select" defaultValue="Chứng minh thư nhân dân">
                                        <Option value="nam">nam</Option>
                                    </Select>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="camera hidden-form">
                        <Col md={9} xl={20} xxl={12}>
                            <div className="camera-before">
                                <div className="optimize" onClick={() => showModalCamera("matTruoc")}>
                                    <Camera
                                        ref={refMatTruoc}
                                        type={"matTruoc"}
                                        title={"Mặt trước"}
                                        image={require("resources/images/welcome/Mattruoc.png")}
                                        icon={require("resources/images/welcome/iconAccept.png")}
                                    />
                                    <div className="text">CMND/Căn cước <br />Mặt trước</div>
                                </div>
                            </div>
                        </Col>
                        <Col md={9} xl={20} xxl={12}>
                            <div className="camera-after">
                                <div className="optimize" onClick={() => showModalCamera("matSau")}>
                                    <Camera
                                        ref={refMatSau}
                                        type={"matSau"}
                                        title={"Mặt sau"}
                                        image={require("resources/images/welcome/Matsau.png")}
                                        icon={require("resources/images/welcome/iconAccept.png")}
                                    />
                                    <div className="text">CMND/Căn cước <br />Mặt sau</div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <div className="button-clear" onClick={() => showItemInfo()}>
                            <span>{checkFormInfo ? "Thu gọn" : "Xem thêm  "}</span>
                            {checkFormInfo ?
                                <img className="icon" src={require("resources/images/welcome/arrow.png")} /> :
                                <img className="icon" src={require("resources/images/welcome/arrowDown.png")} />}
                        </div>
                    </Row>
                </div>
            </div>
        </Main>
    )
}
const mapStateToProps = state => {
    return {
        diaChi: state.HISReception.diaChi || "",
    };
}
const mapDispatchToProps = dispatch => {
    return {
        // updateData: event => dispatch(actionHISReception.updateData(event))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);