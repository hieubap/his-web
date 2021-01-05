import styled from "styled-components";
export const Main = styled("div")`
  .ant-card-body {
    padding: 0 24px 24px;
    display: flex;
    flex-direction: column;
  }
  height: 100%;
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
  .drug-item {
    cursor: pointer;
    padding: 6px;
    .note {
      font-style: italic;
    }
    &:nth-child(odd) {
      background-color: #fafafa;
    }
    .drug-quantity {
      font-weight: 700;
      text-align: center;
    }
    .drug-distributed {
      text-align: center;
    }
    .drug-name {
      font-weight: bold;
      margin-bottom: 0;
    }
  }

  .modal-des {
    text-align: center;
    p {
      margin-bottom: 0;
    }
    .detail-txt {
      color: #20d0ce;
      font-weight: 500;
    }
    .title-des {
      font-size: 24px;
      color: #165974;
      font-weight: 700;
      padding-bottom: 12px;
      border-bottom: 1px solid #165974;
      text-transform: uppercase;
    }
  }
  & .scroll-container {
    height: 324px;
    transition: all 0.3s;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 8px;
      height: 10px;
      background: #eee;
      overflow-y: auto;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 20px;
      position: absolute;
      left: 0;
    }

    .ant-menu-item > a {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .ant-menu-vertical {
      border-right: 0;
    }
  }
  .ant-card-cover {
    max-width: 285px;
    margin: auto;
  }

  .card-container {
    display: flex;
    flex-direction: column;
    .drug-list {
      flex: 1;
    }
  }

  .drug-allocation {
    border-radius: 4px;
    color: #fff;
    width: 200px;
    outline: none;
    border: 0;
    padding: 5px 0;
    align-self: center;
  }
`;
