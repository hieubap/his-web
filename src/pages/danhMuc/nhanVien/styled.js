import styled from "styled-components";
import { date } from "components/mixin";

export const Main = styled.div`
  font-family: Nunito Sans;
  .ant-col {
    padding: 0 5px;

    .item-date {
      ${date};
    }
  }
  .main-info {
    background: linear-gradient(
        0deg,
        rgba(23, 43, 77, 0.1),
        rgba(23, 43, 77, 0.1)
      ),
      #ffffff;
    border-radius: 20px 0px 0px 0px;
    width: 100%;
    .title-info {
      padding: 5px 30px;
      color: #172b4d;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
    }
    .right-info {
      float: right;
      color: #0762f7;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 24px;
      background: transparent;
      border: none;
      cursor: pointer;
      &:focus {
        outline: none;
      }
    }
    .table-info {
      border-radius: 20px 0px 0px 0px;
      border-top: 2px solid #3984ff;
      overflow: auto;
      padding-top: 2px;
      .main__container {
        margin-top: 0;
      }
      .ant-table-body {
        min-height: auto !important;
      }
    }
  }

  .main-kho {
    margin-top: 15px;
    background: linear-gradient(
        0deg,
        rgba(23, 43, 77, 0.1),
        rgba(23, 43, 77, 0.1)
      ),
      #ffffff;
    border-radius: 20px 0px 0px 0px;
    width: 100%;
    .title-info {
      padding: 5px 30px;
      color: #172b4d;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
    }
    .right-info {
      float: right;
      color: #0762f7;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 24px;
      background: transparent;
      border: none;
      cursor: pointer;
      &:focus {
        outline: none;
      }
    }
    .table-info {
      border-radius: 20px 0px 0px 0px;
      border-top: 2px solid #3984ff;
      overflow: auto;
      padding-top: 2px;
      .main__container {
        margin-top: 0;
      }
      .ant-table-body {
        min-height: auto !important;
      }
    }
  }

  .row-actived {
    background: #c1f0db !important;
  }

  .group-image{
    display: flex;
    padding-left: 10px;
    .ant-col {
      padding : 0px
    }
  }
`;
