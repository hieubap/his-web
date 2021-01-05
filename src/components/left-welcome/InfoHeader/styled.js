import styled from 'styled-components';
import { Row } from 'antd';
import { item, input, select, displayFlex, button, date } from "components/mixin";

export const Main = styled(Row)`
    margin-top: 30px;
    & .avatar {
        padding-right: 5px;
        position: relative;
        &__image {
            position: absolute;
            width: 200px;
            height: 200px;
            right: 0;
            top: 0;
            border-radius: 6px;
            cursor: pointer;
        }
        &__icon {
            position: absolute;
            right: 6px;
            top: 149px;
            width: 44px;
            height: 44px;
        }
        @media screen and (max-width: 1200px) {
            &__image {
                right: 25%;
            }
            &__icon {
                right: 27%;
            }
        }
    }
    .main__first {
        padding: 15px 15px 0 35px;
        .order {
            font-weight: normal;
            font-size: 24px;
            line-height: 25px;
            color: white;
            span {
                padding: 2px 11px;
                font-weight: 900;
                margin-left: 11px;
                font-size: 24px;
                line-height: 40px;
                border: white 1px dashed;
            }
            @media screen and (max-width: 1600px) {
                font-size: 18px;
                span {
                    padding: 1px 10px;
                    font-weight: 900;
                    margin-left: 11px;
                    font-size: 18px;
                    line-height: 40px;
                    border: white 1px dashed;
                }
            }
        }

        .item__first {
            ${item};
            margin-top: 17px !important;
            &-input {
                ${input};
            }
        }
        .item__second {
            ${item};
            &-select {
                ${select};
            }
        }
        @media screen and (max-width: 1199px) {
            padding: 15px 15px 0 35px;
        }
    }
    .main__second {
        padding: 0 15px;
        ${displayFlex("start", "start")};
        flex-direction: column;
        .item {
            ${item};
            &:first-child {
                margin-top: 0;
            }
            &__date {
                ${date};
            }
            &__input {
                ${input};
            }
            &__select {
                ${select};
                .ant-select-selector {
                    &::placeholder {
                        color: rgba(51, 51, 51, 1);
                    }
                }
            }
        }
        @media screen and( max-width:1199px ) {
            margin-top: 12px;
        }
    }
    .main__third {
        margin-top: 20px;
        padding: 0 15px;
        .button {
            ${displayFlex("space-between", "flex-start")};
            &-first {
                width: 152px;
                height: 37px;
                ${button};
            }
            &-second {
                width: 152px;
                height: 37px;
                ${button};
            }
            @media screen and (min-width: 1200px) and (max-width: 1600px) {
                &-first {
                    width: 80px;
                    font-size: 10px;
                }
                &-second {
                    width: 80px;
                    font-size: 10px;
                }
            }
        }
        .text {
           ${displayFlex("flex-start", "flex-start")};
            flex-direction: column;
            ${item}
            &-content {
                margin-top: 5px;
                width: 100%;
                height: 73px;
                font-size: 14px;
                font-weight: 600;
            }
        }
        .box {
            margin-top: 12px;
            &-item {
                font-weight: 700;
                color: white;
                font-size: $fontSize-text;
                .ant-checkbox-inner {
                    width: 16px;
                    height: 16px;
                    border-color: white;
                }
            }
            @media screen and (min-width: 1200px) and (max-width: 1600px) {
                .ant-checkbox-wrapper {
                    margin-left: 0 !important;
                    margin-top: 5px;
                    font-size: 10px !important;
                }
                .ant-checkbox-inner {
                    width: 14px;
                    height: 14px;
                    border-color: white;
                }
            }
        }
        @media screen and (max-width: 1199px) {
            padding: 15px 15px 0 35px;
            .button {
                &-second {
                    margin-top: 0;
                }
            }
        }
    }
`;