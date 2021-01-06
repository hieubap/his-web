import React from 'react';
import { Main } from './styled';
import { Input } from 'antd';
import Table from "components/Table";

function index(props) {
    return (
        <Main className="four-row">
                <div className="pannel">
                    <div className="title">DS NB đã tiếp đón</div>
                    <div className="content">
                        <Table
                            scroll={{ x: 580, y: 110 }}
                            columns={[
                                {
                                    title: (
                                        <div className="custome-header">

                                            <div className="addition-box"> </div>
                                            <div className="title-box">STT</div>
                                        </div>
                                    ),
                                    width: "124px",
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
                                            <div className="title-box">Họ tên - tuổi</div>

                                        </div>
                                    ),
                                    width: "245px",
                                    dataIndex: "col2",
                                    key: "col2"
                                },
                                {
                                    title: (
                                        <div className="custome-header">
                                            <div className="addition-box">
                                                <img src={require("assets/images/welcome/search.png")}></img>
                                                <Input placeholder="Tìm mã phòng" />
                                            </div>
                                            <div className="title-box">Phòng</div>

                                        </div>
                                    ),
                                    width: "140px",
                                    dataIndex: "col3",
                                    key: "col3"
                                },
                            ]}
                            dataSource={props.dataTwo}
                        />
                    </div>
                </div>
        </Main>
    )
}

export default index;