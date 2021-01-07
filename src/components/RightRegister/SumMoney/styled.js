import styled from 'styled-components';
import { Col } from 'antd';
import { button } from "components/mixin";

export const Main = styled(Col)`
    &.sum-money {    
        font-family: Nunito Sans!important;
        position: relative;
        margin-top: 30px;
        height: 463px;
        position: relative;
        .line {
            position: absolute;
            top: 45px;
            width: 100%;
            height: 2px;
            background-color: #56ccf2;
        }
        .sum-money-container {
            padding: 0 30px;
            .title {
                font-weight: bold;
                font-size: 28px;
                line-height: 38px;
                color: #42526e;
            }
            .note {
                margin-top: 30px;
                font-size: 14px;
                line-height: 19px;
                color: #42526e;
                span {
                    font-weight: bold;
                }
            }
            .content-sum {
                position: relative;
                margin-top: 17px;
                .header {
                    width: 100%;
                }
                .main {
                    position: absolute;
                    display: flex;
                    flex-direction: column;
                    top: 50px;
                    border-top: solid 3px rgba(86, 204, 242, 1);
                    height: 239px;
                    width: 100%;
                    background: #ffffff;
                    border-radius: 20px 0px 20px 20px;
                    box-shadow: 0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.31);
                    padding: 19px 30px 0 30px;
                    .content-main {
                        border-radius: 20px 0px 0px 0px;
                        border-left: #d9dbe9 solid 1px;
                        .item {
                            padding: 0 10px;
                            height: 33px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            border-bottom: #d9dbe9 solid 1px;
                            .title {
                                font-weight: 600;
                                font-size: 14px;
                                line-height: 19px;
                                color: #14142b;
                            }
                            .price {
                                font-size: 14px;
                                line-height: 19px;
                                color: #14142b;
                                font-weight: 500;
                            }
                            &:last-child{
                                height: 60px;
                                border-bottom: none;
                                .title{
                                    font-size: 20px;
                                    line-height: 27px;
                                    color: #D1000C; 
                                    font-weight: 500;
                                }
                                .price{
                                    font-size: 20px;
                                    line-height: 27px;
                                    color: #D1000C; 
                                    font-weight: 500;
                                }
                            }
                        }
                    }
                }
            }
        }
        .button{
            position: absolute;
            ${button};
            bottom: -17px;
            width: 226px;
            right: 31px;
            @media (max-width:1200px){
                bottom: 20px!important;
            }
            span{
                margin-right:5px;
                font-size: 16px!important;
            }
        }
    }
`;