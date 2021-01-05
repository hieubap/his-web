import styled from "styled-components";

export const Main = styled("div")`
  height: 100%;
  .ant-card-body {
    padding: 0 0 24px;
    .ant-list-split .ant-list-item {
      border: none;
    }
    & .input-search {
      // margin-bottom: 15px;
      margin-right: 10px;
      input {
        height: 36px;
        border-radius: 50px;
        padding-left: 40px;
        padding-right: 32px;
      }
      .ant-input-prefix {
        & .anticon {
          font-size: 25px;
        }
      }
      .ant-input-suffix {
        & .anticon {
          font-size: 25px;
        }
      }
    }
    .ant-radio-group {
      display: block;
    }
    .anticon-search {
      font-size: 17px;
    }

    .ant-list {
      padding: 0 24px;
      .ant-list-item {
        padding: 8px 10px;
        border-radius: 7px;
        border: none;
        cursor: pointer;
        transition: 0.3s ease;
        &:nth-child(odd) {
          background-color: #f5f5f5;
        }
        &:hover {
          background-color: #dafaf9;
        }

        .ant-radio-inner {
          transform: rotate(45deg);
          opacity: 0;
        }
        .ant-list-item-meta-title {
          color: #333;
        }
        &.selected-patient {
          background-color: #08aaa8;
          .ant-list-item-meta-title,
          .ant-list-item-meta-description {
            color: #fff;
          }

          .ant-radio-checked .ant-radio-inner {
            opacity: 1;
            background-color: #fe5955;
            width: 22px;
            height: 22px;
            &:after {
              position: absolute;
              width: 6px;
              height: 2px;
              background-color: #fff;
              left: 6px;
              top: 12px;
            }
            &:before {
              content: "";
              position: absolute;
              width: 2px;
              height: 11px;
              background-color: #fff;
              left: 11px;
              top: 3px;
            }
          }
        }
        .ant-list-item-meta-title,
        .ant-list-item-meta-description {
          line-height: 17px;
        }

        & .patient-name {
          margin-bottom: 5px;
        }
        .ant-list-item-meta-title {
          font-weight: 700;
        }
      }
    }
  }
  .search-container {
    padding: 0 15px 0;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    & .button-scan {
      cursor: pointer;
    }
  }
  & .ant-list-items {
    height: 324px;

    transition: all 0.3s;
    overflow-y: auto;

    &:hover {
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: block;
      }
    }

    &::-webkit-scrollbar {
      width: 8px;
      height: 10px;
      background: #eee;
      display: none;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 20px;
      position: absolute;
      left: 0;
    }

    .ant-menu-item > a {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .ant-menu-vertical {
      border-right: 0;
    }
  }
`;
