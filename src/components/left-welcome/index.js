import React, { useEffect, useRef } from 'react';
import { Row, Col } from 'antd';
// import actionHISReception from "@actions/HISReception";
// import actionHISAddress from "@actions/HISAddress";
import HeaderReception from "components/HeaderReception";
import InfoHeader from './InfoHeader';
import Info from './Info';
import ModalAdditionalInfo from '../Modal/Modal-Additional-Info';
import ModalError from '../Modal/Modal-Error';
import ModalCancel from '../Modal/Modal-Cancel';
import ModalAccuracy from '../Modal/Modal-Accuracy';
import { connect } from 'react-redux';
import { Main } from './styledMain';

const Index = props => {
    const { updateData, searchDistrict, updateDataAddress } = props;
    const refAdditionalInfo = useRef();
    const refError = useRef();
    const refCancel = useRef();
    const refAccuracy = useRef();
    useEffect(() => {
        // searchDistrict("", "all");
        // updateData({
        //     quocTichId: 1000179,
        //     quocGiaId: 1000179,
        //     checkValidate: false,
        //     dinhdangngaysinh: false,
        //     checkNgaySinh: false,
        // });
        // updateDataAddress({ dataDistrict: [] });
    }, []);
    const selectAddress = async data => {
        // props.updateData({
        //     tinhThanhPhoId: data.tinhThanhPho.id,
        //     quanHuyenId: data.quanHuyen.id,
        //     xaPhuongId: data.id,
        //     diaChi: data.displayText
        // })
    };
    const onChange = (value, name) => {
        props.updateData({ [`${name}`]: value });
    }
    const showAddNewInfo = () => {
        refAdditionalInfo.current.show({
            show: true
        }, () => {

        })
    };
    const showError = () => {
        refError.current.show({
            show: true
        }, () => {

        })
    };

    const showAccuracy = () => {
        refAccuracy.current.show({
            show: true
        }, () => {

        })
    }
    const showCancel = () => {
        refCancel.current.show({
            show: true
        }, () => {

        })
    }

    return (
        <Main>
            <div className="container-fluid">
                <HeaderReception
                    title={"Đăng kí thông tin khám bệnh"}
                />
                <InfoHeader />
                <Info
                    onChange={onChange}
                    selectAddress={selectAddress}
                    history={props.history}
                />
                <Row className="button-bottom">
                    <Col md={4} xl={4} xxl={11} >
                        <div className="button button-back" onClick={() => showAddNewInfo()}>
                            <span>Quay lại</span>
                            <img src={require("resources/images/welcome/back.png")}></img>
                        </div>
                    </Col>
                    <Col md={20} xl={20} xxl={13} className="button-bottom-right">
                        <div className="button button-danger" onClick={() => showError()}>
                            <span>Hủy tiếp đón</span>
                            <img src={require("resources/images/welcome/danger.png")}></img>
                        </div>
                        <div className="button button-sucess" onClick={() => showAccuracy()}>
                            <span>Xác thực thông tin</span>
                            <img src={require("resources/images/welcome/success.png")}></img>
                        </div>
                        <div className="button button-save" onClick={() => showCancel()}>
                            <span>Lưu thông tin</span>
                            <img src={require("resources/images/welcome/save.png")}></img>
                        </div>
                    </Col>
                </Row>
                <ModalAdditionalInfo ref={refAdditionalInfo} />
                <ModalError ref={refError} />
                <ModalCancel ref={refCancel} />
                <ModalAccuracy ref={refAccuracy} />
            </div>
        </Main>
    )
}

export default Index;