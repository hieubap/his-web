import styled from "styled-components";

export const Main = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  position: absolute;
  width: 508px;
  right: ${({ visible }) => (visible ? 0 : "-1000px")};
  top: 0;
  bottom: 0px;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(9, 30, 66, 0.2);
  z-index: 1040;
  transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
  padding-bottom: 20px;
  overflow-y: auto;
  & .btn-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .title {
      color: #172b4d;
      font-size: 16px;
      font-weight: 700;
    }
    .content-thu-gon {
      color: #0762f7;
      font-size: 16px;
      font-weight: 700;
      display: flex;
      align-items: center;
      span {
        margin-right: 5px;
      }
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }

  @media screen and (max-width: 1366px) {
    width: 508px;
  }
  @media screen and (min-width: 1367px) and (max-width: 1440px) {
    width: 550px;
  }
  @media screen and (min-width: 1441px) and (max-width: 1660px) {
    width: 600px;
  }
  @media screen and (min-width: 1661px) {
    width: 650px;
  }
`;
