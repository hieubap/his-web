import styled from "styled-components";

export const Main = styled.div`
  margin: 20px auto;
  .custom-nestedtable {
    .ant-table-row-level-0:first-child {
      .ant-table-selection-column {
        background: #054ab9 !important;
      }
    }
    .ant-table-row-level-1 {
      .ant-table-selection-column {
        label {
          display: none;
        }
      }
    }
    .sophieu {
      &:hover {
        .ant-table-cell {
          background-color: #054ab9 !important;
        }
      }
      .ant-table-selection-column {
        background-color: #054ab9;
      }
    }
    .ant-table-cell-with-append {
      direction: rtl;
    }

    .ant-table-body {
      height: calc(100vh - 405px) !important;
    }
  }
`;
