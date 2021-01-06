import React from 'react';
import Header from "components/Header";
import { Main } from './styled';

function index(props) {
    return (
        <Main md={24} xl={24} xxl={24} className="sum-money">
            <div className="line"></div>
            <div className="sum-money-container">
                <div className="title">Tổng tiền</div>
                <div className="note"> <span>Ghi chú: </span>Số tiền chính xác được xác định tại quầy thu ngân sau khi áp dụng các chính sách giảm giá nếu có. </div>

                <div className="content-sum">
                    <Header title="Tổng tiền" />
                    <div className="main">
                        <div className="content-main">
                            <div className="item">
                                <div className="title">Thành tiền</div>
                                <div className="price">200.000</div>
                            </div>
                            <div className="item">
                                <div className="title">Giá chênh</div>
                                <div className="price">500.000</div>
                            </div>
                            <div className="item">
                                <div className="title">Tiền  BH chi trả</div>
                                <div className="price">500.000</div>
                            </div>
                            <div className="item">
                                <div className="title">Tổng tiền</div>
                                <div className="price ">500.000</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="button">
                <span>Hoàn thành ĐK dịch vụ</span>
                <img src={require("assets/images/welcome/save.png")}></img>
            </div>
        </Main>
    )
}
export default index;