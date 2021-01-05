import styled from "styled-components";

const Main = styled("div")`
  font-family: "Times New Roman", Times, serif;
  z-index: 101;
  position: absolute;
  width: 100px;
  .ant-select-selection {
    border-radius: 0;
    height: 100% !important;
    justify-content: center;
    display: flex;
    flex-direction: column;
    & .ant-select-selection__rendered {
      margin: 4px;
      & .ant-select-selection-selected-value {
        font-size: 13pt;
        color: rgb(0, 0, 0);
      }
    }
  }
`;
export { Main };
