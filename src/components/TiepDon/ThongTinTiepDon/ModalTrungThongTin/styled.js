import { Modal } from "antd";
import styled from "styled-components";
import { button, displayFlex } from "components/mixin";

export const Main = styled(Modal)`
  font-family: Nunito Sans, sans-serif !important;
  width: 100% !important;
  max-width: calc(100vw - 100px);
  .ant-modal-content {
    border-radius: 10px;
    .ant-modal-body {
      padding: 0px;
      .header {
        padding: 24px 24px 0px;
        display: flex;
        .title {
          font-weight: bold;
          font-size: 28px;
          line-height: 38px;
          color: #42526E;
        }
        .button {
          margin-left: auto;
          .ant-btn {
            border: 1px solid #0762F7;
            box-shadow: 0px 3px 0px #03317c;
            border-radius: 8px;
            padding: 6px 32px;
            font-weight: 600;
            font-size: 16px;
            line-height: 20px;
            height: 36px;
          }
          .cancel {
            margin-right: 15px;
          }
          .ok {
            background: #0762F7;
            color: #fff;
          }
        }
      }
      .table {
        .ant-table-fixed-header {
          border: none;
          box-shadow: none;
        }
      }
    }
  }
  .ant-modal-footer {
    display: none;
  }
  .ant-table-container {
    .ant-table-header {
      .ant-table-thead {
        .ant-table-cell {
          .custome-header {
            background: none !important;
            .title-box {
              font-weight: bold;
              font-size: 14px;
              line-height: 16px;
              color: #0345b0;
            }
            .addition-box {
              border-right: 1px solid #d9dbe9 !important;
              margin: 5px 0 !important;
              height: 36px !important;
              .input-box {
                height: 36px !important;
                min-height: 36px !important;
                input {
                  margin-top: 0 !important;
                }
                .ant-input:focus, .ant-input-focused {
                  box-shadow: none !important;
                }
              }
            }
          } 
        }
      }
    }
    .ant-table-body {
      border-radius: 0 !important;
      margin-bottom: 20px;
      .ant-table-tbody {
        .ant-table-measure-row {
          td {
            padding: 0 !important;
          }
        }
        .ant-table-row {
          .ant-table-cell {
            padding: 25px 6px !important;
            &:hover {
              background: linear-gradient(
                0deg
                , rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #0762F7;
            }
          }
          &:nth-child(2n) {
            background: rgba(23, 43, 77, 0.05);
          }
        }
      }
    }
  }
`;
