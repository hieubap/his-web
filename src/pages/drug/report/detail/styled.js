import styled from "styled-components";

const Main = styled("div")`
  & .ant-spin-nested-loading {
    flex: 1;
  }
  & form {
    flex: 1;
    & .ant-calendar-picker {
      width: 100%;
    }
  }
`;

export { Main };
