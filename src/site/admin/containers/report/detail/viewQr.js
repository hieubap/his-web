import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'antd';
import './style.scss';
import 'antd/dist/antd.css';
import { withTranslate } from 'react-redux-multilingual';
import ClientUtils from "@utils/client-utils";
import { connect } from "react-redux";
import actionReport from "@actions/report";
function index(props) {
    const { translate } = props;
    const handleClose = () => {
        props.updateData({
            showQr: false,
            showQr: "",
            qr: "",
            name: ""
        })
    }
    const toggleDownload = (data, name) => {
        var a = document.createElement("a");
        a.href = 'data:application/octet-stream;base64,' + data
        a.accept = "image/png";
        a.download = `"iVisitor_"${name}.png`;
        a.click();
    };
    return (
        <Modal
            className="qr-modal"
            width={450}
            title={translate("thongtinqr")}
            visible={true}
            onCancel={() => handleClose()}
            footer={[
                <>
                    <Button onClick={() => toggleDownload(props.qr, props.name)} key="submit" type="primary">{translate("luuqr")}</Button>
                    {/* <Button onClick={() => handleClose()} type="danger" key="back">{translate("quaylai")}</Button> */}
                </>
            ]} >
            <img style={{ width: "100%" }} src={"data:image/jpeg;base64," + props.qr} />
        </Modal>
    )
}

export default connect(
    state => {
        return {
            auth: state.auth && state.auth.auth,
            showQr: state.report.showQr,
            qr: state.report.qr,
            name: state.report.name
        };
    },
    {
        updateData: actionReport.updateData,
    }
)(withTranslate(index));
