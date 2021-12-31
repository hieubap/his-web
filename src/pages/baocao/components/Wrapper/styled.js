import styled from "styled-components";

export const Main = styled.div`
  width: 100%;
  margin: auto;
  background-color: #ffffff;
  border-radius: 8px;
  min-height: 82vh;
  .title {
    padding: 10px 10px;
    border-bottom: 1px solid #dfe1e6;
    display: flex;
    align-items: center;
    font-size: 16px;
    line-height: 24px;
    font-weight: 700;
    color: #172b4d;
    .right {
      margin-left: auto;
      .action {
        justify-content: flex-end;
        display: flex;
        align-items: center;
        & .btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #172b4d;
          font-size: 14px;
          line-height: 20px;
          font-weight: 600;
          padding: 5px 8px;
          border-radius: 8px;
          border: 1px solid #7a869a;
          cursor: pointer;
          & img {
            margin-left: 3px;
          }
        }
        & .btn-blue {
          margin-left: 10px;
          color: #ffffff;
          background-color: #0762f7;
        }
        & .btn-red {
          margin-left: 10px;
          color: #ffffff;
          background-color: #ed1c24;
        }
      }
    }
  }
  .container {
    padding: 10px;
    width: 100%;
  }
`;
