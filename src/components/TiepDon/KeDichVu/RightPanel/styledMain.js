import styled from "styled-components";
import { Row } from "antd";

export const Main = styled(Row)`
  margin: 10px 30px 30px 15px;
  background: #ffffff;
  box-shadow: 0px 0px 15px rgb(9 30 66 / 7%);
  border-radius: 8px;

  .wrapper .ant-table-body,
  .wrapper .main {
    @media screen and (max-height: 710px) {
      height: calc(100vh - 513px) !important;
    }
    @media (min-height: 711px) and (max-height: 768px) {
      height: calc(100vh - 560px) !important;
    }
    @media screen and (min-height: 769px) and (max-height: 800px) {
      height: calc(100vh - 590px) !important;
    }
    @media screen and (min-height: 801px) and (max-height: 900px) {
      height: calc(100vh - 630px) !important;
    }
    @media screen and (min-height: 901px) and (max-height: 1040px) {
      height: calc(100vh - 720px) !important;
    }
    @media screen and (min-height: 1041px) {
      height: calc(100vh - 740px) !important;
    }
  }
`;

export const Main2 = styled(Row)`
  .btn-group {
    margin: 20px 30px 0 15px;
    .btn-back,
    .btn-thong-ke {
      padding-right: 16px;
      padding-top: 10px;
      font-weight: 500;
      font-size: 15px;
      color: #0762f7;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
      svg {
        margin: 0 5px;
      }
    }
  }
  .header-panel {
    display: flex;
    justify-content: space-between;
  }
`;
