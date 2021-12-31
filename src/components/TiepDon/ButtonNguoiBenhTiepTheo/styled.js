import styled from "styled-components";
import { Col } from "antd";
import { displayFlex } from "components/mixin";

export const Main = styled.div`
  &.person {
    height: 32px;
    padding: 0 10px;
    background: #049254;
    mix-blend-mode: normal;
    border: 1px solid #7a869a;
    box-sizing: border-box;
    border-radius: 8px;
    cursor: pointer;
    text-align: center;
    font-size: 16px;
    line-height: 22px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
   
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      width: 100%;

      span {
        font-weight: bold;
        color: #fff;
      }
      .dub-img {
        width: 20px;
        height: 20px;
        svg {
          path {
            fill: #fff;
          }
        }
      }
    }
    .code {
      font-weight: 900;
      color: #172b4d;
      margin-top: -3px;
      padding: 0px 12px;
    }
    .name {
      padding-bottom: 10px;
      color: #172b4d;
    }
    @media (min-width: 1440px) {
      height: 40px;
      font-size: 18px;
      line-height: 24px;
    }
    :hover {
      background: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.25),
          rgba(0, 0, 0, 0.25)
        ),
        #0762f7 !important;
      border: none !important;
    }
    :active {
      background: #0762f7 !important;
      border: none;
      box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.5);
    }
  
  &.service {
    display: flex !important;
    justify-content: space-evenly;
    align-items: center;
    padding: 8px !important;
    z-index: -10000 !important;
    .name {
      padding-bottom: 0px !important;
      color: #ffffff;
    }
  }
`;
