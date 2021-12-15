import styled from "styled-components";

export const Main = styled.div`
  font-family: Nunito Sans;
  margin: auto;
  background: #f4f5f7;
  .content {
    padding: 20px 40px 40px;
    .title {
      font-style: normal;
      font-weight: bold;
      font-size: 24px;
      color: #172b4d;
    }
    .ant-table-thead > tr > th {
      background: #f4f5f7;
    }
    .ant-table-header .addition-box {
      background: #f4f5f7 !important;
    }
    .ant-table {
      background: #f4f5f7;
    }
    .ant-pagination {
      .ant-pagination-item-link {
        background: #f4f5f7;
      }
      .ant-pagination-item {
        background: #f4f5f7;
        &.ant-pagination-item-active {
          background: #253858;
        }
      }
    }

    .ant-select {
      .ant-select-selection-item {
        text-align: center;
      }
      .ant-select-item-option-content {
        font-family: Nunito Sans;
        color: #172b4d !important;
      }
    }
  }
  .ant-select-dropdown {
    .ant-select-item-option-content {
      font-family: Nunito Sans;
      color: #172b4d;
    }
  }

  & .row-selected{
    background: none !important;
    background-color: #c0f1da !important;
  }
`;
