import styled from "styled-components";

const Main = styled("div")`
  border-bottom: solid 1px #dedede;
  
  & .toolbar {
    background-color: #fff;
    position: relative;
    z-index: 1;
    display: flex;
    width: 100%;
  }
`;

export { Main };
