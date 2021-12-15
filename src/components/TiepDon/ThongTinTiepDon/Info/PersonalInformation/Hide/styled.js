import styled from "styled-components";
import { displayFlex, checkbox, input, date, select } from "components/mixin";

export const Main = styled.div`
  .ant-modal {
    .ant-modal-content {
      border-radius: 10px;
      .ant-modal-close {
        right: 10px;
        .ant-modal-close-x {
            width: 30px;
            height: 30px;
            line-height: 34px;
            .ant-modal-close-icon {
                svg {
                    color: #ffffff;
                }
            }
        }
      }
      .ant-modal-header {
        display: none;
        padding: 5px 5px;
        border-radius: 10px 10px 0 0;
        background-color: #02317c;
        .ant-modal-title {
          color: #ffffff;
        }
      }
      .ant-modal-body {
        padding: 0;
      }
    }
  }

  .ant-col {
    padding: 0;
    padding-right: 5px;
    margin-bottom: 0;
    &:last-of-type {
        padding-right: 0;
    }
  }
  .left {
    position: relative;
    z-index: 0;
  }
  .row-name {
    padding: 0 8px;
    .ant-col {
        padding: 0;
        padding-right: 5px;
        margin-bottom: 0;
        &:last-of-type {
            padding-right: 0;
        }
        .checkbox{
            ${checkbox};
            margin-bottom: 29px;
        }
        .optimize {
            position:relative;
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
                color: #172B4D;
            }
            .image {
                height: 150px;
                width: 100%;
                object-fit: cover;
                border-radius: 10px;
                @media (max-width:1440px) {
                    height: 125px;
                }
                @media (max-width:1024px) {
                    height: 220px;
                }
                @media (max-width:768px) {
                    height: 180px;
                }
            }
        }
        .avatar-no-drop {
            cursor: no-drop;
        }
    }
  }

  .ant-col {
    padding: 0 6px;
    margin-bottom: 20px;
    &:first-of-type {
        /* padding-left: 10px; */
    }
    &:last-of-type {
        /* padding-right: 10px; */
    }
    .item-input {
      ${input}
      margin-bottom: 18px;
    }
    .item-date {
      ${date};
      margin-bottom: 18px;
    }
    .item-select {
      ${select};
      margin-bottom: 18px;
    }
  }
`;