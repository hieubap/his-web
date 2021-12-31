import { Col, Input, Popover, Row } from "antd";
import Breadcrumb from "components/Breadcrumb";
import React, { useEffect, useState, useMemo } from "react";
import { Main } from "./styled";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { withRouter } from 'react-router'
const ChiTiet = (props) => {
    const history = useHistory()
    const macDinh = useDispatch().themMoiThuoc.macDinh
    const searchDonThuoc = useDispatch().thuocChiTiet.searchDonThuoc
    const updateDataThuocChiTiet = useDispatch().thuocChiTiet.updateData
    const getPhuongThucTT = useDispatch().thuocChiTiet.getPhuongThucTT
    const getUtils = useDispatch().utils.getUtils
    const getListAllLieuDung = useDispatch().lieuDung.getListAllLieuDung
    // const infoPatient = useSelector(state => state.thuocChiTiet.infoPatient)
    const isThemMoi = useMemo(() => {
        if (history.location.pathname.includes("them-moi")) {
            return true
        } else {
            return false
        }
    }, [history.location.pathname])
    useEffect(() => {
        macDinh()
        if(props.match.params.id){
            searchDonThuoc(props.match.params.id)
        }
        getUtils({ name: "trangThaiHoan" });
        getUtils({ name: "TrangThaiPhieuNhapXuat" });
        getPhuongThucTT({ page: 0, active: true, size: 1000 });
        getListAllLieuDung({})
        return () => {
            updateDataThuocChiTiet({ // reset chi tiet
                infoPatient : [],
                dsThuocEdit : [],
                selectedDonThuoc : [],
                nguoiBenhId : null,
                isAdvised : false
            })
        }
    }, [])
    return (
        <Main>
            <Row className="top-level-category" justify="space-between">
                <Breadcrumb
                    chains={[
                        { title: "Kho", link: "/kho" },
                        { title: "Nhà Thuốc", link: "/kho/nha-thuoc" },
                    ]}
                ></Breadcrumb>
                <div className="checkout-broken">
                    <div className="registration-steps">
                        <div className="step step1 current">
                            <div className="timeline timeline-r"></div><span className="step-text">Chưa giữ chỗ</span>
                            <div className="step-desc"><span>(08:00:00 - 20/11/2021)</span>
                            </div>
                        </div>
                        <div className="step step2">
                            <div className="timeline timeline-r"></div>
                            <div className="timeline timeline-l"></div><span className="step-text">Chờ phát</span>
                            <div className="step-desc" style={{ visibility: "hidden" }}><span>Delivery Details</span> {/* các giá trị này ở 3 trường , nếu thiếu 1 sẽ bị lệch */}

                            </div>
                        </div>
                        <div className="step step3">
                            <div className="timeline timeline-l"></div><span className="step-text">Đã phát</span>
                            <div className="step-desc" style={{ visibility: "hidden" }}><span>Payment Details</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Row>

            <div className="title-category">
                <div>
                    Đơn thuốc
                    <img style={{ marginLeft: 10, marginBottom: 5 }} src={require("assets/images/kho/add-blue.png")} alt=""></img>
                </div>
            </div>
            <Row>
                <Col span={19} className="body">
                    <LeftPanel isThemMoi={isThemMoi} />
                </Col>
                <Col span={5} className="bg-color" >
                    <RightPanel isThemMoi={isThemMoi} />
                </Col>
            </Row>
        </Main>
    );
};

export default ChiTiet;
