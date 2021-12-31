import styled from "styled-components";
import { Col } from "antd";

export const Main = styled(Col)`
  &.container {
    font-family: Nunito Sans !important;
    padding: 10px;
    width: 100%;
    .kavKPH {
      margin-bottom: 10px;
    }
  }
  .ant-table-placeholder {
    // display: none;
    .ant-table-cell {
      height: 278px;
    }
  }
  th.ant-table-cell.ant-table-cell-fix-right.ant-table-cell-fix-right-first {
    right: 0!important;
  }
  td.ant-table-cell.ant-table-cell-fix-right.ant-table-cell-fix-right-first {
    right: -6px!important;
  }
  .col-action {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
