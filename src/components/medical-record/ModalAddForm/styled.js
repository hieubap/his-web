import styled from "styled-components";
import { Modal } from "antd";

export const Main = styled(Modal)`
  width: 1250px !important;
  & .ant-modal-body {
    max-height: calc(100vh - 10px);
    padding: 20px;
    & .ant-form {
      & .ant-form-item {
        margin-bottom: 10px !important;
        & .ant-form-item-label {
          line-height: 25px;
          & .ant-form-item-required {
            // &:before {
            //   display: none;
            // }
          }
        }
      }
    }
    & .ant-spin-container {
      height: calc(100vh - 200px);
      max-height: 500px;
    }
  }
  .modal-des {
    color: #333;
    & p {
      margin-bottom: 0;
    }
    & .content-des {
      font-weight: 500;
    }
    & .title-des {
      font-weight: bold;
      font-size: 18px;
      line-height: 23px;
      color: #165974;
      padding-bottom: 5px;
      border-bottom: 0.5px solid #165974;
    }
  }
  & .action-footer {
    margin-top: 15px;
    justify-content: center;
    display: flex;
    & button {
      margin-left: 5px;
      margin-right: 5px;
    }
  }
  & .ant-modal-footer {
    border-top: 0;
    padding: 0px;
  }

  & .ant-pagination,
  & .ant-select-selection.ant-select-selection--single,
  & .ant-pagination-options-quick-jumper {
    font-size: 10px !important;
  }
`;
