import styled from "styled-components";
import { Modal } from "antd";

export const ModalWrapper = styled(Modal)`
  min-width: 1360px;
  .sign-wrapper {
    padding: 10px;
  }
  .btn-sign {
    display: none;
    z-index: 101;
    position: absolute;
    top: 30%;
    border-radius: 5px 0 0 5px;
    border-right: 0px;
    box-shadow: -2px 0px 6px #d6d6d630;
    right: 0;
  }
  @media screen and (max-width: 991px) {
    min-width: 90%;
    .react-pdf__Document {
      overflow: auto !important;
    }
    .btn-sign {
      display: block;
    }
    .sign-wrapper {
      position: absolute;
      z-index: 100;
      top: 0;
      right: 0;
      width: 0;
      opacity: 0;
      height: 0;
      overflow: hidden;
      background: rgba(255, 255, 255);
      transition: width 0.3s, opacity 0.3s;
      &.actived {
        width: 100%;
        height: 100%;
        display: block;
        opacity: 1;
      }
    }
  }
  @media screen and (max-width: 1360px) {
    min-width: 98%;
  }
`;

export const Main = styled.div`
  .ant-card-body {
    padding: 0;
  }
  #pdfDocument {
    height: 670px;
    width: 840px;
    margin: auto;
    display: block;
  }

  .pdf-view {
    border: 1px solid #ddd;
    padding: 10px;
    border-top: 0;
    border-bottom: 0;
  }
  canvas.react-pdf__Page__canvas {
    /* width: 788px !important;
    height: 920px !important; */
    margin: auto;
  }
  .action {
    display: flex;
    align-items: center;
    padding: 10px;
    justify-content: flex-end;

    .pager {
      padding: 0 6px;
    }
    .previous,
    .next{
      font-size: 14px;
      cursor: pointer;
      width: 24px;
      height: 24px;
      background: #20D0CE;
      margin: 2px;
      color: #FFF;
      display: inline-block;
      border-radius: 12px;
      text-align: center;
      line-height: 1.3;
    }
    span.divider {
      margin-left: 12px;
    }
    .divider-right {
      margin-right: 12px;
    }
  }
  .react-pdf__Document {
    background-color: #000;
    padding: 10px;
    border: 1px solid #ddd;
    padding: 10px;
    border-top: 0;
    border-bottom: 0;
    height: calc(100vh - 260px);
    overflow: auto;
  }

  .history-list {
    padding-top: 15px;
  }
  .sign-container {
    .title-sign
    padding: 10px;
    .item-btn {
      width: 100%;
      margin-bottom: 20px;
      font-weight: bold;
      & .anticon
      {
        vertical-align: 0;
      }
    }
  }
  .ant-tree li .ant-tree-node-content-wrapper {
    height: auto;
    width: 100%;
  }
`;
