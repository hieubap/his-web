import styled from 'styled-components';
import { Row } from 'antd';
import { displayFlex, input, itemInfo, select } from "components/mixin";

export const Main = styled(Row)`
    margin-top: 30px;
    .flame {
        position: relative;
        z-index: 0;
        border-radius: 20px 20px 20px 20px;
        box-shadow: 0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.31);
        width: 100%;
        &::before {
            position: absolute;
            content: "";
            width: 100%;
            height: 100px;
            top: 54px;
            background-color: white;
            z-index: 1;
            border-radius: 20px 0 0 0;
            border-top: solid 3px #56ccf2;
        }
    }
    .info-main-bottom-mini {
        position: relative;
        z-index: 5;
        padding: 0 30px;
        .first-col {
            padding-right: 15px;
            @media (max-width: 1600px) {
                padding-right: 0;
            }
            .item {
                margin-top: 15px;
                ${itemInfo};
                .input {
                    ${input};
                    &-grey {
                        ${input};
                    }
                }
                &:first-child {
                    margin-top: 0;
                }
            }
        }
        .second-col {
            padding-left: 15px;
            @media (max-width: 1600px) {
                padding-left: 0;
            }
            .item {
                margin-top: 15px;
                ${itemInfo};
                .input {
                    ${input};
                }
                .select {
                    ${select};
                }
                &:first-child {
                    margin-top: 0;
                }
                @media (max-width: 1600px) {
                    margin-top: 15px!important;
                }
            }
        }
    }
    .button-clear {
        margin-bottom: 10px;
        cursor: pointer;
        width: 100%;
        ${displayFlex("center", "center")};
        margin-top: 15px;
        font-weight:600;
        letter-spacing: 0.75px;
        color: #2f80ed;
        .icon {
            width: 12px;
            height: 7.5px;
            margin-left: 5px;
        }
    }
    .hidden-ttbs {
        display: none;
    }
`;