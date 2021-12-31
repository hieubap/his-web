import { Col, Input, Popover, Row } from "antd";
import Breadcrumb from "components/Breadcrumb";
import React, { useEffect, useState, useMemo } from "react";
import { Main } from "./styled";
import WrapperChiTiet from "./WrapperChiTiet";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ChiTietDanhSachDichVuKho = (props) => {
    const history = useHistory()
    const getChiTietDanhSachDichVuKho = useDispatch().danhSachDichVuKho.getChiTietDanhSachDichVuKho;
    const selectedItem = useSelector(state => state.danhSachDichVuKho.selectedItem)
    useEffect(() => {
        let notUseParamsSearch = props?.location?.state?.notUseParamsSearch
        getChiTietDanhSachDichVuKho({ id: props.match.params.khoId, dichVuId: props.match.params.dichVuId, notUseParamsSearch })
    }, [])
    // const isThemMoi = useMemo(() => {
    //     if (history.location.pathname.includes("them-moi")) {
    //         return true
    //     } else {
    //         return false
    //     }
    // }, [history.location.pathname])
    return (
        <Main>
            <Row className="top-level-category" justify="space-between">
                <Breadcrumb
                    chains={[
                        { title: "Kho", link: "/kho" },
                        { title: "Danh sách dịch vụ kho", link: "/kho/danh-sach-dich-vu-kho" },
                    ]}
                ></Breadcrumb>
            </Row>

            <Row className="row-title" justify="space-between">
                <div className="title-category">
                    Danh sách dịch vụ kho
                    {/* <img style={{ marginLeft: 10, marginBottom: 5 }} src={require("assets/images/kho/add-blue.png")} alt=""></img> */}
                </div>

                <div style={{ marginRight: 20 }}>
                    <img style={{ marginRight: 10 }} src={require("assets/images/kho/location.png")} alt=""></img>
                    Kho: {selectedItem?.tenKho}
                </div>
            </Row>
            <Row>
                <WrapperChiTiet />
            </Row>
        </Main>
    );
};

export default ChiTietDanhSachDichVuKho;
