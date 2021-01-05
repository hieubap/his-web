import styled from "styled-components";

export const Main = styled("div")`
  & .layout-body {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    height: calc(100vh - 60px);

    & .layout-middle {
      flex: 1;
      padding: 8px;
      & .ant-card {
        & .ant-card-body {
          display: flex;
          flex-direction: column;
          height: calc(100vh - 77px);
          overflow: auto;
          padding: 8px !important;
          & .ant-btn {
            padding: 0px 5px;
          }

          & .page-body {
            flex: 1;
            overflow: hidden;
            display: flex;
          }
        }
      }
    }

    & .layout-right-side {
      width: 18%;
      border-left: solid 2px #dedede;
      height: 100%;
    }
  }
`;
