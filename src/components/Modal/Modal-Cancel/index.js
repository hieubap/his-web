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
                <h3>Huỷ tiếp đón</h3>
                <p>Những thay đổi dữ liệu sẽ không được lưu, bạn có chắc chắn muốn hủy tiếp đón?</p>
                </div>
            </Row>
            <Row>
            <div className="button-bottom">
                    <div className="btn-cancel" onClick={()=>onBack()}> 
                    <span>Huỷ</span>
                    <img src={require("resources/images/welcome/back.png")}></img>
                    </div>
                    <div className="btn-accept" onClick={()=>onOK()}> 
                    <span>Đồng ý</span>
                    <img src={require("resources/images/welcome/correct.png")}></img>
                    </div>
                </div>
            </Row>
        </Main>
    )
}

export default forwardRef(ModalError)