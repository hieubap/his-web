import styled from "styled-components";
import { Table as TB } from "antd";
export const Main = styled.div`
  background: #f4f5f7;
  min-height: 100vh;
  font-size: 14px;
  color: #172b4d;
  
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
  .header {
    h3 {
      padding-left: 20px;
      font-weight: 700;
      font-size: 20px;
    }
  }
  .ticket {
    width: 100%;
    background-color: white;
    border-radius: 10px;
    padding: 15px;
    .title {
      padding-left: 10px;
      font-weight: 700;
      font-size: 17px;
    }
  }
  .content {
    width: 100%;
    background-color: white;
    border-radius: 10px;
    /* padding: 15px; */
    margin-top: 20px;
  }

  .footer-btn {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    padding: 20px;

    label {
      margin-bottom: 30px;
    }

    img {
      margin-left: 10px;
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
  }
`;
