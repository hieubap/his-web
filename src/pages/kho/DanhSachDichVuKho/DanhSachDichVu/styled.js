import styled from "styled-components";

export const Main = styled.div`
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    #0762f7;
  border-radius: 16px;
  margin-top: 15px;
  margin-left: 10px;
  width: 100%;
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
`;

export const ContentTable = styled.div`
  overflow: hidden;
  background: #ffffff;
  border-radius: 16px;

  .ant-table-body {
    height: 100% !important;
    max-height: unset !important;
  }
  .table-row-even{
      &.ant-table-row-selected{
        .ant-table-cell{
          background-color : #c1f0db;
        }
      }
      &.add-border{
        .ant-table-cell{
          border-bottom : 1px solid #ececec;
        }
      }
      .ant-table-cell{
        background-color: white;
      }
    }
    .table-row-odd{
      &.ant-table-row-selected{
        .ant-table-cell{
          background-color : #c1f0db;
        }
      }
      &.add-border{
        .ant-table-cell{
          border-bottom : 1px solid #ececec;
        }
      }
      .ant-table-cell{
        background-color: #eaf0fe;
      }
    }
`;

