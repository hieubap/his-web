import styled from "styled-components";

export const Main = styled("div")`
  background-color: #fff;
  min-height: calc(100vh - 60px);
  padding: 24px;
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  .ant-table-thead th {
    background-color: #125872;
    color: #fff;
  }
  .ant-checkbox-checked::after {
    border-color: #ddd;
    
  }
  .ant-checkbox-checked .ant-checkbox-inner{
    background-color: #fff;
  }
  .ant-checkbox-checked .ant-checkbox-inner, .ant-checkbox-checked .ant-checkbox-inner{
     border-color: #999999;
  }
  .ant-checkbox-checked .ant-checkbox-inner::after{
    border: 2px solid #FE5955;
    border-top: 0;
    border-left: 0;
  }
  .btn-detail{
    background-color: #FE5955;
    color: #fff;
  }
  .pagination {
    text-align: right;
  }
  .ant-tooltip-inner {
    color: #333;
    background-color: green;
}
.permission-text {
    display: block;
    max-width: 375px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
`;
