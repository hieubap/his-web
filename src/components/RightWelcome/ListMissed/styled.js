import styled from 'styled-components';
import { Col } from 'antd';
import { panel } from "components/mixin";

export const Main = styled(Col)`
    .pannel {
        ${panel};
        height: 65px;
        width: 100%;
        @media (max-width:1600px) {
            margin-top: 30px;
        }
        .title {
            padding-top: 11px;
            padding-bottom: 4px;
        }
    }
    .ant-table-body{
        height: 110px;
    }
    @media (max-width:1200px)  {
        .ant-table-container{
            tr{
                td:first-child{
                        text-align:center;
                    }
            }
            tr{
                th:first-child{
                    .title-box {
                        text-align:center;
                    }
                }
            }
        }
    }  
`;