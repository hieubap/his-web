import styled from "styled-components";
import { displayFlex, button } from "components/mixin";

export const Main = styled.div`
  height: 100%;
  .container-fluid {
    position: relative;
    /* margin-bottom: 156px; */
    height: 100%;
    padding: 0 15px;
    background: #f4f5f7;
    & .bg-color1 {
      background: #f4f5f7;
      padding: 0;
      .line {
        margin: 20px 2px 20px 5px;
        background: #ffffff;
        box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
        border-radius: 12px;
      }
    }
    .screenShot {
      position: fixed;
      bottom: 10px;
      left: 0;
      right: 0;
      max-width: 100%;
      display: flex;
      justify-content: center;
      z-index: 1000;
      > div:first-child {
        position: absolute;
        left: 0;
        bottom: 0;
      }
    }
    .button-bottom {
      // @media (max-width: 1199px) {
      //   position: fixed;
      //   bottom: 0px;
      //   left: 0;
      //   right: 0;
      //   width: 100% !important;
      //   // background: #ffff;
      //   z-index: 111111;
      // }
      align-items: center;
      margin-bottom: 40px;
      margin-top: 15px;
      display: flex;
      justify-content: flex-end;
      margin-bottom: 40px;
      margin-top: 15px;
      &-right {
        width: 45.33%;
        padding: 0 10px 0 15px;
        ${displayFlex("space-between", "center")};
        justify-content: flex-end !important;
      }
      @media screen and (max-width: 1627px) {
        &-right {
          width: 45%;
        }
      }
      .button {
        /* ${button}; */
        font-weight: 600;
        font-size: 13px;
        line-height: 20px;
        height: 32px;
        padding: 6px 8px;
        min-width: 110px;
        cursor: pointer;
        margin-right: 10px;
        display: flex;
        align-items: center;
        &:last-of-type {
          margin-right: 0;
        }
        span {
          margin-right: 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        &-back {
          background: #ffffff;
          color: #172b4d;
          padding: 6px 8px;
          width: fit-content;
          border: 1px solid #0762f7;
          margin-left: 30px;
          border-radius: 8px;
        }
        &-danger {
          /* background: #fc3b3a; */
          border: 1px solid #7a869a;
          mix-blend-mode: normal;
          width: fit-content;
          /* box-shadow: 0px 3px 0px #7e1d1d; */
          border-radius: 8px;
          padding: 0 20px;
          & img {
            filter: invert(0.5);
          }
          :hover {
            background: #7a869a;
            color: #fff;
            & img {
              filter: none;
            }
          }
          :active {
            background: #7a869a;
            color: #fff;
            & img {
              filter: none;
            }
          }
        }
        &-sucess {
          background: #049254;
          border: 1px solid #049254;
          mix-blend-mode: normal;
          /* box-shadow: 0px 3px 0px #026138; */
          border-radius: 8px;
          color: #ffffff;
        }
        &-save {
          width: fit-content;
          border: 1px solid #0762f7;
          background-color: #0762f7;
          border-radius: 8px;
          color: #ffffff;
          :hover {
            background: #054ab9;
          }
          :active {
            background: #0762f7;
            box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.5);
            border: none;
          }
        }
        &-emergency {
          width: fit-content;
          height: 32px;
          left: 976px;
          bottom: 30px;
          color: #ffffff;
          background: #08cfde;
          border: 1px solid #08cfde;
          mix-blend-mode: normal;
          /* box-shadow: 0px 3px 0px #08B3C0; */
          border-radius: 8px;
        }
      }
    }
  }
`;
