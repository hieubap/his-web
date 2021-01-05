import styled from "styled-components";
import { Modal } from "antd";

export const Main = styled("div")`
  & .search-item {
    min-width: 280px;
    margin: 0 6px;
  }
  .header-search {
    margin-bottom: 25px;
  }
  .title {
    text-transform: uppercase;
    font-size: 18px;
    margin-bottom: 23px;
  }
  .items-length {
    font-weight: 700;
    color: #125872;
  }
  .ant-select-selection {
    border-radius: 17px;
  }
  .ant-row {
    display: flex;
    box-sizing: border-box;
    flex-wrap: wrap;
  }
  .main-selected {
    box-shadow: none;
    border: 1px solid #ddd;
  }
  .modal-search {
    .title {
      h4 {
        font-weight: bold;
        font-size: 18px;
        line-height: 23px;
        color: #165974;
      }
    }
  }
`;

export const CustomModalPatientRoom = styled(Modal)`
  .custom-virtualize-list {
    padding-left: 24px;
    .room-item {
      display: flex;
      padding: 5px;
      border-radius: 8px;
      cursor: pointer;
      &:hover {
        background-color: #dafaf9;
      }
      .left-box {
        width: 20px;
      }
      .right-box {
        .desc {
          margin-right: 20px;
        }
      }
    }
    .disabled {
      opacity: 0.6;
      cursor: unset !important;
    }

    .selected-patient {
      display: flex;
      align-items: center;
      cursor: pointer;
      .left-box {
        flex: 6;
      }
      .right-box {
        flex: 1;
        .anticon-close {
          display: none;
        }
      }
      &:hover {
        background-color: #dafaf9;
        .right-box {
          .anticon-close {
            display: block;
          }
        }
      }
    }
  }
`;
