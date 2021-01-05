import styled from "styled-components";

export const Main = styled("div")`
  height: 100%;
  .ant-card-body {
    padding: 0 0 24px;
    .ant-list-split .ant-list-item {
      border: none;
    }
    .input-search {
      margin-bottom: 15px;
      input {
        height: 36px;
        border-radius: 50px;
      }
    }
    .ant-radio-group {
      display: block;
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
        .ant-list-item-meta-title {
          line-height: 17px;
          font-weight: 700;
          color: #333;
        }
       
        .ant-radio-inner {
          transform: rotate(45deg);
          opacity: 0;
        }
        .ant-radio-wrapper {
          position: absolute;
          right: 0;
        }
        &.selected-room {
          background-color: #08aaa8;
          .ant-list-item-meta-title {
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
      }
    }
  }
  
  & .scroll-container {
    height: 370px;

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
