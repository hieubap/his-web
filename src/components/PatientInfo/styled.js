import styled from "styled-components";

const Main = styled("div")`
  & .patient-information {
    position: relative;

    & .info-label {
      color: rgba(0, 0, 0, 0.6);
    }

    & .info-text {
      font-weight: 600;

      & p {
        margin-bottom: 0;
      }
    }

    & .content-info {
    }

    & .info-item {
      color: #333;

      &.name {
        color: #08aaa8;
        font-weight: 600;
        font-size: 16px;
      }
    }

    .title-text {
      font-weight: 600;
    }
  }

  .icon-title {
    border: none;
  }

  .back {
    color: #000;
  }

  .color-red {
    color: #fe5955;
  }
  .avatar-main {
    position: relative;
    display: inline-block;
    .anticon.anticon-camera{
      position: absolute;
      font-size: 26px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 9;
      color: #fff;
      opacity: 0;
      transition: all 0.3s ease;
    }
    &:before {
      background-color: rgba(0, 0, 0, 0.3);
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      left: 0;
      z-index: 1;
      opacity: 0;
      transition: all 0.3s ease;
    }
    &:hover{
      &:before, .anticon.anticon-camera{
        opacity: 1;
      }
    }
  }
`;

export { Main };
