import React from 'react';
import { Input, Checkbox } from 'antd';
import Header from "components/Header";
import Table from "components/Table";
import { Main } from './styled';

function index(props) {
    return (
        <Main className="main">
            <Header title="Tìm kiếm dịch vụ" content={<div>Nhấn <span> [F2] </span>  để thêm thông tin BHYT </div>} />
            <Table className="table"
                scroll={{ y: 453 }}
                columns={[
                    {
                        title: (
                            <div className="custome-header">
                                <div className="addition-box"> </div>
                                <div className="title-box">MÃ DV</div>
                            </div>
                        ),
                        width: 50,
                        dataIndex: "col1",
                        key: "col1"
                    },
                    {
                        title: (
                            <div className="custome-header">
                                <div className="addition-box">
                                    <div className="input-text">
                                        <img src={require("resources/images/welcome/search.png")}></img>
                                        <Input placeholder="Tìm tên dịch vụ, phòng thực hiện" />
                                    </div>
                                    <div className="button-choose">
                                        <div className="item">Khám</div>
                                        <div className="item">XN</div>
                                        <div className="item">CLS</div>
                                        <div className="item">Gói DV</div>
                                    </div>
                                </div>
                                <div className="title-box">Tên dịch vụ</div>

                            </div>
                        ),
                        width: 210,
                        dataIndex: "col2",
                        key: "col2"
                    },
                    {
                        title: (
                            <div className="custome-header">
                                <div className="addition-box">
                                </div>
                                <div className="title-box">Đơn giá DV</div>

                            </div>
                        ),
                        width: 60,
                        dataIndex: "col3",
                        key: "col3"
                    },
                    {
                        title: (
                            <div className="custome-header">
                                <div className="addition-box">
                                </div>
                                <div className="title-box">Đơn giá BH</div>

                            </div>
                        ),
                        width: 60,
                        dataIndex: "col4",
                        key: "col4"
                    },
                    {
                        title: (
                            <div className="custome-header">
                                <div className="addition-box">
                                </div>
                                <div className="title-box">Phòng</div>

                            </div>
                        ),
                        width: 98,
                        dataIndex: "col5",
                        key: "col5"
                    },
                    {
                        title: (
                            <div className="custome-header">
                                <div className="addition-box">
                                    <div className="icon-option">
                                        <img style={{ top: 9, cursor: "pointer" }} src={require("resources/images/welcome/iconTable.png")}></img>
                                        <img style={{ top: 9, left: 40, cursor: "pointer" }} src={require("resources/images/welcome/iconTabletwo.png")}></img>
                                    </div>
                                </div>
                                <div className="title-box">Chọn</div>
                            </div>
                        ),
                        width: 35,
                        dataIndex: "col6",
                        key: "col6",
                        render: () => {
                            return <Checkbox />
                        }
                    },
                ]}
                dataSource={props.data}
            />
        </Main>
    )
}
export default index;