import React from 'react';
import { Main } from './styled';
import { Input } from 'antd';
import Table from "components/Table";

function index(props) {
    return (
        <Main>
            <div className="pannel">
                <div className="title">Số lượng người bệnh theo phòng khám</div>
                <div className="content">
                    <Table
                        scroll={{ x: 580, y: 110 }}
                        columns={[
                            {
                                title: (
                                    <div className="custome-header">
                                        <div className="addition-box pl-1" >
                                            <img src={require("assets/images/welcome/search.png")} style={{ left: 15 }}></img>
                                            <Input placeholder="Tìm Mã hoặc tên phòng" style={{ position: "absolute", top: 0, left: 10, width: 255, zIndex: "1" }} />
                                        </div>
                                        <div className="title-box">Mã Phòng</div>
                                    </div>
                                ),
                                width: "52px",
                                dataIndex: "col1",
                                key: "col1"
                            },
                            {
                                title: (
                                    <div className="custome-header">
                                        <div className="addition-box">
                                        </div>
                                        <div className="title-box">Phòng</div>
                                    </div>
                                ),
                                width: "49px",
                                dataIndex: "col2",
                                key: "col2"
                            },
                            {
                                title: (
                                    <div className="custome-header">
                                        <div className="addition-box"></div>
                                        <div className="title-box">Đăng ký</div>
                                    </div>
                                ),
                                width: "43px",
                                dataIndex: "col3",
                                key: "col3"
                            },
                            {
                                title: (
                                    <div className="custome-header">
                                        <div className="addition-box"></div>
                                        <div className="title-box">Chờ khám</div>
                                    </div>
                                ),
                                width: "48px",
                                dataIndex: "col4",
                                key: "col4"
                            },
                            {
                                title: (
                                    <div className="custome-header">
                                        <div className="addition-box"></div>
                                        <div className="title-box">Đang khám</div>
                                    </div>
                                ),
                                width: "55px",
                                dataIndex: "col5",
                                key: "col5"
                            },
                            {
                                title: (
                                    <div className="custome-header">
                                        <div className="addition-box"></div>
                                        <div className="title-box">Đã kết luận</div>
                                    </div>
                                ),
                                width: "55px",
                                dataIndex: "col6",
                                key: "col6"
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