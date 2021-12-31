import styled from "styled-components";

export const NavigationWrapper = styled.div`
  pointer-events: ${(props) =>
    props.trangThaiKham < props.trangThai ? "none" : "auto"};
  a {
    > div {
      opacity: 0.5;
      min-height: 100px;
      display: flex;
      align-items: center;
    }
    &.active {
      > div {
        opacity: 1;
        pointer-events: auto;
      }
    }
  }
`;

export const Main = styled.div`
  border-radius: 0px 16px 16px 0px;
  background-color: ${(props) => props.color};
  padding: ${(props) => props ? `${props.padding}px` : '20px'} ${(props) => props ? `${props.padding - 5}px` : '15px'};
  width: 100%;
  color: #ffffff;
  display: flex;
  cursor: pointer;
  &:hover {
    background: #ffffff;
    color: #172b4d;
    > svg {
      fill: ${(props) => props.color};
    }
    .content {
      &--title {
        color: #172b4d;
      }
      &--item {
        > svg {
          fill: #172b4d;
        }
      }
    }
  }
  > svg {
    width: 64px;
    height: 64px;
    fill: #ffffff;
    margin-right: 10px;
  }
  .content {
    &--title {
      font-weight: 900;
      font-size: 13px;
      line-height: 20px;
      color: #fff;
    }
    &--item {
      display: flex;
      align-items: center;
      cursor: pointer;
      font-weight: 600;
      font-size: 13px;
      line-height: 20px;
      > svg {
        width: 8px;
        height: 8px;
        fill: #ffffff;
        margin-right: 8px;
      }
    }
  }
  margin-bottom: 8px;
`;