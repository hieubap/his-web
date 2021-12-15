import React, { useState, useEffect } from "react";
import { Button, Input, Row } from "antd";
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import { AdminPage } from "@admin/components/admin";
import actionPhone from "@actions/phone";
import actionTtHanhChinh from "@actions/ttHanhChinh";
import { HeaderSearch } from "@admin/components/admin";
import "./styleotp.scss";
import actionAddress from "@actions/address";
import actionPost from "@actions/post";
import ModalData from "./ModalData";

function index(props) {
    const { translate, updateData, otpCode, history, soDienThoai, otp, searchInfo, sendPhoneNumber, updateDataTtHanhChinh, historyCheckin,
        showPopupData, dataHistory, anhDaiDien, onSearchQuanHuyen, onSearchXaPhuong, donViId, updateDataPost, searchAllQuestions } = props;
    useEffect(() => {
        start();
    }, []);
    const [state, _setState] = useState({
        sending: true,
        checkValidate: false,
    });
    const setState = (data = {}) => {
        _setState((state) => {
            return { ...state, ...data };
        });
    };
    const { sending, checkValidate } = state;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (otpCode && otpCode.length) {
            setState({ checkValidate: false });
            let href = "/check-in" + window.location.search
            history.push(href);
            searchInfo(soDienThoai, "", otp).then(() => {
                updateDataTtHanhChinh({ id: "" })
            }).catch(() => { });
        } else {
            setState({ checkValidate: true });
            return
        }
    };
    var timeout = null;
    var m = 2; // minutes
    var s = 0; // second
    function start() {
        if (s === -1) {
            s = 59;
            m -= 1;
        }
        if (m == -1) {
            clearTimeout(timeout);
            return false;
        }
        if (m === 0 && s === 0) {
            (document.getElementById("m") || {}).style.display = "none";
            setState({
                sending: false,
            });
        } else {
            (document.getElementById("m") || {}).innerText =
                " ( " +
                m.toString() +
                ":" +
                (s <= 9 ? "0" + s.toString() : s.toString()) +
                " )";
        }
        /*decrease time */
        timeout = setTimeout(function () {
            s--;
            start();
        }, 1000);
    }

    function stop() {
        clearTimeout(timeout);
    }
    const getOTP = () => {
        sendPhoneNumber(soDienThoai)
        start();
        (document.getElementById("m") || {}).style.display = "inline";
        setTimeout(() => {
            setState({ sending: false });
        }, 120000);
        setState({
            sending: true,
        });
    };
    const goBack = () => {
        let href = "/so-dien-thoai" + window.location.search;
        history.push(href)
    }
    return (
        <>
            <AdminPage
                id="mgr-report-opt"
                header={""}
                subheader={""}
            >
                <div className="container-search">
                    <div className="button-back" onClick={() => goBack()}>
                        <i className="fal fa-long-arrow-left"></i>
                        <span>{translate("quaylai")}</span>
                    </div>
                    <div className="main-search">
                        <Row><HeaderSearch title={"Xác nhận mã otp"} /></Row>
                        <Row>
                            <div className="content">
                                <div className="text-input">
                                    <div className="item-title">{translate("vuilongnhapOTP")} {soDienThoai}</div>
                                    <Input
                                        placeholder={translate("maotp")}
                                        value={otpCode}
                                        onChange={(e) => updateData({ otpCode: e.target.value })}
                                    />
                                    {checkValidate && !otpCode ? (
                                        <div className="validate-otp">{translate("maotp")}</div>
                                    ) : null}
                                </div>
                                <div className="note-phone-otp">{translate("banchuanhanduocma")}</div>
                                <div className="button-search-otp">
                                    <Button style={{ textTransform: "uppercase" }}
                                        onClick={sending ? () => { } : getOTP}
                                        id={sending ? "sending" : "dismiss"}
                                        className="btn-resend"
                                    >
                                        <i className="fal fa-redo"></i>
                                        {translate("guilaimaotp")}
                                        <span id="m"> </span>
                                    </Button>
                                    <Button onClick={handleSubmit} className="btn-send">
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
                    updateDataPost={updateDataPost}
                    searchAllQuestions={searchAllQuestions}
                    donViId={donViId}
                    historyCheckin={historyCheckin}
                />}
        </>
    );
}

export default connect(
    (state) => {
        return {
            otpCode: state.phone.otpCode,
            otp: state.phone.otp,
            soDienThoai: state.phone.soDienThoai,
            showPopupData: state.ttHanhChinh.showPopupData || false,
            dataHistory: state.ttHanhChinh.dataHistory || [],
            anhDaiDien: state.ttHanhChinh.anhDaiDien,
            donViId: state.ttHanhChinh.donViId
        };
    },
    {
        updateData: actionPhone.updateData,
        updateDataTtHanhChinh: actionTtHanhChinh.updateData,
        searchInfo: actionTtHanhChinh.searchInfo,
        sendPhoneNumber: actionPhone.sendPhoneNumber,
        onSearchQuanHuyen: actionAddress.onSearchQuanHuyen,
        onSearchXaPhuong: actionAddress.onSearchXaPhuong,
        updateDataPost: actionPost.updateData,
        searchAllQuestions: actionPost.searchAllQuestions,
        historyCheckin: actionTtHanhChinh.historyCheckin
    }
)(withTranslate(index));