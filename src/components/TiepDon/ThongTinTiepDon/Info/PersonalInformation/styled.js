import styled, { createGlobalStyle } from 'styled-components';
import { Col, Row } from 'antd';
import { displayFlex, checkbox } from "components/mixin";

export const GlobalStyle = createGlobalStyle`
    .ant-modal {
        top: 50px;
        @media(min-width: 1400px) {
            top: 100px;
        }
    }
`;

export const Main = styled(Row)`
    @media (max-width: 1200px) {
        padding-right: 0;
    }
    .frames {
        border-radius: 20px 20px 20px 20px;
        box-shadow: 0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.31);
        background: #ffff;
        .ant-col {
            padding: 0;
            padding-right: 5px;
            margin-bottom: 0;
            &:last-of-type {
                padding-right: 0;
            }
        }
        .left {
            position: relative;
            z-index: 0;
            /* &::before {
                position: absolute;
                content: "";
                width: 100%;
                height: 100px;
                top: 43px;
                background-color: white;
                z-index: 1;
                border-radius: 20px 0 0 0;
                border-top: solid 3px #EF4066;
            } */
        }
        .row-name {
            padding: 0 8px;
            .ant-col {
                padding: 0;
                padding-right: 5px;
                margin-bottom: 0;
                &:last-of-type {
                    padding-right: 0;
                }
                .checkbox{
                    ${checkbox};
                    margin-bottom: 29px;
                }
                .optimize {
                    position:relative;
                    .icon {
                        position: absolute;
                        right: -5px;
                        bottom: 49px;
                        width: 44px;
                        height: 44px;
                    }
                    .text {
                        margin-top: 8px;
                        font-weight: bold;
                        font-size: 16px;
                        line-height: 22px;
                        text-align: center;
                        color: #172B4D;
                    }
                    .image {
                        height: 150px;
                        width: 100%;
                        object-fit: cover;
                        border-radius: 10px;
                        @media (max-width:1440px) {
                            height: 125px;
                        }
                        @media (max-width:1024px) {
                            height: 220px;
                        }
                        @media (max-width:768px) {
                            height: 180px;
                        }
                    }
                }
                .avatar-no-drop {
                    cursor: no-drop;
                }
            }
        }
    }
    .button-clear {
        cursor: pointer;
        width: 100%;
        font-weight:600;
        margin-bottom: 10px;
        letter-spacing: 0.75px;
        text-align: center;
        margin-top: 4px !important;
        color: #0762F7;
        line-height: 19px;
        font-size: 14px;
        .icon {
            width: 12px;
            height: 7.5px;
            margin-left: 5px;
        }
    }
`;