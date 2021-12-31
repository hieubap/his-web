import styled from "styled-components";
import { Row } from "antd";

export const Main = styled(Row)`
  .ant-modal {
    .ant-modal-confirm {
      .ant-modal-confirm-confirm {
        .notification {
          .ant-modal-content {
            width: 100px !important;
            .ant-modal-body {
              .ant-col {
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
  .notification {
    width: 100px !important;
  }

  &.main {
    position: relative;
    margin-left: 15px;
    .box {
      &-item {
        .ant-checkbox-inner {
          border-color: #b9b9b9;
        }
      }
    }
    .header {
      height: 40px;
      background-color: #ffffff;
      margin-top: 20px !important;
      padding: 0 16px 0 16px !important;
      .content {
        color: #172b4d;
      }
      .content-note {
        display: flex;
        .ant-select {
          margin-right: 6px;
          .ant-select-selector {
            border-radius: 4px;
            width: 250px;
            display: block;
            @media (max-width: 768px) {
              width: 180px;
            }
            .ant-select-selection-item {
              font-weight: 600;
              line-height: 30px;
              color: #172b4d;
            }
            .ant-select-selection-placeholder {
              color: #7a869a;
              font-weight: 600;
            }
          }
        }
        .input-text {
          img {
            position: absolute;
            z-index: 6;
            bottom: 22px;
            margin-left: 10px;
          }
          .ant-input {
            background: #ffffff;
            border-radius: 4px;
            font-size: 14px;
            line-height: 22px;
            color: #172b4d;
            font-weight: 600;
            padding-left: 36px;
            width: 254px;
            @media (max-width: 768px) {
              width: 200px;
            }
            &::placeholder {
              color: #7a869a;
            }
          }
        }
        .icon-option {
          padding: 5px 0 0 14px;
          & img {
            cursor: pointer;
          }
          & img:first-child {
            padding-right: 16px;
            transform: scale(.8);
          }
        }
      }
    }
    .table {
      margin-top: -12px;
      border-radius: 0 0 8px 8px;
      box-shadow: 0px 0px 15px rgb(9 30 66 / 7%);
      .ant-table {
        box-shadow: none;
        .ant-table-container {
          .ant-table-body {
            min-height: 360px;
            height: calc(100vh - 360px);
            max-height: unset !important;
            tr {
              td:first-child {
                padding-left: 12px !important;
              }
            }
            .box-item {
              .ant-checkbox {
                input:focus + span {
                  border: 1px solid #1890ff;
                  border-color: #1890ff;
                }
              }
            }
            .ant-table-tbody {
              .ant-table-cell {
                border-top: none !important;
                border-bottom: none !important;
                font-weight: 400;
                font-size: 13px;
                line-height: 115%;
                padding: 10px !important;
                &:first-child {
                  .title-box {
                    padding-left: 12px !important;
                  }
                }
                .ant-checkbox-wrapper {
                  margin-left: 5px;
                }
              }
              .background-checked {
                background: #1c8aea47;
              }
              .background-hover {
                background: #c1f0db;
              }
              > tr.ant-table-row:hover > td {
                background: #c1f0db !important;
                cursor: pointer;
              }
            }

            @media screen and (min-width: 1921px) {
              height: calc(100vh - 400px) !important;
            }
            @media screen and (min-width: 1661px) and (max-width: 1920px) {
                height: calc(100vh - 360px) !important;
            }
            @media screen and (min-width: 1441px) and (max-width: 1660px) {
                height: calc(100vh - 380px) !important;
            }
            @media screen and (min-width: 1367px) and (max-width: 1440px) {
                height: calc(100vh - 370px) !important;
            }
          }
          .ant-table-header {
            border-top: 2px solid rgba(224, 224, 224, 1);
            border-radius: 0;
            table::before {
              border-top: 1px solid rgba(224, 224, 224, 1);
              display: none;
            }
            .ant-table-thead {
              .ant-table-cell {
                &:before {
                  display: none;
                }
              }
              > tr > th {
                background: #ffffff !important;
              }
            }
          }
        }
      }
    }
    .ant-pagination {
      margin-left: auto;
    }
  }
  .custome-header .title-box {
    padding: 1px 2px;
    font-weight: bold;
    font-size: 14px;
    align-items: center;
    justify-content: center;
    display: flex;
    line-height: 16px;
    color: #03317C;
    border-bottom: none;

    /* @media (min-width: 1440px) {
      padding: 5px 7px;
    } */
  }
`;
