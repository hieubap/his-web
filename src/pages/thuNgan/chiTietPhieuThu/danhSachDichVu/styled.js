import styled from "styled-components";

const Main = styled.div`
  & .row-selected {
    background: none !important;
    background-color: #c0f1da !important;
  }
`;

const PaginationWrapper = styled.div`
  padding: 20px 2px 58px;
  background: #ffffff;
  > div {
    margin-top: 0 !important;
  }
`;

export { Main, PaginationWrapper };
