import styled from "styled-components";
export const Main = styled("div")`
  box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
  background: #fff;
  border-radius: 8px;
  padding: 10px 15px;
  height: calc(100vh - 220px);
  .bold {
    font-weight: 700;
  }
  .patient {
    div {
      font-weight: 600;
    }
    .title {
      font-size: 18px;
    }
  }
  .form-thong-tin {
    margin-top: 20px;
  }
  .ant-form-item-label {
    label {
      font-weight: 700;
    }
  }
  .ant-form-item {
    margin-bottom: 5px !important;
  }
  .total-money {
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    .lable {
      color: #03317c;
      font-size: 18px;
      font-weight: 500;
    }
    .money {
      color: #172b4d;
      font-weight: 700;
      font-size: 20px;
    }
    @media (max-width: 1367px) {
      margin-top: 10px;
    }
  }
  & .ant-checkbox {
    span {
      font-weight: 700;
    }
  }
  & .ant-form-item-required::before {
    display: none !important;
  }
  & .form-chi-tiet {
    div {
      font-weight: 600;
    }
  }
`;
