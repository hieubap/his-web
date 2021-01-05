import React, { useEffect } from 'react';
import { Col } from 'antd';
import MainLeft from 'components/left-welcome';
import MainRight from 'components/right-welcome';
import { Main } from './styled';
import { connect } from 'react-redux';
// import actionHISReception from "@actions/HISReception";
// import actionHISAddress from "@actions/HISAddress";
// import actionHISCounters from "@actions/HISCounters";
// import actionHISQms from "@actions/HISQms";
import cacheProvider from "data-access/datacache-provider";

function index(props) {
    let quayTiepDonId = cacheProvider.read("COUNTERS_ID", "");
    // useEffect(() => {
    //     props.searchCounters();
    // }, []);
    return (
        <Main>
            <div className="line"></div>
            <Col md={24} xl={16} xxl={16} className="body">
                <div className="background">
                    <img src={require("resources/images/welcome/backgroundkiosk.png")}></img>
                </div>
                <MainLeft
                    // history={props.history}
                    // updateData={props.updateData}
                    // searchDistrict={props.searchDistrict}
                    // updateDataAddress={props.updateDataAddress}
                    // diaChi={props.diaChi}
                />
            </Col>
            <Col md={24} xl={8} xxl={8}>
                <MainRight
                    // history={props.history}
                    // updateData={props.updateData}
                    // listCounters={props.listCounters}
                    // searchQms={props.searchQms}
                    // quayTiepDonId={quayTiepDonId}
                />
            </Col>
        </Main>
    )
}
const mapStateToProps = state => {
    return {
        diaChi: state.HISReception.diaChi || "",
        listCounters: state.HISCounters.listCounters || [],
    };
}
const mapDispatchToProps = dispatch => {
    return {
        // updateData: event => dispatch(actionHISReception.updateData(event)),
        // searchDistrict: (event, action) => dispatch(actionHISAddress.searchDistrict(event, action)),
        // updateDataAddress: event => dispatch(actionHISAddress.updateData(event)),
        // searchCounters: event => dispatch(actionHISCounters.search(event)),
        // searchQms: (page, size, trangThai, quayTiepDonId) => dispatch(actionHISQms.gotoPage(page, size, trangThai, quayTiepDonId)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(index);