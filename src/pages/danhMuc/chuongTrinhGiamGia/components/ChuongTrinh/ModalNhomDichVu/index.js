import React, { useState, useEffect } from "react";

import { connect } from 'react-redux'
import {Select } from "components";
import { Main, MainTitle, ButtonWrapper } from "./styled";
import IconSave from "assets/images/thuNgan/icSave.png";
import ModalCheckout from "components/ModalCheckout";
import NhomDichVu from './NhomDichVu';

const Index = ({
    chuongTrinhId,
    modalCheckoutRef,
    onSaveModal,
    dsNhomDichVuCap1,
    ...props
}) => {
    const [data, setData] = useState([]);
    useEffect(() => {
       setData(dsNhomDichVuCap1);
    }, [dsNhomDichVuCap1]);

    const onSubmit = () => {
        onSaveModal(data);
        onCancel();
    };

    const onCancel = () => {
        if (modalCheckoutRef.current) {
            modalCheckoutRef.current.close();
        }
    };

    const onChange = (_, option) => {
        if (option && data?.indexOf(option?.lists) === -1) {
            setData([option.lists, ...data]);
        }
    }

    const updateListService = (data) => {
        let services = data.map(e => e.action);
        setData(services);
    }

    return (
        <ModalCheckout
            titleHeader="Chọn nhóm dịch vụ áp dụng giảm giá"
            titleBtnNext={
                <ButtonWrapper>
                    Lưu <img src={IconSave} alt="iconSave" />
                </ButtonWrapper>
            }
            titleBtnBack="Quay lại"
            ref={modalCheckoutRef}
            width={800}
            destroyOnClose
            onClickBack={onCancel}
            onClickNext={onSubmit}
        >
            <Main>
                <MainTitle>Thêm nhóm dịch vụ</MainTitle>
                <Select
                    data={props.listAllNhomDichVuCap1}
                    style={{ width: "100%" }}
                    placeholder="Vui lòng chọn nhóm dịch vụ"
                    onChange={(value, option) => onChange(value, option)}
                />

                <NhomDichVu
                    listService={data || []}
                    updateListService={updateListService}
                />
            </Main>
        </ModalCheckout>
    );

};


const mapStateToProps = (state) => ({
    listAllDichVu: state.dichVu.listAllDichVu,
    listAllNhomDichVuCap1: state.nhomDichVuCap1.listAllNhomDichVuCap1,

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Index)

