import { Modal } from "antd";
import styled from "styled-components";
import { button } from "components/mixin";

export const Main = styled(Modal)`
  font-family: Nunito Sans, sans-serif !important;
  border-radius: 6px;
  overflow: hidden;
  .ant-modal-content {
    border-radius: 6px;
    min-height: 86vh;
    .ant-modal-body {
      padding: 0px;
      .container {
        padding: 0px;
        .header {
          width: 100%;
          display: flex;
          padding: 8px 15px;
          text-align: left;
          border-bottom: 1px solid #b6b6b6;
          justify-content: space-between;
          h3 {
            color: #172B4D;
            font-weight: 700;
            font-size: 15px;
            line-height: 24px;
          }
          .title {
            margin-bottom: 0;
          }
          .closeIcon {
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }
        }
        .modal-content {
          position: relative;
          z-index: 5;
          padding: 10px;
        }
      }
    }
    .ant-modal-footer {
      display: none;
    }
  }
  .bg {
    background: #FFFFFF;
    box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
    border-radius: 8px;
  }
  .header {
    align-items: center;
    height: 44px;
    border-bottom: 1px solid #d9dbe9 !important;
    .title {
      width: 50%;
      font-size: 16px;
      line-height: 24px;
      font-weight: 700;
      color: #172B4D;
    }
    .mode {
      width: 50%;
      display: flex;
      align-items: center;
      height: 100%;
      justify-content: flex-end;
      .ant-select {
        width: 50%;
        color: #0762F7;
        .ant-select-selector {
          border: none;
          &:hover,  &:active, &:focus {
            border: none;
          }
        }
        .ant-select-arrow {
          color: #0762F7;
        }
      }
      .ant-select-focused {
        border: none;
      }
    }
  }
  .container {
    min-height: 70vh;
  }
`;
