import styled from "styled-components";
export const Main = styled.div`
  h1 {
    font-weight: bold;
    width: 100%;
  }
  & .ant-form-item {
    width: 100% !important;
  }
  & .ant-table-container {
    height: calc(100vh - 550px);
    @media screen and (max-width: 1920px) {
      width: ${(props) =>
        !props.collapseStatus
          ? "calc(100vw - 1161px) !important"
          : "calc(100vw - 705px) !important"};
    }
    @media screen and (max-width: 1600px) {
      width: ${(props) =>
        !props.collapseStatus
          ? "calc(100vw - 975px) !important"
          : "calc(100vw - 600px) !important"};
    }
    @media screen and (max-width: 1366px) {
      width: ${(props) =>
        !props.collapseStatus
          ? "calc(100vw - 840px) !important"
          : "calc(100vw - 520px) !important"};
    }
  }
  &.main__container {
    .ant-table-body {
      min-height: calc(100vh - 370px) !important;
      max-height: calc(100vh - 370px) !important;
    }
  }
`;
