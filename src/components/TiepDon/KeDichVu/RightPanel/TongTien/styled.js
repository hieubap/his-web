import styled from "styled-components";
import { Col } from "antd";

export const Main = styled(Col)`
  .button-nbtt-2 {
    display: flex !important;
    .code {
      padding-top: 6px !important;
      padding-right: 5px;
    }
    .name {
      padding-top: 3px;
    }
  }
  &.sum-money {
    font-family: Nunito Sans !important;
    padding: 0 10px 10px;
    .sum-money-container {
      background: linear-gradient(
          0deg,
          rgba(23, 43, 77, 0.05),
          rgba(23, 43, 77, 0.05)
        ),
        #ffffff;
      box-shadow: 0px 0px 15px rgb(9 30 66 / 7%);
      border-radius: 8px;
      .content-sum {
        .header {
          border-bottom: 1px solid #d9dbe9;
        }
        .main {
          padding: 5px 10px;
          background: #ffffff;
          overflow-y: scroll;
          .note {
            font-weight: 400;
            font-size: 14px;
            line-height: 19px;
            color: #ef4066;
            span {
              font-weight: bold;
            }
          }
          .not-pay {
            font-weight: bold;
            font-size: 16px;
            line-height: 22px;
            color: #172b4d;
            padding: 2px;
          }
          .content-main {
            .item {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: #d9dbe9 solid 1px;
              .title {
                font-weight: 400;
                font-size: 14px;
                line-height: 19px;
                color: #14142b;
                padding: 7px 0 5px;
              }
              .price {
                font-size: 14px;
                line-height: 19px;
                color: #14142b;
                font-weight: 400;
              }
              &:last-child {
                border-bottom: none;
                .title {
                  font-size: 20px;
                  line-height: 27px;
                  color: #fc3b3a;
                  font-weight: 400;
                }
                .price {
                  font-size: 20px;
                  line-height: 27px;
                  color: #fc3b3a;
                  font-weight: 700;
                }
              }
            }
          }
        }
      }
    }
    .footer {
      position: relative;
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      margin-bottom: 0px;
      align-items: center;
      .button {
        /* margin-left: 160px; */
        border-radius: 8px;
        font-weight: bold;
        font-size: 16px;
        text-align: center;
        color: #ffffff;
        line-height: 20px;
        height: auto;
        /* margin-top: 263px; */
        cursor: pointer;
        border: none;
        padding-right: 0;
        &::after {
          box-shadow: none !important;
          outline: 0 !important;
        }
        .ant-btn-loading-icon {
          display: none;
        }
        &::before {
          position: relative !important;
        }
        .dub-img {
          img {
            filter: invert(1) brightness(3);
          }
        }
        .person {
          .title {
            span {
              margin-right: 8px;
              color: #ffffff;
            }
            padding-right: 10px;
          }
          border: 1px solid #0762f7;
          background: #0762f7;
          height: 38px;
        }
      }
      .btn-priview {
        background: #ffffff;
        mix-blend-mode: normal;
        width: 105px;
        height: 38px;
        border: 1px solid #054ab9;
        border-radius: 8px;
        padding: 0px;
        :hover {
          background: #e6effe;
          box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
          color: #000;
        }
        :active {
          box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.5);
          background: #fff;
        }
        img {
          margin-left: 5px;
        }
      }
    }
  }
  & .next-patient {
    color: #7a869a;
    text-align: right;
  }
`;
