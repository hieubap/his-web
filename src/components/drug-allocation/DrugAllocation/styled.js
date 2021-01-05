import styled from "styled-components";
export const Main = styled.div`
  padding: 24px;
  
  & .head-control {
    display: flex;
    justify-content: space-between;
  }
  
  .ant-card-body {
    color: #333;
  }
  & .ant-row {
    display: flex;
    flex-wrap: wrap;
  }
  .title-list {
    font-size: 24px;
  }

  & .card-container {
    box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.1);
    height: 100%;
    min-height: 400px;
    .ant-card-head {
      border-bottom: 0;
    }
    .ant-card-head-title {
      padding: 12px 0;
      font-weight: 500;
      color: #125873;
      text-transform: uppercase;
    }
  }
  & .layout-body {
    width: 100%;
    & .layout-main {
      display: flex;
      & .detail-patient {
        width: ${(7 / 24) * 100}%;
        margin-right: 16px;
      }
      & .patient-list {
        width: ${(7 / 24) * 100}%;
        margin-right: 16px;
      }
      & .drug-list {
        flex: 1;
      }
    }
  }
`;
