import styled from "styled-components";
export const Main = styled.div`
  .container {
    font-family: Nunito Sans, sans-serif;
    padding: 0 40px 34px 40px;
    .home {
      &-breadcrumbs {
        margin: 6px 0px;
        width: 100%;
        font-weight: 600;
        font-size: 13px;
        line-height: 20px;
        color: #7a869a;
        cursor: pointer;
        span {
          background: rgba(255, 255, 255, 0.0001);
          padding: 0 8px;
        }
        label {
          font-weight: 600;
          color: #0762f7;
          display: inline-block;
          cursor: pointer;
        }
      }
    }
  }
  & .title {
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    color: #172b4d;
  }
  & .style-version1 {
    width: 100%;
  }
`;
