import styled from "styled-components";

const PopupTool = styled("div")`
  display: flex;
  & .item-tool {
    margin-left: 5px;
  }
`;
const Main = styled("div")`
  border-bottom: solid 1px #dedede;

  & .toolbar {
    background-color: #fff;
    padding: 12px;
    box-shadow: 1px 0 20px 0 rgba(69, 104, 129, 0.33),
      0px 0px 20px 0 rgba(114, 119, 160, 0.12);
    position: relative;
    z-index: 1;
    width: 100%;
    & .text-btn {
      min-width: 90px;
    }
    & .item-tool {
      margin-left: 5px;
    }
    & .file-system-tool {
      display: flex;
      @media (max-width: 650px) {
        justify-content: flex-end;
        margin-bottom: 10px;
      }
      & .item-tool {
        display: flex;
        justify-content: center;
        align-items: center;
        &:last-child {
          // margin-right: 12px;
        }
      }
    }

    & .toolbarStyle1 {
      display: flex;
      margin-top: 10px;
      @media (max-width: 800px) {
        flex-direction: column;
      }
    }
    & .editor-tool {
      display: flex;
      margin-top: 12px;
      flex: 1;
    }
    & .zoom-tool {
      display: flex;
      flex: 1;
      align-items: center;

      & .slider-tool {
        width: 120px;
        margin: 3px 6px 0 6px;
        @media (max-width: 700px) {
          flex: 1;
        }
      }
    }

    & .file-selection {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 350px;
      @media (max-width: 800px) {
        margin-top: 10px;
        align-self: flex-end;
      }
      @media (max-width: 450px) {
        width: 100%;
        flex-direction: row;
      }
      & .arrow-btn {
        border: none;
        width: 24px;
        background: none;
        cursor: pointer;
        outline: none;
      }

      & .file-name-d {
        cursor: pointer;
        color: #08aaa8;

        & .file-name-text {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
        }
      }

      & .arrow-btn {
        display: flex;
        justify-content: center;
        &:hover {
          color: #08aaa8;
          background-color: #dafaf9;
        }
      }
    }
  }
`;

export { Main, PopupTool };
