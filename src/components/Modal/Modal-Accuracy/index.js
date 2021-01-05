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
                <div className="main">
                
                </div>
                <div className="button-bottom">
                    <div className="btn-back" onClick={() => onBack()}>
                        <span>Quay lại</span>
                        <img src={require("resources/images/welcome/back.png")}></img>
                         </div>
                    <div className="btn-use">
                        <span>Sử dụng thông tin thẻ</span>
                        <img src={require("resources/images/welcome/correct.png")}></img>
                         </div>
                </div>
                </div>
            </Row>
        </Main>
    )
}

export default forwardRef(ModalAccuracy)