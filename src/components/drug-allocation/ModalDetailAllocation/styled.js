import styled from "styled-components";
import { Modal } from "antd";

export const Main = styled(Modal)`
  .ant-card-body {
    padding: 0 24px;
  }
  .action-header {
    font-weight: 500;
    margin-bottom: 6px;
    padding: 6px;
  }
  .text-center {
    text-align: center;
  }
  .ant-radio-wrapper {
    color: #333;
  }
  .modal-des {
    color: #333;
  }
  .modal-des {
    text-align: center;
    p {
      margin-bottom: 0;
    }
    & .content-des {
      font-size: 14px;
      & .detail-txt {
        font-weight: 500;
        color: #4dd0e1;
      }
    }
    .title-des {
      font-size: 24px;
      color: #165974;
      font-weight: 700;
      border-bottom: 0.5px solid #165974;
      text-transform: uppercase;
      margin: 0 24px;
      padding-bottom: 4px;
      margin-bottom: 10px;
      margin-top: 10px;
    }
  }
  & .ant-modal-footer {
    border-top: 0;
    padding-bottom: 20px;
    & button {
      min-width: 200px;
      height: 40px;
      font-size: 14px;
    }
  }
`;
