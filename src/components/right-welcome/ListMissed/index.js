import React from 'react';
import { Main } from './styled';
import { Col, Input } from 'antd';
import Table from "components/Table";

function index(props) {
    return (
        <Main md={24} xl={24} xxl={12}>
            <div className="pannel">
                <div className="title">DS gọi nhỡ</div>
                <div className="content">
                    <Table
                        scroll={{ x: 280, y: 110 }}
                        columns={[
                            {
                                title: (
                                    <div className="custome-header">

                                        <div className="addition-box"> </div>
                                        <div className="title-box">STT</div>
                                    </div>
                                ),
                                width: 10,
                                dataIndex: "col1",
                                key: "col1"
                            },
                            {
                                title: (
                                    <div className="custome-header">
                                        <div className="addition-box">
                                            <img src={require("assets/images/welcome/search.png")}></img>
                                            <Input placeholder="Tìm tên NB" />
                                        </div>
                                        <div className="title-box">Họ tên tuổi</div>

                                    </div>
                                ),
                                width: 60,
                                dataIndex: "col2",
                                key: "col2"
                            },
                        ]}
                        dataSource={props.data}
                    />
                </div>
            </div>
        </Main>
    )
}

export default index;