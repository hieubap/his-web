import styled from "styled-components";

export const Main = styled.div`
  .box-left {
    padding: 19px 12px 58px;
    background: #e6effe;
    border-radius: 16px;
    &__price {
      display: flex;
      justify-content: space-between;
      margin-bottom: 7px;
      border-bottom: 1px solid #d9dbe9;
      padding-bottom: 5px;
      &:last-child {
        border-bottom-width: 0;
      }
    }
    &__title {
      font-family: Nunito Sans;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      color: #14142b;
    }
    &__detail {
      font-family: Nunito Sans;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      color: #b3304c;
    }
  }
  .box-right {
    &__title {
      font-family: Nunito Sans;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      color: #172b4d;
    }
    &__table-wrap {
      background: linear-gradient(
          0deg,
          rgba(23, 43, 77, 0.05),
          rgba(23, 43, 77, 0.05)
        ),
        #ffffff;
      box-shadow: 0px 0px 15px rgb(9 30 66 / 7%);
      border-radius: 16px;
    }
    &__table-title {
      font-family: Nunito Sans;
      font-style: italic;
      font-weight: bold;
      font-size: 16px;
      color: #049254;
      padding: 9px 20px;
    }
    &__table-content {
      .main__container {
        margin-top: 0 !important;
      }
    }
  }
`;
