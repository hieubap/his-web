import React from 'react';
import Table from "components/Table";
import { Main } from './styled';

function index(props) {
    return (
        <Main md={24} xl={24} xxl={24} className="container">
            <div className="title">Dịch vụ đã chọn</div>
            <Table className="table"
                scroll={{ y: 307 }}
                columns={[
                    {
                        title: (
                            <div className="custome-header">
                                <div className="title-box">Tên dịch vụ </div>
                            </div>
                        ),
                        width: 50,
                        dataIndex: "col1",
                        key: "col1"
                    },
                    {
                        title: (
                            <div className="custome-header">
                                <div className="title-box">SL</div>
                            </div>
                        ),
                        width: 15,
                        dataIndex: "col2",
                        key: "col2"
                    },
                    {
                        title: (
                            <div className="custome-header">
                                <div className="title-box">Đơn giá</div>
                            </div>
                        ),
                        width: 25,
                        dataIndex: "col3",
                        key: "col3"
                    },
                    {
                        title: (
                            <div className="custome-header">
                            </div>
                        ),
                        width: 10,
                        dataIndex: "col4",
                        key: "col4",
                        render: () => {
                            return <div className="btn-delete"><img src={require("assets/images/welcome/delete.png")}></img></div>
                        }
                    },
                ]}
                dataSource={props.data}
            />
        </Main>
    )
}
export default index;