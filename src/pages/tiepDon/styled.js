import styled, { createGlobalStyle } from "styled-components";
import { Row } from "antd";

export const GlobalStyle = createGlobalStyle`
    .ant-modal-mask {
        z-index: 1021;
    }
    .ant-modal-wrap {
        z-index: 1022;
    }

`;

export const Main = styled(Row)`
  & * {
    font-family: "Nunito Sans";
    font-style: normal;
  }

  & .ant-input-disabled {
    background-color: #dfe1e6;
  }
  & .ant-picker-disabled {
    background-color: #dfe1e6;
  }
  &
    .ant-select-disabled.ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    background-color: #dfe1e6;
  }
  & .body {
    background: #f4f5f7;
    @media (min-width: 1400px) {
      height: calc(100vh - 60px);
    }
  }
  & .bg-color {
    background: #f4f5f7;
    padding: 20px 30px 0 0;
    @media (min-width: 1400px) {
      height: 90vh;
    }
    .line {
      background: #ffffff;
      box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
      border-radius: 12px;
    }
  }
  .view-service {
    padding: 30px 30px 30px 0px;
    .service-welcome {
      margin: 0;
    }
  }
  ::-webkit-scrollbar {
    display: none !important;
  }
  .ant-select-single .ant-select-selector .ant-select-selection-item,
  .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
    /* line-height: 20px !important; */
  }
`;
