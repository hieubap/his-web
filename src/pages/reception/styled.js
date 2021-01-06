import styled from 'styled-components';
import { Row } from 'antd';

export const Main = styled(Row)`
    & .ant-input-disabled{
        background-color: #DFE1E6;
    }
    & .ant-picker-disabled{
        background-color: #DFE1E6;
    }
    & .ant-select-disabled.ant-select:not(.ant-select-customize-input) .ant-select-selector{
        background-color: #DFE1E6;
    }
    & .line {
        width: 100%;
        border: #56ccf2 solid 1px;
        position: absolute;
        z-index: 3;
        top: 59px;
    }
    & .background {
        position: absolute;
        img {
            width: 100%;
            height: 315px;
            @media screen and (max-width: 1199px) {
                height: 527px;
            }
        }
    }
    & .bg-color{
            background-color: #E9F3FC;
    }
    ::-webkit-scrollbar{
        display: none!important;
        }
`;