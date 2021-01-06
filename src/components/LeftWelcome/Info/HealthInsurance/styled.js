import styled from 'styled-components';
import { displayFlex, input, itemInfo, date, select, checkbox } from "components/mixin";

export const Main = styled.div`
    position: relative;
    border-radius: 20px 20px 20px 20px;
    box-shadow: 0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.31);
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
    & .flame-right-main {
        position: relative;
        z-index: 5;
        display: flex;
        flex-direction: column;
        padding: 0 30px;
        width: 100%;
        .first-row {
            ${displayFlex("flex-start", "flex-start")};
            @media (min-width:1200px) and (max-width:1600px) {
                .percent{
                    &-right{
                        padding-left:0!important;
                    }
                    &-left{
                        padding-right:0!important;
                    }
                
                }
            }
            .item {
                position: relative;
                ${itemInfo};
                .input {
                    &-first {
                        ${input};
                    }
                    &-second {
                        ${input};
                    }
                }
                .qr-icon {
                    cursor: pointer;
                    position: absolute;
                    ${displayFlex("center", "center")};
                    top: 27px;
                    right: 8px;
                    span {
                        margin-right: 5px;
                        font-size: 16px;
                    }
                }
                .title {
                    @media (min-width: 1200px) and (max-width: 1600px) {
                        margin-top: 15px;
                    }
                }
            }
        }
        .second-row {
            position: relative;
            ${itemInfo};
            .item {
                &-first {
                    .date {
                        ${date};
                    }
                    @media (min-width: 1200px) and (max-width: 1600px) {
                        margin-top: 15px;
                    }
                }
                &-second {
                    .date {
                        ${date};
                    }
                    @media (min-width: 1200px) and (max-width: 1600px) {
                        margin-top: 15px;
                    }
                }
            }
        }
        .third-row {
            ${itemInfo};
            .item {
                &-first {
                    margin-top: 15px;
                    .inputArea {
                        ${input};
                        height: 127px;
                    }
                }
                &-second {
                    margin-top: 15px;
                    .input {
                        ${input};
                    }
                }
                &-third {
                    margin-top: 15px;
                    .select {
                        ${select};
                    }
                }
            }
        }
        .four-row {
            margin-top: 15px;
            ${displayFlex("space-between", "flex-start")};
            position: relative;
            ${itemInfo};
            .item {
                &-first {
                    .date {
                        ${date};
                    }
                }
                &-second {
                    .date {
                        ${date};
                    }
                }
            }
        }
        .five-row {
            .item {
                display: flex;
                flex-direction: column;
                .view {
                    ${checkbox};
                    margin-top: 20px;
                }
                @media (min-width: 1200px) and (max-width:1600px) {
                    .ant-checkbox-wrapper {
                        font-size: 12px;
                    }
                }
            }
        }
        .button-clear {
            cursor: pointer;
            width: 100%;
            ${displayFlex("center", "center")};
            margin-top: 14px;
            margin-bottom: 10px;
            font-weight:600;
            letter-spacing: 0.75px;
            color: #2f80ed;
            .icon {
                width: 12px;
                height: 7.5px;
                margin-left: 5px;
            }
        }
    }
    .hidden-bhyt {
        display: none;
    }
`;