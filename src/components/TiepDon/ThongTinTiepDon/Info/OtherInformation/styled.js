import styled from 'styled-components';
import { Row } from 'antd';

export const Main = styled(Row)`
    transition: height 2s;
    .ant-col {
        padding: 0;
        padding-left: 0 !important;
        padding-right: 5px;
        margin-bottom: 0;
        &:last-of-type {
            padding-right: 0;
        }
    }
    /* margin-top: 30px; */
    .flame {
        position: relative;
        z-index: 0;
        border-radius: 20px 20px 20px 20px;
        box-shadow: 0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.31);
        width: 100%;
        background: #ffff;
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
    .info-main-bottom-mini {
        position: relative;
        z-index: 5;
        padding: 0 8px;
    }
    .button-clear {
        margin-bottom: 10px;
        margin-top: 4px;
        cursor: pointer;
        width: 100%;
        font-weight:600;
        letter-spacing: 0.75px;
        color: #0762F7;
        line-height: 19px;
        font-size: 14px;
        text-align: center;
        .icon {
            width: 12px;
            height: 7.5px;
            margin-left: 5px;
        }
        &:focus {
            width: 600px;
        }
    }
    .transition {
        transition: height 2s ease;
    }
`;