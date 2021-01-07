import styled from 'styled-components';
import { Row } from 'antd';
import { panel } from "components/mixin";

export const Main = styled(Row)`
    &.four-row{
        margin-top: 210px;
        // @media (max-width:1600px) {
        //     margin-top: 210px;
        // }
        @media (max-width:1200px) {
            margin-top: 210px;
        }
        .pannel {
            ${panel};
            height: 65px;
            width: 100%;
            .title{
                padding-top: 11px;
                padding-bottom: 15px;
                @media (min-width:1200px) and (max-width:1600px){
                    font-size:18px;
                }
            }
        }
        .ant-table-body{
            height: 110px;
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