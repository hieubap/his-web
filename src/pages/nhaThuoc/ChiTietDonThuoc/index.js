import { Col, Input, Popover, Row } from "antd";
import Breadcrumb from "components/Breadcrumb";
import React, { useEffect, useState, useMemo, useRef } from "react";
import { Main } from "./styled";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from 'react-router'
import moment from "moment";
import stringUtils from "mainam-react-native-string-utils";

const ChiTietDonThuoc = (props) => {
    const history = useHistory()
    const macDinh = useDispatch().themMoiThuoc.macDinh
    const searchDonThuoc = useDispatch().thuocChiTiet.searchDonThuoc
    const updateDataThuocChiTiet = useDispatch().thuocChiTiet.updateData
    const getPhuongThucTT = useDispatch().thuocChiTiet.getPhuongThucTT
    const getUtils = useDispatch().utils.getUtils
    const getListAllLieuDung = useDispatch().lieuDung.getListAllLieuDung
    const infoPatient = useSelector(state => state.thuocChiTiet.infoPatient)
    const trangThaiDon = useSelector(state => state?.thuocChiTiet?.infoPatient?.phieuXuat?.trangThai || "")

    const refLayerHotKey = useRef(stringUtils.guid());
    const { onAddLayer, onRemoveLayer } = useDispatch().phimTat;

    useEffect(() => {
        onAddLayer({ layerId: refLayerHotKey.current });
        return () => {
        onRemoveLayer({ layerId: refLayerHotKey.current });
        };
    }, []);

    const isThemMoi = useMemo(() => {
        if (history.location.pathname.includes("them-moi")) {
            return true
        } else {
            return false
        }
    }, [history.location.pathname])
    useEffect(() => {
        macDinh()
        // if(props.match.params.id){
        //     searchDonThuoc(props.match.params.id)
        // }
        getUtils({ name: "trangThaiHoan" });
        getUtils({ name: "TrangThaiDonThuocNhaThuoc" });
        getPhuongThucTT({ page: 0, active: true, size: 1000 });
        getListAllLieuDung({})
        return () => {
            updateDataThuocChiTiet({ // reset chi tiet
                infoPatient: [],
                dsThuocEdit: [],
                selectedDonThuoc: [],
                nguoiBenhId: null,
                isAdvised: false
            })
        }
    }, [])
    useEffect(() => {
        if (props.match.params.id) {
            searchDonThuoc(props.match.params.id)
        }
    }, [props.match.params.id])
    return (
        <Main>
            <Row className="top-level-category" justify="space-between">
                <Breadcrumb
                    chains={[
                        { title: "Nh?? thu???c", link: "/nha-thuoc" },
                        // { title: "Nh?? Thu???c", link: "/kho/nha-thuoc" },
                    ]}
                ></Breadcrumb>
                <div className="checkout-broken">
                    <div className="registration-steps">
                        <div className={`step step1 ${trangThaiDon <= 15 ? "current" : ""}`}>
                            <div className="timeline timeline-r"></div><span className="step-text">T???o m???i</span>
                            <div className="step-desc" style={{
                                visibility: trangThaiDon && !isThemMoi ? "visible" : "hidden"
                            }}><span>{
                                `(${
                                (infoPatient?.phieuXuat?.thoiGianTaoPhieu && moment(infoPatient?.phieuXuat?.thoiGianTaoPhieu).format("HH:mm:ss - DD/MM/YYYY")) ||
                                "Delivery Details"
                                })`
                            }</span>
                            </div>
                        </div>
                        <div className={`step step2 ${trangThaiDon === 30 ? "current" : ""}`}>
                            {/* <div className="timeline timeline-r"></div> */}
                            <div className="timeline timeline-l"></div><span className="step-text">???? ph??t</span>
                            <div className="step-desc" style={{
                                visibility: trangThaiDon === 30 ? "visible" : "hidden"
                            }}>
                                <span>{
                                    `(${
                                    (infoPatient?.phieuXuat?.thoiGianDuyet && moment(infoPatient?.phieuXuat?.thoiGianDuyet).format("HH:mm:ss - DD/MM/YYYY")) || "Delivery Details"
                                    })`
                                }</span> {/* c??c gi?? tr??? n??y ??? 3 tr?????ng , n???u thi???u 1 s??? b??? l???ch */}
                            </div>
                        </div>
                        {/* <div className="step step3">
                            <div className="timeline timeline-l"></div><span className="step-text">???? ph??t</span>
                            <div className="step-desc" style={{ visibility: "hidden" }}><span>Payment Details</span>
                            </div>
                        </div> */}
                    </div>
                </div>
            </Row>

            <div className="title-category">
                <div>
                    ????n thu???c
                    <img style={{ marginLeft: 10, marginBottom: 5 }} src={require("assets/images/kho/add-blue.png")} alt=""></img>
                </div>
            </div>
            <Row>
                <Col span={19} className="body">
                    <LeftPanel isThemMoi={isThemMoi} layerId={refLayerHotKey.current} />
                </Col>
                <Col span={5} className="bg-color" >
                    <RightPanel isThemMoi={isThemMoi} layerId={refLayerHotKey.current}/>
                </Col>
            </Row>
        </Main>
    );
};

export default ChiTietDonThuoc;
