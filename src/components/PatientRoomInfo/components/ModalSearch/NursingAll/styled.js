import styled from "styled-components";

export const Main = styled("div")`
  position: relative;
  height: 100%;
  border: 1px solid #ddd;
  background-color: transparent;
  .dropdown-container {
    position: absolute;
    top: 45px;
    left: 0;
    width: 100%;
    background-color: #fff;
    box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.1);
    z-index: 999;
  }
  .ant-select-selection {
    background: transparent;
  }
  .title-container {
    display: flex;
    justify-content: space-between;
  }
  .items-length {
    font-weight: 700;
    color: #125872;
  }
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
    .ant-select-selection {
      border-radius: 50px;
    }
    .ant-radio-group {
      display: block;
    }
    .search-inner {
      padding: 0 24px;
      margin-top: 20px;
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
        .ant-list-item-meta-title {
          line-height: 17px;
          font-weight: 700;
          color: #333;
        }
        .anticon-close {
          opacity: 0;
          transition: 0.3s ease;
        }
        &:hover {
          background-color: #dafaf9;
          .anticon-close {
            opacity: 1;
          }
        }
        & .room-name {
          margin-bottom: 0;
        }
        &.disabled {
          .ant-list-item-meta-title,
          .ant-list-item-meta-description {
            color: #cac7c7;
          }
          cursor: not-allowed;
          &:hover {
            background-color: #fff;
          }
          &:nth-child(odd):hover {
            background-color: #f5f5f5;
          }
        }
      }
    }
  }

  .search-container {
    padding: 0 15px 0;

    .ant-select-arrow {
      z-index: 1;
    }
    .ant-select-selection__rendered {
      position: relative;
      z-index: 9;
      width: 100%;
      margin: 0;
    }
    .ant-select-selection__placeholder,
    .ant-select-search__field__placeholder {
      left: 10px;
    }
    .ant-select-search--inline {
      padding: 0 40px 0 10px;
    }
  }
  & .scroll-container {
    margin-top: 20px;
    height: 300px;

    transition: all 0.3s;
    overflow-y: auto;
    &.scroll-dropdown {
      height: auto;
      max-height: 360px;
    }
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
