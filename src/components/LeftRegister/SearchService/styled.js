import styled from 'styled-components';
import { Row } from 'antd';

export const Main = styled(Row)`
    &.main {
        position: relative;
        @media (max-width:1200px) {
            margin-top: 35px;
        }
        .ant-table-body {
            height: 453px;
            tr{
                td:first-child{
                    padding-left: 12px!important;
                }
            }
        }
        .ant-table-cell {
            font-weight: 600;
            font-size: 14px;
            line-height: 19px;
            color: #14142b;
            &:first-child{
                .title-box{
                    padding-left: 12px!important;
                }
            }
            .ant-checkbox-wrapper{
                margin-left: 5px;
            }
        }
        .ant-table-header {
            border-top: 4px solid #56ccf2;
            border-radius: 20px 0px 0px 0px;
        }
        .table {
            position: absolute;
            top: 82px;
            left: 0;
            .input-text {
                position: absolute;
                left: 221px;
                width: 358px;
                z-index: 5;
            }
            .button-choose {
                display: flex;
                position: absolute;
                left: -75px;
                @media (max-width:1200px) {
                    left: -57px;
                }
                .item {
                    cursor: pointer;
                    margin-top: 3px;
                    background: #e0e0e0;
                    border-radius: 16px;
                    font-weight: bold;
                    padding: 10px 15px;
                    font-size: 14px;
                    margin-right: 5px;
                    line-height: 19px;
                    color: #333333;
                    &:hover {
                        transition: 0.3s;
                        background-color: rgba(86, 204, 242, 1);
                        color: white;
                    }
                }
            }
            .custome-header{
                .addition-box{
                    .icon-option{
                        position: absolute;
                        right: 85px;
                        @media  (max-width:992px) {
                            right: 70px;
                            top: 2px
                        }
                    }
                }
            }
        }
    }
`;