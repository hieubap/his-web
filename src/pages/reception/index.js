import React, { useEffect } from 'react';
import { Col } from 'antd';
import LeftWelcome from 'components/LeftWelcome';
import RightWelcome from 'components/RightWelcome';
import { Main } from './styled';
import { connect } from 'react-redux';
import cacheUtils from "utils/cache-utils";

const Reception = (props) => {
    let quayTiepDonId = cacheUtils.read("COUNTERS_ID", "", "", false);
    useEffect(() => {
        if (props.auth?.id) {
            props.getAllCounters();
            props.updateData({
                quocTichId: 1000179,
                quocGiaId: 1000179,
                checkValidate: false,
                dinhdangngaysinh: false,
                checkNgaySinh: false,
            });
            props.getAllDistricts();
        }
    }, [props.auth?.id]);
    return (
        <Main>
            <div className="line"></div>
            <Col md={24} xl={16} xxl={16} className="body">
                <div className="background">
                    <img src={require("assets/images/welcome/backgroundkiosk.png")}></img>
                </div>
                <LeftWelcome
                    history={props.history}
                    updateData={props.updateData}
                    diaChi={props.diaChi}
                />
            </Col>
            <Col md={24} xl={8} xxl={8} className="bg-color">
                <RightWelcome
                    history={props.history}
                    updateData={props.updateData}
                    listCounters={props.listCounters}
                    // searchQms={props.searchQms}
                    quayTiepDonId={quayTiepDonId}
                />
            </Col>
        </Main>
    )
}
const mapStateToProps = state => {
    return {
        auth: state.auth.auth || {},
        diaChi: state.reception.diaChi || "",
        listCounters: state.counters.listCounters || [],
    };
}
const mapDispatchToProps = ({
    address: { getAllDistricts },
    reception: { updateData },
    counters: { getAllCounters }
}) => ({
    getAllDistricts,
    updateData,
    getAllCounters
})
// const mapDispatchToProps = dispatch => {
//     return {
// searchQms: (page, size, trangThai, quayTiepDonId) => dispatch(actionHISQms.gotoPage(page, size, trangThai, quayTiepDonId)),
//     }
// }
export default connect(mapStateToProps, mapDispatchToProps)(Reception);