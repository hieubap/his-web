import styled from "styled-components";
export const Main = styled.div`
  .list-receipts {
    background: #e6effe;
    border-radius: 16px;
    padding: 12px 22px;
    .Check-all {
      margin: 0 9px 9px 18px;
      .ant-checkbox-wrapper {
        color: #03317c;
        font-size: 14px;
        line-height: 16px;
      }
    }
    .item {
      align-items: center;
      background: #ffffff;
      box-shadow: 0px 3px 5px rgba(9, 30, 66, 0.2),
        0px 0px 1px rgba(9, 30, 66, 0.31);
      border-radius: 8px;
      margin-bottom: 4px;
      padding: 2px 18px;
      &:last-child {
        margin-bottom: 0;
      }
      &__info {
        font-size: 14px;
        line-height: 25px;
        color: #172b4d;
        display: flex;
        align-items: center;
        img {
          padding-right: 10px;
        }
      }
      &__price {
        color: #b3304c;
      }
    }
  }
  .textAlign {
    text-align: right;
  }
  .textBold {
    font-weight: bold;
  }
  .detail {
  }
`;
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    margin-left: 10px;
  }
`;
export const TotalPrice = styled.div`
  font-size: 16px;
  line-height: 24px;
  color: #172b4d;
  margin: 8px 0 16px;
  text-align: right;
  span {
    font-weight: bold;
  }
`;

export const Detail = styled.div`
  .title {
    font-size: 20px;
    line-height: 24px;
    color: #172b4d;
  }
  .addItem {
    font-weight: bold;
    font-size: 14px;
    line-height: 24px;
    color: #0762f7;
    display: flex;
    align-items: center;
    img {
      padding-right: 12px;
    }
  }
  .table-add {
    margin: 20px 0 12px;
  }
  .ant-table-tbody {
    max-height: 150px !important;
  }
  .ant-table-row > td {
    padding: 10px 9px !important;
  }
`;
