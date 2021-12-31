import styled, { createGlobalStyle } from "styled-components";
import { Row } from "antd";
export const GlobalStyle = createGlobalStyle`
  .ant-message {
    position: fixed;
    top: calc(100vh - 10px);
    right: 10px;
}
  body{
    position: relative;
  }
`;
export const Main = styled(Row)`
  position: relative;
  width: 100%;
  overflow: hidden;
  height: calc(100vh - 50px);
  .body {
    background: #f4f5f7;
    font-family: "Nunito Sans" !important;
    position: relative;
  }
  .bg-color {
    background: #f4f5f7;
  }
`;
