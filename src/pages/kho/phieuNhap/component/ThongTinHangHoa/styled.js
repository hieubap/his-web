import styled, { createGlobalStyle } from "styled-components";
import { Table as TB, Modal as MD, Popover } from "antd";
export const Table = styled(TB)`
  .ant-table-column-title {
    position: relative;
    z-index: 1;
    margin-right: 5px;
    flex: unset;
  }
  .ant-table-column-sorters {
    align-items: center;
    justify-content: center;
  }
  .title-box {
    align-items: center;
  }
  thead {
    border-bottom: 1px solid #c5cad3;
    th {
      border-right: 1px solid #c5cad3;
    }
  }
  .level-1 {
    border-top: 1px solid #0762f7;
  }
  .level-2 {
    border-top: none;
    div{
      font-weight: normal;
    }
  }
  .box {
    span {
      width: 10px;
      height: 8px;
      border: 0.5px solid grey;
      .active {
        background-color: #0762f7;
        color: #ffffff;
      }
    }
  }
`;

export const ContentTable = styled.div`
  overflow: hidden;
  background: #ffffff;
  padding: 20px;
  border-radius: 16px;

  .ant-table-body {
    height: 100% !important;
    max-height: unset !important;
  }
`;

export const Modal = styled(MD)`
  width: 376px !important;
  height: 216px !important;
  max-width: 1200px !important;
  margin-top: -60px;
  .ant-modal-header {
    background-color: #f3f4f6;
    .title {
      h2 {
        font-size: 18px;
        margin-bottom: 0;
      }
    }
  }
  .ant-modal-body {
    padding: 0 !important;
    background-color: #f3f4f6;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .left-btn {
      padding: 5px 10px;
      border-radius: 8px;
      border-color: #7a869a;
      height: 40px;
    }
    .right-btn {
      margin-left: 10px;
      padding: 5px 10px;
      border-radius: 8px;
      height: 40px;
      background-color: #0762f7;
      color: white;
      display: flex;
      align-items: center;
      svg {
        width: 18px;
        height: 18px;
        margin-left: 5px;
      }
    }
  }
`;

export const GlobalStyles = createGlobalStyle`
  .ant-popover-arrow-content {
    width: 8px;
    height: 8px;
  }
  .dd-flex {
    display: flex;
  }
  .fd-col {
    flex-direction: column;
  }
  .fd-row {
    flex-direction: row;
  }
  .text {
    color: #172B4D;
    font-size: 1rem;
  }
  .text-bold {
    font-weight: bold;
    font-size: 1.1rem;
  }
  .space-between {
    justify-content: space-between;
  }
  ._col {
    flex: 1;
  }
  ._row {
    margin-bottom: 5px;
    >span {
      font-weight: 600;
    }
  }
  .ant-input-number {
    text-align: right;
    width: 100%;
    border: none;
    border-bottom: 1px solid #d9d9d9;
    input {
      text-align: right;
    }
  }
  .ant-input:hover,
  .ant-input:focus,
  .ant-input-number:hover,
  .ant-input-number:focus {
    box-shadow: none;
  }
  .ant-input-number-handler-wrap {
    display: none;
  }
`;

export const PopoverWrapper = styled(Popover)`
  .wide {
    width: 650px;
    border-radius: 10px;
  }
`;

export const Main = styled.div`
  
`;