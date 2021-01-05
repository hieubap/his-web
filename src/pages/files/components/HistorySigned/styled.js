import styled from "styled-components";

export const Main = styled("div")`
  .content-parrent {
    padding: 5px;
    background-color: #08aaa817;
    .name {
      margin-bottom: 0;
      font-weight: 600;
    }
    .date {
      font-style: italic;
      color: #999;
    }
  }
  .new-item {
    background-color: #f5f5f5;
  }
  .item-child {
    span {
      display: inline-block;
      margin: 0 3px;
    }
    .type {
      color: #fe5955;
    }
    .user {
      margin-right: 10px;
      white-space: normal;
      font-weight: 500;
      color: #08aaa8;
    }
  }
  .ant-tree-title .date {
    margin-bottom: 0;
    margin-bottom: 0;
    color: #999;
    font-size: 13px;
  }

  .ant-tree li .ant-tree-node-content-wrapper {
    line-height: 18px;
  }
  .ant-tree-child-tree {
    li:first-child,
    li {
      padding-top: 0;
    }
    .ant-tree-node-content-wrapper {
      margin-left: 1px;
      padding: 6px;
      color: #999;
      border-bottom: 0;
      padding-bottom: 6px;

      .date {
        color: #000;
      }
    }
  }
  /* .ant-tree li .ant-tree-node-content-wrapper.ant-tree-node-selected {
    background: transparent;
  } */
  .ant-tree > li {
    padding: 6px;

    &:hover > {
      background: #dafaf9;
    }
    &.ant-tree-treenode-selected {
      background-color: #99ded4;
    }
  }
  .title-history {
    padding: 0 10px 10px;
    font-size: 16px;
    position: relative;
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;
    :after {
      width: 84px;
      height: 2px;
      background-color: rgb(8, 170, 168);
      position: absolute;
      left: 0px;
      content: "";
      bottom: 0px;
    }
  }
  .ant-tree-switcher.ant-tree-switcher-noop {
    display: none;
  }
  .ant-tree {
    height: calc(100vh - 510px);
    overflow-y: auto;
    overflow-x: hidden;
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
  }
`;
