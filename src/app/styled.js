import styled, { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`

  body{
    position: relative;
  }
   & .ant-message {
    position: fixed;
    top: calc(100vh - 10px);
    right: 5px;
      .ant-message-notice-content{
        box-shadow: none;
        background: none;
        padding:5px 16px;
      }
      .ant-message-custom-content{
        min-width: 290px;
      }
      & .ant-message-notice{
        position: absolute;
        bottom: 0;
        right: 0;
        .ant-message-error{
        border-radius: 5px;
        color: #fff;
        padding: 15px;
        background: #fc3b3a;
        &:hover{
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        }
      }
      .ant-message-success{
        border-radius: 5px;
        border: 5px;
        color: #fff;
        padding: 15px;
        background: #049254;
        &:hover{
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        }
      }
      .ant-message-warning{
        border-radius: 5px;
        border: 5px;
        color: #fff;
        padding: 15px;
        background: #fe8803;
        &:hover{
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        }
      }
        svg{
            fill: #fff;
          }
        }
    }
`;
export const Main = styled("div")`
  & .app-header {
    background-color: #125872;
    height: 60px;
  }

  & .language-contain {
    display: flex;
    align-items: center;
  }

  & .language-title {
    color: rgba(255, 255, 255, 0.85);
    margin-left: 6px;
  }

  & .app-sider {
    background-color: #094359;

    & .ant-layout-sider-trigger {
      background-color: #125872;
    }
  }

  & .inpatient-sider {
    background-color: transparent;
  }

  & .layout-header {
    border-bottom: 3px solid #dedede;
  }
  & .ant-layout-content {
    height: calc(100vh - 60px);
  }

  .transition-ease {
    transition: all 0.3s ease;
    will-change: auto;
  }

  .d-flex {
    display: flex;
  }

  .justify-content-center {
    justify-content: center;
  }

  .align-items-center {
    align-items: center;
  }

  .justify-content-flex-end {
    justify-content: flex-end;
  }

  .justify-content-flex-start {
    justify-content: flex-start;
  }

  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }
`;
