import styled, { createGlobalStyle } from "styled-components";
import { Row, Popover } from "antd";

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
      .content-note {
        display: flex;
        .ant-select {
          margin-right: 10px;
        }
        .input-text {
          img {
            position: absolute;
            z-index: 6;
            bottom: 30px;
            margin-left: 10px;
          }
          .ant-input {
            background: #ffffff;
            border-radius: 17px;
            font-size: 14px;
            line-height: 24px;
            color: #172b4d;
            font-weight: 600;
            padding-left: 36px;
            width: 254px;
            border: none;
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
          }
        }
      }
    }
    .ant-table-body {
      /* height: ${(props) =>
        props.mode == "them-moi" || props.mode == "chinh-sua"
          ? 375 + "px"
          : `430px`}; */
      max-height: unset !important;
      tr {
        td {
          &:first-child {
            padding-left: 12px !important;
          }
          .ant-input,
          .ant-input-number {
            border: none;
            border-bottom: 1px solid #b9b9b9;
            text-align: end;
            box-shadow: none !important;
            color: #172b4d;
            border-radius: 2px;
          }
          .ant-input-number {
            width: 100%;
            color: #172b4d;
            & .ant-input-number-handler-wrap {
              display: none;
            }
            & .ant-input-number-input {
              text-align: right;
            }
          }
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
    }
    .ant-table-tbody {
      .ant-table-cell {
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        padding: 5px 7px !important;
        border: none !important;
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
    }
    .ant-table-tbody > tr.ant-table-row {
      &:nth-child(2n + 1) {
        background: none !important;
        /* cursor: pointer; */
      }
      &:hover > td {
        cursor: pointer;
      }
    }
    .ant-table-header {
      /* border-top: 4px solid #56ccf2; */
      border-radius: 20px 0px 0px 0px;
    }
    .table {
      margin-top: -12px;
      .ant-table {
        .ant-table-container {
          .ant-table-header {
            .ant-table-cell {
              background: white;
            }
            table::before {
              /* border-top: solid 4px #ef4066; */
              /* border-top: none; */
              border-radius: unset;
            }
          }
        }
      }
    }
    .ant-pagination {
      margin-left: auto;
    }
  }
  .search-select {
    background: #ffffff;
    border: 2px solid #dfe1e6;
    box-sizing: border-box;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    margin-left: 10px;
    .ant-select-open {
      border: none;
    }
    .ant-select-selector {
      border: none;
      width: 300px;
      box-shadow: none !important;
      &:focus {
        border: none;
        box-shadow: none;
      }
      &::placeholder {
        color: #7a869a;
      }
    }
  }
  .note-input {
    border: none !important;
    background-color: #ffffff;
    text-align: left !important;
    color: #172b4d;
    padding: 0;
  }
  .ant-table-row:hover > input {
    background-color: #fafafa !important;
    background: #fafafa !important;
  }
`;

export const InputSearch = styled.div`
  background: #ffffff;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 5px 8.5px;
  width: 459px;
  margin-left: 10px;
  border: ${(props) =>
    !props.focusInput ? "2px solid #dfe1e6" : "1px solid #0762f7 !important"};
  box-shadow: ${(props) =>
    props.focusInput ? "0 0 0 3px #0062ff47 !important" : null};
  &:hover {
    border: 1px solid #0762f7 !important;
    box-shadow: 0 0 0 3px #0062ff47 !important;
  }
  input {
    padding: 0 1em 0 8.5px !important;
    border: none;
    border-radius: 50px;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    color: #172b4d;
    &:hover {
      border: none !important;
      box-shadow: none !important;
    }
    &:focus {
      border: none !important;
      box-shadow: none !important;
    }
    &::placeholder {
      color: #7a869a;
    }
  }
  .icon-search {
    height: 15px;
  }
  .qr-search {
    height: 20px;
  }
`;

export const Header = styled.div`
  position: relative;
  width: 100%;
  .header {
    padding: 0 30px 0 30px;
    display: flex;
    align-items: center;
    background-color: white;
    box-shadow: 0px 3px 5px rgba(9, 30, 66, 0.2),
      0px 0px 1px rgba(9, 30, 66, 0.31);
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    width: 100%;
    height: 60px;
    padding-left: 16px;
    margin-top: 20px !important;
    &-row {
      width: 100%;
      height: 100%;
      align-items: center;
      padding-bottom: 10px;
      justify-content: flex-start;
    }
    .content {
      /* margin-top: -17px; */
      /* padding-top: 10px; */
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      /* line-height: 24px; */
      &-note {
        /* margin-top: -17px; */
        font-size: 14px;
        margin-left: 14px;
        height: 30px;
        /* line-height: 24px; */
        color: white;
        span {
          font-weight: 900;
        }
      }
      @media screen and (min-width: 1200px) and (max-width: 1599px) {
        font-size: 15px !important;
        &-note {
          font-size: 11px;
        }
      }
    }
  }
`;
export const GlobalStyle = createGlobalStyle`
  .ant-popover-inner {
    border-radius: 20px;
    color: #172b4d;
    width: 550px;
    font-weight: 510;
  }
`;
export const PopoverWrapper = styled(Popover)``;
