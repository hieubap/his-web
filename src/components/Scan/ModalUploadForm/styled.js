import styled from "styled-components";
import { Modal } from "antd";

export const Main = styled(Modal)`
  width: 600px !important;
  & .ant-modal-body {
    padding: 20px;
    & .ant-form {
      & .ant-col {
        padding-top: 0 !important;
        padding-bottom: 0 !important;
      }
      & .ant-form-item-label {
        line-height: 20px;
        & label {
          margin-bottom: 0px !important;
        }
      }
      & .ant-form-item {
        margin-bottom: 0px !important;
        & .ant-form-item-label {
          line-height: 25px;
          & .ant-form-item-required {
            // &:before {
            //   display: none;
            // }
          }
        }
        & .ant-calendar-picker {
          width: 100%;
        }
      }
    }
    & .patient-info {
      background-color: #0af1ee1a;
      padding: 12px 24px;
      margin: 12px -24px;

      & .info-content {
        &.patient-doccument {
          color: #e03632;
          font-weight: 500;
        }
        & .patient-name {
          color: #08aaa8;
          font-weight: 500;
        }
      }
      .info-item {
        margin-top: 3px;
      }
    }
    & .file-info {
      margin-top: 10px;
      display: flex;
      & .file-name {
        flex: 1;
        color: #08aaa8;
        display: inline-block;
        width: 90%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        vertical-align: middle;
      }
      & .remove {
        color: #ff7875;
        vertical-align: middle;
      }
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
    & .title-des {
      font-weight: bold;
      font-size: 18px;
      line-height: 23px;
      color: #165974;
      padding-bottom: 5px;
      border-bottom: 0.5px solid #165974;
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
