import styled from 'styled-components';
import { Row } from 'antd';
import { panel } from "components/mixin";

export const Main = styled(Row)`
    &.four-row{
        margin-top: 30px;
        padding: 0 30px !important;
        height: 247px;
        @media (max-width:1200px) {
            margin-top: 210px;
        }
        .pannel {
            ${panel};
            height: 65px;
            width: 100%;
            .title{
                padding: 8px 30px;
                font-weight: bold;
                font-size: 18px;
                line-height: 24px;
                color: #172B4D;
                text-align: initial;
            }
        }
        .ant-table-body{
            height: 124px;
            min-height: 124px;
            .ant-table-tbody {
                .ant-table-row {
                    cursor: pointer;
                }
            }
        }
        .ant-table-header{
            width: calc(100% + 7px);
        }
        .ant-table-container{
            tr {
                td:first-child {
                    text-align:center;
                }
            }
            tr {
                th:first-child {
                    .title-box {
                        text-align:center;
                    }
                }
            }
        }
    }
`;