import styled, { createGlobalStyle } from "styled-components";
import { Popover } from "antd";

export const Main = styled.div`
  .ant-table-cell-fix-right {
    .title-box {
      justify-content: center;
    }
  }  
`;

export const InputSearch = styled.div`
  background: #ffffff;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 5px 8.5px;
  width: 459px;
  margin-left: 10px;
  border: ${(props) =>
    !props.focusInput ? "2px solid #dfe1e6" : "1px solid #0762f7 !important"};
  box-shadow: ${(props) =>
    props.focusInput ? "0 0 0 3px #0062ff47 !important" : null};
  &:hover {
    border: 1px solid #0762f7 !important;
    box-shadow: 0 0 0 3px #0062ff47 !important;
  }
  input {
    padding: 0 1em 0 8.5px !important;
    border: none;
    border-radius: 50px;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    color: #172b4d;
    &:hover {
      border: none !important;
      box-shadow: none !important;
    }
    &:focus {
      border: none !important;
      box-shadow: none !important;
    }
    &::placeholder {
      color: #7a869a;
    }
  }
  .icon-search {
    height: 15px;
  }
  .qr-search {
    height: 20px;
  }
`;

export const GlobalStyle = createGlobalStyle`
  .ant-popover-inner {
    border-radius: 20px;
    color: #172b4d;
    width: 550px;
    font-weight: 510;
  }
`;
export const PopoverWrapper = styled(Popover)``;
