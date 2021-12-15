import React, { useRef } from 'react';
import { Col } from 'antd';
import LeftPanel from 'components/TiepDon/KeDichVu/LeftPanel';
import RightPanel from 'components/TiepDon/KeDichVu/RightPanel';
import { Main } from './styled';
import TabThongTin from "components/TiepDon/DanhSachBenhNhan/TabThongTin";

const Register = (props) => {
    const refTabThongTin = useRef(null);
    const id = props.match.params.id;

    const showTabThongTin = ({ isVisible }) => {
        if (refTabThongTin.current) {
            refTabThongTin.current.show({ isVisible });
        }
    }

    return (
        <Main>
            <Col md={24} xl={16} xxl={16} className="body">
                <LeftPanel id={id} />
            </Col>
            <Col md={24} xl={8} xxl={8} className="bg-color" >
                <RightPanel id={id} showTabThongTin={showTabThongTin} />
            </Col>
            <TabThongTin ref={refTabThongTin} />
        </Main>
    )
}

export default Register;
