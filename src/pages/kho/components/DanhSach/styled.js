import styled from "styled-components";

export const Main = styled.div`
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    #0762f7;
  border-radius: 16px;
  margin-top: 30px;
  .main__container {
    margin: 0px;
  }

  .row-actived {
    background: #c1f0db !important;
  }
  .header {
    padding: 13px 16px;
    flex-flow: initial;
    align-items: center;
    color: #ffffff;
    &__left {
      font-family: Nunito Sans;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 24px;
      text-align: center;

      img {
        padding-left: 10px;
      }
      .btn-show {
        background: linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.5)
          ),
          #0762f7;
        border: 0px;
    }
    }
    &__right {
      margin-left: 10px;
      .btn_new {
        background: #049254;
        width: 139px;
        height: 36px;
      }
      button {
        height: auto;
        margin: 0 8px;
        border-radius: 8px;
        border: 1px solid #049254;
        box-shadow: 0px 3px 0px #03317c;
        font-weight: 600;
        font-size: 16px;
        color: #ffffff;
      }

      img {
        padding: 0px 0px 3px 10px;
      }
    }
  }

  .ant-table-body {
    max-height: initital !important;
    // @media(max-width: 1199px){
    //   max-height: 400px !important;
    // }
    .ant-table-tbody {
      .ant-table-row{
        cursor: pointer;
        &:nth-child(2n) {
          background: linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #0762F7;
          .ant-table-cell-fix-right {
            background: linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #0762F7;
          }
        }
        &:nth-child(2n + 1) {
          background: #ffffff !important;
        }
      }
      .ant-table-row:hover .ant-table-cell{
        background: #c1f0db;
        }
        .ant-table-cell {
          border-top: none !important;
          border-bottom: none !important;
          font-size: 14px;
          line-height: 20px;
          color: #172b4d;
        }
      }
    }
    .ant-table-cell-fix-right{
      .title-box{
        justify-content: center;
      }
    }
  
`;

export const ContentTable = styled.div`
  overflow: hidden;
  background: #ffffff;
  border-radius: 16px;

  .ant-table-body {
    height: 100% !important;
    max-height: unset !important;
  }
`;

