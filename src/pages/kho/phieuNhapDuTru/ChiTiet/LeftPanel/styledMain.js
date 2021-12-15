import styled from 'styled-components';
import { button } from "components/mixin";

export const Main = styled.div`
    &.container-fluid {
        font-family: Nunito Sans !important;
        padding: 0 15px;
        background: #F4F5F7;
        height: 100vh;
        .header {
            width: 100% !important;
            margin-top: 30px;
        }
        .button-bottom {
            color: #172B4D;
            mix-blend-mode: normal;
            border: 1px solid #0762F7;
            box-shadow: 0px 3px 0px #03317c;
            border-radius: 8px;
            background: #FFFFFF;
            padding: 8px 30px;
            width: fit-content;
            position: fixed;
            bottom: 39px;
            left: 30px;
            max-width: 66.66666667%;
            z-index: 1000;
            line-height: 20px;
            font-weight: 600;
            cursor: pointer;
        }
    }
    .footer-btn {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
    }
    .left-btn {
        padding: 10px;
        border-radius: 8px;
        border-color: #7a869a;
        height: 40px;
    }
    .right-btn {
        margin-left: 10px;
        padding: 10px;
        border-radius: 8px;
        height: 40px;
        background-color: #0762f7;
        color: white;
    }
`;