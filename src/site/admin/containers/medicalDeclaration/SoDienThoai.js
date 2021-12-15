import React, { useEffect } from "react";
import { Button, Input, Row } from "antd";
import { connect } from "react-redux";
import { AdminPage } from "@admin/components/admin";
import { HeaderSearch } from "@admin/components/admin";
import { withTranslate } from "react-redux-multilingual";
import actionSetting from "@actions/setting";
import actionPhone from "@actions/phone";
import actionTtHanhChinh from "@actions/ttHanhChinh";
import actionAddress from "@actions/address";
import actionPost from "@actions/post";
import './styleotp.scss';
import ModalData from "./ModalData";

function index(props) {
    const { translate, nhaCungCapTinNhan, dataSettingInMedical, updateData, updateDataState, history, soDienThoai, checksdt, sendPhoneNumber, historyCheckin,
        showPopupData, dataHistory, anhDaiDien, onSearchQuanHuyen, onSearchXaPhuong, donViId, updateDataPost, searchAllQuestions } = props;
    const yeu_cau_so_dien_thoai = dataSettingInMedical.find((item) => { return item.maThietLap === "yeu_cau_so_dien_thoai" });
    useEffect(() => {
        updateData({
            openList: false,
            soDienThoai: "",
            checksdt: false,
            otpCode: "",
        });
    }, []);

    const search = () => {
        if (soDienThoai && soDienThoai.replaceAll(" ", "").isPhone()) {
            updateData({ checksdt: false });
            updateDataState({ soDienThoai: soDienThoai });
            if (nhaCungCapTinNhan) {
                let href = "/otp" + window.location.search;
                history.push(href);
                sendPhoneNumber(soDienThoai);
            } else {
                gotoPage("/check-in");
            }
        } else {
            updateData({ checksdt: true });
            return;
        }
    };
    const gotoPage = (item) => {
        let href = item + window.location.search;
        history.push(href);
    }
    return (
        <>
            <AdminPage
                className="mgr-report"
                icon="subheader-icon fal fa-window"
                header={""}
                subheader={""}
            >
                <div className="container-search">
                    <div className="button-back" onClick={() => gotoPage("/bo-cau-hoi")}>
                        <i className="fal fa-long-arrow-left"></i>
                        <span> {translate("quaylai")}</span>
                    </div>
                    <div className="main-search">
                        <Row>
                            <HeaderSearch title={translate("vui_long_nhap_so_dien_thoai")} />
                        </Row>
                        <Row>
                            <div className="content">
                                <div className="text-input">
                                    <div className="item-title">{translate("sdt")}</div>
                                    <Input
                                        placeholder={translate("timsdt")}
                                        value={soDienThoai}
                                        onChange={(e) => updateData({ soDienThoai: e.target.value })}
                                    />
                                    {checksdt && !soDienThoai
                                        ? <div className="validate">{translate("vui_long_nhap_so_dien_thoai") + " !"}</div>
                                        : soDienThoai && !soDienThoai.replaceAll(" ", "").isPhone()
                                            ? <div className="validate">{translate("checksdt")}</div>
                                            : null}</div>
                                {nhaCungCapTinNhan
                                    ? <span className="note-phone"> {translate("luuyOTP")} </span>
                                    : <span className="note-phone"></span>}
                                <div className="button-search">
                                    {yeu_cau_so_dien_thoai && yeu_cau_so_dien_thoai.giaTri == "true"
                                        ? <div className="col-md-6"></div>
                                        : <Button onClick={() => gotoPage("/check-in")} className="col-md-6 dismiss">
                                            {translate("boqua")}
                                        </Button>}
                                    <Button
                                        onClick={() => search()}
                                        className="col-md-6"
                                        type="default"
                                    >
                                        {translate("tieptuc")}
                                    </Button>
                                </div>
                            </div>
                        </Row>
                    </div>
                </div>
            </AdminPage>
            {showPopupData &&
                <ModalData
                    show={showPopupData}
                    updateData={updateData}
                    dataHistory={dataHistory}
                    anhDaiDien={anhDaiDien}
                    onSearchQuanHuyen={onSearchQuanHuyen}
                    onSearchXaPhuong={onSearchXaPhuong}
                    donViId={donViId}
                    updateDataPost={updateDataPost}
                    searchAllQuestions={searchAllQuestions}
                    historyCheckin={historyCheckin}
                />}
        </>
    );
}

export default connect(
    (state) => {
        return {
            soDienThoai: state.phone.soDienThoai,
            openList: state.phone.openList,
            checksdt: state.phone.checksdt,
            openSDT: state.phone.openSDT,
            donViId: state.ttHanhChinh.donViId,
            khuVucId: state.ttHanhChinh.khuVucId,
            donViIdAuth: state.auth && state.auth.auth && state.auth.auth.donViId,
            dataSettingInMedical: state.setting.data || [],
            nhaCungCapTinNhan: state.ttHanhChinh.nhaCungCapTinNhan,
            showPopupData: state.ttHanhChinh.showPopupData || false,
            dataHistory: state.ttHanhChinh.dataHistory || [],
            anhDaiDien: state.ttHanhChinh.anhDaiDien
        };
    },
    {
        updateDataState: actionTtHanhChinh.updateData,
        updateData: actionPhone.updateData,
        sendPhoneNumber: actionPhone.sendPhoneNumber,
        onSearchSetting: actionSetting.onSearch,
        sendPhone: actionSetting.onSearch,
        onSearchQuanHuyen: actionAddress.onSearchQuanHuyen,
        onSearchXaPhuong: actionAddress.onSearchXaPhuong,
        updateDataPost: actionPost.updateData,
        searchAllQuestions: actionPost.searchAllQuestions,
        historyCheckin: actionTtHanhChinh.historyCheckin
    }
)(withTranslate(index));