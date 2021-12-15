import styled from "styled-components";
import { Modal } from "antd";
export const ModalStyled = styled(Modal)`
  padding: 0;
  .ant-modal-content {
    background: #03317c;
    box-shadow: 0px 0px 20px rgba(9, 30, 66, 0.2);
    border-radius: 16px 16px 0 0;
    font-family: Nunito Sans, sans-serif;
    .ant-modal-body {
      padding: 0;
    }
    overflow: hidden;
  }
  & .action-group {
    display: flex;
    justify-content: center;
    & .btn-action {
      border: none;
      background-color: transparent;
      padding: 0;
      margin: 5px;
      outline: none;
      color: #0762F7;
      cursor: pointer;
    }
  }
`;
export const Main = styled.div`
  .main__container {
    margin: 0 !important;
  }
  .header-table {
    padding: 8px 17px 8px 30px;
    flex-flow: initial;
    align-items: center;
    &__left {
      white-space: nowrap;
      font-weight: bold;
      font-size: 18px;
      color: #ffffff;
    }
    &__right {
      margin-left: auto;
      img {
        cursor: pointer;
      }
    }
  }
  .ant-table-body {
    .ant-table-row {
      &.active {
        .ant-table-cell {
          background: #c1f0db;
        }
      }
    }
  }
`;
export const ContentTable = styled.div`
  overflow: hidden;
  border-top: 2px solid #ef4066;
  background: #ffffff;
  border-radius: 16px 0px 0px 0px;
`;
