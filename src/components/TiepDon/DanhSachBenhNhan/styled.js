import styled from "styled-components";
import { select, input } from "components/mixin";

export const Main = styled.div`
  margin-bottom: 20px;
  .disable-button {
    background-color: #909090;
    box-shadow: 0 3px 0 #444;
  }
  &.container {
    font-family: "Nunito Sans" !important;
    .second-row {
      position: relative;
      z-index: 1020;
      padding: 10px;
      width: 100%;
      &:last-of-type {
        padding: 0 10px;
        display: flex;
        align-items: center;
      }
      .ant-col {
        padding: 0;
        padding-right: 5px;
        &:first-of-type {
          padding-right: 5px;
        }
        &:last-of-type {
          padding-left: 5px;
          padding-right: 0px;
        }
        .item-select {
          ${select};
          margin-bottom: 10px;
        }
        .item-input {
          ${input}
          .ant-input {
            margin-top: 0;
            border-radius: 4px;
          }
        }
        & .mt-10 {
          margin-top: 10px;
        }
        & .close {
          box-shadow: 0px 3px 0px #03317c;
          border: 1px solid #03317c;
          color: #000;
          font-weight: 600;
        }
        .elipsis {
          color: #7a869a;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
    .btn-thong-ke {
      float: right;
      padding-right: 16px;
      padding-top: 10px;
      font-weight: 600;
      font-size: 16px;
      color: #0762f7;
      &:hover {
        cursor: pointer;
      }
      svg {
        margin-left: 10px;
      }
    }
  }
`;
