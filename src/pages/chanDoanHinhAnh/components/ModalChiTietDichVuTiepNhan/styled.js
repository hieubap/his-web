import styled from "styled-components";
import { Modal } from "antd";

export const ModalStyled = styled(Modal)`
  padding: 0;

  .ant-modal-content {
    background: #f4f5f7;
    box-shadow: 0px 0px 20px rgba(9, 30, 66, 0.2);
    border-radius: 16px;
    font-family: Nunito Sans, sans-serif;
    height: 780px;
    .ant-modal-body {
      padding: 0;
    }
    overflow: hidden;
  }
`;

export const Main = styled.div`
  .main__container {
    margin: 0 !important;
  }
  .header {
    padding: 8px 17px 8px 30px;
    flex-flow: initial;
    align-items: center;
    &__left {
      padding-right: 16px;
      white-space: nowrap;
      font-size: 18px;
    }
    &__right {
      margin-left: auto;
      font-size: 18px;
      overflow: hidden;
      max-width: 100%;
      white-space: nowrap;
      height: 35px;
      button {
        background: #0762f7;
        mix-blend-mode: normal;
        box-shadow: 0px 3px 0px #03317c;
        border-radius: 8px;
        color: white;
        border: solid 1px #0762f7;
        margin-right: 15px;
      }

      .btn-back {
        background: #ffffff;
        mix-blend-mode: normal;
        border: 1px solid #0762f7;
        box-shadow: 0px 3px 0px #03317c;
        border-radius: 8px;
        color: black;
      }
    }
  }
  .service-info {
    border-radius: 16px;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      #0762f7;
    & .header {
      font-family: Nunito Sans;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 24px;

      color: #ffffff;
    }
    & .info-content {
      border-top: 2px solid #ef4066;
      display: flex;
      height: 604px;
      box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
      border-radius: 16px;
      background: linear-gradient(
          0deg,
          rgba(255, 255, 255, 0.95),
          rgba(255, 255, 255, 0.95)
        ),
        #0762f7;
      & .custom-col {
        margin-left: 30px;
        margin-top:30px;
        flex: 4;
        table {
          tbody {
            tr {
              height: 40px;
              td {
                padding-right: 30px;
                &:first-child {
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  max-width: 200px;
                }
              }
              & .info {
                font-weight: bold;
                color: #172b4d;
                max-width: 250px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }
        }
        .space-bottom{
          margin-bottom: 30px;
        }
      }
    }
    & .btn_back {
      width: 123px;
      height: 36px;
      background: #ffffff;
      mix-blend-mode: normal;
      margin-left: 30px;
      border: 1px solid #0762f7;
      box-shadow: 0px 3px 0px #03317c;
      border-radius: 8px;
    }
  }
  .result {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      #0762f7;
    box-shadow: 0px 0px 20px rgba(9, 30, 66, 0.2);
    border-radius: 16px;
    width: 100%;
    & .header {
      display: flex;
      &__left {
        font-family: Nunito Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 24px;
        color: #ffffff;
        .ant-select {
          padding-left: 15px;
        }
      }
      &__right {
      }
    }
    & .result-info {
      background: #ffffff;
      border-radius: 16px 0px 0px 0px;
      padding: 20px;
      height: 595px;
      border-top: 2px solid #ef4066;
      overflow-y: scroll;
      .hanlde-textfield {
        line-height: 25px;
        background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 6 6"><circle cx="3" cy="3" r="0.4" fill="black" /></svg>')
          20px;
        background-position-y: 12px;
        background-size: 5px 28px;
        margin-top: -10px;
        .ant-select-selector {
          background: none;
          border: 0;
        }
      }
    }
  }

  .service-technical {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      #0762f7;
    box-shadow: 0px 0px 20px rgba(9, 30, 66, 0.2);
    border-radius: 16px;
    & .header {
      &__left {
        font-family: Nunito Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 24px;
        color: #ffffff;
        .ant-select {
          padding-left: 15px;
        }
      }
      &__right {
      }
    }
    & .service-technical-info {
      background: #ffffff;
    }
  }
`;
