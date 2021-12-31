import styled from 'styled-components';
import { Row } from 'antd';
import { input, select, date } from "components/mixin";

export const Main = styled(Row)`
    display: flex;
    position: relative;
    margin-top: 0;
    z-index: 999;
    & .info-right {
        padding-left: 15px;
        position: relative;
        @media (max-width: 1200px) {
            padding-left: 0;
        }  
    }
    .ant-col {
        padding: 0 6px;
        /* margin-bottom: 20px; */
        &:first-of-type {
            padding-left: 2px;
        }
        &:last-of-type {
            padding-right: 2px;
        }
        .item-input {
            ${input}
            margin-bottom: 14px;
        }
        .item-date {
            ${date};
            margin-bottom: 14px;
        }
        .item-select {
            ${select};
            margin-bottom: 14px;
        }
    }
    & .error {
        @media (min-width: 1440px) {
            font-size: 14px !important;
        }
    }
`;