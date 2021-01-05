import styled from "styled-components";

const Main = styled("div")`
  & .line-style {
    display: flex;
    position: relative;
    min-height: ${(props) => props.minHeight + "px"};
    background-color: #fff;
    border-bottom: ${({ theme, mode }) =>
      mode === "config" ? theme.border : ""};
    border-color: ${({ theme, focusing }) =>
      focusing ? theme.primary : theme.borderColor};
    & > div {
      max-width: 100%;
      & > div {
        max-width: 100%;
      }
    }
  }

  & .line-action {
    position: absolute;
    z-index: 1;
    right: 0;
    bottom: -25px;
  }

  & .line-action-active {
    display: block;
  }
`;

export { Main };
