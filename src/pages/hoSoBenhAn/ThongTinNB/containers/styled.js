import styled from "styled-components";
import { Col } from "antd";
import { displayFlex, checkbox } from "components/mixin";

export const Main = styled(Col)`
  padding-right: 15px;

  input:read-only {
    cursor: default;
  }
  @media (max-width: 1200px) {
    padding-right: 0;
  }
  .frames {
    /* border-radius: 20px 20px 20px 20px; */
    /* box-shadow: 0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.31); */
    background: #ffff;
    .left {
      position: relative;
      z-index: 0;
      &::before {
        position: absolute;
        content: "";
        width: 100%;
        height: 100px;
        top: 43px;
        background-color: white;
        z-index: 1;
        border-radius: 20px 0 0 0;
        border-top: solid 3px #ef4066;
      }
    }
    .item-input {
      input {
        height: 35px;
      }
    }
    .ant-picker {
      padding: 6px 12px;
    }
    .ant-select-selector {
      height: 34px;
    }

    label {
      margin-top: 10px;
      margin-bottom: 2px;
      font-weight: 500;
    }
    .ma-nb {
      margin-top: 3px;
      white-space: pre;
      border: 2px dashed #0762f7;
      padding: 2px 10px;
      font-weight: 800;
      color: #0762f7;
    }
    .top-content {
      display: flex;
      padding-left: 30px !important;
      padding-right: 30px !important;
    }
    .row-name {
      padding: 0 15px;

      .avatar {
        position: relative;
        margin-right: 10px;
        width: 110px;
        height: 110px;
        cursor: pointer;
        .imageicon {
          position: absolute;
          right: -5px;
          bottom: -5px;
          width: 35px;
          height: 35px;
        }
        .text {
          margin-top: 8px;
          font-weight: bold;
          font-size: 16px;
          line-height: 22px;
          text-align: center;
          color: #172b4d;
        }
        .imageimage {
          height: 110px;
          width: 110px;
          object-fit: cover;
          border-radius: 10px;
        }
      }
      .img-no-drop {
        cursor: no-drop !important;
      }
      .ant-col {
        padding: 0 15px;
        .checkbox {
          ${checkbox};
          margin-top: 29px;
        }
        .optimize {
          position: relative;
          margin-top: 30px;
          cursor: pointer;
          .icon {
            position: absolute;
            right: -5px;
            bottom: 49px;
            width: 44px;
            height: 44px;
          }
          .text {
            margin-top: 8px;
            font-weight: bold;
            font-size: 16px;
            line-height: 22px;
            text-align: center;
            color: #172b4d;
          }
          .image {
            height: 150px;
            width: 100%;
            object-fit: cover;
            border-radius: 10px;
            @media (max-width: 1440px) {
              height: 125px;
            }
            @media (max-width: 1024px) {
              height: 220px;
            }
            @media (max-width: 768px) {
              height: 180px;
            }
          }
        }
      }
    }
  }
  .button-clear {
    cursor: pointer;
    width: 100%;
    font-weight: 600;
    margin-bottom: 10px;
    letter-spacing: 0.75px;
    text-align: center;
    margin-top: 24px;
    color: #0762f7;
    line-height: 19px;
    font-size: 14px;
    @media (max-width: 1599px) {
      margin-top: 10px !important;
    }
    .icon {
      width: 12px;
      height: 7.5px;
      margin-left: 5px;
    }
  }
`;
