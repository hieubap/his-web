import styled from "styled-components";
import { Popover } from "antd";

export const Main = styled.div`
  .content-popover {
    max-width: 290px;
    .ant-select {
      width: 100%;
      border-bottom: 1px solid #d9d9d9;
      height: 40px;
      & .ant-select-selection-overflow {
        flex-wrap: unset;
        overflow: hidden;
        padding-top: 10px;
      }
    }
    .date {
      border-bottom: 1px solid #d9d9d9;
      position: relative;
      margin-top: 10px;
      .title{
        font-size:11px;
        /* top: -10px;
        position: absolute; */
      }
      .ant-picker {
        width: 100%;
        /* height: 40px; */
        padding: 10px 0px 0px 0px;
        .ant-picker-borderless {
          border-bottom: 1px solid #d9d9d9;
        }
      }
      label {
        /* padding-top: 5px; */
      }
      .ant-picker-active-bar {
        opacity: 0;
      }
      .ant-picker-input:first-child{
        width:150px
      }
    }
    .ant-input {
      padding: 10px 0px 0px 0px;
      border-bottom: 1px solid #d9d9d9;
      width: 100%;
      height: 40px;
    }

    .ant-select.ant-select-borderless.ant-select-single.ant-select-allow-clear.ant-select-show-arrow.ant-select-show-search {
      padding-top: 10px;
      padding-left: 0px;
    }
    .ant-select-show-search.ant-select:not(.ant-select-customize-input)
      .ant-select-selector {
      padding: 0px !important;
    }
    .ant-select-multiple .ant-select-selection-placeholder {
      top: 70%;
      right: 0;
      left: 0;
    }
    .btn-search {
      display: flex;
      padding-top: 15px;
      .ant-btn {
        margin-left: auto;
        background: #0762f7;
        border: 1px solid rgba(0, 0, 0, 0.103176);
        box-sizing: border-box;
        border-radius: 8px;
        width: 91px;
        color: #fff;
        font-family: Lato;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 17px;
      }
      img {
        padding-right: 10px;
      }
    }
  }
`;

export const PopoverStyled = styled(Popover)``;
