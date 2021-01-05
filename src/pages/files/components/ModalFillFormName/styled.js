import styled from "styled-components";
import { Modal } from "antd";

export const Main = styled(Modal)`
  & .ant-modal-body {
    padding: 20px;
    & canvas {
      border: 0.5px solid #125872;
      box-sizing: border-box;
      border-radius: 4px;
      height: 200px;
    }
  }
  .modal-des {
    color: #333;
    & p {
      margin-bottom: 0;
    }
    & .content-des {
      font-weight: 500;
    }

    & .ant-form-item-control-wrapper {
      flex: 1;
    }
    & .title-des {
      font-weight: bold;
      font-size: 18px;
      line-height: 23px;
      color: #165974;
      padding-bottom: 5px;
      border-bottom: 0.5px solid #165974;
      display: flex;
      & svg {
        background: #ff4d4f;
        border-radius: 10px;
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
      & p {
        flex: 1;
      }
    }
    & .ant-row {
      min-height: 100px;
      display: flex;
      align-items: center;
    }
  }
  & .action-footer {
    margin-top: 15px;
    justify-content: center;
    display: flex;
    & button {
      margin-left: 5px;
      margin-right: 5px;
    }
  }
  & .ant-modal-footer {
    border-top: 0;
    padding: 0px;
  }
`;
