import styled from "styled-components";
import { displayFlex, checkbox } from "components/mixin";

export const Main = styled.div`
  position: relative;
  border-radius: 20px 20px 20px 20px;
  box-shadow: 0px 3px 5px rgba(9, 30, 66, 0.2),
    0px 0px 1px rgba(9, 30, 66, 0.31);
  background: #ffff;
  /* &::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 25px;
    top: 43px;
    background-color: white;
    z-index: 1;
    border-radius: 20px 0 0 0;
    border-top: solid 3px #ef4066;
  } */
  & .flame-right-main {
    position: relative;
    z-index: 5;
    padding: 0 8px;
    width: 100%;
    .ant-col {
      padding: 0;
      padding-right: 5px;
      margin-bottom: 0;
      &:last-of-type {
          padding-right: 0;
      }
      .checkbox {
        & > div {
          display: flex;
          align-items: center;
          font-size: 14px;
          line-height: 16px;
          color: #172b4d;
          font-weight: 600;
          cursor: pointer;
        }
        display: flex;
        align-items: center;
        & .ant-checkbox-wrapper {
          margin-right: 5px;
        }
        margin-bottom: 10px;
        & svg {
          fill: #0762f7;
          margin-left: 5px;
          width: 22px;
          height: 15px;
        }
        & .disabled {
          color: #172b4d25;
          & svg {
            fill: #172b4d25;
          }
        }
      }
      .item-input {
        textarea {
          /* min-height: 100px; */
        }
      }
      .upload {
        color: #054ab9;
        font-size: 16px;
        line-height: 20px;
        padding-right: 14px;
        cursor: pointer;
        display: inline-block;
        svg {
          padding-left: 8px;
          margin-top: -4px;
          fill: #0762f7;
          width: 22px;
          height: 15px;
        }
      }
      .disabled-upload {
        cursor: no-drop;
      }
    }
    .button-clear {
      cursor: pointer;
      width: 100%;
      margin-bottom: 10px;
      font-weight: 600;
      letter-spacing: 0.75px;
      color: #0762f7;
      line-height: 19px;
      font-size: 14px;
      text-align: center;
      .icon {
        width: 12px;
        height: 7.5px;
        margin-left: 5px;
      }
    }
    & .upload-giay-chuyen-tuyen {
      font-family: Nunito Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 20px;
      color: #0762F7 !important;
      /* identical to box height, or 125% */
      cursor: pointer;
      display: flex;
      align-items: center;
    }
  }
`;
