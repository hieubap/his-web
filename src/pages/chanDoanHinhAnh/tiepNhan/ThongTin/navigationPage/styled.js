import styled from "styled-components";

export const NavigationWrapper = styled.div`
  pointer-events: none;
  a {
    > div {
      opacity: 0.5;
    }
    &.active {
      > div {
        opacity: 1;
        pointer-events: auto;
      }
    }
  }
`;
