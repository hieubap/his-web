import styled from "styled-components";

const Main = styled("div")`
  position: relative;
  display: flex;
  align-items: center;
  height: 24px;
  width: 100%;

  & .ant-calendar-picker-input {
    & .ant-input {
      height: 24px;
    }
  }

  & .date-picker {
    opacity: 0;
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    right: 0;
  }

  & .value-display {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    pointer-events: none;
    text-align: ${(props) => props.contentAlign};
  }
`;

export { Main };
