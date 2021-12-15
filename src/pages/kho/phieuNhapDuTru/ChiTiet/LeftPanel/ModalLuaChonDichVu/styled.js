import styled, { createGlobalStyle } from "styled-components";
import { Modal as MD, Popover } from "antd";

export const Main = styled.div`
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    #0762f7;
  border-radius: 16px;
  .main__container {
    margin-top: 0px;
  }
  .title-box {
    justify-content: center;
  }
  .row-actived {
    background: #c1f0db !important;
  }
  .header {
    padding: 13px 16px;
    flex-flow: initial;
    align-items: center;
    color: #ffffff;
  }
`;

export const ContentTable = styled.div`
  overflow: hidden;
  background: #ffffff;
  border-radius: 16px;

  .ant-table-body {
    height: 100% !important;
    max-height: unset !important;
  }
`;

export const Modal = styled(MD)`
  width: 1200px !important;
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
  .ant-modal-content {
    border-radius: 15px;
    .ant-modal-body {
      border-radius: 15px;
      .ant-col {
        width: 100%;
      }
    }
  }
`;