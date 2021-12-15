import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 0 10px;
  width: 100%;
  height: 32px;
  border-radius: 8px;
  border: ${({ border }) => border ? `${border}` : "1px solid #7A869A"};
  background-color: ${({ bgColor }) => bgColor ? `${bgColor}` : "#ffffff"};
  color: ${({ color }) => color ? `${color}` : `#172B4D`};
  @media(min-width: 1440px) {
    height: 40px;
    font-size: 18px;
    line-height: 24px;
  }
  .popover-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .title {
      width: 80%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .icon {
      width: 20%;
      display: flex;
      align-items: center;
      justify-content: end;
      img {
        transform: scale(.6);
      }
    }
  }
`;