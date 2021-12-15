import React from "react";
import { Form } from "antd";
import { connect } from "react-redux";
import Table from "@admin/components/common/Table";
import actionTtHanhChinh from "@actions/ttHanhChinh";
import { AdminPage } from "@admin/components/admin";
import { withTranslate } from 'react-redux-multilingual';
import moment from 'moment';
import { MainLichSuDangKy } from './styledModal'
function index(props) {
    const { translate, dataHistory, id } = props;

    let data = (dataHistory || []).map((item, index) => {
        return {
            key: index,
            col1: item.ngayCheckIn && moment(item.ngayCheckIn).format("hh:mm DD/MM/YYYY"),
            col2: item.donVi && item.donVi.ten,
            col3: item.phanLoai,
            col4: item
        }
    })

    return (
        <MainLichSuDangKy>
            <AdminPage
                id="mgr-history"
                icon="subheader-icon fal fa-window"
                header={translate("registration_history")}
                subheader={"  "} >
                {data && data.length ?
                    <Table
                        scroll={{ x: 800, y: 500 }}
                        style={{ marginLeft: -10, marginRight: -10 }}
                        className="custom"
                        columns={[
                            {
                                width: 150,
                                dataIndex: "col1",
                                key: "col1"
                            },
                            {
                                width: 200,
                                dataIndex: "col2",
                                key: "col2"
                            },
                            {
                                width: 200,
                                dataIndex: "col3",
                                key: "col3",
                                render: (item) => {
                                    return (
                                        <div> { item == 0 ? <div style={{ fontWeight: "bold" }}>{translate("binhthuong")}</div> : <div style={{ color: "red", fontWeight: "bold" }}>{translate("batthuong")}</div>} </div>
                                    )
                                }
                            },
                            {
                                width: 200,
                                dataIndex: "col4",
                                key: "col4",
                                render: (item) => {
                                    return (
                                        <div>{item && item.id === id ? <i className="fal fa-check-circle" style={{ color: "red", fontSize: 17, fontWeight: "bold" }}></i> : null}</div>
                                    )
                                }
                            },
                        ]}
                        dataSource={data}
                    ></Table> : null}
            </AdminPage >
        </MainLichSuDangKy>
    );
}
export default connect(
    state => {
        return {
            auth: state.auth && state.auth.auth,
            id: state.ttHanhChinh.id,
            dataHistory: state.ttHanhChinh.dataHistory || []
        };
    },
    {
        updateData: actionTtHanhChinh.updateData
    }
)(Form.create()(withTranslate(index)));
