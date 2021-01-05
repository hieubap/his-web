import styled from 'styled-components';
import { Col } from 'antd';

export const Main = styled(Col)`
    &.container {
        font-family: Nunito Sans!important;
        padding: 0 28px;
        .ant-table-header {
            border: none;
            border-radius: 20px 20px 0px 0px;
            background-color: #E0E0E0;
        }
        .ant-table-fixed-header{
            border-radius: 20px 20px 10px 10px !important;
        }
        .ant-table-cell {
            font-weight: 600;
            font-size: 14px;
            line-height: 19px;
            color: #14142b;
            padding-left: 15px !important;
            .title-box {
                padding-left: 0;
            }
        }
        .ant-table-body {
            height: 307px;
            max-height: 307px;
        }
        .title {
            margin-top: 12px;
            font-weight: bold;
            font-size: 28px;
            line-height: 38px;
            color: #42526e;
        }
        .table {
            margin-top: 30px;
            .btn-delete{
                cursor: pointer;
            }
        }
    }
`;