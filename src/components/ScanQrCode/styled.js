import styled from "styled-components";
import { Modal } from "antd";

export const Main = styled(Modal)`
  width: 100% !important;
  top: 0 !important;
  height: 100%;
  padding-bottom: 0px !important;
  .header {
    font-weight: bold;
    margin-bottom: 10px;
  }
  & .ant-modal-content {
    border-radius: 0;
    height: 100%;
    & .ant-modal-body {
      padding: 0;
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;
      position: relative;
    }
  }
  & video {
    height: 100%;
  }

  & .camera-container {
    width: 100%;
    height: 100%;
  }

  & .camera-footer {
    height: 100px;
    background: #00000030;
    position: absolute;
    display: flex;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & .tip {
      color: #fff;
      font-weight: bold;
    }
    & .button-close {
      margin-top: 10px;
      background: red;
      padding: 10px;
      border-radius: 25px;
      cursor: pointer;
    }
    & .button-switch {
      margin-top: 10px;
      background: #00e7f0;
      margin-left: 10px;
      padding: 10px;
      border-radius: 25px;
      cursor: pointer;
    }
  }
  & .scan-area {
    position: absolute;
  }
`;
