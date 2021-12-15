import React, { useState } from "react";
import { Main } from "./styled";
import HomeWrapper from "components/HomeWrapper";
import { Col, Row } from "antd";
import TimKiemDanhSachDichVuKho from "pages/kho/DanhSachDichVuKho/TimKiemDanhSachDichVuKho";
import DanhSachDichVu from "pages/kho/DanhSachDichVuKho/DanhSachDichVu";
import ThongTinHangHoa from "pages/kho/components/ThongTinHangHoa";
import DanhSachRutGon from "pages/kho/components/DanhSachRutGon";
import { connect } from "react-redux";
import ThongTinHangHoaChiTiet from "pages/kho/components/ThongTinHangHoaChiTiet";
import Breadcrumb from "components/Breadcrumb";
const DanhSachDichVuKho = (props) => {
    return (
        <Main>
            <Breadcrumb
                chains={[
                    { title: "Kho", link: "/kho" },
                    { title: "Danh sách dịch vụ kho", link: "/kho/danh-sach-dich-vu-kho" },
                ]}
            >
                <Row xs={24}>
                    <TimKiemDanhSachDichVuKho />
                </Row>
                <Row>
                    <DanhSachDichVu />
                </Row>
            </Breadcrumb>
        </Main>
    );
};

export default DanhSachDichVuKho;
