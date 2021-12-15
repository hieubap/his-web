import styled from "styled-components";
import { select, input } from "components/mixin";

export const Main = styled.div`
  .top-level-category{
    background-color:#f3f4f7;
    padding: 0px 30px;
    padding-top: 10px;
    .container {
        padding: 0px;
    }
  }
  .title{
    padding: 10px 40px;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    & .action {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .button-cancel {
        margin-left: 18px;
        margin-right: 18px;
        background: #ffffff;
        @media (max-width: 1366px) {
          margin-right: 0.5em;
        }
      }
      .button-ok {
        background: #08cfde;
        color: white;
      }
      button {
        height: auto;
        padding: 6px 32px;
        border-radius: 8px;
        border: 1px solid #0762f7;
        box-shadow: 0px 3px 0px #03317c;
        font-weight: 600;
        font-size: 16px;
        color: #172b4d;
        @media (max-width: 1366px) {
          // font-size: 14px;
          padding: 4px 20px;
        }
      }
    }
  }
  .main {
    width: 100%;
    padding: 10px 100px;
    .text {
      color: #172b4d;
      font-size: 1rem;
      margin-bottom: 10px;
      min-width: 180px;
    }
    .text-bold {
      font-size: 1.1rem;
      font-weight: 600;
    }
    .line {
      width: 80%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      margin-bottom: 20px;
      align-items: baseline;
      &:last-of-type {
        margin-bottom: 0;
      }
      &:only-child {
        width: 20%;
      }
    }
    .ml-3 {
      margin-left: 30px;
    }
    .mr-1 {
      margin-right: 10px;
    }
    .mr-3 {
      margin-right: 30px;
    }
    .mw-50 {
      min-width: 50px;
    }
  }
  .body {
    /* background: #F4F5F7; */
    font-family: "Nunito Sans" !important;
    position: relative;
    margin: auto;
  }
  .item-input-numer {
    width: 20%;
  }
`;