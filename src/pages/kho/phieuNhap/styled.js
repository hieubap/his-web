import styled from "styled-components";
import { Table as TB } from "antd";
export const Main = styled.div`
  background: #f4f5f7;
  min-height: 100vh;
  font-size: 14px;
  .d-flex {
    display: flex;
  }
  .flex-end {
    justify-content: flex-end;
  }
  .text-right {
    text-align: right;
  }
  .pointer {
    cursor: pointer;
  }
  h2 {
    font-size: 20px;
  }
  .pl-1 {
    padding-left: 0.5em;
  }
  .pl-2 {
    padding-left: 1em;
  }
  .pr-2 {
    padding-right: 1em;
  }
  .pt-2 {
    padding-top: 1em;
  }
  .pr-4 {
    padding-right: 2em;
  }
  .text-blue {
    color: #0762f7;
  }
  .border-top {
    border-top: 1px solid #c5cad3;
    border-bottom: none;
  }
  .search-select {
    background: #ffffff;
    border: 2px solid #dfe1e6;
    box-sizing: border-box;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    .ant-select-open {
      border: none;
    }
    .ant-select-selector {
      border: none;
      box-shadow: none !important;
      .ant-select-selection-item {
        font-weight: 600;
        line-height: 30px;
        color: #172b4d;
      }
      &:focus {
        border: none;
        box-shadow: none;
      }
      &::placeholder {
        color: #7a869a;
      }
    }
  }
  .input-search {
    background: #ffffff;
    border: 2px solid #dfe1e6;
    box-sizing: border-box;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 5px 8.5px;

    input {
      padding: 0 1em 0 8.5px !important;
      border: none;
      border-radius: 50px;
      font-weight: 600;
      font-size: 14px;
      line-height: 19px;
      color: #172b4d;
      &:focus {
        border: none;
        box-shadow: none;
      }
      &::placeholder {
        color: #7a869a;
      }
    }
    .icon-search {
      height: 15px;
    }
  }
  .close-icon {
    margin-left: 6px;
    color: #7a869a;
    cursor: pointer;
  }
  .space-between {
    justify-content: space-between;
  }
  .screen {
    width: 100%;
    background-color: white;
    border-radius: 10px;
    .title {
      padding: 20px;
      padding-bottom: 8px;
      border-bottom: 1px solid #0762f7;
      .row-title {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        &:last-of-type {
          margin-bottom: 5px;
        }
      }
    }
    .left-content {
      .table-title {
        display: flex;
        padding: 10px;
        justify-content: space-between;

        .search {
          display: flex;
        }
      }
      table {
        border-right: 1px solid #ccd1d8;
        border-collapse: collapse;

        .ant-table-cell {
          background-color: white;
          color: #03317c;
          font-weight: bold;
          padding: 8px;
        }
        .none-border-top {
          border-top: none;
        }
        th {
          border-top: 1px solid #c5cad3;
        }
        td {
          background-color: white;
          border-right: none;
          border-bottom: none;
        }
        input,
        .ant-picker,
        .ant-select-selector {
          border-top: none;
          border-right: none;
          border-left: none;
        }
      }
    }
  }
  .ant-row {
    width: 100%;
  }
  .left {
    > div {
      margin-right: 15px !important;
    }
  }
  .right {
    > div {
      margin-left: 15px !important;
    }
  }
  ._row {
    > span {
      font-weight: 600;
    }
  }
  .ant-table-column-sorters {
    justify-content: center;
    & > span:first-of-type {
      flex: unset;
      margin-right: 5px;
    }
  }
  .title-box {
    align-items: center;
  }
`;

export const TTPhieuNhap = styled.div`
  padding: 10px;
  border-left: 1px solid #ccd1d8;
  .left-btn {
    float: right;
    padding: 10px;
    border-radius: 8px;
    height: 40px;
  }
  .right-btn {
    float: right;
    padding: 10px;
    border-radius: 8px;
    height: 40px;
  }
`;

export const ChiTietTTPhieuNhap = styled.div`
  padding: 20px;
  border-left: 1px solid #ccd1d8;
  font-size: 14px;
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
  label {
    margin-bottom: 16px;
  }
  .footer-btn {
    display: flex;
    justify-content: flex-end;
  }
  img {
    margin-left: 10px;
  }
`;

export const Table = styled(TB)`
  .level-1 {
  }
  .level-2 {
    border-top: none;
  }
`;
