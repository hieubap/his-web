import styled, { createGlobalStyle } from "styled-components";
import { button } from "components/mixin";
import { Popover } from "antd";

export const PopoverWrapper = styled(Popover)``;

export const GlobalStyle = createGlobalStyle`
    .ant-popover-inner {
        background: #1b1d21;
        box-shadow: 0px 0px 20px rgba(9, 30, 66, 0.2);
        border-radius: 15px;
        height: 30px;
        }
    & .ant-popover-arrow-content {
        background-color: #1b1d21;
    }
    & .ant-popover-inner-content {
        color: #ffffff;
        padding: 4px 16px;
    }
`;

export const Main = styled.div`
  &.info {
    margin-top: 20px;
    background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.95),
        rgba(255, 255, 255, 0.95)
      ),
      #0762f7;
    box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
    border-radius: 8px;
    display: flex;
    padding: 12px 15px;
    margin-left: 15px;
    .avatar-header {
      width: 96px;
      margin-right: 15px;
      .order {
        border: 1px dashed #0762f7;
        box-sizing: border-box;
        width: 96px;
        margin: auto;
        height: 30px;
        text-align: center;
        line-height: 30px;
        font-style: normal;
        font-weight: 900;
        font-size: 16px;
        color: #0762f7;
      }
      .avatar {
        cursor: pointer;
        height: 96px;
        width: 96px;
        margin: auto;
        margin-top: 5px;
        position: relative;
        & .hangTheIcon {
          position: absolute;
          right: -10px;
          top: -10px;
          transform: rotateZ(30deg);
          & img {
            width: 30px;
            height: 30px;
            object-fit: contain;
          }
        }
        img {
          width: 96px;
          height: 96px;
          object-fit: cover;
          border-radius: 3px;
        }
      }
    }
    .body-info {
      width: 100%;
      .title-header {
        width: 100%;
        display: flex;
        .name {
          font-weight: 900;
          font-size: 15px;
          line-height: 20px;
          color: #172b4d;
          .gender {
            font-weight: 400;
            padding-left: 10px;
          }
        }
        .button {
          ${button}
          background-color: unset;
          background: none;
          box-shadow: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-left: auto;
          padding: 0;
          font-size: 13px;
          line-height: 20px;
          color: #0762f7;
          width: 30%;
          &:hover,
          &:active,
          &:focus {
            color: #0762f7;
            background: none;
            text-decoration: underline;
          }
          span {
            width: 90%;
            text-align: end;
          }
          .icon {
            width: 10%;
            /* height: 100%; */
            fill: #0762f7;
            margin-left: 10px;
          }
        }
      }
      .info-full {
        background: linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.9),
            rgba(255, 255, 255, 0.9)
          ),
          #0762f7;
        border-radius: 8px;
        padding: 10px 15px;
        margin-top: 5px;
        .ant-col {
          padding-left: 0 !important;
        }
        .info {
          padding-left: 15px;
          .person {
            display: flex;
            font-style: normal;
            font-size: 13px;
            line-height: 17.73px;
            color: #172b4d;
            .title {
              width: 72px;
              font-weight: normal;
            }
            .detail {
              font-weight: bold;
              width: calc(100% - 72px);
            }
            .title.small {
              width: 125px;
            }
            .detail.small {
              font-weight: bold;
              width: calc(100% - 125px);
            }
            @media (max-width: 1599px) {
              .title.small,
              .title.last {
                width: 125px;
              }
              .detail.small,
              .detail.last {
                width: calc(100% - 125px);
              }
              .title.address {
                width: 125px;
              }
              .detail.address {
                width: calc(100% - 125px);
              }
            }
          }
        }
      }
    }
  }
`;
