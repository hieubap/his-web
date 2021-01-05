import styled from "styled-components";
import { Card, Drawer } from "antd";
export const MainDrawer = styled(Drawer)`
  display: flex;
  max-height: 100%;
  & .ant-drawer-body {
    height: 100%;
    & .ant-card-small {
      display: flex;
      height: 100%;
      flex-direction: column;
      & .ant-card-body {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
    }
  }
`;

export const Main = styled(Card)`
  & .forms-contain {
    overflow-y: auto;
    margin-top: 12px;
    flex: 1;
    height: 100px;
    & .ant-tree-directory {
      max-height: 100%;
    }
  }

  & .title-value {
    display: inline-block;
    width: 120px;
  }

  & .files-title-switch {
    margin-left: 12px;
  }

  & .sub-files-title {
    font-weight: normal;
    margin-left: 6px;
  }

  & .ant-tree-directory {
    & .ant-tree-switcher {
      margin-top: -2px;
    }
    & .ant-tree-treenode-selected {
      position: relative;
      & .ant-tree-node-selected {
        &::before {
          height: auto !important;
          right: 0 !important;
          left: 0 !important;
          bottom: 0 !important;
          top: 0 !important;
        }
      }
    }

    & > li {
      // &.ant-tree-treenode-selected {
      //   position: relative;
      //   background-color: #08aaa8;
      // }
      display: flex;
      flex-wrap: wrap;
      & .ant-tree-node-content-wrapper {
        padding: 0px !important;
        height: auto !important;
        position: relative;
        flex: 1;
        display: flex;
        overflow: hidden;
        & .ant-tree-iconEle {
          margin-top: -3px;
        }
        & .ant-tree-title {
          flex: 1;
          margin-right: 15px;
          height: auto;
          overflow: hidden;
          & .main-title {
            display: flex;
            & .file-name-render {
              flex: 1;
              margin-right: 5px;
              white-space: pre-line;
            }
            & .tree-delete-icon {
              margin-top: 5px;
            }
          }
        }
      }
      & .ant-tree-child-tree {
        flex-basis: 100%;
      }
      & ul.ant-tree-child-tree {
        & > li {
          flex: 1;
          display: flex;
          & .ant-tree-node-content-wrapper {
            // &.ant-tree-node-selected {
            //   &::before {
            //     display: none;
            //   }
            //   color: #000;
            // }
            padding: 0px !important;
            height: auto !important;
            flex: 1;
            display: flex;
            overflow: hidden;
            position: relative;
            & .ant-tree-iconEle {
              margin-top: -3px;
            }
          }
        }
      }
    }
  }

  .title-form {
    font-weight: bold;
  }

  & .files-list-title-input {
    position: absolute;
    width: 0;
    z-index: 1;
    right: 0;
    transition: width 0.225s ease-in-out;
  }

  & .files-list-title-input-focus {
    width: 100%;
  }

  .files-list-title {
    position: relative;
    display: flex;
    width: 100%;
    align-items: center;
    height: 19px;
  }

  .files-list-title-text {
    position: absolute;
    width: 100%;
    z-index: 0;
  }

  .files-list-title-input {
    position: absolute;
    width: 0;
    z-index: 1;
    right: 0;
    opacity: 0;
    transition: all 0.225s ease-in-out;
  }

  .files-list-title-input-focus {
    width: 100%;
    opacity: 1;
  }

  .files-list-search-icon {
    position: absolute;
    right: 8px;
    z-index: 2;
  }

  .files-list-search-icon:hover {
    color: #08aaa8;
    cursor: pointer;
  }

  & .file-list-add {
    position: relative;
    height: 24px;
    width: 100%;

    & .file-list-add-select {
      position: absolute;
      z-index: 1;
      top: 0;
    }

    .file-list-add-select-focus {
      width: 100%;
    }

    & .file-list-add-btn {
      position: absolute;
      z-index: 2;
      top: 0;
      color: #08aaa8;
      transition: all 0.225s ease-in-out;
    }

    & .file-list-add-btn-visible {
      opacity: 0;
      pointer-events: unset;
      z-index: 0;
    }
  }
`;
