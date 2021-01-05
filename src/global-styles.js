import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: "Times New Roman", Times, serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: rgba(0, 0, 0, 0.8);
    color: #000;
  }
  
  .uppercase {
    text-transform: uppercase;
  }
  
  .tool-box {
    z-index: 15;
    opacity: 1;
    color: #000;
  }
  
  .editor_ClassName {
    border: solid 1px rgba(0, 0, 0, 0.6);
  }

  .ant-pagination {
    & .ant-pagination-item,
    & .ant-pagination-next,
    & .ant-pagination-prev {
      background: #ffffff;
      border: 1px solid #125872;
      box-sizing: border-box;
      box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      & .ant-pagination-item-link {
        border: none;
      }
    }
    & .ant-pagination-disabled {
      & .ant-pagination-item-link {
        border: none;
      }
      border: 0.5px solid #d9d9d9;
    }
    & .ant-pagination-item-active,
    & .ant-pagination-item-active:focus,
    & .ant-pagination-item-active:hover {
      background: #ffffff;
      border: 1px solid #fe5955;
      box-sizing: border-box;
      box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      & a {
        color: #fe5955;
      }
    }
  }
  
`;

export default GlobalStyle;
