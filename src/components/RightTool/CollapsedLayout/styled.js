import styled from "styled-components";

const Main = styled("div")`
  width: 80px;
  & .ant-avatar-icon {
    width: 55px !important;
    height: 55px !important;
  }
  @media (max-width: 600px) {
    width: 60px;
    & .item-action {
      width: 40px !important;
      height: 40px !important;
      line-height: 30px !important;
      font-size: 15px !important;
    }
    & .ant-avatar-icon {
      width: 40px !important;
      height: 40px !important;
    }
  }
  @media (max-width: 450px) {
    width: 50px;
    & .item-action {
      width: 40px !important;
      height: 40px !important;
      line-height: 30px !important;
      font-size: 15px !important;
    }
    & .ant-avatar-icon {
      width: 40px !important;
      height: 40px !important;
    }
  }
  background: #fff;
  display: flex;
  padding: 12px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  overflow: auto;
  flex: 1;
  & .layout-item {
    margin-bottom: 24px;
  }

  & .app-select-icon {
    font-size: 18px;

    & path {
      fill: currentcolor;
    }
  }

  & .layout-app-item {
    margin-bottom: 12px;
    height: 50px;
  }

  & .item-action {
    margin-bottom: 12px;
  }
`;

export { Main };
