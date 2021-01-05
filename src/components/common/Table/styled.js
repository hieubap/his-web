import styled from "styled-components";

export const Main = styled.div`
  flex: 1;
  overflow: hidden;
  & .ant-table-wrapper {
    height: 100%;
    & .ant-spin-nested-loading {
      height: 100%;
      & .ant-table-fixed-header {
        height: 100%;
        & .ant-table-content {
          height: 100%;
          & .ant-table-scroll {
            height: 100%;
          }
        }
      }
    }
  }
  .ant-table-tbody
    > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected)
    > td {
    background-color: transparent;
  }
  .ant-table-tbody > tr.ant-table-row {
    cursor: pointer;
    border: none;

    &:nth-child(odd) {
      background-color: #f5f5f5;
    }

    &:hover {
      background-color: #dafaf9;
      color: #333;
    }
    &.selected-row {
      background-color: #08aaa8;
      color: #fff;
    }
  }

  .ant-table-thead > tr > th {
    padding: 12px 0px;
  }
  ,
  .ant-table-tbody > tr > td {
    padding: 10x 0px;
  }
  .ant-table table {
    border: 1px solid #dedede;
    border-collapse: ${(props) =>
      props.dataSource?.length >= 1 ? "separate" : "collapse"} !important;

    & .ant-table-thead > tr > th {
      background-color: #125872;
      text-align: center;
      padding: 10px 0px;
      & .ant-table-header-column {
        width: 100%;
        border-right: 2px solid #fff;
        text-align: center;
        padding-right: 5px;
        color: #fff;
      }
      &:last-child {
        & .ant-table-header-column {
          border-right: none;
          padding-right: 10px;
        }
      }
    }

    & .ant-table-thead > tr:nth-of-type(2) > th {
      background: white;
      & .ant-table-header-column {
        padding: 0 2 px;
      }
    }

    & .ant-table-thead > tr:nth-of-type(2) > th:last-of-type {
      border-right: 1px solid #f0f0f0;
    }

    & .ant-table-tbody {
      & .ant-table-row {
        & td {
          text-align: center;
          color: #333333;
          font-size: 13px;
          line-height: 20px;
        }
      }

      & .ant-table-row.ant-table-row-level-0 {
        &.disable-row {
          background-color: #d1cfcf !important;
        }
        &.active-row {
          background-color: #20d0ce !important;
        }
      }
    }
  }
  // & .ant-table-thead th {
  //   background-color: #125872;
  //   color: #fff;
  //   padding-right: 0px !important;
  //   padding-left: 5px !important;
  //   & .ant-table-header-column {
  //     width: 100%;
  //     border-right: 2px solid #fff;
  //     text-align: center;
  //     padding-right: 5px;
  //   }
  // }

  & .ant-table-thead th:last-child {
    & .ant-table-header-column {
      border-right: none;
    }
  }

  .action .anticon {
    padding: 6px;
    font-size: 16px;
  }
  & .ant-empty {
    border: 1px solid #e8e8e8;
    margin: 0;
    border-top: none !important;
    padding: 20px;
  }
  & .ant-table-placeholder {
    padding: 0px;
  }
`;
