import styled, { createGlobalStyle } from 'styled-components';
import { button } from "components/mixin";
import { Popover } from "antd";

export const PopoverWrapper = styled(Popover)``;

export const GlobalStyle = createGlobalStyle`
    .ant-popover-inner {
        background: #1b1d21;
        box-shadow: 0px 0px 20px rgba(9, 30, 66, 0.2);
        border-radius: 15px;
        height: 30px;
        }
    & .ant-popover-arrow-content {
        background-color: #1b1d21;
    }
    & .ant-popover-inner-content {
        color: #ffffff;
        padding: 4px 16px;
    }
`;

export const Main = styled.div`
    &.them-moi {
        .title {
            font-family: Nunito Sans;
            font-size: 16px;
            font-style: normal;
            font-weight: 700;
            line-height: 24px;
            letter-spacing: 0px;
            text-align: left;
            margin-left: 15px;
            margin-bottom: 15px
        }
        padding: 10px 10px 10px 14px;
        /* margin-top: 30px; */
        /* background: linear-gradient(0deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), #0762F7; */
        box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
        border-radius: 8px;
        display: flex;
        background: white;
        /* padding: 30px; */
        margin-left: 15px;
        .form-item{
            margin-bottom: 20px;
            &_address{
                width: 100%;
            }
            input {
                outline: 0;
                border-width: 0 0 1px;
                padding: 0 1em 0 8.5px !important;
                font-weight: 600;
                font-size: 14px;
                line-height: 19px;
                color: #172b4d;
                &::placeholder {
                    color: black;
                }
                &:hover{
                    border-color: unset;
                    border-right-width: 0px !important;
                }
                &:focus{
                    outline: 0;
                    border-color: unset;
                    border-right-width: 0px !important;
                    box-shadow: 0px;
                }
                /* &:not(:focus):valid{
                    &~ .floating-label{
                        top: 8px;
                        bottom: 10px;
                        left: 20px;
                        font-size: 11px;
                        opacity: 1;
                    }
                } */
            }
            /* .inputText {
            font-size: 14px;
            width: 200px;
            height: 35px;
            }

            .floating-label {
            position: absolute;
            pointer-events: none;
            left: 20px;
            top: 18px;
            transition: 0.2s ease all;
            } */
        }
    }
`;

// export const InputSearch = styled.div`
//   background: #ffffff;
//   box-sizing: border-box;
//   border-radius: 4px;
//   display: flex;
//   align-items: center;
//   padding: 5px 8.5px;
//   width: 459px;
//   input {
//     padding: 0 1em 0 8.5px !important;
//     border: none;
//     border-radius: 50px;
//     font-weight: 600;
//     font-size: 14px;
//     line-height: 19px;
//     color: #172b4d;
//     &:focus {
//       border: none;
//       box-shadow: none;
//     }
//     &::placeholder {
//       color: #7a869a;
//     }
//   }
//   .icon-search {
//     height: 15px;
//   }
//   .qr-search {
//     height: 20px;
//   }
// `;