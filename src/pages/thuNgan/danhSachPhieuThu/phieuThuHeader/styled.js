import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  .left {
    &__title {
      margin-right: 20px;
      font-family: Nunito Sans;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      color: #172b4d;
    }
    .ant-picker {
      border: 2px solid #dfe1e6;
      border-radius: 3px;

      .ant-picker-input {
        input {
          font-weight: 600;
          font-size: 16px;
          color: #172b4d;
          &:placeholder-shown {
            font-weight: normal;
            color: #7a869a;
          }
        }
      }
    }
    &__spread {
      margin: 0 20px;
    }
  }
  .right {
    > span {
      display: inline-block;
      padding: 10px 6px;
      margin-right: 12px;
      border-radius: 8px;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      color: #172b4d;
      &:nth-child(1) {
        background: #c1f3f7;
      }
      &:nth-child(2) {
        background: #c1d8fd;
      }
      &:nth-child(3) {
        background: #d9c0f2;
        margin-right: 0;
      }
      .bold {
        font-weight: 900;
      }
    }
    .btn-export {
      margin-left: 40px;
      padding: 6px 16px;
      mix-blend-mode: normal;
      box-shadow: 0px 3px 0px #03317c;
      border-radius: 8px;
      outline: 0;
      border: 0;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      height: 38px;
      color: #fff;
      background: #0762f7;
      line-height: 30px;
      .icon-export {
        vertical-align: middle;
        margin-left: 13px;
      }
    }
  }
`;
