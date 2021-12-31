import styled from "styled-components";
export const Main = styled.div`
  min-height: calc(100vh - 70px) !important;
  background: #f4f5f7 !important;

  .wrapper {
    background: #fff;
    border-radius: 20px;
    margin-top: 10px;
  }
  & .ant-table {
    max-width: calc(100vw - 70px);
    .ant-table-body {
      min-height: calc(100vh - 330px);
    }
  }
  & .title {
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    color: #172b4d;
  }
  .ant-table-row {
    &:nth-child(2n) {
      background: linear-gradient(
          0deg,
          rgba(255, 255, 255, 0.9),
          rgba(255, 255, 255, 0.9)
        ),
        #0762f7;
      .ant-table-cell-fix-left {
        background: #e6effe !important;
      }
      .ant-table-cell-fix-right {
        background: #e6effe;
      }
    }
  }
  .header-title {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  .btn-ok {
    background: #049254;
    border-radius: 8px;
    border: none;
    padding: 5px 15px;
    height: auto;
    font-weight: 600;
    color: #fff;
    display: flex;
    align-items: center;
    img {
      margin-left: 5px;
    }
    :hover {
      background: #05c270;
    }
  }
  .row-actived {
    background: #c1f0db !important;
    &:nth-child(2n) {
      background: linear-gradient(
          0deg,
          rgba(255, 255, 255, 0.9),
          rgba(255, 255, 255, 0.9)
        ),
        #0762f7;
      .ant-table-cell-fix-left {
        background: #c1f0db !important;
      }
      .ant-table-cell-fix-right {
        background: #c1f0db !important;
      }
    }
    td {
      background: #c1f0db !important;
    }
    /* .ant-table-cell-fix-left {
      background: #c1f0db !important;
    }
    td {
      background: #c1f0db !important;
    } */
  }
`;
