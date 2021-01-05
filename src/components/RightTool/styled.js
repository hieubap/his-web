import styled from "styled-components";

const Main = styled("div")`
  background-color: #fff;
  width: ${(props) => {
    if (props.collapse) {
      return 80;
    }
    return 300;
  }}px;
  transition: width 0.4s;
  display: flex;
  flex-direction: column;
  border-left: 1px solid rgb(222, 222, 222);
  @media (max-width: 1300px) {
    position: fixed;
    bottom: 0;
    right: 0;
    top: 60px;
    z-index: 103;
  }

  @media (max-width: 600px) {
    width: 300px;
    &.is-collapse {
      width: 60px;
    }
  }
  @media (max-width: 450px) {
    width: 300px;
    &.is-collapse {
      width: 50px;
    }
  }
  & .menu-app-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    &.selected .icon-app {
      background: linear-gradient(137.72deg, #fe5956 7.21%, #9e2b2a 96.96%);
    }
    .icon-app {
      background: linear-gradient(136deg, #20d0ce 4.05%, #165974 96.56%);
      border-radius: 5px;
      width: 55px;
      height: 55px;
      justify-content: center;
      align-items: center;
      color: #fff;
      display: flex;
      &:hover {
        background: linear-gradient(137.72deg, #fe5956 7.21%, #9e2b2a 96.96%);
      }

      .anticon svg {
        display: inline-block;
        font-size: 23px;
      }
    }
    .text-app {
      text-align: center;
      color: #333;
    }
  }

  & .menu-app-item:hover {
    border-color: #08aaa8;
  }

  .ant-card-head-title {
  }

  & .collapse-bar {
    height: 48px;
    background-color: #fff;
    border-top: 1px solid #00000020;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &.is-collapse {
      border-bottom: 1px solid #00000020;
      transform: rotate(-180deg);
    }
    transition: width 0.75s;
  }
  & .expand-area {
    flex: 1;
    overflow: auto;
  }
`;

export { Main };
