import React, { useRef, useImperativeHandle, useState, forwardRef } from "react";
import { Main } from "./styled";
import { Row, Col, Select, Input } from 'antd'
const { Option } = Select;
const ModalAddForm = (props, ref) => {
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
                donviId: "",
                chucVuId: "",
                quanHam: "",
                nguoiDaiDien: "",
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
            <Row className="title">
                <h3> Thông tin bổ sung </h3>
            </Row>
            <Row>
                <Col span={12} className="pr-3">
                    <div className="item" >
                        <label>Đơn vị</label>
                        <Select className="item-select" defaultValue={state.donviId}>
                            <Option value="">Chọn đơn vị</Option>
                            <Option value="2">Đơn vị súng cối</Option>
                        </Select>
                    </div>
                    <div className="item ">
                        <label>Quân hàm</label>
                        <Select className="item-select" defaultValue={state.quanHam}>
                            <Option value="">Chọn quân hàm</Option>
                            <Option value="2">Thiếu tá</Option>
                        </Select>
                    </div>
                </Col>
                <Col span={12} className="pl-3">
                    <div className="item">
                        <label>Chức vụ</label>
                        <Select className="item-select" defaultValue="Cha">
                            <Option value="nam">Bộ tư lệnh</Option>
                        </Select>
                    </div>
                    <div className="item">
                        <label> Người đại diện </label>
                        <Input className="item-input" placeholder="Nguyễn Văn A" />
                    </div>
                </Col>
            </Row>
            <Row className="footer">
                <div className="btn-cancel" onClick={() => onBack()}>
                    <span> Quay lại </span>
                    <img src={require("assets/images/welcome/back.png")}></img>
                </div>
                <div className="btn-accept" onClick={() => onOK()}>
                    <span>  Lưu thông tin</span>
                    <img src={require("assets/images/welcome/save.png")}></img>
                </div>
            </Row>
        </Main>
    )
}

export default forwardRef(ModalAddForm)