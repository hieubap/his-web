import React, { useState, useEffect } from "react";

import { connect } from 'react-redux'
import {Select } from "components";
import { Main, MainTitle, ButtonWrapper } from "./styled";
import IconSave from "assets/images/thuNgan/icSave.png";
import ModalCheckout from "components/ModalCheckout";
import DichVu from './DichVu';

const Index = ({
    chuongTrinhId,
    modalCheckoutRef,
    onSaveModal,
    dsDichVu,
    ...props
}) => {
    const [data, setData] = useState([]);
    useEffect(() => {
       setData(dsDichVu);
    }, [dsDichVu]);

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
            titleHeader="Chọn dịch vụ áp dụng giảm giá"
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
                <MainTitle>Thêm dịch vụ</MainTitle>
                <Select
                    data={props.listAllDichVu}
                    style={{ width: "100%" }}
                    placeholder="Vui lòng chọn dịch vụ"
                    onChange={(value, option) => onChange(value, option)}
                />

                <DichVu
                    listService={data || []}
                    updateListService={updateListService}
                />
            </Main>
        </ModalCheckout>
    );

};


const mapStateToProps = (state) => ({
    listAllDichVu: state.dichVu.listAllDichVu,

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Index)

