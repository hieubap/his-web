import styled from "styled-components";
export const Main = styled("div")`
  display: flex;
  & .ant-spin-nested-loading {
    display: flex;
    flex: 1;
    & .ant-spin-container {
      display: flex;
      flex: 1;
      flex-direction: column;
    }
  }
  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    padding: 12px 1px;
  }
  .ant-table table {
    border: 1px solid #dedede;
  }
`;
