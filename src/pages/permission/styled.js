import styled from "styled-components";

export const Main = styled("div")`
  min-height: calc(100vh - 60px);
  padding: 24px;
  .drug-name {
    font-weight: bold;
    margin-bottom: 0;
  }
  .drug-item {
    padding: 6px;
    .note {
      font-style: italic;
    }
  }
  .drug-quantity {
    text-align: center;
  }
`;
