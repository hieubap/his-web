import styled from "styled-components";
export const Main = styled.div`
  width: 100%;
  border-radius: 5px;
  height: 100%;
  display: flex;
  background-color: #f8f9f9;
  padding: 5px 10px;
`;
export const ContentTable = styled.div`
  overflow: hidden;
  background: #ffffff;
  border-radius: 16px;
  width: 100%;
  height: calc(100%-10px);
  .main__container {
    margin-top: 0 !important;
  }
  .ant-table-body {
    /* height: 100% !important; */
    /* max-height: unset !important; */
  }
  .ant-table-thead {
    .custome-header {
      .title-box {
        padding: 0 !important;
        min-height: 40px;
      }
    }
  }
`;
