import styled from "styled-components";
import { date, input } from "components/mixin";

export const Main = styled.div`
  .form-custom-button {
    margin: 0 20px 20px 0;
  }
  .ant-col {
    .item-date {
      ${date};
    }
  }
  & .tab-main {
    & .ant-tabs {
      & .ant-tabs-nav {
        background: linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.5)
          ),
          #0762f7;
        box-shadow: 0px 0px 15px rgb(9 30 66 / 7%);
        border-radius: 16px 16px 0px 0px;
        margin-bottom: 0px !important;
        &::before {
          border: 0px !important;
        }
        .ant-tabs-nav-list {
          height: 55px;
          margin-left: 20px;
          padding-top: 20px;
          .ant-tabs-ink-bar {
            background: #fff !important;
            display: none;
          }
          .ant-tabs-tab {
            background: #0762f7;
            border-radius: 8px 8px 0px 0px;
            padding: 0 !important;
            .ant-tabs-tab-btn {
              color: #fff !important;
              padding: 6px 16px 6px 16px !important;
              font-style: normal !important;
              font-weight: 500 !important;
              font-size: 14px !important;
            }

            margin: 0px 0px 0px 10px;
          }
          .ant-tabs-tab-active {
            background: #fff !important;
            border-top: 2px solid red;
            .ant-tabs-tab-btn {
              color: #172b4d !important;
            }
          }
        }
      }
      .ant-tabs-content {
        border-left: 2px solid #dfe1e6;
        border-right: 2px solid #dfe1e6;
        border-bottom: 2px solid #dfe1e6;
        border-bottom-left-radius: 17px;
        border-bottom-right-radius: 17px;
      }
    }
  }
  .ant-table-header {
    .ant-table-thead {
      .custome-header {
        .addition-box {
          padding: 0 5px;
          margin: 3px 0;
          min-height: 33px;
          background: #ffffff;
          .input-box {
            border-radius: 17px;
            position: relative;
            height: 32px !important;
            img {
              position: absolute;
              top: 29%;
              left: 0;
              z-index: 1;
              padding: 0 8px;
            }
            input {
              &::placeholder {
                font-weight: 600;
                font-size: 14px;
                color: #7a869a;
              }
            }
          }
          .ant-picker {
            height: 32px !important;
            input {
              &::placeholder {
                font-weight: 600;
                font-size: 14px;
                color: #7a869a !important;
              }
            }
          }
        }
      }
    }
    .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input)
      .ant-select-selector {
      border-color: #aed2f2 !important;
      border-right-width: 1px !important;
      outline: 0;
      box-shadow: 0 0 0 0px;
    }
  }
`;
