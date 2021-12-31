import styled from "styled-components";

export const Main = styled.div`
  background: #e6effe;
  border-radius: 16px;
  padding: 12px 30px 10px;
  font-family: Nunito Sans, sans-serif;
  width: 100%;
  .title-header {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    font-size: 14px;
    line-height: 25px;
    text-transform: uppercase;
    color: #172b4d;
    .ic-history {
      width: 20px;
      height: 20px;
      path {
        fill: #0762f7;
      }
    }
  }
  .info {
    padding-top: 3px;
    &-left {
      font-size: 14px;
      line-height: 25px;
      color: #172b4d;
    }
    &-right {
      font-weight: bold;
      font-size: 14px;
      line-height: 25px;
      text-align: right;
      color: #b3304c;
    }
  }
`;
