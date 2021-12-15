import styled from "styled-components";

export const Main = styled.div`
  table {
    &::before {
      border-radius: unset !important;
      border-top: 0 !important;
    }
    border-top: 0 !important;
  }
  .ant-table-body {
    border-radius: unset;
    table {
     
    }
    max-height: 58vh;
    min-height: 58vh;
    .ant-table-cell {
      font-weight: 700;
      border-bottom: 0!important;
      border-top: 0!important;
      padding: 6px 4px !important;
     
    }
    .ant-table-row {
      &.active {
        background: #c1f0db !important;
      }
      &:nth-child(2n) {
        
      }
      &:nth-child(2n+1) {
        background-color: #ffffff;
      }
    }
  }
  .ant-table-fixed-header {
    border-radius: unset !important;
  }
  .main__container {
    margin-top: 0 !important;
    .title-box {
      min-height: 26px !important;
      padding: 0px !important;
      border-bottom: 0 !important;
      justify-content: center !important;
      align-items: center;
      border-bottom: 1px solid #dfe1e6 !important;
    }
  }
  .__button {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 20px;
    .print {
      margin-left: 10px;
      margin-right: 10px;
      .title {
        width: 60%;
      }
      .icon {
        width: 40%;
      }
    }
  }
`;