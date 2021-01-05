import styled from 'styled-components';
import { Row } from 'antd';
import { panel } from "components/mixin";

export const Main = styled(Row)`
    margin-top: 30px;
    @media (max-width:1600px) {
        margin-top: 190px;
    }
    .pannel {
        ${panel};
        height: 65px;
        width: 100%;
        .title {
            padding-top: 11px;
            padding-bottom: 15px;
        }
    }
    .ant-table-container {
        tr {
            td:first-child {
                    padding-left:12px!important;
                }
        }
        tr {
            th:first-child {
                .title-box {
                    padding-left:12px;
                }
            }
        }
    }
    @media (max-width:1200px) {
        .ant-table-container {
            tr {
                td:first-child {
                        text-align:center;
                    }
            }
            tr {
                th:first-child{
                    .title-box{
                        text-align:center;
                    }
                }
            }
        }
    }
`;