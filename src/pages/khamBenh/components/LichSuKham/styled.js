import styled from "styled-components";

export const Main = styled.div`
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    #0762f7;
  box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
  border-radius: 16px;
  margin-top: 30px;
`;

export const HistoryTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: Nunito Sans;
  font-style: normal;
  color: #ffffff;
  padding: 8px 30px;
  .title-left {
    font-size: 18px;
  }
  .title-right {
    font-size: 14px;

    &--bold {
    }
  }
`;

export const HistoryContent = styled.div`
  padding: 16px;
  height: calc(100vh - 715px);
  overflow: scroll;
  border-top: 3px solid #ef4066;
  border-radius: 16px 0 0 0;
  background: #ffffff;
  position: relative;
  .anticon-right {
    color: #0762f7 !important;
  }
  .ant-collapse {
    border: 0;
    background-color: #ffffff;
    .ant-collapse-item {
      margin-bottom: 10px;
      box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
      border-radius: 3px;
      border-bottom: 0;
      background: #ffffff;
      .collapse-title {
        font-family: Nunito Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        color: #0762f7;
      }
    }
    .ant-collapse-content {
      border-top: 0;
    }
  }
  .collapse-content {
    &__title {
      margin-right: 5px;
    }
  }
`;
