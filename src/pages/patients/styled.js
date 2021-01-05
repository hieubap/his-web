import styled from "styled-components";

export const Main = styled("div")`
  display: flex;
  flex-direction: column;
  flex: 1;
  .title-list {
    font-weight: bold;
    font-size: 18px;
    line-height: 23px;
    text-transform: uppercase;
    color: #125873;
    margin-bottom: 24px;
  }
  & .patient-paging {
    @media (max-width: 700px) {
      & .ant-pagination-total-text {
        width: 100%;
      }
    }
  }
  & .patient-list {
    flex: 1;
    overflow: auto;
    & .ant-list-items {
      height: calc(100vh - 240px);
      overflow-y: auto;
    }

    & .patient-item {
      transition: background-color 0.225s;
      cursor: pointer;

      & .item-num {
        color: #08aaa8;
      }

      @media (max-width: 550px) {
        display: flex;
        flex-direction: column;
        align-items: baseline;
        & .ant-list-item-action {
          display: none;
        }
        & .col-patient-document {
          margin-left: 58px;
          margin-top: 5px;
        }
      }
    }

    & .patient-item:hover {
      background-color: #dafaf9;
    }

    & .ant-list-header {
    }

    & .selected-item {
      background-color: #08aaa8;

      & .item-num {
        color: rgba(0, 0, 0, 0.9);
      }
    }

    & .selected-item:hover {
      background-color: #08aaa8;
    }

    & .avatar-patient {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: rgba(0, 0, 0, 0.8);
    }
  }

  & .patient-paging {
    padding: 12px 0 0 0;
  }
  & .col-patient-document {
    @media (max-width: 600px) {
      width: 200px;
    }
    @media (max-width: 550px) {
      width: 150px;
    }
  }
  & .col-patient-detail {
    margin-right: 10px;
    padding-left: 10px;
    & .patient-info {
      display: flex;
      flex-direction: row;
      @media (max-width: 720px) {
        flex-direction: column;
      }
      & .patient-gender {
        color: rgba(0, 0, 0, 0.45);
        font-weight: 400;
        font-size: 13px;
        @media (min-width: 720px) {
          margin-left: 5px;
        }
      }
    }
  }
`;
