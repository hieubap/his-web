import styled, { createGlobalStyle } from "styled-components";
import { Modal } from "antd";
export const GlobalStyle = createGlobalStyle`
  & .ant-modal-content{
      border-radius: 10px;
      padding:15px 50px 0px 50px;
      .ant-modal-body{
        padding-bottom: 5px !important;
      }
      & .title{
        font-weight: bold;
            font-size: 24px;
            line-height: 33px;
            text-align: center;
            letter-spacing: 0.01em;
            color: #172B4D;
            margin-bottom: 35px;
      }
      & .ant-form-item{
        margin-bottom: 35px !important;
      }
      & .ant-form-item-label{
          label{
            font-weight: 600;
            font-size: 13px;
            line-height: 18px;
            display: flex;
            align-items: center;
            color: #172B4D;
          }
      }
      & .ant-popover-inner{
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px !important;
      }
      & .ant-form-item-required::before{
        display: none !important;
      }
      & .ant-form-item-control-input-content{
          border-radius: 10px;
      }
      & .ant-input-affix-wrapper {
      border: none !important;
      box-shadow: none !important;
      & .ant-input-suffix{
          svg{
              fill :#1555bd;
              width: 17px;
              height: 17px;
          }
      }
    }
    & .footer {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    & .btn-ok {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0762f7;
      border-radius: 8px;
      :hover{
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), #0762F7;
      }
    }
    & .btn-cancel {
      color: #0762f7;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-left: 0px !important;
      :hover{
        color: linear-gradient(0deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), #0762F7;
      }
    }
  }
  }
  & .icon-success {
    position: absolute;
    right: -20px;
  }
`;

export const Main = styled("div")``;
export const InputSearch = styled("div")`
  display: flex;
  align-items: center;
  border-radius: 8px;
  border: ${(props) =>
    props.error
      ? "1px solid red"
      : !props.focus
      ? "2px solid #c5cad3"
      : "1px solid #0762f7 "};
  padding: 2px;
  box-shadow: ${(props) =>
    props.error
      ? "0 0 0 2px rgb(255 77 79 / 20%)"
      : !props.focus
      ? ""
      : "0 0 0 3px #0062ff47 !important"};
  transition: all 0.1s;
  :hover {
    border: ${(props) =>
      props.error ? "1px solid #red" : "1px solid #0762f7"};
    box-shadow: ${(props) =>
      props.error ? "0 0 0 2px rgb(255 77 79 / 20%)" : "0 0 0 3px #0062ff47"};
  }
  & .icon-pass {
    svg {
      height: 20px;
      width: 25px;
    }
  }
  & input {
    border: none !important;
    box-shadow: none !important;
    :hover {
      border: none !important;
      box-shadow: none !important;
    }
    :focus {
      border: none !important;
      box-shadow: none !important;
    }
  }
`;
