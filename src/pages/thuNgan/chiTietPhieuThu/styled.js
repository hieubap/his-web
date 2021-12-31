import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  .ant-message {
    position: fixed;
    top: calc(100vh - 10px);
    right: 10px;
}
  body{
    position: relative;
  }
`;

export const Main = styled.div`
  background: #f4f5f7;
  .main__container {
    margin-top: 0 !important;
    border-top: 3px solid #ef4066;
    border-radius: 16px 0px 0px 0px;
    overflow: hidden;
    background: #ffffff;
  }
  .info-partient {
    margin: 20px 40px 23px 40px;
    padding: 11px 23px 20px;
    background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.95),
        rgba(255, 255, 255, 0.95)
      ),
      #0762f7;
    box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
    border-radius: 16px;
  }
  .bottom-content {
    font-family: Nunito Sans;
    margin: 20px 40px 23px 40px;
    padding: 0px 23px 52px;
    &__wrapper-table {
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        #0762f7;
      box-shadow: 0px 0px 15px rgb(9 30 66 / 7%);
      border-radius: 16px;
      overflow: hidden;
    }
    &__right {
      margin-left: -23px;
    }
    &__header {
      height: 53px;
      align-items: center;
      padding: 0 30px;
    }
    &__title-right {
      font-weight: bold;
      font-size: 18px;

      color: #ffffff;
    }
    &__btn-right {
      text-align: right;
      button {
        background: #0762f7;
        box-shadow: 0px 3px 0px #03317c;
        border-radius: 8px;
        font-weight: 600;
        font-size: 16px;
        color: #ffffff;
        padding: 8px 16px;
        height: auto;
        border: none;
        img {
          padding-left: 12px;
        }
        &:first-child {
          margin-right: 13px;
        }
      }
    }
  }
`;
