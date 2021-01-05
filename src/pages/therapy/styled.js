import styled from "styled-components";

const Main = styled("div")`
  display: flex;
  width: 100%;
  position: relative;
  height: calc(100vh - 60px);

  & .app-contain {
    height: 100%;
    flex: 1;
    overflow: hidden;
    @media (max-width: 1300px) {
      margin-right: 80px;
    }
    @media (max-width: 600px) {
      margin-right: 60px;
    }
    @media (max-width: 450px) {
      margin-right: 50px;
    }

  }
`;

export { Main };
