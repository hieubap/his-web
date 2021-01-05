import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  & .ant-spin-nested-loading {
    display: flex;
    flex: 1;
    & .ant-spin-container {
      display: flex;
      flex: 1;
      flex-direction: column;
    }
  }
`;
