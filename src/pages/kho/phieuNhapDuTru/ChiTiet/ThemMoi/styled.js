import styled from "styled-components";
import { select, input } from "components/mixin";

export const Main = styled.div`
  display: flex;
  background: white;
  /* padding: 30px; */
  .title {
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .item-select {
    ${select}
    margin-bottom: 22px;
  }
  .item-input {
    ${input}
    margin-bottom: 22px;
    input::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: #c1cde3 !important;
      opacity: 1; /* Firefox */
    }
  }
`;
