import styled, { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`
& .popover-header{

& .ant-popover-inner{
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px !important;
  border-radius: 8px !important;
}
& .ant-popover-inner-content{
  padding: 0px !important;
}
& .item-action{
  padding: 5px 17px;

  :hover{
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)), #0762F7 ;
  }
  .icon-change-pass{
      svg{
        width: 20px;
      height: 20px;
      }

    }
  .icon-logout{
    width: 20px;
    height: 20px;
  }
}
}

`;

const Main = styled("div")`
  width: 100%;
  background: #0762f7;
  padding: 8px 0;
  font-family: Nunito Sans, sans-serif;
  .container {
    padding: 0 18px;
    height: 100%;
    .header {
      height: 100%;
      &__left {
        display: flex;
        align-items: center;
        height: 100%;
        .isofh {
          cursor: pointer;
          max-width: 100px;
          object-fit: contain;
          height: 32px;
        }
        .isofh-white {
          height: 30px;
          width: 30px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
        }
        .name-hospital {
          padding: 0 20px 0 10px;
          font-weight: bold;
          font-size: 20px;
          line-height: 25px;
          color: #ffffff;
          position: relative;
          &:after {
            background: linear-gradient(
                0deg,
                rgba(255, 255, 255, 0.5),
                rgba(255, 255, 255, 0.5)
              ),
              #0762f7;
            content: "";
            width: 1px;
            height: 24px;
            position: absolute;
            top: 0;
            right: 0;
          }
        }
        .menu {
          width: 24px;
          height: 24px;
          margin: 0 36px;
          cursor: pointer;
        }
        .search {
          position: relative;
          &__input {
            background: #ffffff;
            border: 2px solid #e0e0e0;
            box-sizing: border-box;
            border-radius: 16px;
            padding-left: 32px;
          }
          img {
            position: absolute;
            z-index: 1;
            top: 8px;
            left: 9px;
          }
          .ant-select {
            width: 360px;
            .ant-select-selector {
              background: #ffffff;
              border: 2px solid #dfe1e6;
              box-sizing: border-box;
              border-radius: 17px;
              flex: none;
              order: 3;
              flex-grow: 0;
              display: block;
              .ant-select-selection-search {
                right: 10px;
                input {
                  padding-left: 35px;
                }
              }
              .ant-select-selection-placeholder {
                padding-left: 35px;
              }
              .ant-select-selection-item {
                padding-left: 35px;
              }
            }
            .ant-select-arrow {
              display: none;
            }
          }
        }
      }
      &__right {
        display: flex;
        align-items: center;
        height: 100%;
        margin-left: auto;
        .notifi,
        .help {
          img {
            height: 20px;
            width: 20px;
          }
        }
        .help {
          padding: 0 12px 0 20px;
        }
        .username {
          font-weight: 600;
          font-size: 15px;
          line-height: 20px;
          color: #ffffff;
          padding: 0 10px;
          position: relative;
          margin-right: 10px;
          &:after {
            background: linear-gradient(
                0deg,
                rgba(255, 255, 255, 0.5),
                rgba(255, 255, 255, 0.5)
              ),
              #0762f7;
            content: "";
            width: 1px;
            height: 24px;
            position: absolute;
            top: 0;
            right: 0;
          }
        }
        > img {
          border-radius: 50%;
          width: 32px;
          height: 32px;
        }
      }
    }
  }
`;
export { Main };
